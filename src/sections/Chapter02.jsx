import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { createSignalTravelTimeline } from '../animations/chapter02'
import PresenceField from '../components/chapter02/PresenceField'
import SignalTravel from '../components/chapter02/SignalTravel'

// CHAPTER 02 — HERO PROTOTYPE (Phase 9G): "THE SIGNAL TRAVELS"
//
// ONE continuous scroll scene, no narrative beats:
//   • a small origin point (the signal),
//   • a single thin connection path that extends as the user scrolls,
//   • a destination presence point the path approaches,
//   • a quiet settle at the end.
// origin → travel → arrival, read without any explanatory text.
//
// The sticky, full-viewport stage owns the whole geometry (SignalTravel SVG,
// scaled to fit with breathing room so nothing is clipped). PresenceField
// provides the existing dark environment / depth falloff (#0b0a08 → seamless
// entry from Chapter 01's closing darkness). The origin sits on the page's
// horizontal centre, so it visually emerges from Chapter 01's centred closing
// space. A tall runway gives ScrollTrigger the scroll distance to scrub the
// draw; reverse scrolling works naturally.
//
// This is a prototype ONLY. The four-beat story (Beat01–04) is intentionally
// not rendered here — no redesign of the real chapter yet.

export default function Chapter02() {
  const rootRef = useRef(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      const timeline = createSignalTravelTimeline(rootRef.current, { reduced })
      return () => timeline?.kill()
    },
    { scope: rootRef, dependencies: [reduced] },
  )

  return (
    <section
      id="chapter-02"
      data-anchor="voice-room"
      ref={rootRef}
      className="relative w-full"
    >
      {/* sticky stage — holds the persistent environment + the travel geometry */}
      <div className="sticky top-0 z-0 h-[100svh] w-full">
        <PresenceField />
        <SignalTravel />
      </div>

      {/* runway — scroll distance that drives the connection travel */}
      <div aria-hidden="true" className="relative -mt-[100svh] min-h-[260svh]" />
    </section>
  )
}