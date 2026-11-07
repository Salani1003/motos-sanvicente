import { useState } from 'react'
import type { InterestedStatus } from '../types'
import { STATUS_META, STATUS_ORDER, formatShort } from '../utils/format'

/** Línea de consultas por día. SVG propio: sin dependencias. */
export function LineChart({ data }: { data: { date: string; count: number }[] }) {
  const [hover, setHover] = useState<number | null>(null)
  const W = 640, H = 220, L = 32, R = 12, T = 16, B = 28
  const max = Math.max(4, ...data.map((d) => d.count))
  const niceMax = Math.ceil(max / 2) * 2
  const x = (i: number) => L + (i * (W - L - R)) / Math.max(1, data.length - 1)
  const y = (v: number) => T + (1 - v / niceMax) * (H - T - B)
  const path = data.map((d, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(d.count).toFixed(1)}`).join(' ')
  const area = `${path} L${x(data.length - 1)} ${H - B} L${x(0)} ${H - B} Z`
  const ticks = [0, niceMax / 2, niceMax]
  const step = data.length > 16 ? 5 : data.length > 8 ? 2 : 1
  const total = data.reduce((s, d) => s + d.count, 0)
  const h = hover !== null ? data[hover] : null

  return (
    <figure className="adm-chart">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Consultas por día. Total del período: ${total}.`} onMouseLeave={() => setHover(null)}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={L} x2={W - R} y1={y(t)} y2={y(t)} className="adm-chart__grid" />
            <text x={L - 8} y={y(t) + 4} textAnchor="end" className="adm-chart__tick">{t}</text>
          </g>
        ))}
        <path d={area} className="adm-chart__area" />
        <path d={path} className="adm-chart__line" />
        {data.map((d, i) => (
          <g key={d.date}>
            {i % step === 0 && <text x={x(i)} y={H - 8} textAnchor="middle" className="adm-chart__tick">{formatShort(d.date)}</text>}
            <rect x={x(i) - 14} y={T} width={28} height={H - T - B} fill="transparent" onMouseEnter={() => setHover(i)} onFocus={() => setHover(i)} />
            <circle cx={x(i)} cy={y(d.count)} r={hover === i ? 5 : 2.8} className="adm-chart__dot" />
          </g>
        ))}
        {h && hover !== null && (
          <g transform={`translate(${Math.min(Math.max(x(hover), 70), W - 70)} ${Math.max(y(h.count) - 14, 18)})`} pointerEvents="none">
            <rect x="-62" y="-30" width="124" height="34" rx="5" className="adm-chart__tip" />
            <text textAnchor="middle" y="-9" className="adm-chart__tiptext">{formatShort(h.date)}: {h.count} {h.count === 1 ? 'consulta' : 'consultas'}</text>
          </g>
        )}
      </svg>
      <figcaption className="sr-only">Detalle: {data.map((d) => `${formatShort(d.date)} ${d.count}`).join(', ')}</figcaption>
    </figure>
  )
}

/** Barra apilada + leyenda con cantidades y porcentajes. */
export function StatusBreakdown({ byStatus, total }: { byStatus: Record<InterestedStatus, number>; total: number }) {
  return (
    <div>
      <div className="adm-stack" role="img" aria-label="Distribución de interesados por estado">
        {STATUS_ORDER.map((s) => byStatus[s] > 0 && <span key={s} className={`adm-stack__seg adm-bg--${STATUS_META[s].tone}`} style={{ flex: byStatus[s] }} title={`${STATUS_META[s].label}: ${byStatus[s]}`} />)}
      </div>
      <ul className="adm-legend">
        {STATUS_ORDER.map((s) => (
          <li key={s}>
            <span className={`adm-dot adm-dot--${s}`} aria-hidden="true" />
            <span className="adm-legend__name">{STATUS_META[s].label}</span>
            <strong>{byStatus[s]}</strong>
            <span className="adm-legend__pct">{total ? Math.round((byStatus[s] / total) * 100) : 0}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function BarList({ rows }: { rows: { key: string; label: string; value: number }[] }) {
  const max = Math.max(1, ...rows.map((r) => r.value))
  return (
    <ol className="adm-bars">
      {rows.map((r) => (
        <li key={r.key}>
          <span className="adm-bars__label">{r.label}</span>
          <span className="adm-bars__track"><span style={{ width: `${(r.value / max) * 100}%` }} /></span>
          <strong>{r.value}</strong>
        </li>
      ))}
    </ol>
  )
}
