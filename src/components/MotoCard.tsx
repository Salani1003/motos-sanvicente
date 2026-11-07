import { useLead } from '../context/LeadContext'
import type { Moto } from '../types'
import { Button } from './ui/Button'

export function MotoCard({ moto, priority = false }: { moto: Moto; priority?: boolean }) {
  const { openLeadForm } = useLead()
  const available = moto.availability === 'Disponible para consultar'

  return (
    <article className="moto-card" aria-labelledby={`${moto.id}-title`}>
      <div className="moto-card__media">
        <img
          src={moto.image.src}
          alt={moto.image.alt}
          width={1200}
          height={900}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      </div>
      <div className="moto-card__body">
        <p className="moto-card__brand">{moto.brand}</p>
        <h3 id={`${moto.id}-title`} className="moto-card__model">
          {moto.model}
        </h3>
        <p className="moto-card__spec">{moto.displacement}</p>
        {moto.description && <p className="moto-card__desc">{moto.description}</p>}
        <p className={`moto-card__status${available ? ' is-available' : ''}`}>
          <span aria-hidden="true" />
          {moto.availability}
        </p>
        <div className="moto-card__actions">
          <Button block onClick={() => openLeadForm(moto.id)} aria-label={`Consultar financiación de ${moto.name}`}>
            Consultar financiación
          </Button>
          {moto.moreInfoUrl && (
            <a className="moto-card__more" href={moto.moreInfoUrl} target="_blank" rel="noopener noreferrer">
              Más información<span className="sr-only"> de {moto.name} (abre el sitio del fabricante)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
