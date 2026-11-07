import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SECTION_IDS } from '../config/site'
import { useCatalog } from '../context/CatalogContext'
import { getBrands } from '../services/catalog'
import type { BrandFilter as Filter } from '../types'
import { BrandFilter } from '../components/BrandFilter'
import { MotoCard } from '../components/MotoCard'
import { SectionHeading } from '../components/ui/SectionHeading'

const normalize = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

export function Catalog() {
  const motos = useCatalog()
  const [params, setParams] = useSearchParams()
  const options = useMemo<Filter[]>(() => ['Todas', ...getBrands(motos)], [motos])

  // El filtro vive en la URL (/motos?marca=Honda): se puede compartir y sobrevive al recargar.
  const brandParam = params.get('marca') as Filter | null
  const filter: Filter = brandParam && options.includes(brandParam) ? brandParam : 'Todas'
  const query = params.get('q') ?? ''

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params)
    if (value && value !== 'Todas') next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  const visible = motos.filter(
    (m) => (filter === 'Todas' || m.brand === filter) && normalize(m.name).includes(normalize(query.trim())),
  )

  return (
    <section id={SECTION_IDS.catalog} className="catalog" aria-labelledby="catalog-title">
      <div className="container">
        <SectionHeading id="catalog-title" title="Encontrá tu próxima moto" subtitle="Conocé algunos de los modelos que tenemos para ofrecerte." />
        <div className="catalog__tools">
          <BrandFilter options={options} value={filter} onChange={(v) => update('marca', v)} />
          <div className="catalog__search">
            <label htmlFor="catalog-q" className="sr-only">
              Buscar modelo
            </label>
            <input id="catalog-q" type="search" placeholder="Buscar modelo" value={query} onChange={(e) => update('q', e.target.value)} />
          </div>
        </div>
        <p className="catalog__count" aria-live="polite">
          {visible.length} {visible.length === 1 ? 'modelo' : 'modelos'}
        </p>
        {motos.length === 0 ? (
          <div className="catalog__grid" role="status" aria-busy="true">
            <span className="sr-only">Cargando motos…</span>
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="moto-card moto-card--skeleton" aria-hidden="true">
                <div className="moto-card__media"><span className="boot__bar" style={{ width: '100%', height: '100%', borderRadius: 0 }} /></div>
                <div className="moto-card__body">
                  <span className="boot__bar" style={{ width: 70, height: 12 }} />
                  <span className="boot__bar" style={{ width: 160, height: 24, marginTop: 10 }} />
                  <span className="boot__bar" style={{ width: '90%', height: 14, marginTop: 16 }} />
                  <span className="boot__bar" style={{ width: '100%', height: 48, marginTop: 28 }} />
                </div>
              </div>
            ))}
          </div>
        ) : visible.length > 0 ? (
          <div className="catalog__grid">
            {visible.map((m, i) => (
              <MotoCard key={m.id} moto={m} priority={i < 2} />
            ))}
          </div>
        ) : (
          <div className="catalog__empty">
            <p>No encontramos motos con ese filtro.</p>
            <button type="button" className="btn btn--secondary" onClick={() => setParams({}, { replace: true })}>
              Ver todas las motos
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
