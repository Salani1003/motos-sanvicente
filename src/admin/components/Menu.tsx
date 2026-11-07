import { useEffect, useRef, useState, type ReactNode } from 'react'

export interface MenuItem {
  key: string
  label: ReactNode
  onSelect: () => void
  current?: boolean
  disabled?: boolean
}

/** Menú desplegable accesible: se cierra con Escape, clic afuera o al elegir. */
export function Menu({ trigger, items, label, align = 'right', heading }: {
  trigger: ReactNode
  items: MenuItem[]
  label: string
  align?: 'left' | 'right'
  heading?: string
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="adm-menu" ref={ref}>
      <button type="button" className="adm-menu__trigger" aria-haspopup="menu" aria-expanded={open} aria-label={label} onClick={() => setOpen((v) => !v)}>
        {trigger}
      </button>
      {open && (
        <div className={`adm-menu__panel adm-menu__panel--${align}`} role="menu" aria-label={label}>
          {heading && <p className="adm-menu__heading">{heading}</p>}
          {items.map((it) => (
            <button
              key={it.key}
              type="button"
              role="menuitem"
              className={`adm-menu__item${it.current ? ' is-current' : ''}`}
              disabled={it.disabled}
              onClick={() => {
                setOpen(false)
                it.onSelect()
              }}
            >
              {it.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
