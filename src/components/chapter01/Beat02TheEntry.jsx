import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from '../../animations/setup'
import { useReducedMotion } from '../../hooks/useReducedMotion'

// BEAT 02 — THE ENTRY
// Editorial archival memory artifact. NOT a HelloTalk clone / screenshot /
// phone UI / chat / terminal / tutorial.
// Before interaction: quiet archival composition with a visible button.
// After interaction: button fades, RECONSTRUCTION label appears, code lines
// reveal progressively, then the final memory and narrator lines fade in.
// GSAP via useGSAP (finite timelines, StrictMode-safe). No loops.
export default function Beat02TheEntry({ data }) {
  const rootRef = useRef(null)
  const [revealed, setRevealed] = useState(false)
  const reduced = useReducedMotion()

  // ---- Entrance: the archival card before interaction ----
  useGSAP(
    () => {
      const entrance = gsap
        .timeline({ defaults: { ease: 'power2.out' }, delay: reduced ? 0 : 0.1 })
        .fromTo(
          '[data-beat02="meta"]',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: reduced ? 0 : 0.6 },
          0,
        )
        .fromTo(
          '[data-beat02="heading"]',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: reduced ? 0 : 0.7 },
          reduced ? 0 : 0.25,
        )
        .fromTo(
          '[data-beat02="body"]',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: reduced ? 0 : 0.7 },
          reduced ? 0 : 0.5,
        )
        .fromTo(
          '[data-beat02="button"]',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: reduced ? 0 : 0.6 },
          reduced ? 0 : 0.7,
        )

      entrance.play()
      return () => entrance.kill()
    },
    { scope: rootRef, dependencies: [reduced] },
  )

  // ---- Reveal: triggered only by user activation ----
  useGSAP(
    () => {
      if (!revealed) return
      const reveal = gsap
        .timeline({ defaults: { ease: 'power2.out' } })
        .to('[data-beat02="button"]', {
          opacity: 0,
          y: -8,
          duration: reduced ? 0 : 0.4,
          pointerEvents: 'none',
        })
        .fromTo(
          '[data-beat02="label"]',
          { opacity: 0 },
          { opacity: 1, duration: reduced ? 0 : 0.5 },
          reduced ? 0 : 0.2,
        )
        .fromTo(
          '[data-beat02="code-line"]',
          { opacity: 0 },
          { opacity: 1, duration: reduced ? 0 : 0.35, stagger: reduced ? 0 : 0.12 },
          reduced ? 0 : 0.4,
        )
        .fromTo(
          '[data-beat02="memory"]',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: reduced ? 0 : 0.6 },
          reduced ? 0 : 1.6,
        )
        .fromTo(
          '[data-beat02="narrator"]',
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: reduced ? 0 : 0.7 },
          reduced ? 0 : 2.2,
        )

      reveal.play()
      return () => reveal.kill()
    },
    { scope: rootRef, dependencies: [revealed, reduced] },
  )

  const handleReveal = () => {
    if (!revealed) setRevealed(true)
  }

  return (
    <section
      ref={rootRef}
      className="flex min-h-svh flex-col items-center justify-center px-6 py-24"
      aria-label={data.title}
      aria-busy={!revealed}
    >
      <div className="w-full max-w-3xl text-center">
        {/* Metadata */}
        <p data-beat02="meta" className="font-metadata text-xs uppercase tracking-[0.35em] text-text-muted">
          {data.label} · {data.roomLabel} · {data.year}
        </p>

        {/* Heading */}
        <h2 data-beat02="heading" className="mt-8 font-display text-3xl font-medium leading-snug text-text sm:text-5xl">
          {data.memoryHeading}
        </h2>

        {/* Body */}
        <div data-beat02="body" className="mt-6 space-y-2">
          {data.memoryBody.map((line) => (
            <p key={line} className="font-body text-base leading-relaxed text-text-muted">
              {line}
            </p>
          ))}
        </div>

        {/* Interaction */}
        <div className="mt-12 flex flex-col items-center">
          <button
            type="button"
            onClick={handleReveal}
            className="inline-flex items-center gap-3 border-b border-accent pb-1 font-metadata text-sm uppercase tracking-[0.3em] text-text transition-colors duration-200 hover:text-accent"
          >
            {data.buttonLabel}
          </button>

          <span data-beat02="label" className="mt-10 font-metadata text-xs uppercase tracking-[0.3em] text-accent opacity-0">
            {data.reconstructionLabel}
          </span>

          {/* Reconstructed code artifact */}
          <div className="mt-6 w-full max-w-xl text-left">
            <pre className="overflow-x-auto border border-border bg-surface p-6 font-mono text-sm leading-6 text-text">
              <code>
                {data.reconstructedLines.map((line, index) => (
                  <div key={`${index}-${line}`} data-beat02="code-line" className="whitespace-pre opacity-0">
                    {line === '' ? '\u00A0' : line}
                  </div>
                ))}
              </code>
            </pre>

            {/* Memory lines */}
            <div data-beat02="memory" className="mt-14 text-center opacity-0">
              <p className="font-display text-2xl font-light leading-relaxed text-text sm:text-3xl">
                {data.codeEnded}
              </p>
              <p className="font-display text-2xl font-light leading-relaxed text-accent-warm sm:text-3xl">
                {data.memoryIsnt}
              </p>
            </div>
          </div>

          {/* Narrator lines */}
          <div data-beat02="narrator" className="mt-20 max-w-xl opacity-0">
            {data.narratorLines.map((line, index) =>
              line === '' ? (
                <p key={index} className="h-3" />
              ) : (
                <p key={`${index}-${line}`} className="font-metadata text-xs uppercase leading-relaxed tracking-[0.3em] text-text-muted">
                  {line}
                </p>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  )
}