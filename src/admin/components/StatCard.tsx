import type { InterestedStatus } from '../types'

export function StatCard({ label, value, hint, tone, loading }: { label: string; value: number; hint?: string; tone?: InterestedStatus; loading?: boolean }) {
  return (
    <div className="adm-stat">
      <p className="adm-stat__label">
        {tone && <span className={`adm-dot adm-dot--${tone}`} aria-hidden="true" />}
        {label}
      </p>
      {loading ? <span className="adm-skeleton adm-skeleton--stat" /> : <p className="adm-stat__value">{value}</p>}
      {hint && <p className="adm-stat__hint">{hint}</p>}
    </div>
  )
}
