import { useState, type FormEvent } from 'react'
import type { InterestedNote } from '../types'
import { formatDateTime, initials } from '../utils/format'
import { AIcon } from './AIcon'

export function NoteForm({ onAdd }: { onAdd: (text: string) => Promise<void> }) {
  const [text, setText] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (!text.trim()) {
      setError('Escribí una observación antes de guardar.')
      return
    }
    setError('')
    setBusy(true)
    try {
      await onAdd(text)
      setText('')
    } finally {
      setBusy(false)
    }
  }

  return (
    <form className="adm-noteform" onSubmit={submit} noValidate>
      <label htmlFor="adm-note">Nueva observación</label>
      <textarea
        id="adm-note" rows={3} value={text} maxLength={600} placeholder="Ej: Se llamó y quedó en enviar la documentación."
        aria-invalid={Boolean(error)} aria-describedby={error ? 'adm-note-error' : undefined}
        onChange={(e) => { setText(e.target.value); if (error) setError('') }}
      />
      {error && <p className="adm-error" id="adm-note-error">{error}</p>}
      <div className="adm-noteform__row">
        <span className="adm-muted">{text.length}/600</span>
        <button type="submit" className="btn btn--primary" disabled={busy}>{busy ? 'Guardando…' : 'Guardar observación'}</button>
      </div>
    </form>
  )
}

/** Historial cronológico (lo más reciente arriba). */
export function NotesTimeline({ notes }: { notes: InterestedNote[] }) {
  const sorted = [...notes].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
  if (sorted.length === 0) return <p className="adm-empty-inline">Todavía no hay observaciones ni cambios de estado.</p>
  return (
    <ol className="adm-timeline">
      {sorted.map((n) => (
        <li key={n.id} className={`adm-timeline__item adm-timeline__item--${n.kind}`}>
          <span className="adm-timeline__mark" aria-hidden="true">{n.kind === 'estado' ? <AIcon name="check" size={14} /> : <AIcon name="note" size={14} />}</span>
          <div>
            <p className="adm-timeline__text">{n.text}</p>
            <p className="adm-muted"><span title={n.author}>{initials(n.author)}</span> {n.author} · {formatDateTime(n.createdAt)}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
