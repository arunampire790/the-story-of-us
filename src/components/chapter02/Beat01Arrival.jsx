import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { createArrivalEntrance } from '../../animations/chapter02'

// BEAT 01 — ARRIVAL: entering the voice room.
// Large negative space; the chapter title sits low / bottom-left (editorial,
// NOT a centered stack); the Presence Field/Lights environment (thread +
// presence dot) is the only visual — no ring motif. A small record marks the
// text→voice threshold. The other person's presence is NOT rendered here — it
// lives far away in the global PresenceLights layer. Beat timeline reveals
// local content only.
export default function Beat01Arrival({ data }) {
  const rootRef = useRef(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      const timeline = createArrivalEntrance(rootRef.current, { reduced })
      return () => timeline.kill()
    },
    { scope: rootRef, dependencies: [reduced] },
  )

  return (
    <section
      ref={rootRef}
      className="relative z-10 flex min-h-svh items-end px-6 pb-24 sm:px-12"
      aria-label={data.chapter}
    >
      <div className="relative">
        <p
          data-arrival="kicker"
          className="font-metadata text-xs uppercase tracking-[0.35em] text-text-muted"
        >
          {data.chapter}
        </p>
        <h1
          data-arrival="title"
          className="mt-4 max-w-md font-display text-4xl font-medium leading-none text-text sm:text-6xl"
        >
          {data.title}
        </h1>
        <p
          data-arrival="record"
          className="mt-6 font-metadata text-xs uppercase tracking-[0.3em] text-accent"
        >
          {data.introLines.join(' ')}
        </p>
      </div>
    </section>
  )
}