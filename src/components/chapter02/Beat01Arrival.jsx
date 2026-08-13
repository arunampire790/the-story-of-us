import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { createArrivalEntrance } from '../../animations/chapter02'
import VoiceMotif from './VoiceMotif'

// BEAT 01 — ARRIVAL: entering the voice room.
// Large negative space; the chapter title sits low / bottom-left (editorial,
// NOT a centered stack); the aperture rings open above as the doorway; a small
// record marks the text→voice threshold. The other person's presence is NOT
// rendered here — it lives far away in the global PresenceLights layer.
// Beat-level timeline reveals local content only.
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

      {/* aperture / doorway — positioning wrapper + GSAP-animated inner.
          Sized by the viewport's smaller dimension (vmin) so the full concentric
          ring set (outer/middle/inner, ~0.84× wrapper width each on a square
          SVG) always fits inside the first viewport on any screen — dominant,
          never clipped, with negative space below for the bottom-left title. */}
      <div className="pointer-events-none absolute left-1/2 top-[14%] w-[min(40vmin,24rem)] -translate-x-1/2">
        <div data-arrival="aperture" className="origin-center">
          <VoiceMotif />
        </div>
      </div>
    </section>
  )
}