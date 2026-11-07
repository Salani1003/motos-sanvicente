import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CatalogProvider } from './context/CatalogContext'
import { LeadProvider } from './context/LeadContext'
import { Header } from './components/Header'
import { ScrollManager } from './components/ScrollManager'
import { StickyCta } from './components/StickyCta'
import { Footer } from './sections/Footer'
import HomePage from './pages/HomePage'
import MotosPage from './pages/MotosPage'
import { ROUTES } from './config/site'

export default function App() {
  return (
    <BrowserRouter>
      <CatalogProvider>
        <LeadProvider>
          <ScrollManager />
          <a className="skip-link" href="#contenido">Saltar al contenido</a>
          <Header />
          <main id="contenido">
            <Routes>
              <Route path={ROUTES.home} element={<HomePage />} />
              <Route path={ROUTES.motos} element={<MotosPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />
          <StickyCta />
        </LeadProvider>
      </CatalogProvider>
    </BrowserRouter>
  )
}
