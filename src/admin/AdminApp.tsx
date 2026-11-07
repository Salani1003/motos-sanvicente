import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
import { RequireAuth } from './layout/AdminLayout'
import DashboardPage from './pages/DashboardPage'
import InterestedDetailPage from './pages/InterestedDetailPage'
import InterestedListPage from './pages/InterestedListPage'
import LoginPage from './pages/LoginPage'
import { ADMIN_ROUTES } from './config'
import './styles/admin.css'

/**
 * Raíz del panel (/admin/*). Se carga de forma diferida: no suma peso al sitio público.
 * Estilos con prefijo `adm-` para no interferir con el sitio.
 */
export default function AdminApp() {
  useEffect(() => {
    document.title = 'Panel | San Vicente Automotores'
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    const prev = document.querySelector('meta[name="robots"]')
    prev?.setAttribute('content', 'noindex, nofollow')
    if (!prev) document.head.appendChild(meta)
    return () => {
      if (prev) prev.setAttribute('content', 'index, follow')
      else meta.remove()
    }
  }, [])

  return (
    <AuthProvider>
      <ToastProvider>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route element={<RequireAuth />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="interesados" element={<InterestedListPage />} />
            <Route path="interesados/:id" element={<InterestedDetailPage />} />
          </Route>
          <Route path="*" element={<Navigate to={ADMIN_ROUTES.dashboard} replace />} />
        </Routes>
      </ToastProvider>
    </AuthProvider>
  )
}
