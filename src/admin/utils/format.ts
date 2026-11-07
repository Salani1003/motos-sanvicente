import type { InterestedStatus } from '../types'

export const STATUS_META: Record<InterestedStatus, { label: string; tone: string }> = {
  NUEVO: { label: 'Nuevo', tone: 'new' },
  CONTACTADO: { label: 'Contactado', tone: 'contacted' },
  EN_EVALUACION: { label: 'En evaluación', tone: 'review' },
  APROBADO: { label: 'Aprobado', tone: 'approved' },
  RECHAZADO: { label: 'Rechazado', tone: 'rejected' },
}
export const STATUS_ORDER: InterestedStatus[] = ['NUEVO', 'CONTACTADO', 'EN_EVALUACION', 'APROBADO', 'RECHAZADO']

const onlyDigits = (v: string) => v.replace(/\D/g, '')

export const fullName = (p: { firstName: string; lastName: string }) => `${p.firstName} ${p.lastName}`
export const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('')

export function formatDni(dni: string) {
  return onlyDigits(dni).replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
/** Enmascara el DNI dejando visibles los últimos 3 dígitos: ••.•••.456 */
export function maskDni(dni: string) {
  const d = onlyDigits(dni)
  const hidden = '•'.repeat(Math.max(d.length - 3, 0)) + d.slice(-3)
  return hidden.replace(/\B(?=(.{3})+(?!.))/g, '.')
}

const dateFmt = new Intl.DateTimeFormat('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })
const timeFmt = new Intl.DateTimeFormat('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false })
const shortFmt = new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'short' })
export const formatDate = (iso: string) => dateFmt.format(new Date(iso))
export const formatTime = (iso: string) => timeFmt.format(new Date(iso))
export const formatDateTime = (iso: string) => `${formatDate(iso)} · ${formatTime(iso)}`
export const formatShort = (iso: string) => shortFmt.format(new Date(iso)).replace('.', '')

export const PAYMENT_LABEL: Record<string, string> = { financiacion: 'Financiación', contado: 'Contado', mixto: 'Mixto' }
