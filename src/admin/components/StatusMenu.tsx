import type { Interested, InterestedStatus } from '../types'
import { STATUS_META, STATUS_ORDER } from '../utils/format'
import { AIcon } from './AIcon'
import { Menu } from './Menu'

/** Menú "Cambiar estado". Se usa en la tabla y en el detalle. */
export function StatusMenu({ row, onChange, disabled, variant = 'icon' }: {
  row: Interested
  onChange: (row: Interested, s: InterestedStatus) => void
  disabled?: boolean
  variant?: 'icon' | 'button'
}) {
  return (
    <Menu
      label={`Cambiar estado de ${row.firstName} ${row.lastName}`}
      heading="Cambiar estado a"
      trigger={variant === 'icon' ? <AIcon name="more" size={18} /> : <>Cambiar estado <AIcon name="chevronDown" size={16} /></>}
      items={STATUS_ORDER.map((s) => ({
        key: s,
        current: row.status === s,
        disabled: disabled || row.status === s,
        onSelect: () => onChange(row, s),
        label: (<><span className={`adm-dot adm-dot--${s}`} aria-hidden="true" />{STATUS_META[s].label}{row.status === s && <AIcon name="check" size={16} />}</>),
      }))}
    />
  )
}
