import { useEffect, useMemo, useState } from 'react'
import { getMotoOptions } from '../services/interestedService'
import type { InterestedQuery } from '../types'
import { STATUS_META, STATUS_ORDER } from '../utils/format'
import { AIcon } from './AIcon'

export function InterestedFilters({ query, onChange, onClear, activeCount }: {
  query: InterestedQuery
  onChange: (patch: Partial<InterestedQuery>) => void
  onClear: () => void
  activeCount: number
}) {
  const options = useMemo(getMotoOptions, [])
  const brands = useMemo(() => Array.from(new Set(options.map((o) => o.brand))), [options])
  const models = options.filter((o) => !query.brand || o.brand === query.brand)

  // La búsqueda se aplica con una pequeña demora para no recargar en cada tecla.
  const [text, setText] = useState(query.q ?? '')
  useEffect(() => setText(query.q ?? ''), [query.q])
  useEffect(() => {
    if (text === (query.q ?? '')) return
    const t = window.setTimeout(() => onChange({ q: text }), 300)
    return () => window.clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text])

  const [open, setOpen] = useState(false)

  return (
    <div className="adm-filters">
      <div className="adm-filters__top">
        <label className="adm-search">
          <span className="sr-only">Buscar por nombre, teléfono o DNI</span>
          <AIcon name="search" size={18} />
          <input type="search" placeholder="Buscar por nombre, teléfono o DNI" value={text} onChange={(e) => setText(e.target.value)} />
        </label>
        <button type="button" className="adm-filters__toggle btn btn--ghost" aria-expanded={open} aria-controls="adm-filter-grid" onClick={() => setOpen((v) => !v)}>
          <AIcon name="filter" size={18} /> Filtros{activeCount > 0 && <span className="adm-count">{activeCount}</span>}
        </button>
      </div>

      <div id="adm-filter-grid" className={`adm-filters__grid${open ? ' is-open' : ''}`}>
        <label>Estado
          <select value={query.status ?? ''} onChange={(e) => onChange({ status: e.target.value as InterestedQuery['status'] })}>
            <option value="">Todos</option>
            {STATUS_ORDER.map((s) => <option key={s} value={s}>{STATUS_META[s].label}</option>)}
          </select>
        </label>
        <label>Marca
          <select value={query.brand ?? ''} onChange={(e) => onChange({ brand: e.target.value, motoId: '' })}>
            <option value="">Todas</option>
            {brands.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </label>
        <label>Modelo
          <select value={query.motoId ?? ''} onChange={(e) => onChange({ motoId: e.target.value })}>
            <option value="">Todos</option>
            {models.map((m) => <option key={m.id} value={m.id}>{m.model}</option>)}
          </select>
        </label>
        <label>Desde
          <input type="date" value={query.from ?? ''} max={query.to || undefined} onChange={(e) => onChange({ from: e.target.value })} />
        </label>
        <label>Hasta
          <input type="date" value={query.to ?? ''} min={query.from || undefined} onChange={(e) => onChange({ to: e.target.value })} />
        </label>
        <button type="button" className="adm-clear" onClick={onClear} disabled={activeCount === 0 && !text}>
          <AIcon name="close" size={16} /> Limpiar filtros
        </button>
      </div>
    </div>
  )
}
