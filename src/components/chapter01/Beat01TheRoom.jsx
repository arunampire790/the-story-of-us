import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { createRoomEntranceTimeline } from '../../animations/chapter01'
import SignalRings from './SignalRings'

// BEAT 01 — THE ROOM
// The visitor discovers the first trace of the relationship.
// Editorial cinematic composition, NOT a HelloTalk clone/chat/screenshot/UI.
// Entrance driven by a single finite GSAP timeline (transform/opacity only)
// that is ScrollTrigger-played once when this section approaches the viewport.
// cleanup-safe under StrictMode. No pinning, no scrubbing, no scroll drivers.
export default function Beat01TheRoom({ data }) {
  const rootRef = useRef(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      const timeline = createRoomEntranceTimeline(rootRef.current, { reduced })
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

      <div data-beat01="rings" className="mt-10 w-40 origin-center sm:w-52">
        <SignalRings />
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