/** Esqueleto mientras se descarga el panel (vive en el bundle público a propósito: es mínimo). */
export function AdminBoot() {
  return (
    <div className="boot" role="status" aria-busy="true">
      <span className="sr-only">Cargando panel…</span>
      <div className="boot__side" aria-hidden="true">
        <span className="boot__bar boot__bar--dark" style={{ width: 84, height: 40 }} />
        <span className="boot__bar boot__bar--dark" style={{ height: 40, marginTop: 28 }} />
        <span className="boot__bar boot__bar--dark" style={{ height: 40, marginTop: 8 }} />
      </div>
      <div className="boot__main" aria-hidden="true">
        <span className="boot__bar" style={{ width: 160, height: 20 }} />
        <span className="boot__bar" style={{ height: 120, marginTop: 28 }} />
        <span className="boot__bar" style={{ height: 260, marginTop: 16 }} />
      </div>
    </div>
  )
}
