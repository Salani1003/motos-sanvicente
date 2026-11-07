import { SECTION_IDS } from '../config/site'
import { LeadForm } from '../components/LeadForm'
import { Icon } from '../components/ui/Icon'
import { whatsappUrl } from '../utils/links'

const POINTS = [
  'Completalo en menos de un minuto.',
  'Un asesor se comunica con vos para darte información.',
  'Financiación sujeta a evaluación crediticia.',
]

export function LeadSection() {
  return (
    <section id={SECTION_IDS.form} className="lead" aria-labelledby="lead-title">
      <div className="container lead__inner">
        <header className="lead__intro">
          <h2 id="lead-title">Empezá a gestionar tu moto</h2>
          <p>Dejanos tus datos y un asesor se comunicará con vos para brindarte información.</p>
          <ul className="lead__points">
            {POINTS.map((p) => (
              <li key={p}>
                <Icon name="check" size={18} />
                {p}
              </li>
            ))}
          </ul>
          <a className="lead__wa" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
            <Icon name="whatsapp" size={20} />
            ¿Preferís escribirnos? Hablá por WhatsApp
          </a>
        </header>
        <div className="lead__card">
          <LeadForm />
        </div>
      </div>
    </section>
  )
}
