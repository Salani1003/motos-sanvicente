import type { BrandFilter as Filter } from '../types'

export function BrandFilter({ options, value, onChange }: { options: Filter[]; value: Filter; onChange: (v: Filter) => void }) {
  return (
    <div className="brand-filter" role="group" aria-label="Filtrar por marca">
      {options.map((o) => (
        <button key={o} type="button" className="chip" aria-pressed={value === o} onClick={() => onChange(o)}>
          {o}
        </button>
      ))}
    </div>
  )
}
