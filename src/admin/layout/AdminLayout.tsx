import { useEffect, useState } from 'react'
import { Navigate, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Avatar } from '../components/Avatar'
import { AIcon } from '../components/AIcon'
import { Menu } from '../components/Menu'
import { ADMIN_ROUTES } from '../config'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

const NAV = [
  { to: ADMIN_ROUTES.dashboard, label: 'Dashboard', icon: 'dashboard' as const },
  { to: ADMIN_ROUTES.list, label: 'Interesados', icon: 'users' as const },
]

function titleFor(pathname: string) {
  if (pathname.startsWith(ADMIN_ROUTES.list + '/')) return 'Detalle del interesado'
  if (pathname.startsWith(ADMIN_ROUTES.list)) return 'Interesados'
  return 'Dashboard'
}

/** Protección de navegación SIMULADA: sin "sesión" demo redirige al login. */
export function RequireAuth() {
  const { user } = useAuth()
  const location = useLocation()
  if (!user) return <Navigate to={ADMIN_ROUTES.login} replace state={{ from: location.pathname + location.search }} />
  return <AdminLayout />
}

function AdminLayout() {
  const { user, logout } = useAuth()
  const notify = useToast()
  const { pathname } = useLocation()
  const [drawer, setDrawer] = useState(false)
  const title = titleFor(pathname)

  useEffect(() => setDrawer(false), [pathname])
  useEffect(() => {
    document.title = `${title} | Panel San Vicente`
  }, [title])
  useEffect(() => {
    document.body.classList.toggle('no-scroll', drawer)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setDrawer(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('no-scroll')
      window.removeEventListener('keydown', onKey)
    }
  }, [drawer])

  const doLogout = () => {
    logout()
    notify('Cerraste sesión.', 'info')
  }

  return (
    <div className="adm-shell">
      <a className="skip-link" href="#adm-main">Saltar al contenido</a>
      <aside className={`adm-sidebar${drawer ? ' is-open' : ''}`} aria-label="Navegación del panel">
        <div className="adm-sidebar__brand">
          <img src="/images/brand/logo-white.png" alt="San Vicente Automotores" height={40} width={84} />
          <button type="button" className="adm-iconbtn adm-iconbtn--dark adm-sidebar__close" aria-label="Cerrar menú" onClick={() => setDrawer(false)}><AIcon name="close" /></button>
        </div>
        <nav className="adm-sidebar__nav">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} className={({ isActive }) => `adm-navlink${isActive ? ' is-active' : ''}`}>
              <AIcon name={n.icon} size={20} /> {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="adm-sidebar__foot">
          <button type="button" className="adm-navlink" onClick={doLogout}><AIcon name="logout" size={20} /> Cerrar sesión</button>
          <p className="adm-sidebar__demo">Modo demostración · datos ficticios</p>
        </div>
      </aside>
      {drawer && <button type="button" className="adm-scrim" aria-label="Cerrar menú" onClick={() => setDrawer(false)} />}

      <div className="adm-main">
        <header className="adm-header">
          <button type="button" className="adm-iconbtn adm-header__burger" aria-label="Abrir menú" aria-expanded={drawer} onClick={() => setDrawer(true)}><AIcon name="menu" size={22} /></button>
          <h2 className="adm-header__title">{title}</h2>
          {user && (
            <Menu
              label="Menú de usuario"
              heading={user.email}
              trigger={<><Avatar name={user.name} size={34} /><span className="adm-header__user"><strong>{user.name}</strong><small>{user.role}</small></span><AIcon name="chevronDown" size={16} /></>}
              items={[{ key: 'out', label: <><AIcon name="logout" size={16} /> Cerrar sesión</>, onSelect: doLogout }]}
            />
          )}
        </header>
        <main id="adm-main" className="adm-content" tabIndex={-1}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
