import type { PaymentMethod } from '../types'

export const PAYMENT_OPTIONS: { value: PaymentMethod; label: string; hint: string }[] = [
  { value: 'financiacion', label: 'Financiación', hint: 'Pago en cuotas' },
  { value: 'contado', label: 'Contado', hint: 'Pago total' },
  { value: 'mixto', label: 'Mixto', hint: 'Entrega + cuotas' },
]

export const paymentLabel = (v: string) => PAYMENT_OPTIONS.find((o) => o.value === v)?.label ?? ''
