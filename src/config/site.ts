/**
 * Configuración editable del sitio.
 * Los valores se pueden sobrescribir con variables de entorno (ver .env.example)
 * sin tocar el código. Lo que no esté cargado se muestra como "próximamente"
 * y nunca se inventa.
 */
const env = import.meta.env

export const SITE = {
  name: 'San Vicente Automotores',
  url: env.VITE_SITE_URL ?? '',
  /** Número en formato internacional sin símbolos. Ej: 5491112345678 */
  whatsappNumber: (env.VITE_WHATSAPP_NUMBER ?? '').replace(/\D/g, ''),
  whatsappMessage: 'Hola! Quiero consultar por la financiación de una moto.',
  instagramUrl: env.VITE_INSTAGRAM_URL ?? 'https://www.instagram.com/',
  contact: {
    phone: env.VITE_CONTACT_PHONE ?? '',
    email: env.VITE_CONTACT_EMAIL ?? '',
    address: env.VITE_CONTACT_ADDRESS ?? '',
    hours: env.VITE_CONTACT_HOURS ?? '',
  },
  privacyPolicyUrl: env.VITE_PRIVACY_URL ?? '#privacidad',
} as const

export const SECTION_IDS = {
  home: 'inicio',
  catalog: 'motos',
  financing: 'financiacion',
  how: 'como-funciona',
  form: 'consulta',
  contact: 'contacto',
} as const

export const ROUTES = {
  home: '/',
  motos: '/motos',
} as const

/** `to` puede ser una ruta o una ruta con ancla (ej. "/#como-funciona") */
export const NAV_ITEMS = [
  { label: 'Inicio', to: ROUTES.home },
  { label: 'Motos', to: ROUTES.motos },
  { label: 'Cómo funciona', to: `${ROUTES.home}#${SECTION_IDS.how}` },
  { label: 'Contacto', to: `#${SECTION_IDS.contact}` },
] as const
