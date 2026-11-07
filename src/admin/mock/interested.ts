import { MOTOS } from '../../data/motos'
import type { PaymentMethod } from '../../types'
import type { Interested, InterestedNote, InterestedStatus, LeadSource } from '../types'

/**
 * DATOS 100 % FICTICIOS. Nombres, DNI y teléfonos no corresponden a personas reales.
 * Fuente única del mock: al conectar el backend se reemplaza `services/interestedService.ts`
 * y este archivo deja de usarse.
 */
type Seed = [
  first: string, last: string, dni: string, phone: string, motoId: string, pay: PaymentMethod,
  daysAgo: number, hour: number, status: InterestedStatus, source: LeadSource, campaign?: string,
]

const SEEDS: Seed[] = [
  ['Lucía', 'Fernández', '99100101', '11 5550-0101', 'honda-wave-110s', 'financiacion', 0, 9, 'NUEVO', 'Instagram', 'financia_tu_moto_nov'],
  ['Matías', 'Rodríguez', '99100102', '11 5550-0102', 'honda-glh-150', 'mixto', 0, 11, 'NUEVO', 'Facebook', 'financia_tu_moto_nov'],
  ['Camila', 'Gómez', '99100103', '11 5550-0103', 'siam-qu-110', 'financiacion', 1, 18, 'NUEVO', 'Instagram', 'reels_motos_urbanas'],
  ['Santiago', 'Pereyra', '99100104', '11 5550-0104', 'motomel-blitz-110', 'contado', 1, 15, 'CONTACTADO', 'Directo'],
  ['Valentina', 'Acosta', '99100105', '11 5550-0105', 'honda-wave-110s', 'financiacion', 2, 10, 'CONTACTADO', 'Instagram', 'financia_tu_moto_nov'],
  ['Nicolás', 'Benítez', '99100106', '11 5550-0106', 'keller-crono-eco-110', 'financiacion', 2, 20, 'EN_EVALUACION', 'Facebook', 'cuotas_sin_vueltas'],
  ['Florencia', 'Molina', '99100107', '11 5550-0107', 'honda-glh-150', 'financiacion', 3, 12, 'EN_EVALUACION', 'Instagram', 'reels_motos_urbanas'],
  ['Joaquín', 'Silva', '99100108', '11 5550-0108', 'siam-qu-110', 'mixto', 3, 17, 'NUEVO', 'Facebook', 'cuotas_sin_vueltas'],
  ['Martina', 'Romero', '99100109', '11 5550-0109', 'honda-wave-110s', 'financiacion', 4, 9, 'APROBADO', 'Instagram', 'financia_tu_moto_nov'],
  ['Facundo', 'Sosa', '99100110', '11 5550-0110', 'motomel-blitz-110', 'financiacion', 4, 14, 'CONTACTADO', 'Facebook', 'cuotas_sin_vueltas'],
  ['Agustina', 'Álvarez', '99100111', '11 5550-0111', 'keller-crono-eco-110', 'contado', 5, 16, 'APROBADO', 'Directo'],
  ['Tomás', 'Torres', '99100112', '11 5550-0112', 'honda-glh-150', 'financiacion', 5, 19, 'RECHAZADO', 'Instagram', 'reels_motos_urbanas'],
  ['Julieta', 'Ruiz', '99100113', '11 5550-0113', 'siam-qu-110', 'financiacion', 6, 11, 'EN_EVALUACION', 'Instagram', 'financia_tu_moto_nov'],
  ['Lautaro', 'Díaz', '99100114', '11 5550-0114', 'honda-wave-110s', 'mixto', 7, 13, 'CONTACTADO', 'Facebook', 'cuotas_sin_vueltas'],
  ['Sofía', 'Castro', '99100115', '11 5550-0115', 'motomel-blitz-110', 'financiacion', 8, 10, 'APROBADO', 'Instagram', 'reels_motos_urbanas'],
  ['Bruno', 'Herrera', '99100116', '11 5550-0116', 'honda-wave-110s', 'financiacion', 9, 21, 'RECHAZADO', 'Facebook', 'cuotas_sin_vueltas'],
  ['Micaela', 'Medina', '99100117', '11 5550-0117', 'keller-crono-eco-110', 'financiacion', 10, 12, 'CONTACTADO', 'Instagram', 'financia_tu_moto_nov'],
  ['Ezequiel', 'Aguirre', '99100118', '11 5550-0118', 'honda-glh-150', 'contado', 11, 15, 'APROBADO', 'Directo'],
  ['Rocío', 'Giménez', '99100119', '11 5550-0119', 'siam-qu-110', 'financiacion', 12, 9, 'NUEVO', 'Instagram', 'reels_motos_urbanas'],
  ['Gonzalo', 'Peralta', '99100120', '11 5550-0120', 'honda-wave-110s', 'financiacion', 14, 18, 'EN_EVALUACION', 'Facebook', 'financia_tu_moto_nov'],
  ['Antonella', 'Ríos', '99100121', '11 5550-0121', 'motomel-blitz-110', 'mixto', 16, 11, 'CONTACTADO', 'Instagram', 'cuotas_sin_vueltas'],
  ['Franco', 'Vega', '99100122', '11 5550-0122', 'honda-glh-150', 'financiacion', 18, 14, 'RECHAZADO', 'Facebook', 'cuotas_sin_vueltas'],
  ['Brenda', 'Cabrera', '99100123', '11 5550-0123', 'keller-crono-eco-110', 'financiacion', 20, 17, 'APROBADO', 'Instagram', 'financia_tu_moto_nov'],
  ['Maximiliano', 'Ortiz', '99100124', '11 5550-0124', 'honda-wave-110s', 'contado', 22, 10, 'CONTACTADO', 'Directo'],
  ['Daniela', 'Núñez', '99100125', '11 5550-0125', 'siam-qu-110', 'financiacion', 24, 16, 'EN_EVALUACION', 'Instagram', 'reels_motos_urbanas'],
  ['Ramiro', 'Luna', '99100126', '11 5550-0126', 'motomel-blitz-110', 'financiacion', 26, 12, 'NUEVO', 'Facebook', 'cuotas_sin_vueltas'],
  ['Carolina', 'Paz', '99100127', '11 5550-0127', 'honda-glh-150', 'mixto', 28, 19, 'CONTACTADO', 'Instagram', 'financia_tu_moto_nov'],
  ['Ignacio', 'Maldonado', '99100128', '11 5550-0128', 'honda-wave-110s', 'financiacion', 29, 9, 'RECHAZADO', 'Directo'],
]

