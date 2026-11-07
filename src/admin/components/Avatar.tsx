import { initials } from '../utils/format'

export const Avatar = ({ name, size = 36 }: { name: string; size?: number }) => (
  <span className="adm-avatar" style={{ width: size, height: size, fontSize: size * 0.38 }} aria-hidden="true">
    {initials(name)}
  </span>
)
