import { useEffect, useRef, useState } from 'react'

const SAFETY_TIMEOUT_MS = 9000

// Coordinates only the assets that must be ready before the Loading
// Experience can move to `begin`. At minimum awaits document.fonts.ready.
// Optional future promises (images etc.) pass through Promise.allSettled so
// a failure never blocks the user. A safety timeout guarantees the begin
// state is always reachable.
export function usePreloaderAssets(optionalPromises = []) {
  const [ready, setReady] = useState(false)
  // Keep the consumer's array stable so the effect runs once.
  const promisesRef = useRef(optionalPromises)
  promisesRef.current = optionalPromises

  useEffect(() => {
    let active = true
    const settle = () => {
      if (active) setReady(true)
    }

    const fontsReady =
      typeof document !== 'undefined' && document.fonts
        ? document.fonts.ready
        : Promise.resolve()

    const timeout = setTimeout(settle, SAFETY_TIMEOUT_MS)

    Promise.allSettled([fontsReady, ...promisesRef.current]).then(() => {
      settle()
      clearTimeout(timeout)
    })

    return () => {
      active = false
      clearTimeout(timeout)
    }
  }, [])

  return ready
}