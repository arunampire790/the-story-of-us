import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap, { ScrollTrigger } from '../../animations/setup'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import SignalRings from './SignalRings'

// CHAPTER 01 — CLOSING BREATHING SPACE
// A deliberate, restrained ending after the C-code discovery.
// No dialogue, no "END OF CHAPTER" UI, no navigation — just the chapter's
// signal motif (the three concentric rings) reappearing dimmed and small in
// generous vertical space, so the user can sit with the first memory.
// Pure decoration (aria-hidden). Wrapper fade via GSAP (once on scroll);
// the ring circles' own pulse stays CSS-owned and untouched.
// Reduced motion: static dimmed motif, no animation.
export default function Chapter01Closing() {
  const rootRef = useRef(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      const target = '[data-closing="signal"]'

      if (reduced) {
        gsap.set(target, { opacity: 0.5 })
        return
      }

      gsap.set(target, { opacity: 0, scale: 0.92 })

      const timeline = gsap
        .timeline({ defaults: { ease: 'power2.out' }, paused: true })
        .to(target, { opacity: 0.5, scale: 1, duration: 1.2 })

      ScrollTrigger.create({
        trigger: rootRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
        once: true,
        animation: timeline,
      })

      return () => timeline.kill()
    },
    { scope: rootRef, dependencies: [reduced] },
  )

  return (
    <div
      ref={rootRef}
      className="flex min-h-[50svh] flex-col items-center justify-center px-6 py-32"
      aria-hidden="true"
    >
      <div data-closing="signal" className="w-24 sm:w-32">
        <SignalRings />
      </div>
    </div>
  )
}
