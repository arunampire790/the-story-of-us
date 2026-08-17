// SILENCE LABEL — Chapter 05 chapter label, rendered as real content (NOT
// aria-hidden) inside the sticky stage, layered above the decorative
// SilenceField. A single cool-toned editorial serif line naming the chapter.
// It is scrub-revealed while the warmth cools, so it reads as "the quiet
// naming of what is now absent." No invented memory, dialogue, date, or
// timestamp — just the chapter name, sourced from the fixed signal sequence.
const LINE = 'font-display text-[clamp(1.2rem,4vw,2.3rem)] font-light tracking-wide'
const CENTERED =
  'absolute left-1/2 top-[42%] w-max max-w-[min(90vw,36rem)] -translate-x-1/2 -translate-y-1/2 text-center'

export default function SilenceLabel() {
  return (
    <div className="pointer-events-none absolute inset-0" role="note" aria-label="Chapter five">
      <p data-sil="label" className={`${LINE} ${CENTERED}`} style={{ opacity: 0, color: '#9cb5d0' }}>
        Silence.
      </p>
    </div>
  )
}