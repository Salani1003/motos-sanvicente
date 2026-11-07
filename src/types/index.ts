export type Brand = 'Honda' | 'Siam' | 'Keller' | 'Motomel'
export type BrandFilter = 'Todas' | Brand
export type Availability = 'Disponible para consultar' | 'Consultar disponibilidad'

export interface Moto {
  id: string
  brand: Brand
  model: string
  /** Nombre completo para mostrar y para el selector del formulario */
  name: string
  displacement: string
  /** Solo con información verificada en fuentes oficiales */
  description?: string
  availability: Availability
  image: { src: string; alt: string }
  /** Ficha oficial del fabricante o distribuidor */
  moreInfoUrl?: string
}

export type PaymentMethod = 'financiacion' | 'contado' | 'mixto'

export interface LeadFormValues {
  firstName: string
  lastName: string
  phone: string
  dni: string
  /** '' hasta que la persona elige */
  paymentMethod: PaymentMethod | ''
  /** id de la moto o 'todavia-no-decidi' */
  motoId: string
}

export type LeadFormErrors = Partial<Record<keyof LeadFormValues, string>>
