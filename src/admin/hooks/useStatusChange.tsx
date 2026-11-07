import { useState, type ReactNode } from 'react'
import { ConfirmDialog } from '../components/ConfirmDialog'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { updateInterestedStatus } from '../services/interestedService'
import type { Interested, InterestedStatus } from '../types'
import { STATUS_META, fullName } from '../utils/format'

const NEEDS_CONFIRM: InterestedStatus[] = ['APROBADO', 'RECHAZADO']

/**
 * Cambio de estado con confirmación para decisiones de crédito (aprobar / rechazar).
 * Devuelve `requestChange` y el diálogo a renderizar.
 */
export function useStatusChange(onUpdated: (row: Interested) => void): { requestChange: (row: Interested, status: InterestedStatus) => void; dialog: ReactNode; busyId: string | null } {
  const { user } = useAuth()
  const notify = useToast()
  const [pending, setPending] = useState<{ row: Interested; status: InterestedStatus } | null>(null)
  const [busyId, setBusyId] = useState<string | null>(null)

  const run = async (row: Interested, status: InterestedStatus) => {
    setBusyId(row.id)
    try {
      const updated = await updateInterestedStatus(row.id, status, user?.name ?? 'Sistema')
      onUpdated(updated)
      notify(`${fullName(row)} pasó a "${STATUS_META[status].label}".`)
    } catch (e) {
      notify(e instanceof Error ? e.message : 'No se pudo cambiar el estado.', 'error')
    } finally {
      setBusyId(null)
      setPending(null)
    }
  }

  const requestChange = (row: Interested, status: InterestedStatus) => {
    if (row.status === status) return
    if (NEEDS_CONFIRM.includes(status)) setPending({ row, status })
    else void run(row, status)
  }

  const dialog = (
    <ConfirmDialog
      open={pending !== null}
      title={pending ? `¿Marcar como ${STATUS_META[pending.status].label.toLowerCase()}?` : ''}
      confirmLabel={pending?.status === 'RECHAZADO' ? 'Sí, rechazar' : 'Sí, aprobar'}
      tone={pending?.status === 'RECHAZADO' ? 'danger' : 'primary'}
      busy={busyId !== null}
      onCancel={() => busyId === null && setPending(null)}
      onConfirm={() => pending && void run(pending.row, pending.status)}
    >
      {pending && (
        <p>
          Vas a cambiar el estado de <strong>{fullName(pending.row)}</strong> de “{STATUS_META[pending.row.status].label}” a “{STATUS_META[pending.status].label}”.
          Queda registrado en el historial.
        </p>
      )}
    </ConfirmDialog>
  )

  return { requestChange, dialog, busyId }
}
