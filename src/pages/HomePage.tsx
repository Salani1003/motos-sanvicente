import { usePageMeta } from '../utils/usePageMeta'
import { Hero } from '../sections/Hero'
import { LeadSection } from '../sections/LeadSection'
import { HowItWorks } from '../sections/HowItWorks'
import { Financing } from '../sections/Financing'

export default function HomePage() {
  usePageMeta(
    'San Vicente Automotores | Motos con financiación y de contado',
    'Elegí tu moto y consultá las opciones de financiación presentando tu DNI. También podés comprar de contado. Financiación sujeta a evaluación crediticia.',
  )
  return (
    <>
      <Hero />
      <LeadSection />
      <HowItWorks />
      <Financing />
    </>
  )
}
