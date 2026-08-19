import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { createSilenceTimeline } from '../animations/chapter05'
import SilenceField from '../components/chapter05/SilenceField'
import SilenceLabel from '../components/chapter05/SilenceLabel'

// CHAPTER 05 — SILENCE. "THE EMPTY SPACE" / THE COOLING HEARTH (locked).
//
// The emotional low point of THE SIGNAL sequence — a distinct chapter between
// Calls (04) and Confession (06). Absence is communicated through SUBTRACTION,
// not a new dramatic object. The sticky stage holds one persistent cooling field
// (SilenceField) whose atmosphere scroll-changes: residual warmth → cool
// desaturation → texture thins → empty space held → a subtle axial warm handoff
// to Confession. The chapter label (SilenceLabel) is layered above as real,
// scrub-revealed text; no invented memory, dialogue, date, or timestamp, and no
// confession material is pulled into this chapter.
//
// Same architecture as Chapters 03/04: a sticky top-0 stage + a tall runway
// (here 300svh) that drives the scrub. Global base continuity is preserved
// (SilenceField paints no opaque full-bleed base). Reduced motion renders a
// static cool empty field with the label.
export default function Chapter05() {
  const rootRef = useRef(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      const timeline = createSilenceTimeline(rootRef.current, { reduced })
      return () => timeline?.kill()
    },
    { scope: rootRef, dependencies: [reduced] },
  )

  return (
    <section id="chapter-05" data-anchor="silence" ref={rootRef} className="relative w-full">
      <div aria-hidden="true" className="edge-fade edge-fade-top" />
      {/* sticky stage — the persistent cooling field + chapter label */}
      <div className="sticky top-0 z-0 h-[100svh] w-full overflow-x-clip">
        <SilenceField />
        <SilenceLabel />
      </div>

      {/* runway — scroll distance that drives the cooling via scrub */}
      <div className="relative z-10 min-h-[300svh]" aria-hidden="true" />
      <div aria-hidden="true" className="edge-fade edge-fade-bottom" />
    </section>
  )
}