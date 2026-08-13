import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { createSignalEntrance } from '../../animations/chapter02'

// BEAT 02 — THE SIGNAL: the fragility of the HelloTalk connection.
// The environment (PresenceLights) remains the same room; the presence dims,
// cools and recedes (driven by the master timeline). This beat only reveals its
// restrained record. [VERIFY] lives internally in the data — never displayed.
export default function Beat02Signal({ data }) {
  const rootRef = useRef(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      const timeline = createSignalEntrance(rootRef.current, { reduced })
      return () => timeline.kill()
    },
    { scope: rootRef, dependencies: [reduced] },
  )

  return (
    <section
      ref={rootRef}
      className="relative z-10 flex min-h-svh items-start px-6 pt-[36vmin] sm:px-12"
      aria-label={data.title}
    >
      <div data-signal="content" className="ml-auto max-w-sm text-right">
        <h2
          data-signal="heading"
          className="font-display text-3xl font-light leading-tight text-text sm:text-4xl"
        >
          {data.title}
        </h2>
        <div data-signal="record" className="mt-6 space-y-2">
          {data.bodyLines.map((line) => (
            <p
              key={line}
              className="font-metadata text-xs uppercase tracking-[0.3em] text-text-muted"
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}