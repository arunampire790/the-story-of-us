import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { createConfessionTimeline } from '../animations/chapter06'
import ConfessionField from '../components/chapter06/ConfessionField'
import ConfessionLine from '../components/chapter06/ConfessionLine'

// CHAPTER 06 — CONFESSION. "INSCRIPTION" (locked, stripped-down).
//
// Words have been spoken -> the space holds them -> prolonged silence -> the
// scene releases quietly into Distance. Two source-supported confession
// fragments appear as whole-line text over a cool near-black field and then
// remain completely static through a prolonged silence — the silence is the
// main visual event, felt through stillness and a restrained grain + vignette
// increase only (never a timer, progress bar, scroll lock, or missing-reply
// implication). At the end both fragments recede together into near-black.
//
// Same architecture as Chapters 03–05: a sticky top-0 stage + a tall runway
// (here 300svh) that drives the scrub. Global base continuity is preserved
// (ConfessionField paints no opaque full-bleed base). The two fragments
// (ConfessionLine) are rendered as real, readable text; no timestamp, no date,
// no additional dialogue, no invented outcome. Reduced motion renders a static
// cool field with both fragments at rest.
export default function Chapter06() {
  const rootRef = useRef(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      const timeline = createConfessionTimeline(rootRef.current, { reduced })
      return () => timeline?.kill()
    },
    { scope: rootRef, dependencies: [reduced] },
  )

  return (
    <section id="chapter-06" data-anchor="confession" ref={rootRef} className="relative w-full">
      <div aria-hidden="true" className="edge-fade edge-fade-top" />
      {/* sticky stage — persistent exposure field + the two fragments */}
      <div className="sticky top-0 z-0 h-[100svh] w-full overflow-x-clip">
        <ConfessionField />
        <ConfessionLine />
      </div>

      {/* runway — scroll distance that drives the exposure via scrub */}
      <div className="relative z-10 min-h-[300svh]" aria-hidden="true" />
      <div aria-hidden="true" className="edge-fade edge-fade-bottom" />
    </section>
  )
}