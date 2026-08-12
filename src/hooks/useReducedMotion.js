import { useEffect, useState } from 'react'
import { prefersReducedMotion, reducedMotionChangeListener } from '../utils/motion'

export function useReducedMotion() {
  const [reduced, setReduced] = useState(() => prefersReducedMotion())

  useEffect(() => {
    return reducedMotionChangeListener(setReduced)
  }, [])

  return reduced
}