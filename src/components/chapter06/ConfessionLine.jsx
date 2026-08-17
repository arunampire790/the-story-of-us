// CONFESSION LINE — Chapter 06 confession fragments, rendered as REAL, readable
// DOM content (NOT aria-hidden) inside the sticky stage, layered above the
// decorative ConfessionField. Two source-supported fragments, in document
// order (frag-1 then frag-2). Cormorant (font-display), cool tone. They appear
// as quiet whole-line text (no typing, no character-by-character reveal, no
// bubble) and then hold, refusing to disappear during the silence.
// No explanatory labels, no translations, no timestamp, no date.
const FRAG =
  'font-display text-[clamp(1.35rem,4.6vw,2.6rem)] font-light leading-snug tracking-wide text-accent-cool'
const FRAG_ITEM =
  'w-max max-w-[min(90vw,34rem)] -translate-x-1/2 text-center'

export default function ConfessionLine() {
  return (
    <div
      className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"
      role="note"
      aria-label="Chapter six"
    >
      <p
        data-conf="frag-1"
        className={`${FRAG} ${FRAG_ITEM}`}
        style={{ opacity: 0 }}
      >
        en heart beat fast agudhu
      </p>
      <p
        data-conf="frag-2"
        className={`${FRAG} ${FRAG_ITEM}`}
        style={{ opacity: 0 }}
      >
        oruvela idhu love ah irukumo
      </p>
    </div>
  )
}