// SILENCE FIELD — Chapter 05 "THE EMPTY SPACE" (The Cooling Hearth — locked).
//
// Absence communicated through SUBTRACTION, not a new dramatic object. The
// chapter opens on a residual warm ember-presence (conceptual continuity from
// Chapter 04's withdrawal — NOT the Chapter 04 physical anchor object, which
// is never reused). Across the scroll the warmth is progressively desaturated
// by a rising cool counterpoint, textural seams thin away, and negative space
// takes over — a cool, removed, empty field. A single subtle warm stir down the
// central axis at the very end hands off to Confession.
//
//   WARM RESIDUAL(0–10) → COOLING(10–45) → TEXTURE REDUCTION(45–68)
//   → EMPTY / QUIET HOLD(68–85) → AXIAL WARM HANDOFF(85–100).
//
// No opaque full-bleed base: the global cinematic base (body + ambient-light +
// vignette + grain) carries the grading continuously, so there is no tonal seam
// into the chapter. Only semi-transparent local atmosphere is added. No
// timestamp, no dialogue, no confession material, no waveform/glitch/particles.
// Purely decorative; aria-hidden. The chapter label is carried by the sibling
// SilenceLabel (NOT aria-hidden).
export default function SilenceField() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
      role="presentation"
    >
      {/* residual warmth — a low, ember-like presence carried from Chapter 04.
          It reads as "something warm was here," NOT as the room's anchor. */}
      <div
        data-sil="warm"
        className="absolute inset-0"
        style={{
          opacity: 0,
          background:
            'radial-gradient(58% 42% at 30% 96%, rgba(200,161,101,0.22), rgba(180,138,84,0.07) 48%, transparent 72%)',
        }}
      />

      {/* cool counterpoint — rising cool wash that desaturates the warmth
          toward the silence/absence tone (accent-cool). */}
      <div
        data-sil="cool"
        className="absolute inset-0"
        style={{
          opacity: 0,
          background:
            'radial-gradient(64% 46% at 74% 8%, rgba(138,160,184,0.16), rgba(138,160,184,0.05) 46%, transparent 70%)',
        }}
      />

      {/* faint textural seams — thin, cool-edged verticals that are removed to
          empty the field of physical/textural information. */}
      <div
        data-sil="seams"
        className="absolute inset-0"
        style={{
          opacity: 0,
          background:
            'repeating-linear-gradient(90deg, rgba(138,160,184,0.04) 0 1px, transparent 1px 58px)',
        }}
      />

      {/* cool empty haze — negative space dominates at the end. */}
      <div
        data-sil="haze"
        className="absolute inset-0"
        style={{
          opacity: 0,
          background:
            'radial-gradient(72% 60% at 50% 46%, rgba(138,160,184,0.10), rgba(84,96,112,0.05) 52%, rgba(15,17,20,0.5) 100%)',
        }}
      />

      {/* subtle axial warm stir — a single faint warm vertical down the center
          that hands off from the held emptiness into Confession. */}
      <div
        data-sil="handoff"
        className="absolute left-[30%] top-[46%] h-[16%] w-px"
        style={{
          opacity: 0,
          background: 'linear-gradient(180deg, transparent, rgba(224,192,138,0.5), transparent)',
        }}
      />
    </div>
  )
}