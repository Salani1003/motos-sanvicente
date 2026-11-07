import { useEffect, useRef, type ReactNode } from 'react'

export function ConfirmDialog({ open, title, children, confirmLabel, tone = 'primary', busy, onConfirm, onCancel }: {
  open: boolean
  title: string
  children: ReactNode
  confirmLabel: string
  tone?: 'primary' | 'danger'
  busy?: boolean
  onConfirm: () => void
  onCancel: () => void
}) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  return (
    <dialog ref={ref} className="adm-dialog" onCancel={(e) => { e.preventDefault(); onCancel() }} onClick={(e) => e.target === ref.current && onCancel()}>
      <div className="adm-dialog__body">
        <h2>{title}</h2>
        <div>{children}</div>
        <div className="adm-dialog__actions">
          <button type="button" className="btn btn--ghost" onClick={onCancel} disabled={busy}>Cancelar</button>
          <button type="button" className={`btn ${tone === 'danger' ? 'adm-btn-danger' : 'btn--primary'}`} onClick={onConfirm} disabled={busy}>
            {busy ? 'Guardando…' : confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  )
}
