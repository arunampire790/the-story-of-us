import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { createDistanceTimeline } from '../animations/chapter07'

// CHAPTER 07 — DISTANCE. "THE 7-YEAR HORIZON".
//
// Pure narrative chapter, no interaction. Three exact source-supported lines
// about the designed pause and the future they talked about. The lines live in
// the document flow, separated by tall vertical padding, so the space between
// the words is physically felt as the reader scrolls. A cool dark slate wash
// grounds the chapter (kept semi-transparent so the global base stays
// continuous).
//
// Behind each line a small decorative scene drives the distance metaphor: two
// soft glowing memory orbs (her / him) sit in subtle proximity behind the
// first line, drift apart over a faint ruled grid + horizon glow behind the
// second, then converge into a single vertical track behind the third — the
// track carries the eye down toward the Train Journey (Chapter 08). These
// orbs/lines are decorative and aria-hidden; they never carry meaning.
//
// Same architecture family as the other chapters: GSAP + ScrollTrigger scrub,
// opacity/transform only, reduced motion collapses to a simple cross-fade.
// No sticky stage — the distance is literal, not pinned.

const LINE =
  'relative z-10 text-center font-display text-[clamp(1.4rem,4.8vw,2.9rem)] font-light leading-snug tracking-wide text-text'

export default function Chapter07() {
  const rootRef = useRef(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      const cleanup = createDistanceTimeline(rootRef.current, { reduced })
      return cleanup
    },
    { scope: rootRef, dependencies: [reduced] },
  )

  return (
    <section
      id="chapter-07"
      data-anchor="distance"
      ref={rootRef}
      className="relative w-full overflow-x-clip"
    >
      <div aria-hidden="true" className="edge-fade edge-fade-top" />

      {/* cool dark slate wash — deep, cool, and continuous with the global base */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 100% at 50% 28%, rgba(21,24,29,0.92) 0%, rgba(10,12,15,0.97) 78%)',
        }}
      />

      {/* narrative flow — tall vertical padding makes the distance literal */}
      <div className="relative z-10 mx-auto max-w-3xl px-6">
        <div className="relative flex h-[52svh] items-center justify-center">
          {/* decorative scene: two close memory nodes — subtle proximity */}
          <div data-dst="scene-1" aria-hidden="true" className="memory-scene">
            <span className="memory-node-slot">
              <span data-dst="node-a-1" className="memory-node memory-node-cool" />
            </span>
            <span className="memory-node-slot">
              <span data-dst="node-b-1" className="memory-node memory-node-warm" />
            </span>
          </div>
          <p data-dst="line-1" className={LINE}>
            enakum same feeling dha.
          </p>
        </div>

        <div className="relative flex h-[52svh] items-center justify-center">
          {/* decorative scene: nodes drift apart over the ambient grid/horizon */}
          <div data-dst="scene-2" aria-hidden="true" className="memory-scene">
            <div data-dst="grid-2" className="horizon-grid" />
            <div data-dst="glow-2" className="horizon-glow" />
            <span className="memory-node-slot">
              <span data-dst="node-a-2" className="memory-node memory-node-cool" />
            </span>
            <span className="memory-node-slot">
              <span data-dst="node-b-2" className="memory-node memory-node-warm" />
            </span>
          </div>
          <p data-dst="line-2" className={LINE}>
            but, enaku 7 years time venum...
          </p>
        </div>

        <div className="relative flex h-[52svh] items-center justify-center">
          {/* decorative scene: grid/horizon converges into the vertical track */}
          <div data-dst="scene-3" aria-hidden="true" className="memory-scene">
            <div data-dst="grid-3" className="horizon-grid" />
            <div data-dst="glow-3" className="horizon-glow" />
            <div data-dst="track-3" className="track-line" />
            <span className="memory-node-slot">
              <span data-dst="node-a-3" className="memory-node memory-node-cool" />
            </span>
            <span className="memory-node-slot">
              <span data-dst="node-b-3" className="memory-node memory-node-warm" />
            </span>
          </div>
          <p data-dst="line-3" className={LINE}>
            ...and financially stable aganum.
          </p>
        </div>

        {/* guide — draws down toward the Train Journey (Chapter 08) */}
        <div className="flex h-[24svh] items-start justify-center" aria-hidden="true">
          <span
            data-dst="guide"
            className="block w-px"
            style={{
              height: 160,
              background:
                'linear-gradient(180deg, rgba(138,160,184,0.55), rgba(138,160,184,0) 92%)',
              transformOrigin: 'top center',
            }}
          />
        </div>

        {/* trailing runout — room for the guide to draw down fully toward Chapter 08 */}
        <div className="min-h-[48svh]" aria-hidden="true" />
      </div>

      <div aria-hidden="true" className="edge-fade edge-fade-bottom" />
    </section>
  )
}