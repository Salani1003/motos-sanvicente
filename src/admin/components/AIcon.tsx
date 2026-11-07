import type { SVGProps } from 'react'

const P = {
  dashboard: <><rect x="4" y="4" width="7" height="8" rx="1.5" /><rect x="13" y="4" width="7" height="5" rx="1.5" /><rect x="13" y="11" width="7" height="9" rx="1.5" /><rect x="4" y="14" width="7" height="6" rx="1.5" /></>,
  users: <><circle cx="9" cy="8.5" r="3.2" /><path d="M3.5 19c.4-3.2 2.7-5 5.5-5s5.1 1.8 5.5 5" /><path d="M16 5.6a3 3 0 0 1 0 5.8M17.5 14.3c1.7.5 2.8 2 3 4.2" /></>,
  logout: <><path d="M10 4.5H6.5a1.5 1.5 0 0 0-1.5 1.5v12a1.5 1.5 0 0 0 1.5 1.5H10" /><path d="m15 8 4 4-4 4M19 12H9.5" /></>,
  search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></>,
  eye: <><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" /><circle cx="12" cy="12" r="2.8" /></>,
  whatsapp: <><path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5Z" /><path d="M9.2 8.8c.2 2.2 2.6 4.9 5.2 5.4l1.2-1.3-1.9-.9-.9.7c-.8-.4-1.7-1.3-2.1-2.1l.7-.9-.9-1.9-1.3 1Z" /></>,
  phone: <path d="M7.5 4h2.6l1.4 3.6-1.8 1.2a10 10 0 0 0 5 5l1.2-1.8L19.5 13.4V16a2 2 0 0 1-2.2 2A13.5 13.5 0 0 1 5.5 6.2 2 2 0 0 1 7.5 4Z" />,
  more: <><circle cx="12" cy="5.5" r="1.2" /><circle cx="12" cy="12" r="1.2" /><circle cx="12" cy="18.5" r="1.2" /></>,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  chevronLeft: <path d="m14.5 6-6 6 6 6" />,
  chevronRight: <path d="m9.5 6 6 6-6 6" />,
  arrowLeft: <path d="M19 12H5m6-6-6 6 6 6" />,
  arrowRight: <path d="M5 12h14m-6-6 6 6-6 6" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  alert: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5v5.5M12 16.3v.01" /></>,
  sortUp: <path d="m7 14 5-5 5 5" />,
  sortDown: <path d="m7 10 5 5 5-5" />,
  calendar: <><rect x="4" y="5.5" width="16" height="14" rx="2" /><path d="M8 3.5v4M16 3.5v4M4 10h16" /></>,
  filter: <path d="M4 6h16M7 12h10M10 18h4" />,
  user: <><circle cx="12" cy="8.5" r="3.5" /><path d="M5 20c.6-3.6 3.4-5.5 7-5.5s6.4 1.9 7 5.5" /></>,
  note: <><rect x="5" y="3.5" width="14" height="17" rx="2" /><path d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4" /></>,
  lock: <><rect x="5" y="10.5" width="14" height="9.5" rx="2" /><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" /></>,
} as const
export type AIconName = keyof typeof P

export function AIcon({ name, size = 20, ...rest }: { name: AIconName; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...rest}>
      {P[name]}
    </svg>
  )
}
