export function Logo({ tone = 'white', height = 40 }: { tone?: 'white' | 'black'; height?: number }) {
  return (
    <img
      src={`/images/brand/logo-${tone}.png`}
      alt="San Vicente Automotores"
      height={height}
      width={Math.round(height * 2.09)}
      className="logo"
      decoding="async"
    />
  )
}
