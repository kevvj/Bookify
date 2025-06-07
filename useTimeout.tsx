import { useEffect, useRef } from 'react'

export function useTimeout(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback)

  // Actualiza el callback si cambia
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Maneja el timeout
  useEffect(() => {
    if (delay === null) return

    const id = setTimeout(() => savedCallback.current(), delay)
    return () => clearTimeout(id)
  }, [delay])
}
