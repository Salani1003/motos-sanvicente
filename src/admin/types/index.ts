import type { PaymentMethod } from '../../types'

export type InterestedStatus = 'NUEVO' | 'CONTACTADO' | 'EN_EVALUACION' | 'APROBADO' | 'RECHAZADO'
export type LeadSource = 'Instagram' | 'Facebook' | 'Directo'

export interface Utm {
  source?: string
  medium?: string
  campaign?: string
  content?: string
}

export interface InterestedNote {
  id: string
  /** "nota" la escribe una persona; "estado" la genera el sistema al cambiar el estado */
  kind: 'nota' | 'estado'
  author: string
  text: string
  createdAt: string
}

export interface Interested {
  id: string
  firstName: string
  lastName: string
  phone: string
  dni: string
  motoId: string
  brand: string
  model: string
  paymentMethod: PaymentMethod
  status: InterestedStatus
  source: LeadSource
  utm?: Utm
  createdAt: string
  notes: InterestedNote[]
}

export type SortKey = 'fecha_desc' | 'fecha_asc' | 'nombre_asc' | 'nombre_desc'

export interface InterestedQuery {
  q?: string
  status?: InterestedStatus | ''
  brand?: string
  motoId?: string
  /** yyyy-mm-dd */
  from?: string
  to?: string
  sort?: SortKey
  page?: number
  pageSize?: number
}

export interface InterestedPage {
  items: Interested[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface DashboardMetrics {
  total: number
  byStatus: Record<InterestedStatus, number>
  daily: { date: string; count: number }[]
  topModels: { motoId: string; name: string; count: number }[]
  latest: Interested[]
}

export interface AdminUser {
  name: string
  email: string
  role: string
}
