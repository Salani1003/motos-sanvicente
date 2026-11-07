import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { getMotos } from '../services/catalog'
import type { Moto } from '../types'

const CatalogContext = createContext<Moto[]>([])

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [motos, setMotos] = useState<Moto[]>([])
  useEffect(() => {
    let alive = true
    getMotos().then((m) => alive && setMotos(m))
    return () => {
      alive = false
    }
  }, [])
  return <CatalogContext.Provider value={motos}>{children}</CatalogContext.Provider>
}

export const useCatalog = () => useContext(CatalogContext)
