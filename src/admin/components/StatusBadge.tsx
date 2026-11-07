import type { InterestedStatus } from '../types'
import { STATUS_META } from '../utils/format'

export function StatusBadge({ status }: { status: InterestedStatus }) {
  const m = STATUS_META[status]
  return (
    <span className={`adm-badge adm-badge--${m.tone}`}>
      <span aria-hidden="true" />
      {m.label}
    </span>
  )
}
