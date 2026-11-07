import { Link } from 'react-router-dom'
import { ADMIN_ROUTES } from '../config'
import { useMediaQuery } from '../hooks/useAsync'
import type { Interested, InterestedStatus, SortKey } from '../types'
import { formatDate, formatTime, fullName, maskDni } from '../utils/format'
import { leadWhatsAppUrl } from '../utils/links'
import { AIcon } from './AIcon'
import { StatusBadge } from './StatusBadge'
import { StatusMenu } from './StatusMenu'

interface Props {
  rows: Interested[]
  sort?: SortKey
  onSort?: (s: SortKey) => void
  onChangeStatus: (row: Interested, s: InterestedStatus) => void
  busyId: string | null
  /** versión compacta (dashboard): sin DNI ni acciones de estado */
  compact?: boolean
}

function Actions({ row, onChangeStatus, busyId, compact }: { row: Interested } & Pick<Props, 'onChangeStatus' | 'busyId' | 'compact'>) {
  return (
    <div className="adm-actions">
      <Link className="adm-iconbtn" to={ADMIN_ROUTES.detail(row.id)} aria-label={`Ver detalle de ${fullName(row)}`} title="Ver detalle"><AIcon name="eye" size={18} /></Link>
      {!compact && (
        <>
          <a className="adm-iconbtn" href={leadWhatsAppUrl(row.phone, row.firstName)} target="_blank" rel="noopener noreferrer" aria-label={`Abrir WhatsApp con ${fullName(row)}`} title="WhatsApp"><AIcon name="whatsapp" size={18} /></a>
          <StatusMenu row={row} onChange={onChangeStatus} disabled={busyId === row.id} />
        </>
      )}
    </div>
  )
}

function SortHeader({ label, asc, desc, sort, onSort }: { label: string; asc: SortKey; desc: SortKey; sort?: SortKey; onSort?: (s: SortKey) => void }) {
  const active = sort === asc ? 'ascending' : sort === desc ? 'descending' : 'none'
  return (
    <th aria-sort={active}>
      <button type="button" className="adm-sortbtn" onClick={() => onSort?.(sort === desc ? asc : desc)}>
        {label}
        <AIcon name={active === 'ascending' ? 'sortUp' : 'sortDown'} size={14} style={{ opacity: active === 'none' ? 0.3 : 1 }} />
      </button>
    </th>
  )
}

export function InterestedTable(props: Props) {
  const { rows, sort, onSort, compact } = props
  const isMobile = useMediaQuery('(max-width: 899px)')

  if (isMobile) {
    return (
      <ul className="adm-cards">
        {rows.map((r) => (
          <li key={r.id} className="adm-card-row">
            <div className="adm-card-row__top">
              <div>
                <Link to={ADMIN_ROUTES.detail(r.id)} className="adm-namelink adm-card-row__name">{fullName(r)}</Link>
                <p className="adm-muted">{r.phone}{!compact && ` · DNI ${maskDni(r.dni)}`}</p>
              </div>
              <StatusBadge status={r.status} />
            </div>
            <p className="adm-card-row__moto">{r.brand} {r.model}</p>
            <div className="adm-card-row__bottom">
              <span className="adm-muted">{formatDate(r.createdAt)} · {formatTime(r.createdAt)}</span>
              <Actions row={r} {...props} />
            </div>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="adm-tablewrap">
      <table className="adm-table">
        <thead>
          <tr>
            {onSort ? <SortHeader label="Nombre y apellido" asc="nombre_asc" desc="nombre_desc" sort={sort} onSort={onSort} /> : <th>Nombre</th>}
            <th>Teléfono</th>
            {!compact && <th>DNI</th>}
            <th>Moto de interés</th>
            {onSort ? <SortHeader label="Fecha" asc="fecha_asc" desc="fecha_desc" sort={sort} onSort={onSort} /> : <th>Fecha</th>}
            <th>Estado</th>
            <th className="adm-th-actions"><span className="sr-only">Acciones</span></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td><Link to={ADMIN_ROUTES.detail(r.id)} className="adm-namelink">{fullName(r)}</Link></td>
              <td className="adm-nowrap">{r.phone}</td>
              {!compact && <td className="adm-mono">{maskDni(r.dni)}</td>}
              <td>{r.brand} {r.model}</td>
              <td className="adm-nowrap">{formatDate(r.createdAt)} <span className="adm-muted">{formatTime(r.createdAt)}</span></td>
              <td><StatusBadge status={r.status} /></td>
              <td><Actions row={r} {...props} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
