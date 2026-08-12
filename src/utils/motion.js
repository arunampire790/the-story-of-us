export const reducedMotionQuery = '(prefers-reduced-motion: reduce)'

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia(reducedMotionQuery).matches
}

export function reducedMotionChangeListener(callback) {
  if (typeof window === 'undefined') return () => {}
  const media = window.matchMedia(reducedMotionQuery)
  const handler = (event) => callback(event.matches)
  media.addEventListener('change', handler)
  return () => media.removeEventListener('change', handler)
}