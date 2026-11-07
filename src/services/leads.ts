import type { LeadFormValues } from '../types'

/**
 * Envío SIMULADO. No hay backend ni persistencia.
 * Reemplazar el cuerpo por un POST real cuando exista la API.
 */
export async function submitLead(_values: LeadFormValues): Promise<{ ok: true; demo: true }> {
  await new Promise((resolve) => setTimeout(resolve, 1100))
  return { ok: true, demo: true }
}
