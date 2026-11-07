import { Link } from 'react-router-dom'
import { ROUTES, SECTION_IDS } from '../config/site'
import { useLead } from '../context/LeadContext'
import { Button } from '../components/ui/Button'
import { Icon, type IconName } from '../components/ui/Icon'

const ATTRS: { icon: IconName; label: string }[] = [
  { icon: 'id', label: 'Financiación disponible' },
  { icon: 'cash', label: 'Pago de contado' },
  { icon: 'support', label: 'Atención personalizada' },
]

export function Hero() {
  const { openLeadForm } = useLead()
  return (
    <section id={SECTION_IDS.home} className="hero" aria-labelledby="hero-title">
      <div className="container hero__inner">
        <div className="hero__copy">
          <h1 id="hero-title">Tu próxima moto está más cerca de lo que pensás.</h1>
          <p className="hero__lead">Elegí tu moto y consultá las opciones de financiación presentando tu DNI.</p>
          <div className="hero__actions">
            <Link to={ROUTES.motos} className="btn btn--primary btn--lg">
              Explorar motos
            </Link>
            <Button size="lg" variant="secondary" onClick={() => openLeadForm()}>
              Consultar financiación
            </Button>
          </div>
        </div>

        <div className="hero__visual">
          <span className="hero__road" aria-hidden="true" />
          <img
            src="/images/motos/honda-glh-150.webp"
            alt="Honda GLH 150 roja, vista lateral"
            width={1200}
            height={900}
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </div>

      <ul className="container hero__attrs" aria-label="Beneficios">
        {ATTRS.map((a) => (
          <li key={a.label}>
            <Icon name={a.icon} size={22} />
            {a.label}
          </li>
        ))}
      </ul>
    </section>
  )
}
