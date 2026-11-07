import { SECTION_IDS } from '../config/site'
import { Icon, type IconName } from '../components/ui/Icon'
import { SectionHeading } from '../components/ui/SectionHeading'

const STEPS: { icon: IconName; title: string; text: string }[] = [
  { icon: 'moto', title: 'Elegí tu moto', text: 'Mirá los modelos y quedate con el que más te guste.' },
  { icon: 'form', title: 'Completá tus datos', text: 'Nombre, teléfono y DNI. Te lleva un minuto.' },
  { icon: 'phone', title: 'Nuestro equipo se comunica con vos', text: 'Un asesor te contacta para contarte las opciones.' },
]

export function HowItWorks() {
  return (
    <section id={SECTION_IDS.how} className="section how" aria-labelledby="how-title">
      <div className="container">
        <SectionHeading id="how-title" title="Cómo funciona" />
        <ol className="how__steps">
          {STEPS.map((s, i) => (
            <li key={s.title} className="how__step">
              <span className="how__num" aria-hidden="true">{i + 1}</span>
              <Icon name={s.icon} size={30} />
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
