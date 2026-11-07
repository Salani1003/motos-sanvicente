import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { UNDECIDED, useLead } from '../context/LeadContext'
import { useCatalog } from '../context/CatalogContext'
import { submitLead } from '../services/leads'
import { PAYMENT_OPTIONS, paymentLabel } from '../data/payment'
import { getBrands } from '../services/catalog'
import type { LeadFormErrors, LeadFormValues, PaymentMethod } from '../types'
import { formatDni, validateDni, validateLead, validateName, validatePhone } from '../utils/validators'
import { whatsappUrl } from '../utils/links'
import { Field } from './Field'
import { Button, ButtonLink } from './ui/Button'
import { Icon } from './ui/Icon'

type Status = 'idle' | 'loading' | 'success'
const EMPTY = { firstName: '', lastName: '', phone: '', dni: '' }

export function LeadForm() {
  const motos = useCatalog()
  const { selectedMotoId, setSelectedMotoId } = useLead()
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState<LeadFormErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [payment, setPayment] = useState<PaymentMethod | ''>('')
  const [brandChoice, setBrandChoice] = useState('')
  const successRef = useRef<HTMLDivElement>(null)

  const chosen = motos.find((m) => m.id === selectedMotoId)
  const brands = useMemo(() => getBrands(motos), [motos])
  // Si llegó desde una tarjeta, la marca sale de la moto elegida.
  const brand = chosen ? chosen.brand : brandChoice
  const modelsOfBrand = motos.filter((m) => m.brand === brand)

  const full: LeadFormValues = { ...values, paymentMethod: payment, motoId: selectedMotoId }

  const onBrandChange = (b: string) => {
    setBrandChoice(b)
    if (chosen && chosen.brand !== b) setSelectedMotoId(UNDECIDED)
  }

  useEffect(() => {
    if (status === 'success') successRef.current?.focus()
  }, [status])

  const validators: Partial<Record<keyof LeadFormValues, (v: string) => string | undefined>> = {
    firstName: (v) => validateName(v, 'nombre'),
    lastName: (v) => validateName(v, 'apellido'),
    phone: validatePhone,
    dni: validateDni,
  }

  const set = (key: keyof typeof EMPTY, value: string) => {
    setValues((p) => ({ ...p, [key]: value }))
    if (errors[key]) setErrors((p) => ({ ...p, [key]: validators[key]?.(value) }))
  }
  const blur = (key: keyof typeof EMPTY) => () => setErrors((p) => ({ ...p, [key]: validators[key]?.(values[key]) }))

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (status === 'loading') return
    const found = validateLead(full)
    setErrors(found)
    const first = Object.keys(found)[0]
    if (first) {
      document.getElementById(`lead-${first}`)?.focus()
      return
    }
    setStatus('loading')
    await submitLead(full)
    setStatus('success')
  }

  const reset = () => {
    setValues(EMPTY)
    setPayment('')
    setBrandChoice('')
    setErrors({})
    setStatus('idle')
  }

  if (status === 'success') {
    return (
      <div className="lead-success" ref={successRef} tabIndex={-1} role="status">
        <span className="lead-success__icon">
          <Icon name="check" size={28} />
        </span>
        <h3>¡Gracias por contactarte con San Vicente Automotores!</h3>
        <p>Recibimos tus datos correctamente. Nuestro equipo se comunicará con vos para continuar con tu consulta.</p>
        <p className="lead-success__moto">
          {chosen ? chosen.name : brand ? `${brand}, modelo a definir` : 'Moto a definir'}
          {payment && ` · ${paymentLabel(payment)}`}
        </p>
        <p className="lead-success__demo">
          <strong>Confirmación de demostración.</strong> Todavía no existe un sistema que reciba o guarde estos datos, por lo
          que nadie se comunicará con vos por este envío.
        </p>
        <div className="lead-success__actions">
          <ButtonLink variant="primary" href={whatsappUrl(`Hola! Quiero consultar por ${chosen?.name ?? 'una moto'}${payment ? ` (${paymentLabel(payment).toLowerCase()})` : ''}.`)} target="_blank" rel="noopener noreferrer">
            <Icon name="whatsapp" /> Escribir por WhatsApp
          </ButtonLink>
          <Button variant="ghost" onClick={reset}>
            Enviar otra consulta
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form className="lead-form" onSubmit={onSubmit} noValidate aria-busy={status === 'loading'}>
      {chosen && (
        <div className="lead-form__chosen">
          <img src={chosen.image.src} alt="" width={96} height={72} />
          <div>
            <small>Moto elegida</small>
            <strong>{chosen.name}</strong>
          </div>
          <button
            type="button"
            onClick={() => {
              setBrandChoice(chosen.brand)
              setSelectedMotoId(UNDECIDED)
            }}
          >
            Quitar
          </button>
        </div>
      )}
      <div className="lead-form__grid">
        <Field id="lead-firstName" label="Nombre" error={errors.firstName}>
          {(a) => (
            <input {...a} type="text" name="firstName" autoComplete="given-name" value={values.firstName} onChange={(e) => set('firstName', e.target.value)} onBlur={blur('firstName')} />
          )}
        </Field>
        <Field id="lead-lastName" label="Apellido" error={errors.lastName}>
          {(a) => (
            <input {...a} type="text" name="lastName" autoComplete="family-name" value={values.lastName} onChange={(e) => set('lastName', e.target.value)} onBlur={blur('lastName')} />
          )}
        </Field>
        <Field id="lead-phone" label="Teléfono" error={errors.phone} hint="Con código de área, sin 0 ni 15.">
          {(a) => (
            <input {...a} type="tel" name="phone" inputMode="tel" autoComplete="tel" placeholder="11 2345 6789" value={values.phone} onChange={(e) => set('phone', e.target.value)} onBlur={blur('phone')} />
          )}
        </Field>
        <Field id="lead-dni" label="DNI" error={errors.dni} hint="Solo números.">
          {(a) => (
            <input {...a} type="text" name="dni" inputMode="numeric" autoComplete="off" placeholder="12.345.678" value={values.dni} onChange={(e) => set('dni', formatDni(e.target.value))} onBlur={blur('dni')} />
          )}
        </Field>
        <fieldset
          className={`lead-form__full radio-group${errors.paymentMethod ? ' has-error' : ''}`}
          aria-describedby={errors.paymentMethod ? 'lead-paymentMethod-error' : undefined}
        >
          <legend>¿Cómo querés pagar?</legend>
          <div className="radio-group__options">
            {PAYMENT_OPTIONS.map((o, i) => (
              <label key={o.value} className="radio-card">
                <input
                  type="radio"
                  name="paymentMethod"
                  id={i === 0 ? 'lead-paymentMethod' : undefined}
                  value={o.value}
                  checked={payment === o.value}
                  onChange={() => {
                    setPayment(o.value)
                    setErrors((p) => ({ ...p, paymentMethod: undefined }))
                  }}
                />
                <span className="radio-card__body">
                  <strong>{o.label}</strong>
                  <small>{o.hint}</small>
                </span>
              </label>
            ))}
          </div>
          {errors.paymentMethod && (
            <p className="field__error" id="lead-paymentMethod-error">
              {errors.paymentMethod}
            </p>
          )}
        </fieldset>

        <Field id="lead-brand" label="Marca">
          {(a) => (
            <select {...a} name="brand" value={brand} onChange={(e) => onBrandChange(e.target.value)}>
              <option value="">Todavía no decidí</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          )}
        </Field>
        <Field id="lead-motoId" label="Modelo" error={errors.motoId}>
          {(a) => (
            <select
              {...a}
              name="motoId"
              disabled={!brand}
              value={chosen ? chosen.id : UNDECIDED}
              onChange={(e) => setSelectedMotoId(e.target.value)}
            >
              <option value={UNDECIDED}>{brand ? 'Todavía no elegí modelo' : 'Elegí una marca primero'}</option>
              {modelsOfBrand.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.model}
                </option>
              ))}
            </select>
          )}
        </Field>
      </div>

      <Button type="submit" size="lg" block disabled={status === 'loading'} className="lead-form__submit">
        {status === 'loading' ? (
          <>
            <span className="spinner" aria-hidden="true" /> Enviando…
          </>
        ) : (
          'Quiero que me contacten'
        )}
      </Button>
      <p className="lead-form__legal">
        Usamos tus datos únicamente para gestionar tu consulta y contactarte. La financiación está sujeta a evaluación crediticia.
      </p>
    </form>
  )
}
