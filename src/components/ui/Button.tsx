import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'light' | 'ghost'
interface Common {
  variant?: Variant
  size?: 'md' | 'lg'
  block?: boolean
  children: ReactNode
}

const cls = (v: Variant, size: string, block?: boolean, extra?: string) =>
  ['btn', `btn--${v}`, `btn--${size}`, block && 'btn--block', extra].filter(Boolean).join(' ')

export function Button({ variant = 'primary', size = 'md', block, className, children, ...rest }: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" className={cls(variant, size, block, className)} {...rest}>
      {children}
    </button>
  )
}

export function ButtonLink({ variant = 'primary', size = 'md', block, className, children, ...rest }: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={cls(variant, size, block, className)} {...rest}>
      {children}
    </a>
  )
}
