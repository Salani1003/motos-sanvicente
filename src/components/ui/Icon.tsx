import type { SVGProps } from 'react'

const PATHS = {
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  whatsapp: (
    <>
      <path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5Z" />
      <path d="M9.2 8.8c.2 2.2 2.6 4.9 5.2 5.4l1.2-1.3-1.9-.9-.9.7c-.8-.4-1.7-1.3-2.1-2.1l.7-.9-.9-1.9-1.3 1Z" />
    </>
  ),
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <path d="M16.9 7.1h.01" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  id: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <circle cx="9" cy="11" r="2" />
      <path d="M6 16c.5-1.6 1.7-2.4 3-2.4s2.5.8 3 2.4M14.5 10h4M14.5 13.5h3" />
    </>
  ),
  cash: (
    <>
      <rect x="3" y="6.5" width="18" height="11" rx="2" />
      <circle cx="12" cy="12" r="2.4" />
      <path d="M6.5 9.5v.01M17.5 14.5v.01" />
    </>
  ),
  support: (
    <>
      <path d="M5 13v-1a7 7 0 0 1 14 0v1" />
      <rect x="3.5" y="13" width="3.5" height="5" rx="1.5" />
      <rect x="17" y="13" width="3.5" height="5" rx="1.5" />
      <path d="M19 18c0 1.7-1.6 2.5-4 2.5" />
    </>
  ),
  moto: (
    <>
      <circle cx="6" cy="16.5" r="3" />
      <circle cx="18" cy="16.5" r="3" />
      <path d="M6 16.5 9.5 9H13l3 4.5 2 3M9.5 9 8.5 7H7M13 9l.8-2H16" />
    </>
  ),
  form: (
    <>
      <rect x="5" y="3.5" width="14" height="17" rx="2" />
      <path d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4" />
    </>
  ),
  phone: (
    <path d="M7.5 4h2.6l1.4 3.6-1.8 1.2a10 10 0 0 0 5 5l1.2-1.8L19.5 13.4V16a2 2 0 0 1-2.2 2A13.5 13.5 0 0 1 5.5 6.2 2 2 0 0 1 7.5 4Z" />
  ),
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4 7.5 8 6 8-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 20.5s6-5.3 6-10a6 6 0 1 0-12 0c0 4.7 6 10 6 10Z" />
      <circle cx="12" cy="10.5" r="2.2" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
} as const

export type IconName = keyof typeof PATHS

export function Icon({ name, size = 20, ...rest }: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {PATHS[name]}
    </svg>
  )
}
