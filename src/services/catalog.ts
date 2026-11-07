import { MOTOS } from '../data/motos'
import type { Brand, Moto } from '../types'

/**
 * Capa de acceso al catálogo. Hoy lee datos mock; mañana puede hacer
 * `fetch('/api/motos')` sin cambiar ningún componente.
 */
export async function getMotos(): Promise<Moto[]> {
  return MOTOS
}

export const getBrands = (motos: Moto[]): Brand[] =>
  Array.from(new Set(motos.map((m) => m.brand)))
