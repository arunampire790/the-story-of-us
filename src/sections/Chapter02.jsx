import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { chapter02Data } from '../data/chapter02'
import { createPresenceMasterTimeline } from '../animations/chapter02'
import PresenceField from '../components/chapter02/PresenceField'
import PresenceLights from '../components/chapter02/PresenceLights'
import VoiceMotif from '../components/chapter02/VoiceMotif'
import Beat01Arrival from '../components/chapter02/Beat01Arrival'
import Beat02Signal from '../components/chapter02/Beat02Signal'
import Beat03Voice from '../components/chapter02/Beat03Voice'
import Beat04Continuing from '../components/chapter02/Beat04Continuing'

// CHAPTER 02 — THE VOICE ROOM
// ONE continuous, FULL-VIEWPORT living room. A sticky room window (PresenceField
// + PresenceLights) persists across all four beats while the beat content
// scrolls over it, driven by one chapter-scoped master timeline. Covers
// distance → fragility → warmth → continuation → rest, stopping before the
// daily-call cadence and July 17/18. No chapter-break screen, no navigation.
//
// The outer element is deliberately NOT max-width (no w-cinematic): the room
// must span the full viewport so the camera feels INSIDE the environment, not
// looking at a centered 78rem panel. Beat content stays positioned/centered on
// its own (readable) constraints, so full-bleed here never hurts legibility.
export default function Chapter02() {
  const { meta, beats } = chapter02Data
  const rootRef = useRef(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      const timeline = createPresenceMasterTimeline(rootRef.current, { reduced })
      return () => timeline.kill()
    },
    { scope: rootRef, dependencies: [reduced] },
  )

  return (
    <section
      id={meta.id}
      data-anchor={meta.anchor}
      ref={rootRef}
      className="relative w-full"
    >
      {/* persistent room (sticky, full width, stays while beats scroll over it) */}
      <div className="sticky top-0 z-0 h-[100svh] w-full">
        <PresenceField />
        <PresenceLights />
      </div>

      {/* beat content scrolls over the persistent room */}
      <div className="relative z-10 -mt-[100svh]">
        <Beat01Arrival data={beats.beat01} />
        <Beat02Signal data={beats.beat02} />
        <Beat03Voice data={beats.beat03} />
        <Beat04Continuing data={beats.beat04} />

        {/* resting breathing space: dimmed aperture + generous empty height */}
        <div
          aria-hidden="true"
          className="flex min-h-[60svh] items-center justify-center px-6"
        >
          <div className="w-24 opacity-50 sm:w-32">
            <VoiceMotif />
          </div>
        </div>
      </div>
    </section>
  )
}