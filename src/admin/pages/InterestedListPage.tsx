import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { InterestedFilters } from '../components/InterestedFilters'
import { InterestedTable } from '../components/InterestedTable'
import { Pagination } from '../components/Pagination'
import { useAsync } from '../hooks/useAsync'
import { useStatusChange } from '../hooks/useStatusChange'
import { getInterested } from '../services/interestedService'
import type { InterestedQuery, InterestedStatus, SortKey } from '../types'

const SORTS: SortKey[] = ['fecha_desc', 'fecha_asc', 'nombre_asc', 'nombre_desc']

/** El estado de filtros, orden y página vive en la URL: se puede compartir y el botón "atrás" lo respeta. */
export default function InterestedListPage() {
  const [params, setParams] = useSearchParams()
  const query = useMemo<InterestedQuery>(() => {
    const sort = params.get('orden') as SortKey | null
    return {
      q: params.get('q') ?? '',
      status: (params.get('estado') ?? '') as InterestedStatus | '',
      brand: params.get('marca') ?? '',
      motoId: params.get('modelo') ?? '',
      from: params.get('desde') ?? '',
      to: params.get('hasta') ?? '',
      sort: sort && SORTS.includes(sort) ? sort : 'fecha_desc',
      page: Number(params.get('pagina')) || 1,
      pageSize: Number(params.get('por')) || 10,
    }
  }, [params])

  const { data, loading, error, reload, setData } = useAsync(() => getInterested(query), [params.toString()])
  const { requestChange, dialog, busyId } = useStatusChange((row) => {
    setData((prev) => (prev ? { ...prev, items: prev.items.map((i) => (i.id === row.id ? row : i)) } : prev))
    reload({ silent: true })
  })

  const KEYS: Record<string, string> = { q: 'q', status: 'estado', brand: 'marca', motoId: 'modelo', from: 'desde', to: 'hasta', sort: 'orden', page: 'pagina', pageSize: 'por' }
  const update = (patch: Partial<InterestedQuery>) => {
    const next = new URLSearchParams(params)
    Object.entries(patch).forEach(([k, v]) => {
      const key = KEYS[k]!
      if (v === '' || v === undefined || v === null || (k === 'sort' && v === 'fecha_desc') || (k === 'page' && v === 1) || (k === 'pageSize' && v === 10)) next.delete(key)
      else next.set(key, String(v))
    })
    if (!('page' in patch)) next.delete('pagina')
    setParams(next, { replace: true })
  }

  const activeCount = [query.status, query.brand, query.motoId, query.from, query.to, query.q].filter(Boolean).length
  const clear = () => {
    const next = new URLSearchParams()
    if (query.sort !== 'fecha_desc') next.set('orden', query.sort!)
    setParams(next, { replace: true })
  }

  return (
    <div className="adm-page">
      <header className="adm-pagehead">
        <div>
          <h1>Interesados</h1>
          <p>Administrá y realizá el seguimiento de las personas interesadas en nuestras motos.</p>
        </div>
      </header>

      <InterestedFilters query={query} onChange={update} onClear={clear} activeCount={activeCount} />

      <section className="adm-panel adm-panel--table" aria-label="Listado de interesados" aria-busy={loading}>
        {error && (
          <div className="adm-alert" role="alert">{error} <button type="button" className="adm-linkbtn" onClick={() => reload()}>Reintentar</button></div>
        )}
        {loading && !data && <div className="adm-skeleton adm-skeleton--table" />}
        {data && (
          <div className={loading ? 'adm-fade' : undefined}>
            {data.items.length === 0 ? (
              <div className="adm-empty">
                <h2>No encontramos interesados</h2>
                <p>{activeCount > 0 ? 'Probá con otros filtros o limpialos para ver todos los registros.' : 'Todavía no hay consultas registradas.'}</p>
                {activeCount > 0 && <button type="button" className="btn btn--secondary" onClick={clear}>Limpiar filtros</button>}
              </div>
            ) : (
              <>
                <InterestedTable rows={data.items} sort={query.sort} onSort={(s) => update({ sort: s })} onChangeStatus={requestChange} busyId={busyId} />
                <Pagination page={data.page} totalPages={data.totalPages} total={data.total} pageSize={data.pageSize} onPage={(p) => update({ page: p })} onPageSize={(s) => update({ pageSize: s })} />
              </>
            )}
          </div>
        )}
      </section>
      {dialog}
    </div>
  )
}
