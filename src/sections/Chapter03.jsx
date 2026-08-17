import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { createReconstructedScreenTimeline } from '../animations/chapter03'
import MessageField from '../components/chapter03/MessageField'
import ReconstructedScreen from '../components/chapter03/ReconstructedScreen'

// CHAPTER 03 — RECONSTRUCTED MEMORY. CONTENT/STORY PROTOTYPE (PHASE 9J).
// Six approved fragments (thambi · akka · 日本語 · english · vanga · ponga)
// occupy distinct positions in the visual field. On scroll each fades in
// sequentially while the thin record line draws through them, so the fragments
// gradually assemble into one remembered record by the end. No title card, no
// chat UI, no fabricated story text.
//
// The MessageField's centered thread continues Chapter 02's connection spine
// across the boundary on the same continuous base — no ring motif, no
// SignalRings. The sticky stage is intentionally tall (long runway) so each
// fragment reveal has its own vertical breathing room.
export default function Chapter03() {
  const rootRef = useRef(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      const timeline = createReconstructedScreenTimeline(rootRef.current, { reduced })
      return () => timeline?.kill()
    },
    { scope: rootRef, dependencies: [reduced] },
  )

  return (
    <section id="chapter-03" data-anchor="chapter-03" ref={rootRef} className="relative w-full">
      {/* sticky stage — field holds the record line + fragment constellation */}
      <div className="sticky top-0 z-0 h-[100svh] w-full overflow-x-clip">
        <MessageField />
        <ReconstructedScreen />
      </div>

      {/* vertical runway that drives the sequential reveals via scroll scrub */}
      <div className="relative z-10 min-h-[380svh]" aria-hidden="true" />
    </section>
  )
}