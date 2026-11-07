import type { InterestedStatus } from '../types'
import { Sk } from './Skeletons'

export function StatCard({ label, value, hint, tone, loading }: { label: string; value: number; hint?: string; tone?: InterestedStatus; loading?: boolean }) {
  return (
    <div className="adm-stat">
      <p className="adm-stat__label">
        {tone && <span className={`adm-dot adm-dot--${tone}`} aria-hidden="true" />}
        {label}
      </p>
      {loading ? <Sk w={52} h={30} style={{ marginTop: 10, display: 'block' }} /> : <p className="adm-stat__value">{value}</p>}
      {hint && <p className="adm-stat__hint">{hint}</p>}
    </div>
  )
}
