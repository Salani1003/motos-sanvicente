import type { ReactNode } from 'react'

export function SectionHeading({ id, title, subtitle, tone = 'dark' }: { id: string; title: string; subtitle?: ReactNode; tone?: 'dark' | 'light' }) {
  return (
    <header className={`section-heading section-heading--${tone}`}>
      <h2 id={id}>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </header>
  )
}
