import { usePageMeta } from '../utils/usePageMeta'
import { Catalog } from '../sections/Catalog'
import { LeadSection } from '../sections/LeadSection'

export default function MotosPage() {
  usePageMeta(
    'Motos | San Vicente Automotores',
    'Conocé los modelos Honda, Siam, Keller y Motomel y consultá la financiación presentando tu DNI. Financiación sujeta a evaluación crediticia.',
  )
  return (
    <>
      <Catalog />
      <LeadSection />
    </>
  )
}
