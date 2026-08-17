// RECONSTRUCTED MEMORY — Chapter 03 scroll-driven fragment field.
//
// Six approved fragments (thambi, akka, 日本語, english, vanga, ponga) each sit
// at a distinct position in the visual field. As the user scrolls, each fades
// into place in sequence while a single thin record line draws through them,
// so the scattered fragments gradually assemble into ONE remembered record by
// the end. No title card, no chat UI, no timestamps, no avatars, no fabricated
// story text — only the real fragments and their connective geometry.
//
// Positions use a shared 0–100 x 0–100 coordinate space (left/top % for the
// labels and viewBox 0 0 100 100 / preserveAspectRatio="none" for the line), so
// labels and the connecting polyline align at any aspect ratio. The line is a
// non-scaling-stroke hairline (accent), drawn by GSAP via strokeDashoffset.
// The whole field is decorative (aria-hidden); labels are readable DOM text.
export default function ReconstructedScreen() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-10"
      aria-hidden="true"
      role="presentation"
    >
      {/* the record line — draws through all six fragments in reveal order */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
        <polyline
          data-record="line"
          points="40,30 60,30 32,52 68,52 34,74 66,74"
          stroke="var(--color-accent)"
          strokeWidth={1}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          opacity={0}
        />
      </svg>

      {/* fragments — one per memory, distinct position, revealed by scroll */}
      <span
        data-frag="0"
        className="absolute -translate-x-1/2 -translate-y-1/2 font-display text-[clamp(1.4rem,4.5vw,2.5rem)] font-light text-text-muted"
        style={{ left: '40%', top: '30%', opacity: 0 }}
      >
        thambi
      </span>

      <span
        data-frag="1"
        className="absolute -translate-x-1/2 -translate-y-1/2 font-display text-[clamp(1.4rem,4.5vw,2.5rem)] font-light text-text-muted"
        style={{ left: '60%', top: '30%', opacity: 0 }}
      >
        akka
      </span>

      <span
        data-frag="2"
        className="absolute -translate-x-1/2 -translate-y-1/2 font-display text-[clamp(1.4rem,4.5vw,2.5rem)] font-light text-text"
        style={{ left: '32%', top: '52%', opacity: 0 }}
      >
        日本語
      </span>

      <span
        data-frag="3"
        className="absolute -translate-x-1/2 -translate-y-1/2 font-display text-[clamp(1.4rem,4.5vw,2.5rem)] font-light text-text"
        style={{ left: '68%', top: '52%', opacity: 0 }}
      >
        english
      </span>

      <span
        data-frag="4"
        className="absolute -translate-x-1/2 -translate-y-1/2 font-display text-[clamp(1.4rem,4.5vw,2.5rem)] font-light text-text-muted"
        style={{ left: '34%', top: '74%', opacity: 0 }}
      >
        vanga
      </span>

      <span
        data-frag="5"
        className="absolute -translate-x-1/2 -translate-y-1/2 font-display text-[clamp(1.4rem,4.5vw,2.5rem)] font-light text-text-muted"
        style={{ left: '66%', top: '74%', opacity: 0 }}
      >
        ponga
      </span>
    </div>
  )
}