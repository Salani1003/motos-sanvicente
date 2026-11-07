/**
 * Configuración del panel (demo).
 * La autenticación es SIMULADA: no protege nada realmente.
 */
export const DEMO_CREDENTIALS = {
  email: 'admin@sanvicente.demo',
  password: 'demo1234',
} as const

export const DEMO_USER = {
  name: 'Laura Benítez',
  email: DEMO_CREDENTIALS.email,
  role: 'Administración',
} as const

/** Prefijo de país para armar los enlaces de WhatsApp de los interesados (Argentina móvil: 54 9). */
export const WHATSAPP_COUNTRY_PREFIX = import.meta.env.VITE_ADMIN_WHATSAPP_PREFIX ?? '549'

export const ADMIN_ROUTES = {
  login: '/admin/login',
  dashboard: '/admin/dashboard',
  list: '/admin/interesados',
  detail: (id: string) => `/admin/interesados/${id}`,
} as const

export const SESSION_KEY = 'sv:admin-demo-session'
