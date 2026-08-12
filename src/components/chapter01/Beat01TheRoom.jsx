import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from '../../animations/setup'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import SignalLine from './SignalLine'

// BEAT 01 — THE ROOM
// The visitor discovers the first trace of the relationship.
// Editorial cinematic composition, NOT a HelloTalk clone/chat/screenshot/UI.
// Entrance via a single finite GSAP timeline (transform/opacity only),
// cleanup-safe under StrictMode. No pinning, no scroll drivers.
export default function Beat01TheRoom({ data }) {
  const rootRef = useRef(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      const timeline = gsap
        .timeline({
          defaults: { ease: 'power2.out' },
          delay: reduced ? 0 : 0.2,
        })
        .fromTo(
          '[data-beat01="metadata"]',
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: reduced ? 0 : 0.6 },
          0,
        )
        .fromTo(
          '[data-beat01="title"]',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: reduced ? 0 : 0.7 },
          reduced ? 0 : 0.35,
        )
        .fromTo(
          '[data-beat01="signal-wrap"]',
          { opacity: 0, scaleX: 0.25 },
          { opacity: 1, scaleX: 1, duration: reduced ? 0 : 0.7 },
          reduced ? 0 : 0.7,
        )
        .fromTo(
          '[data-beat01="memory"]',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: reduced ? 0 : 0.8 },
          reduced ? 0 : 1.05,
        )

      timeline.play()

      return () => timeline.kill()
    },
    { scope: rootRef, dependencies: [reduced] },
  )

  return (
    <section
      ref={rootRef}
      className="flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center"
      aria-label={data.chapter}
    >
      <p
        data-beat01="metadata"
        className="font-metadata text-xs uppercase tracking-[0.35em] text-text-muted"
      >
        {data.chapter}
      </p>

      <h1
        data-beat01="title"
        className="mt-6 font-display text-4xl font-medium leading-none text-text sm:text-6xl"
      >
        {data.title}
      </h1>

      <div data-beat01="signal-wrap" className="mt-10 origin-center">
        <SignalLine />
      </div>

      <blockquote
        data-beat01="memory"
        className="mt-12 max-w-2xl font-quote text-2xl font-light leading-relaxed text-text sm:text-4xl"
      >
        {data.roomDescription}
      </blockquote>
    </section>
  )
}