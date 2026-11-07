import { SITE } from '../config/site'

export function whatsappUrl(message: string = SITE.whatsappMessage): string {
  const base = SITE.whatsappNumber ? `https://wa.me/${SITE.whatsappNumber}` : 'https://wa.me/'
  return `${base}?text=${encodeURIComponent(message)}`
}

export function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
}
