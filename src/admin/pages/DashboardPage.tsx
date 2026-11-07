import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BarList, LineChart, StatusBreakdown } from '../components/Charts'
import { InterestedTable } from '../components/InterestedTable'
import { StatCard } from '../components/StatCard'
import { BarsSkeleton, ChartSkeleton, LegendSkeleton, TableSkeleton } from '../components/Skeletons'
import { ADMIN_ROUTES } from '../config'
import { useAsync } from '../hooks/useAsync'
import { useStatusChange } from '../hooks/useStatusChange'
import { getDashboardMetrics } from '../services/interestedService'

const RANGES = [7, 14, 30]

export default function DashboardPage() {
  const [days, setDays] = useState(14)
  const { data, loading, error, reload } = useAsync(() => getDashboardMetrics(days), [days])
  const { dialog, busyId } = useStatusChange(() => reload({ silent: true }))
  const m = data

  return (
    <div className="adm-page">
      <header className="adm-pagehead">
        <div>
          <h1>Dashboard</h1>
          <p>Resumen de la actividad de San Vicente Automotores.</p>
        </div>
      </header>

      {error && (
        <div className="adm-alert" role="alert">
          {error} <button type="button" className="adm-linkbtn" onClick={() => reload()}>Reintentar</button>
        </div>
      )}

      <section aria-label="Indicadores" className="adm-stats">
        <StatCard label="Total de interesados" value={m?.total ?? 0} loading={loading && !m} />
        <StatCard label="Nuevos" value={m?.byStatus.NUEVO ?? 0} tone="NUEVO" hint="Sin contactar" loading={loading && !m} />
        <StatCard label="Contactados" value={m?.byStatus.CONTACTADO ?? 0} tone="CONTACTADO" loading={loading && !m} />
        <StatCard label="En evaluación" value={m?.byStatus.EN_EVALUACION ?? 0} tone="EN_EVALUACION" hint="Solicitudes" loading={loading && !m} />
        <StatCard label="Créditos aprobados" value={m?.byStatus.APROBADO ?? 0} tone="APROBADO" loading={loading && !m} />
        <StatCard label="Créditos rechazados" value={m?.byStatus.RECHAZADO ?? 0} tone="RECHAZADO" loading={loading && !m} />
      </section>

      <div className="adm-grid-2">
        <section className="adm-panel" aria-labelledby="h-evo">
          <div className="adm-panel__head">
            <h2 id="h-evo">Consultas por día</h2>
            <div className="adm-seg" role="group" aria-label="Período">
              {RANGES.map((r) => <button key={r} type="button" aria-pressed={days === r} onClick={() => setDays(r)}>{r} días</button>)}
            </div>
          </div>
          {m ? <LineChart data={m.daily} /> : <ChartSkeleton />}
        </section>

        <section className="adm-panel" aria-labelledby="h-est">
          <div className="adm-panel__head"><h2 id="h-est">Interesados por estado</h2></div>
          {m ? <StatusBreakdown byStatus={m.byStatus} total={m.total} /> : <LegendSkeleton />}
        </section>
      </div>

      <div className="adm-grid-2 adm-grid-2--rev">
        <section className="adm-panel" aria-labelledby="h-mod">
          <div className="adm-panel__head"><h2 id="h-mod">Modelos más consultados</h2></div>
          {m ? <BarList rows={m.topModels.map((t) => ({ key: t.motoId, label: t.name, value: t.count }))} /> : <BarsSkeleton />}
        </section>

        <section className="adm-panel adm-panel--table" aria-labelledby="h-last">
          <div className="adm-panel__head">
            <h2 id="h-last">Últimos interesados</h2>
            <Link to={ADMIN_ROUTES.list} className="adm-link">Ver todos</Link>
          </div>
          {m ? <InterestedTable rows={m.latest} compact busyId={busyId} onChangeStatus={() => undefined} /> : <TableSkeleton rows={6} compact />}
        </section>
      </div>
      {dialog}
    </div>
  )
}
