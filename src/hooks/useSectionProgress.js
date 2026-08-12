import { useState } from 'react'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from '../animations/setup'

// Reports a normalized scroll progress (0 → beginning, 1 → ending) for the
// given section ref. Scoped per-call: owns its own ScrollTrigger, no global
// listeners, cleanup-safe for React StrictMode.
//
// API: const progress = useSectionProgress(ref)
// Returns a stable 0 (resting/gated) value until a section element exists.
export function useSectionProgress(ref) {
  const [progress, setProgress] = useState(0)

  useGSAP(
    () => {
      const el = typeof ref === 'function' ? ref() : ref?.current
      if (!el) return

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          setProgress(self.progress)
        },
      })

      return () => trigger.kill()
    },
    { dependencies: [ref] },
  )

  return progress
}