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
          so its presence can be scrubbed during the silence. Never animated. */}
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
    </div>
  )
}
