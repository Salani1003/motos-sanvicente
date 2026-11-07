import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES, SECTION_IDS } from '../config/site'
import { scrollToSection } from '../utils/links'

export const UNDECIDED = 'todavia-no-decidi'
const STORAGE_KEY = 'sv:selected-moto'

interface LeadContextValue {
  selectedMotoId: string
  setSelectedMotoId: (id: string) => void
  /** Abre el formulario, opcionalmente con una moto precargada */
  openLeadForm: (motoId?: string) => void
}

const LeadContext = createContext<LeadContextValue | null>(null)

const read = () => {
  try {
    return sessionStorage.getItem(STORAGE_KEY) || UNDECIDED
  } catch {
    return UNDECIDED
  }
}

export function LeadProvider({ children }: { children: ReactNode }) {
  const [selectedMotoId, setId] = useState<string>(read)
  const navigate = useNavigate()

  const setSelectedMotoId = useCallback((id: string) => {
    setId(id)
    try {
      sessionStorage.setItem(STORAGE_KEY, id)
    } catch {
      /* sin storage: el estado en memoria alcanza */
    }
  }, [])

  const openLeadForm = useCallback(
    (motoId?: string) => {
      if (motoId) setSelectedMotoId(motoId)
      if (document.getElementById(SECTION_IDS.form)) scrollToSection(SECTION_IDS.form)
      else navigate(`${ROUTES.home}#${SECTION_IDS.form}`)
      window.setTimeout(() => {
        document.getElementById('lead-firstName')?.focus({ preventScroll: true })
      }, 600)
    },
    [setSelectedMotoId, navigate],
  )

  const value = useMemo(
    () => ({ selectedMotoId, setSelectedMotoId, openLeadForm }),
    [selectedMotoId, setSelectedMotoId, openLeadForm],
  )
  return <LeadContext.Provider value={value}>{children}</LeadContext.Provider>
}

export function useLead() {
  const ctx = useContext(LeadContext)
  if (!ctx) throw new Error('useLead debe usarse dentro de LeadProvider')
  return ctx
}
