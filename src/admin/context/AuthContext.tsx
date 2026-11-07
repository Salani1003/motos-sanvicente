import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { DEMO_CREDENTIALS, DEMO_USER, SESSION_KEY } from '../config'
import type { AdminUser } from '../types'

/**
 * AUTENTICACIÓN SIMULADA (solo demostración).
 * No hay token ni verificación real: la "sesión" es una marca en sessionStorage.
 * La protección real debe implementarse en el backend.
 */
interface AuthValue {
  user: AdminUser | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}
const AuthContext = createContext<AuthValue | null>(null)

const readSession = (): AdminUser | null => {
  try {
    return sessionStorage.getItem(SESSION_KEY) ? { ...DEMO_USER } : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(readSession)

  const login = useCallback(async (email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 700))
    if (email.trim().toLowerCase() !== DEMO_CREDENTIALS.email || password !== DEMO_CREDENTIALS.password) {
      throw new Error('El email o la contraseña no son correctos.')
    }
    try {
      sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      /* sin storage: la sesión dura lo que dure la pestaña en memoria */
    }
    setUser({ ...DEMO_USER })
  }, [])

  const logout = useCallback(() => {
    try {
      sessionStorage.removeItem(SESSION_KEY)
    } catch {
      /* noop */
    }
    setUser(null)
  }, [])

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return ctx
}
