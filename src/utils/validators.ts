import type { LeadFormErrors, LeadFormValues } from '../types'

const onlyDigits = (v: string) => v.replace(/\D/g, '')
const NAME_RE = /^[\p{L}][\p{L}\s'’.-]*$/u

export function validateName(value: string, label: string): string | undefined {
  const v = value.trim()
  if (!v) return `Ingresá tu ${label}.`
  if (v.length < 2) return `El ${label} es demasiado corto.`
  if (!NAME_RE.test(v)) return `El ${label} solo puede tener letras.`
}

export function validatePhone(value: string): string | undefined {
  const v = value.trim()
  if (!v) return 'Ingresá tu teléfono.'
  if (/[^\d\s()+-]/.test(v)) return 'Usá solo números. Ej: 11 2345 6789.'
  const digits = onlyDigits(v)
  if (digits.length < 8) return 'El teléfono es muy corto. Incluí el código de área.'
  if (digits.length > 13) return 'El teléfono es muy largo. Revisalo.'
}

export function validateDni(value: string): string | undefined {
  const v = value.trim()
  if (!v) return 'Ingresá tu DNI.'
  if (/[^\d.\s]/.test(v)) return 'El DNI solo lleva números.'
  const digits = onlyDigits(v)
  if (digits.length < 7 || digits.length > 8) return 'El DNI debe tener 7 u 8 números.'
  if (/^(\d)\1+$/.test(digits)) return 'Revisá el DNI, parece incorrecto.'
}

export function validateLead(values: LeadFormValues): LeadFormErrors {
  const errors: LeadFormErrors = {
    firstName: validateName(values.firstName, 'nombre'),
    lastName: validateName(values.lastName, 'apellido'),
    phone: validatePhone(values.phone),
    dni: validateDni(values.dni),
    paymentMethod: values.paymentMethod ? undefined : 'Elegí cómo querés pagar.',
    motoId: values.motoId ? undefined : 'Elegí una moto o "Todavía no decidí".',
  }
  ;(Object.keys(errors) as (keyof LeadFormValues)[]).forEach((k) => {
    if (!errors[k]) delete errors[k]
  })
  return errors
}

/** Da formato 12.345.678 mientras se escribe */
export function formatDni(value: string): string {
  const d = onlyDigits(value).slice(0, 8)
  return d.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
