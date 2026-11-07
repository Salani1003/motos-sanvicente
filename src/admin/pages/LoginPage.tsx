import { useState, type FormEvent } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { AIcon } from '../components/AIcon'
import { ADMIN_ROUTES, DEMO_CREDENTIALS } from '../config'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const rawFrom = (location.state as { from?: string } | null)?.from
  const target = rawFrom && rawFrom.startsWith('/admin') && !rawFrom.startsWith(ADMIN_ROUTES.login) ? rawFrom : ADMIN_ROUTES.dashboard
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  if (user) return <Navigate to={target} replace />

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !password) {
      setError('Completá el email y la contraseña.')
      return
    }
    setError('')
    setBusy(true)
    try {
      await login(email, password)
      navigate(target, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No pudimos iniciar sesión.')
      setBusy(false)
    }
  }

  return (
    <div className="adm-login">
      <section className="adm-login__brand" aria-hidden="true">
        <img src="/images/brand/logo-white.png" alt="" width={168} height={80} />
        <p>Panel de gestión de interesados.</p>
      </section>
      <section className="adm-login__panel">
        <form className="adm-login__form" onSubmit={submit} noValidate>
          <h1>Ingresar al panel</h1>
          <p className="adm-muted">Acceso para el equipo de San Vicente Automotores.</p>

          <div className="adm-field">
            <label htmlFor="adm-email">Email</label>
            <input id="adm-email" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={Boolean(error)} />
          </div>
          <div className="adm-field">
            <label htmlFor="adm-pass">Contraseña</label>
            <input id="adm-pass" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} aria-invalid={Boolean(error)} aria-describedby={error ? 'adm-login-error' : undefined} />
          </div>
          {error && <p className="adm-error" id="adm-login-error" role="alert">{error}</p>}
          <button type="submit" className="btn btn--primary btn--lg btn--block" disabled={busy}>
            {busy ? <><span className="spinner" aria-hidden="true" /> Ingresando…</> : 'Ingresar'}
          </button>

          <div className="adm-demo">
            <p className="adm-demo__title"><AIcon name="lock" size={16} /> Acceso de demostración</p>
            <p>Esta autenticación es <strong>simulada</strong> y no es un sistema seguro. Usá estas credenciales de prueba:</p>
            <dl>
              <div><dt>Email</dt><dd>{DEMO_CREDENTIALS.email}</dd></div>
              <div><dt>Contraseña</dt><dd>{DEMO_CREDENTIALS.password}</dd></div>
            </dl>
            <button type="button" className="adm-linkbtn" onClick={() => { setEmail(DEMO_CREDENTIALS.email); setPassword(DEMO_CREDENTIALS.password); setError('') }}>
              Completar automáticamente
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
