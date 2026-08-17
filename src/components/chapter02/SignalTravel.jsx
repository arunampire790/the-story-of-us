// SIGNAL TRAVEL — Chapter 02 hero composition (narrative mechanism, Phase 9I).
//
// The existing string concept is preserved exactly (origin / path / destination
// / scroll draw). On top of it, two restrained layers let the SAME scrub tell
// the memory story WITHOUT a separate explanation:
//
//   1. destination halo — a thin, static, non-pulsing circle that fades in only
//      when the string arrives, so the destination "responds" by becoming
//      defined / quietly illuminated (never an orb, never a pulse).
//   2. typographic voice transition — the approved microcopy "FROM TYPING TO
//      VOICE" rendered twice at the same point: a system/metadata variant
//      (Inter, caps, tight) representing typing/digital, crossfading to an
//      editorial/display variant (Cormorant) representing the human voice. The
//      system → display crossfade IS the typing→voice beat.
//
// The SVG sits in a 200×160 design space, scales with "meet" inside the sticky
// full-viewport stage, so the whole geometry always fits viewport bounds.
// Purely decorative (aria-hidden). Colors come from the theme tokens. Elements
// that must start hidden carry inline opacity 0 so GSAP's .set() finds the
// intended initial state (no flash before the scrub configures it).
export default function SignalTravel() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true" role="presentation">
      <svg
        className="h-full w-full"
        viewBox="0 0 200 160"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
      >
        {/* connection path — origin (top centre) eases down toward the
            destination presence (bottom centre); drawn by scrub */}
        <path
          data-travel="path"
          d="M100 22 C100 58, 138 62, 130 100 C126 122, 108 138, 100 138"
          stroke="var(--color-accent)"
          strokeWidth={1}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          opacity={0}
        />

        {/* origin point — small ember where the signal begins (emerges from
            Chapter 01's centred closing space) */}
        <circle
          data-travel="origin"
          cx="100"
          cy="20"
          r={2}
          fill="var(--color-accent-warm)"
          vectorEffect="non-scaling-stroke"
          opacity={0}
        />

        {/* destination presence point — the signal arrives and rests */}
        <circle
          data-travel="destination"
          cx="100"
          cy="136"
          r={2.5}
          fill="var(--color-accent-warm)"
          vectorEffect="non-scaling-stroke"
          opacity={0}
        />

        {/* destination halo — thin, static, non-pulsing illumination that fades
            in only when the string arrives (STATE 04 RESPONSE) */}
        <circle
          data-travel="halo"
          cx="100"
          cy="136"
          r={7}
          stroke="var(--color-accent)"
          strokeWidth={0.75}
          vectorEffect="non-scaling-stroke"
          opacity={0}
        />
      </svg>

      {/* typographic voice transition — system → display crossfade */}
      <div className="absolute left-1/2 top-[42%] w-full -translate-x-1/2">
        <p
          data-travel="typeLabel"
          className="absolute left-1/2 top-0 -translate-x-1/2 whitespace-nowrap font-metadata text-[11px] uppercase tracking-[0.3em] text-text-muted"
          style={{ opacity: 0 }}
        >
          FROM TYPING TO VOICE
        </p>
        <p
          data-travel="voiceLabel"
          className="absolute left-1/2 top-[0px] -translate-x-1/2 whitespace-nowrap font-display text-2xl text-accent-warm"
          style={{ opacity: 0 }}
        >
          From typing to voice
        </p>
      </div>
    </div>
  )
}