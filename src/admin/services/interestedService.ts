import { MOTOS } from '../../data/motos'
import { buildMockInterested } from '../mock/interested'
import type {
  DashboardMetrics, Interested, InterestedNote, InterestedPage, InterestedQuery, InterestedStatus,
} from '../types'

/**
 * CAPA DE SERVICIOS (mock). Los componentes sólo conocen estas funciones.
 * Para conectar el backend: reemplazar el cuerpo de cada una por un `fetch` a la API
 * manteniendo firmas y tipos de retorno.
 *
 * El "store" vive en memoria: los cambios se ven durante la sesión y se pierden al recargar.
 */
let db: Interested[] = buildMockInterested()

const delay = (ms = 450) => new Promise((r) => setTimeout(r, ms))
const clone = <T,>(v: T): T => structuredClone(v)
const digits = (v: string) => v.replace(/\D/g, '')
const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
const STATUS_LABEL: Record<InterestedStatus, string> = {
  NUEVO: 'Nuevo', CONTACTADO: 'Contactado', EN_EVALUACION: 'En evaluación', APROBADO: 'Aprobado', RECHAZADO: 'Rechazado',
}

function applyQuery(all: Interested[], q: InterestedQuery) {
  let rows = all
  const text = q.q?.trim()
  if (text) {
    const t = norm(text)
    const d = digits(text)
    rows = rows.filter(
      (r) =>
        norm(`${r.firstName} ${r.lastName}`).includes(t) ||
        (d.length > 0 && (digits(r.phone).includes(d) || digits(r.dni).includes(d))),
    )
  }
  if (q.status) rows = rows.filter((r) => r.status === q.status)
  if (q.brand) rows = rows.filter((r) => r.brand === q.brand)
  if (q.motoId) rows = rows.filter((r) => r.motoId === q.motoId)
  if (q.from) rows = rows.filter((r) => r.createdAt.slice(0, 10) >= q.from! || new Date(r.createdAt) >= new Date(`${q.from}T00:00:00`))
  if (q.to) rows = rows.filter((r) => new Date(r.createdAt) <= new Date(`${q.to}T23:59:59`))
  const sort = q.sort ?? 'fecha_desc'
  const byName = (a: Interested, b: Interested) =>
    `${a.lastName} ${a.firstName}`.localeCompare(`${b.lastName} ${b.firstName}`, 'es')
  return [...rows].sort((a, b) => {
    if (sort === 'fecha_desc') return +new Date(b.createdAt) - +new Date(a.createdAt)
    if (sort === 'fecha_asc') return +new Date(a.createdAt) - +new Date(b.createdAt)
    return sort === 'nombre_asc' ? byName(a, b) : byName(b, a)
  })
}

export async function getInterested(query: InterestedQuery = {}): Promise<InterestedPage> {
  await delay()
  const rows = applyQuery(db, query)
  const pageSize = query.pageSize ?? 10
  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize))
  const page = Math.min(Math.max(1, query.page ?? 1), totalPages)
  return { items: clone(rows.slice((page - 1) * pageSize, page * pageSize)), total: rows.length, page, pageSize, totalPages }
}

export async function getInterestedById(id: string): Promise<Interested | null> {
  await delay(300)
  const found = db.find((r) => r.id === id)
  return found ? clone(found) : null
}

export async function updateInterestedStatus(id: string, status: InterestedStatus, actor: string): Promise<Interested> {
  await delay(350)
  const row = db.find((r) => r.id === id)
  if (!row) throw new Error('No encontramos al interesado.')
  if (row.status !== status) {
    row.status = status
    row.notes.push({
      id: crypto.randomUUID(), kind: 'estado', author: actor,
      text: `Cambió el estado a ${STATUS_LABEL[status]}.`, createdAt: new Date().toISOString(),
    })
  }
  return clone(row)
}

export async function addInterestedNote(id: string, text: string, actor: string): Promise<Interested> {
  await delay(350)
  const row = db.find((r) => r.id === id)
  if (!row) throw new Error('No encontramos al interesado.')
  const clean = text.trim()
  if (!clean) throw new Error('Escribí una observación antes de guardar.')
  const note: InterestedNote = { id: crypto.randomUUID(), kind: 'nota', author: actor, text: clean, createdAt: new Date().toISOString() }
  row.notes.push(note)
  return clone(row)
}

export async function getDashboardMetrics(days = 14): Promise<DashboardMetrics> {
  await delay(500)
  const byStatus: DashboardMetrics['byStatus'] = { NUEVO: 0, CONTACTADO: 0, EN_EVALUACION: 0, APROBADO: 0, RECHAZADO: 0 }
  db.forEach((r) => byStatus[r.status]++)

  const daily: DashboardMetrics['daily'] = []
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const count = db.filter((r) => {
      const c = new Date(r.createdAt)
      return c.getFullYear() === d.getFullYear() && c.getMonth() === d.getMonth() && c.getDate() === d.getDate()
    }).length
    daily.push({ date: new Date(d.getFullYear(), d.getMonth(), d.getDate()).toISOString(), count })
  }

  const topModels = MOTOS.map((m) => ({ motoId: m.id, name: m.name, count: db.filter((r) => r.motoId === m.id).length }))
    .sort((a, b) => b.count - a.count)

  const latest = [...db].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)).slice(0, 6)
  return { total: db.length, byStatus, daily, topModels, latest: clone(latest) }
}

/** Opciones para los filtros (marcas y modelos disponibles). */
export function getMotoOptions() {
  return MOTOS.map((m) => ({ id: m.id, brand: m.brand, model: m.model, name: m.name }))
}
