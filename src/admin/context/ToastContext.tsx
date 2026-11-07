import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { AIcon } from '../components/AIcon'

type Tone = 'success' | 'error' | 'info'
interface Toast {
  id: number
  tone: Tone
  message: string
}
const ToastContext = createContext<{ notify: (message: string, tone?: Tone) => void } | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const notify = useCallback((message: string, tone: Tone = 'success') => {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t, { id, tone, message }])
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4200)
  }, [])
  const value = useMemo(() => ({ notify }), [notify])
  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="adm-toasts" role="region" aria-label="Notificaciones" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`adm-toast adm-toast--${t.tone}`} role={t.tone === 'error' ? 'alert' : 'status'}>
            <AIcon name={t.tone === 'error' ? 'alert' : 'check'} size={18} />
            <span>{t.message}</span>
            <button type="button" aria-label="Cerrar aviso" onClick={() => setToasts((x) => x.filter((y) => y.id !== t.id))}>
              <AIcon name="close" size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast debe usarse dentro de ToastProvider')
  return ctx.notify
}
