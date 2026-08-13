import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { createVoiceEntrance } from '../../animations/chapter02'

// Static placement for the spectral fragments (presentation, not story data).
// Scattered in the near field at varied depth so they read as soft utterances
// floating in the now-warm room — NOT cards, bubbles, a list, or chat messages.
const SPOTS = {
  thambi: { left: '6%', top: '2%' },
  akka: { left: '58%', top: '10%' },
  '日本語': { left: '16%', top: '46%' },
  english: { left: '62%', top: '64%' },
}

// BEAT 03 — IN THE VOICE: the emotional warmth peak.
// The presence approaches and warms (master timeline); the room glow + atmo
// subtly rise. The verified language fragments appear as spectral type in the
// near field. Remembering each fragment gently lifts a beat-scoped warm light
// (opacity only) so the room itself responds — no particles, no flash.
export default function Beat03Voice({ data }) {
  const rootRef = useRef(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      const timeline = createVoiceEntrance(rootRef.current, { reduced })
      return () => timeline.kill()
    },
    { scope: rootRef, dependencies: [reduced] },
  )

  return (
    <section
      ref={rootRef}
      className="relative z-10 flex min-h-svh items-center justify-center px-6"
      aria-label={data.title}
    >
      <div className="relative w-full max-w-4xl">
        <p
          data-voice="heading"
          className="mb-4 text-center font-metadata text-xs uppercase tracking-[0.35em] text-text-muted"
        >
          {data.title}
        </p>

        <div className="relative h-[70vmin]">
          {/* recollection light — the room responds as fragments are remembered */}
          <div
            data-voice="light"
            className="pointer-events-none absolute inset-0 opacity-0"
            style={{
              background:
                'radial-gradient(42% 46% at 50% 40%, rgba(200,161,101,0.16), transparent 70%)',
            }}
          />

          {data.fragments.map((fragment) => {
            const spot = SPOTS[fragment.word] || { left: '40%', top: '40%' }
            return (
              <div
                key={fragment.word}
                data-voice="fragment"
                className="absolute opacity-0"
                style={{ left: spot.left, top: spot.top }}
              >
                {/* primary memory — the word */}
                <span className="block font-quote text-4xl font-light leading-none text-accent-warm sm:text-6xl">
                  {fragment.word}
                </span>
                {/* secondary, verification-sensitive — kept legible, not noise */}
                <span className="mt-2 block max-w-[16rem] font-metadata text-xs uppercase leading-relaxed tracking-[0.22em] text-text-muted">
                  {fragment.note}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}