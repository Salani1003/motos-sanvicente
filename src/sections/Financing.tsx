import { SECTION_IDS } from '../config/site'
import { useLead } from '../context/LeadContext'
import { Button } from '../components/ui/Button'
import { Icon } from '../components/ui/Icon'

export function Financing() {
  const { openLeadForm } = useLead()
  return (
    <section id={SECTION_IDS.financing} className="financing" aria-labelledby="financing-title">
      <div className="container financing__inner">
        <div>
          <h2 id="financing-title">¿Querés tu moto? Nosotros te ayudamos.</h2>
          <p className="financing__text">
            Consultá las opciones de financiación disponibles. Solo necesitás completar tus datos para que nuestro equipo pueda asesorarte.
          </p>
          <Button size="lg" onClick={() => openLeadForm()}>
            Quiero consultar
          </Button>
        </div>
        <div className="financing__dni">
          <Icon name="id" size={44} strokeWidth={1.2} />
          <p>Consultá presentando tu DNI.</p>
          <small>La financiación está sujeta a evaluación crediticia.</small>
        </div>
      </div>
    </section>
  )
}