const TEAM = ['Laura Benítez', 'Martín Sosa']
const STATUS_LABEL: Record<InterestedStatus, string> = {
  NUEVO: 'Nuevo', CONTACTADO: 'Contactado', EN_EVALUACION: 'En evaluación', APROBADO: 'Aprobado', RECHAZADO: 'Rechazado',
}
const NOTE_TEXT: Partial<Record<InterestedStatus, string[]>> = {
  CONTACTADO: ['Se llamó y quedó en enviar la documentación.', 'Atendió por WhatsApp. Pidió detalle de cuotas.'],
  EN_EVALUACION: ['Documentación recibida. Pasa a evaluación crediticia.'],
  APROBADO: ['Crédito aprobado. Se coordina la entrega.'],
  RECHAZADO: ['No alcanzó la evaluación. Se le ofreció compra de contado.'],
}

/** Fecha relativa a "hoy" para que el dashboard siempre muestre actividad reciente. */
function dateAt(daysAgo: number, hour: number, minute = 0) {
  const d = new Date()
  d.setDate(d.getDate() - daysAgo)
  d.setHours(hour, minute, 0, 0)
  return d
}

export function buildMockInterested(): Interested[] {
  return SEEDS.map(([firstName, lastName, dni, phone, motoId, paymentMethod, daysAgo, hour, status, source, campaign], i) => {
    const moto = MOTOS.find((m) => m.id === motoId)!
    const created = dateAt(daysAgo, hour, (i * 7) % 60)
    const notes: InterestedNote[] = []
    if (status !== 'NUEVO') {
      const steps: InterestedStatus[] = ['CONTACTADO', 'EN_EVALUACION', 'APROBADO', 'RECHAZADO']
      const reached = status === 'RECHAZADO' ? ['CONTACTADO', 'EN_EVALUACION', 'RECHAZADO'] : steps.slice(0, steps.indexOf(status) + 1)
      reached.forEach((s, k) => {
        const at = new Date(created.getTime() + (k + 1) * 5 * 3600_000 + 15 * 60_000)
        if (at.getTime() > Date.now()) return
        const author = TEAM[(i + k) % TEAM.length]!
        notes.push({ id: `n-${i}-${k}-e`, kind: 'estado', author, text: `Cambió el estado a ${STATUS_LABEL[s as InterestedStatus]}.`, createdAt: at.toISOString() })
        const texts = NOTE_TEXT[s as InterestedStatus]
        if (texts && (k + i) % 2 === 0)
          notes.push({ id: `n-${i}-${k}-n`, kind: 'nota', author, text: texts[i % texts.length]!, createdAt: new Date(at.getTime() + 4 * 60_000).toISOString() })
      })
    }
    return {
      id: String(1001 + i),
      firstName, lastName, phone, dni,
      motoId, brand: moto.brand, model: moto.model,
      paymentMethod, status, source,
      utm: source === 'Directo' ? undefined : {
        source: source.toLowerCase(),
        medium: source === 'Instagram' ? 'paid_social' : 'cpc',
        campaign,
      },
      createdAt: created.toISOString(),
      notes,
    }
  })
}
