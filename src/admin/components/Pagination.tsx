import { AIcon } from './AIcon'

export function Pagination({ page, totalPages, total, pageSize, onPage, onPageSize }: {
  page: number
  totalPages: number
  total: number
  pageSize: number
  onPage: (p: number) => void
  onPageSize: (s: number) => void
}) {
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1
  const to = Math.min(total, page * pageSize)
  const pages: (number | '…')[] = []
  for (let p = 1; p <= totalPages; p++) {
    if (p === 1 || p === totalPages || Math.abs(p - page) <= 1) pages.push(p)
    else if (pages[pages.length - 1] !== '…') pages.push('…')
  }
  return (
    <nav className="adm-pager" aria-label="Paginación">
      <p className="adm-pager__info">Mostrando {from}–{to} de {total}</p>
      <label className="adm-pager__size">
        Por página
        <select value={pageSize} onChange={(e) => onPageSize(Number(e.target.value))}>
          {[5, 10, 20, 50].map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
      </label>
      <div className="adm-pager__pages">
        <button type="button" aria-label="Página anterior" disabled={page <= 1} onClick={() => onPage(page - 1)}><AIcon name="chevronLeft" size={18} /></button>
        {pages.map((p, i) => p === '…' ? <span key={`e${i}`} aria-hidden="true">…</span> : (
          <button key={p} type="button" aria-current={p === page ? 'page' : undefined} aria-label={`Página ${p}`} className={p === page ? 'is-active' : ''} onClick={() => onPage(p)}>{p}</button>
        ))}
        <button type="button" aria-label="Página siguiente" disabled={page >= totalPages} onClick={() => onPage(page + 1)}><AIcon name="chevronRight" size={18} /></button>
      </div>
    </nav>
  )
}
