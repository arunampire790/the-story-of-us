import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { createRoomsFieldTimeline } from '../animations/chapter04'
import RoomsField from '../components/chapter04/RoomsField'
import NarrativeCopy from '../components/chapter04/NarrativeCopy'

// CHAPTER 04 — CALLS. FINAL IMPLEMENTATION.
// Concept: THE ROOM REMEMBERS. One persistent physical environment seen from a
// fixed camera across an 8-beat scroll narrative: UNFAMILIAR → DISCOVER →
// FAMILIARITY → ESTABLISHED → JULY 17 DISRUPTION → CONTINUED BY PHONE →
// QUIET → WITHDRAWAL INTO DARKNESS (silence handoff).
//
// The sticky stage holds ONE room (RoomsField) whose atmosphere scroll changes
// the state — the environment is never replaced. Global base continuity is
// preserved (RoomsField paints no opaque full-bleed base). The approved
// narrative copy (NarrativeCopy) is layered above as real, scrub-revealed text:
// opening → July 17 → phone continuation → silence transition. No timestamp is
// displayed. The handoff into Silence is the withdrawal into genuine darkness.
export default function Chapter04() {
  const rootRef = useRef(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      const timeline = createRoomsFieldTimeline(rootRef.current, { reduced })
      return () => timeline?.kill()
    },
    { scope: rootRef, dependencies: [reduced] },
  )

  return (
    <section id="chapter-04" data-anchor="calls" ref={rootRef} className="relative w-full">
      {/* sticky stage — the persistent room + narrative copy */}
      <div className="sticky top-0 z-0 h-[100svh] w-full overflow-x-clip">
        <RoomsField />
        <NarrativeCopy />
      </div>

      {/* runway — scroll distance that drives the states via scrub */}
      <div className="relative z-10 min-h-[360svh]" aria-hidden="true" />
    </section>
  )
}