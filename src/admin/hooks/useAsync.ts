import { useCallback, useEffect, useRef, useState } from 'react'

/** Carga asíncrona con estados de carga y error. `reload` vuelve a pedir los datos. */
export function useAsync<T>(fn: () => Promise<T>, deps: unknown[]) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tick, setTick] = useState(0)
  const silent = useRef(false)
  const fnRef = useRef(fn)
  fnRef.current = fn

  useEffect(() => {
    let alive = true
    if (!silent.current) setLoading(true)
    silent.current = false
    setError(null)
    fnRef
      .current()
      .then((d) => alive && setData(d))
      .catch((e: unknown) => alive && setError(e instanceof Error ? e.message : 'Ocurrió un error inesperado.'))
      .finally(() => alive && setLoading(false))
    return () => {
      alive = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, tick])

  /** `silent` refresca sin mostrar el estado de carga (para no parpadear tras guardar). */
  const reload = useCallback((opts?: { silent?: boolean }) => {
    silent.current = Boolean(opts?.silent)
    setTick((t) => t + 1)
  }, [])
  return { data, setData, loading, error, reload }
}

export function useMediaQuery(query: string) {
  const get = () => (typeof window !== 'undefined' ? window.matchMedia(query).matches : false)
  const [m, setM] = useState(get)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setM(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return m
}
