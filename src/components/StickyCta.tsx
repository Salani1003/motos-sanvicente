import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { SECTION_IDS } from '../config/site'
import { useLead } from '../context/LeadContext'
import { Button } from './ui/Button'

/** Barra fija en móvil: visible tras el hero y oculta cuando ya se ve el formulario. */
export function StickyCta() {
  const { openLeadForm } = useLead()
  const { pathname } = useLocation()
  const [pastHero, setPastHero] = useState(false)
  const [formVisible, setFormVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > 420)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setFormVisible(false)
    const form = document.getElementById(SECTION_IDS.form)
    if (!form) return
    const io = new IntersectionObserver(([e]) => setFormVisible(e.isIntersecting), { threshold: 0.15 })
    io.observe(form)
    return () => io.disconnect()
  }, [pathname])

  const show = pastHero && !formVisible
  return (
    <div className={`sticky-cta${show ? ' is-visible' : ''}`} aria-hidden={!show}>
      <Button size="lg" block tabIndex={show ? 0 : -1} onClick={() => openLeadForm()}>
        Consultar financiación
      </Button>
    </div>
  )
}
