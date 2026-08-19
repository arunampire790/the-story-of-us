import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { createDistanceTimeline } from '../animations/chapter07'

// CHAPTER 07 — DISTANCE. "THE WIDENED SPAN".
//
// A relational gap: two presences remain, but the span between them widens.
// The cause of the fight is intentionally not recorded. No dialogue, date,
// travel imagery, reunion, lock, confession, or interactive gate belongs here.
export default function Chapter07() {
  const rootRef = useRef(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      const timeline = createDistanceTimeline(rootRef.current, { reduced })
      return () => timeline?.kill()
    },
    { scope: rootRef, dependencies: [reduced] },
  )

  return (
    <section
      id="chapter-07"
      data-anchor="distance"
      ref={rootRef}
      className="relative w-full"
    >
      <div className="sticky top-0 z-0 h-[100svh] w-full overflow-x-clip">
        {/* Near-black continuity from Chapter 06. No opaque base or cut. */}
        <div className="absolute inset-0 bg-bg" aria-hidden="true" />

        {/* Two persistent edge presences. Static position; opacity is the only motion. */}
        <div
          data-distance="presence-left"
          className="absolute left-[2.5vw] top-1/2 h-[24svh] w-px -translate-y-1/2 bg-accent-cool sm:left-[5vw]"
          aria-hidden="true"
        />
        <div
          data-distance="presence-right"
          className="absolute right-[2.5vw] top-1/2 h-[24svh] w-px -translate-y-1/2 bg-accent-cool sm:right-[5vw]"
          aria-hidden="true"
        />

        {/* The horizontal axis is the chapter's signature. */}
        <div
          data-distance="span"
          className="absolute left-1/2 top-1/2 h-px w-[90vw] -translate-x-1/2 -translate-y-1/2 bg-accent-cool"
          aria-hidden="true"
        />

        {/* The protected unknown: a crease, not an explanation. */}
        <div
          data-distance="crease"
          className="absolute left-1/2 top-1/2 h-10 w-px -translate-x-1/2 -translate-y-1/2 bg-accent-cool"
          aria-hidden="true"
        />

        {/* Restrained warm center for the handoff toward Chapter 08. */}
        <div
          data-distance="bloom"
          className="absolute left-1/2 top-1/2 h-16 w-px -translate-x-1/2 -translate-y-1/2 bg-accent-warm"
          aria-hidden="true"
        />

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-8 sm:px-12">
          <div className="relative w-full max-w-2xl text-center">
            <p
              data-distance="copy-opening"
              className="absolute inset-x-0 font-display text-[clamp(1.45rem,3.4vw,3rem)] leading-[1.05] tracking-[-0.02em] text-text"
            >
              We were still the same two. But the space between us had widened.
            </p>
            <p
              data-distance="copy-fight"
              className="absolute inset-x-0 font-display text-[clamp(1.45rem,3.4vw,3rem)] leading-[1.05] tracking-[-0.02em] text-text"
            >
              There was a fight. To this day I don’t know what started it.
            </p>
            <p
              data-distance="copy-pause"
              className="absolute inset-x-0 font-display text-[clamp(1.45rem,3.4vw,3rem)] leading-[1.05] tracking-[-0.02em] text-text"
            >
              For a while, the story held its breath.
            </p>
            <p
              data-distance="copy-future"
              className="absolute inset-x-0 font-display text-[clamp(1.45rem,3.4vw,3rem)] leading-[1.05] tracking-[-0.02em] text-text"
            >
              And later — after the distance — we talked about the future.
            </p>
            <p
              data-distance="copy-seven"
              className="absolute inset-x-0 font-display text-[clamp(1.45rem,3.4vw,3rem)] leading-[1.05] tracking-[-0.02em] text-accent-warm"
            >
              Seven years. A future on a plan — first stable, then together.
            </p>
            <span className="invisible block font-display text-[clamp(1.45rem,3.4vw,3rem)] leading-[1.05] tracking-[-0.02em]">
              Seven years. A future on a plan — first stable, then together.
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 min-h-[300svh]" aria-hidden="true" />
    </section>
  )
}
