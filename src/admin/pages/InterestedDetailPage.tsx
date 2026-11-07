import { Link, useParams } from 'react-router-dom'
import { AIcon } from '../components/AIcon'
import { NoteForm, NotesTimeline } from '../components/NotesTimeline'
import { DetailSkeleton } from '../components/Skeletons'
import { StatusBadge } from '../components/StatusBadge'
import { StatusMenu } from '../components/StatusMenu'
import { ADMIN_ROUTES } from '../config'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { useAsync } from '../hooks/useAsync'
import { useStatusChange } from '../hooks/useStatusChange'
import { addInterestedNote, getInterestedById } from '../services/interestedService'
import { PAYMENT_LABEL, formatDate, formatDateTime, formatDni, fullName } from '../utils/format'
import { leadWhatsAppUrl, telUrl } from '../utils/links'

const Item = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="adm-dl__row"><dt>{label}</dt><dd>{children}</dd></div>
)

export default function InterestedDetailPage() {
  const { id = '' } = useParams()
  const { user } = useAuth()
  const notify = useToast()
  const { data, setData, loading, error, reload } = useAsync(() => getInterestedById(id), [id])
  const { requestChange, dialog, busyId } = useStatusChange((row) => setData(row))

  if (loading && !data) return <DetailSkeleton />
  if (error) return <div className="adm-page"><div className="adm-alert" role="alert">{error} <button type="button" className="adm-linkbtn" onClick={() => reload()}>Reintentar</button></div></div>
  if (!data) {
    return (
      <div className="adm-page">
        <div className="adm-empty">
          <h1>No encontramos a este interesado</h1>
          <p>Puede que el enlace sea incorrecto o que el registro ya no exista.</p>
          <Link to={ADMIN_ROUTES.list} className="btn btn--secondary">Volver al listado</Link>
        </div>
      </div>
    )
  }

  const r = data
  const addNote = async (text: string) => {
    try {
      setData(await addInterestedNote(r.id, text, user?.name ?? 'Sistema'))
      notify('Observación guardada.')
    } catch (e) {
      notify(e instanceof Error ? e.message : 'No se pudo guardar la observación.', 'error')
    }
  }
  const utm = r.utm && Object.entries(r.utm).filter(([, v]) => v)

  return (
    <div className="adm-page">
      <Link to={ADMIN_ROUTES.list} className="adm-back"><AIcon name="arrowLeft" size={16} /> Volver al listado</Link>

      <header className="adm-pagehead adm-pagehead--detail">
        <div>
          <h1>{fullName(r)}</h1>
          <p>Consulta recibida el {formatDateTime(r.createdAt)}</p>
        </div>
        <StatusBadge status={r.status} />
      </header>

      <section className="adm-quick" aria-label="Acciones rápidas">
        <a className="btn btn--secondary" href={telUrl(r.phone)}><AIcon name="phone" size={18} /> Llamar</a>
        <a className="btn btn--primary" href={leadWhatsAppUrl(r.phone, r.firstName)} target="_blank" rel="noopener noreferrer"><AIcon name="whatsapp" size={18} /> Abrir WhatsApp</a>
        <span className="adm-quick__status"><StatusMenu row={r} onChange={requestChange} disabled={busyId === r.id} variant="button" /></span>
      </section>

      <div className="adm-detail">
        <div className="adm-detail__col">
          <section className="adm-panel" aria-labelledby="d-pers">
            <div className="adm-panel__head"><h2 id="d-pers">Información personal</h2></div>
            <dl className="adm-dl">
              <Item label="Nombre">{r.firstName}</Item>
              <Item label="Apellido">{r.lastName}</Item>
              <Item label="DNI"><span className="adm-mono">{formatDni(r.dni)}</span></Item>
              <Item label="Teléfono">{r.phone}</Item>
              <Item label="Fecha de creación">{formatDateTime(r.createdAt)}</Item>
            </dl>
          </section>

          <section className="adm-panel" aria-labelledby="d-query">
            <div className="adm-panel__head"><h2 id="d-query">Información de la consulta</h2></div>
            <dl className="adm-dl">
              <Item label="Marca">{r.brand}</Item>
              <Item label="Modelo">{r.model}</Item>
              <Item label="Forma de pago">{PAYMENT_LABEL[r.paymentMethod]}</Item>
              <Item label="Fecha de consulta">{formatDate(r.createdAt)}</Item>
              <Item label="Estado actual"><StatusBadge status={r.status} /></Item>
              <Item label="Origen">{r.source}</Item>
              <Item label="Parámetros UTM">
                {utm && utm.length > 0 ? (
                  <ul className="adm-utm">{utm.map(([k, v]) => <li key={k}><code>utm_{k}</code> {v}</li>)}</ul>
                ) : <span className="adm-muted">Sin parámetros UTM</span>}
              </Item>
            </dl>
          </section>
        </div>

        <section className="adm-panel adm-detail__notes" aria-labelledby="d-notes">
          <div className="adm-panel__head"><h2 id="d-notes">Gestión comercial</h2></div>
          <NoteForm onAdd={addNote} />
          <h3 className="adm-subhead">Historial</h3>
          <NotesTimeline notes={r.notes} />
        </section>
      </div>
      {dialog}
    </div>
  )
}
