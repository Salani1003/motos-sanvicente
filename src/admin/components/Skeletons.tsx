import type { CSSProperties } from 'react'
import { useMediaQuery } from '../hooks/useAsync'

/** Bloque base. Todos los skeletons del panel se arman con esto. */
export function Sk({ w, h = 14, r, style, className = '' }: { w?: number | string; h?: number | string; r?: number; style?: CSSProperties; className?: string }) {
  return <span className={`adm-sk ${className}`} style={{ width: w, height: h, borderRadius: r, ...style }} aria-hidden="true" />
}

/** Envoltorio accesible: anuncia "Cargando" a lectores de pantalla y marca la región como ocupada. */
export function Busy({ label = 'Cargando…', children, className }: { label?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className} role="status" aria-busy="true" aria-live="polite">
      <span className="sr-only">{label}</span>
      {children}
    </div>
  )
}

export function StatSkeleton() {
  return (
    <div className="adm-stat" aria-hidden="true">
      <Sk w="60%" h={12} />
      <Sk w={52} h={30} style={{ marginTop: 14, display: 'block' }} />
    </div>
  )
}

export function ChartSkeleton({ height = 220 }: { height?: number }) {
  const heights = [38, 52, 44, 66, 48, 72, 58, 80, 62, 70, 54, 76, 60, 84]
  return (
    <Busy label="Cargando gráfico…">
      <div className="adm-sk-chart" style={{ height }} aria-hidden="true">
        {heights.map((h, i) => <Sk key={i} h={`${h}%`} r={4} />)}
      </div>
    </Busy>
  )
}

export function BarsSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <Busy label="Cargando datos…">
      <div style={{ display: 'grid', gap: 18 }} aria-hidden="true">
        {Array.from({ length: rows }, (_, i) => (
          <div key={i} style={{ display: 'grid', gap: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><Sk w={`${40 + ((i * 13) % 30)}%`} h={12} /><Sk w={16} h={12} /></div>
            <Sk h={8} r={999} />
          </div>
        ))}
      </div>
    </Busy>
  )
}

export function LegendSkeleton() {
  return (
    <Busy label="Cargando distribución…">
      <div aria-hidden="true">
        <Sk h={14} r={999} style={{ display: 'block' }} />
        <div style={{ display: 'grid', gap: 14, marginTop: 22 }}>
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Sk w={8} h={8} r={999} /><Sk w={`${34 + i * 6}%`} h={12} /><Sk w={20} h={12} style={{ marginLeft: 'auto' }} /></div>
          ))}
        </div>
      </div>
    </Busy>
  )
}

/** Tabla en escritorio, tarjetas en celular: igual que la lista real. */
export function TableSkeleton({ rows = 8, compact = false }: { rows?: number; compact?: boolean }) {
  const isMobile = useMediaQuery('(max-width: 899px)')
  if (isMobile) {
    return (
      <Busy label="Cargando interesados…">
        <ul className="adm-cards" aria-hidden="true">
          {Array.from({ length: Math.min(rows, 5) }, (_, i) => (
            <li key={i} className="adm-card-row">
              <div className="adm-card-row__top"><div style={{ display: 'grid', gap: 8 }}><Sk w={150} h={16} /><Sk w={110} h={12} /></div><Sk w={78} h={24} r={999} /></div>
              <Sk w="55%" h={14} />
              <div className="adm-card-row__bottom"><Sk w={120} h={12} /><Sk w={96} h={32} r={6} /></div>
            </li>
          ))}
        </ul>
      </Busy>
    )
  }
  const cols = compact ? [150, 100, 130, 110, 90] : [150, 100, 80, 130, 110, 90]
  return (
    <Busy label="Cargando interesados…">
      <div className="adm-tablewrap" aria-hidden="true">
        <table className="adm-table">
          <thead><tr>{cols.map((_, i) => <th key={i}><Sk w={60} h={10} /></th>)}<th /></tr></thead>
          <tbody>
            {Array.from({ length: rows }, (_, r) => (
              <tr key={r}>
                {cols.map((w, c) => <td key={c}>{c === cols.length - 1 ? <Sk w={w} h={24} r={999} /> : <Sk w={w - ((r * 7 + c * 5) % 30)} h={13} />}</td>)}
                <td><div className="adm-actions"><Sk w={28} h={28} r={6} /><Sk w={28} h={28} r={6} /></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Busy>
  )
}

function PanelSk({ title, rows }: { title: number; rows: number }) {
  return (
    <section className="adm-panel" aria-hidden="true">
      <Sk w={title} h={16} style={{ display: 'block', marginBottom: 22 }} />
      <div style={{ display: 'grid' }}>
        {Array.from({ length: rows }, (_, i) => (
          <div key={i} className="adm-dl__row"><Sk w={90} h={11} /><Sk w={`${45 + ((i * 11) % 30)}%`} h={14} /></div>
        ))}
      </div>
    </section>
  )
}

export function DetailSkeleton() {
  return (
    <Busy label="Cargando interesado…" className="adm-page">
      <div className="adm-page" aria-hidden="true">
        <Sk w={130} h={14} />
        <div className="adm-pagehead adm-pagehead--detail">
          <div style={{ display: 'grid', gap: 10 }}><Sk w={240} h={30} /><Sk w={200} h={13} /></div>
          <Sk w={92} h={26} r={999} />
        </div>
        <div className="adm-quick"><Sk w={110} h={48} r={6} /><Sk w={170} h={48} r={6} /><Sk w={160} h={48} r={6} /></div>
        <div className="adm-detail">
          <div className="adm-detail__col"><PanelSk title={170} rows={5} /><PanelSk title={210} rows={7} /></div>
          <section className="adm-panel">
            <Sk w={150} h={16} style={{ display: 'block', marginBottom: 20 }} />
            <Sk h={96} r={6} style={{ display: 'block' }} />
            <Sk w={150} h={40} r={6} style={{ display: 'block', margin: '14px 0 0 auto' }} />
            <div style={{ display: 'grid', gap: 22, marginTop: 28 }}>
              {Array.from({ length: 3 }, (_, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '28px 1fr', gap: 12 }}><Sk w={28} h={28} r={999} /><div style={{ display: 'grid', gap: 8 }}><Sk w="85%" h={14} /><Sk w="50%" h={11} /></div></div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Busy>
  )
}
