import { WHATSAPP_COUNTRY_PREFIX } from '../config'

const digits = (v: string) => v.replace(/\D/g, '')

export function leadWhatsAppUrl(phone: string, name: string) {
  let n = digits(phone).replace(/^0+/, '')
  if (!n.startsWith(WHATSAPP_COUNTRY_PREFIX)) n = WHATSAPP_COUNTRY_PREFIX + n.replace(/^15/, '')
  const text = encodeURIComponent(`Hola ${name}! Te escribimos de San Vicente Automotores por tu consulta.`)
  return `https://wa.me/${n}?text=${text}`
}
export const telUrl = (phone: string) => `tel:+${WHATSAPP_COUNTRY_PREFIX.replace(/9$/, '')}${digits(phone)}`
