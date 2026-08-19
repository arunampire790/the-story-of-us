// CONFESSION FIELD — Chapter 06 "INSCRIPTION" (locked, stripped-down).
//
// Words have been spoken -> the space holds them -> prolonged silence -> the
// scene releases into Distance. The chapter is carried by two real-text
// confession lines (ConfessionLine); this decorative field supplies only the
// restrained cool near-black environment and its quiet pressurizing during the
// silent hold.
//
// Environment is SUBORDINATE to typography: during the main silence event the
// ONLY changes are a restrained grain opacity increase and a restrained
// vignette/depth increase. No thermal residue, no light contraction, no
// heartbeat line, no orbit, no progress/countdown/typing/bubble, no artificial
// drag or scroll resistance.
//
// No opaque full-bleed base: the global cinematic base (body + ambient-light +
// vignette + grain) carries the grading continuously (global #0b0a08), so there
// is no tonal seam from Chapter 05. Decorative layers are aria-hidden.
export default function ConfessionField() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
      role="presentation"
    >
      {/* field — translucent cool near-black, carried from Chapter 05's void.
          Semi-transparent ONLY: paints no opaque full-bleed base. */}
      <div
        data-conf="field"
        className="absolute inset-0"
        style={{
          opacity: 0,
          background:
            'radial-gradient(70% 55% at 50% 46%, rgba(116,134,154,0.10), rgba(84,96,112,0.05) 52%, transparent 78%)',
        }}
      />

      {/* press — restrained cool vignette/depth that increases during the held
          silence. Decorative, subordinate to typography. */}
      <div
        data-conf="press"
        className="absolute inset-0"
        style={{
          opacity: 0,
          background:
            'radial-gradient(120% 120% at 50% 50%, transparent 52%, rgba(7,9,11,0.85) 100%)',
        }}
      />

      {/* grain — the approved static grain treatment, localized to this stage
          so its presence can be intensified during the held silence. Never
          animated on its own; its opacity is driven by the held-line controller. */}
      <div
        data-conf="grain"
        className="absolute inset-0"
        style={{
          opacity: 0,
          backgroundImage: 'url("../assets/textures/grain.webp")',
          backgroundSize: '220px 220px',
          backgroundRepeat: 'repeat',
          mixBlendMode: 'overlay',
        }}
      />

      {/* THE HELD LINE affordance — a barely-visible cool, neutral vertical
          thread at the center. It pretastes the hold after the fragments come
          to rest and goes taut only while held. Decorative; opacity is driven
          by the held-line controller. Not a progress indicator. */}
      <div
        data-conf="thread"
        className="absolute left-1/2 top-[30%] bottom-[30%] w-px -translate-x-1/2"
        style={{
          opacity: 0,
          background:
            'linear-gradient(180deg, transparent 0%, rgba(168,186,208,0.30) 50%, transparent 100%)',
        }}
      />

      {/* pointer pooling — an extremely subtle cool radial that gathers toward
          the pointer, suggesting the dark is responsive to the hand. Not a
          rectangle, not a glow, not a hover cue with meaning. Position is
          updated by the section on pointer move; opacity only. */}
      <div
        data-conf="pool"
        className="pointer-events-none absolute left-0 top-0 rounded-full"
        style={{
          opacity: 0,
          width: '100vmax',
          height: '100vmax',
          background:
            'radial-gradient(circle, rgba(32,40,50,0.34) 0%, rgba(16,20,26,0.12) 45%, transparent 70%)',
        }}
      />
    </div>
  )
}
