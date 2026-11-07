import { SECTION_IDS, SITE } from '../config/site'
import { whatsappUrl } from '../utils/links'
import { Icon, type IconName } from '../components/ui/Icon'
import { Logo } from '../components/ui/Logo'
import { ButtonLink } from '../components/ui/Button'

const INFO: { icon: IconName; label: string; value: string }[] = [
  { icon: 'phone', label: 'Teléfono', value: SITE.contact.phone },
  { icon: 'mail', label: 'Email', value: SITE.contact.email },
  { icon: 'pin', label: 'Dirección', value: SITE.contact.address },
  { icon: 'clock', label: 'Horarios', value: SITE.contact.hours },
]

export function Footer() {
  return (
    <footer id={SECTION_IDS.contact} className="footer">
      <div className="container footer__top">
        <div className="footer__brand">
          <Logo height={52} />
          <p>Motos con financiación y pago de contado.</p>
          <div className="footer__social">
            <ButtonLink variant="light" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" /> WhatsApp
            </ButtonLink>
            <ButtonLink variant="ghost" className="btn--on-dark" href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer">
              <Icon name="instagram" /> Instagram
            </ButtonLink>
          </div>
        </div>
        <div>
          <h2 className="footer__title">Contacto</h2>
          <ul className="footer__info">
            {INFO.map((i) => (
              <li key={i.label}>
                <Icon name={i.icon} size={18} />
                <span>
                  <small>{i.label}</small>
                  {i.value || <em>Próximamente</em>}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p id="privacidad" className="container footer__privacy">
        <strong>Privacidad.</strong> Los datos que completes en el formulario se utilizarán únicamente para gestionar tu consulta y contactarte.
      </p>
      <div className="container footer__bottom">
        <p>© {new Date().getFullYear()} {SITE.name}. Todos los derechos reservados.</p>
        <p>La financiación está sujeta a evaluación crediticia.</p>
        <a href={SITE.privacyPolicyUrl}>Política de privacidad</a>
      </div>
    </footer>
  )
}
