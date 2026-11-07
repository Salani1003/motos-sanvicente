import { Fragment, useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { NAV_ITEMS, ROUTES } from '../config/site'
import { useLead } from '../context/LeadContext'
import { scrollToSection } from '../utils/links'
import { Icon } from './ui/Icon'
import { Logo } from './ui/Logo'
import { Button } from './ui/Button'

export function Header() {
  const [open, setOpen] = useState(false)
  const { openLeadForm } = useLead()
  const { pathname } = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.classList.toggle('no-scroll', open)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('no-scroll')
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  /**
   * - "#ancla": scroll suave dentro de la página actual
   * - "/ruta#ancla": navega y ScrollManager baja hasta el ancla
   * - "/ruta": enlace con estado activo
   */
  const navItem = (to: string, label: string) => {
    if (to.startsWith('#')) {
      return (
        <a
          href={to}
          onClick={(e) => {
            e.preventDefault()
            setOpen(false)
            scrollToSection(to.slice(1))
          }}
        >
          {label}
        </a>
      )
    }
    if (to.includes('#')) {
      return (
        <Link to={to} onClick={() => setOpen(false)}>
          {label}
        </Link>
      )
    }
    return (
      <NavLink to={to} end={to === ROUTES.home} onClick={() => setOpen(false)}>
        {label}
      </NavLink>
    )
  }

  const items = NAV_ITEMS.map((item) => <Fragment key={item.label}>{navItem(item.to, item.label)}</Fragment>)

  return (
    <header className="header">
      <div className="header__bar container">
        <Link to={ROUTES.home} className="header__logo" aria-label="San Vicente Automotores, ir al inicio">
          <Logo height={44} />
        </Link>

        <nav className="header__nav" aria-label="Principal">
          {items}
        </nav>

        <Button variant="light" className="header__cta" onClick={() => openLeadForm()}>
          Quiero mi moto
        </Button>

        <button
          type="button"
          className="header__toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'close' : 'menu'} size={24} />
        </button>
      </div>

      <div id="mobile-menu" className={`mobile-menu${open ? ' is-open' : ''}`} hidden={!open}>
        <nav aria-label="Principal móvil">{items}</nav>
        <Button
          variant="light"
          size="lg"
          block
          onClick={() => {
            setOpen(false)
            openLeadForm()
          }}
        >
          Quiero mi moto
        </Button>
      </div>
    </header>
  )
}
