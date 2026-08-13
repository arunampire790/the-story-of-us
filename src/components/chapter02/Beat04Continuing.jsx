import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { createContinuingEntrance } from '../../animations/chapter02'

// BEAT 04 — CONTINUING: the quiet pivot to a steadier line.
// The environment's connecting thread steadies and the presence points settle
// (master timeline). No Instagram/Telegram logos — the platform change is shown
// only by the thread becoming steadier. This beat reveals the record only.
export default function Beat04Continuing({ data }) {
  const rootRef = useRef(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      const timeline = createContinuingEntrance(rootRef.current, { reduced })
      return () => timeline.kill()
    },
    { scope: rootRef, dependencies: [reduced] },
  )

  return (
    <section
      ref={rootRef}
      className="relative z-10 flex min-h-svh items-end px-6 pb-24 sm:px-12"
      aria-label={data.title}
    >
      <div data-continuing="content" className="ml-auto max-w-sm text-right">
        <h2
          data-continuing="heading"
          className="font-display text-3xl font-light leading-tight text-text sm:text-4xl"
        >
          {data.title}
        </h2>
        <div data-continuing="record" className="mt-6 space-y-2">
          {data.recordLines.map((line) => (
            <p
              key={line}
              className="font-metadata text-sm uppercase tracking-[0.3em] text-text-muted"
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}