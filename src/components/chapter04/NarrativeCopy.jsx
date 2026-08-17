// CHAPTER 04 — NARRATIVE COPY. The approved girlfriend-facing narrative,
// rendered as real content (NOT aria-hidden) inside the sticky stage, layered
// above the decorative RoomsField. No cards, no timeline, no UI containers —
// only restrained, scrub-revealed text.
//
//   OPENING    — "We kept calling. Every day, the same warm signal — the room,
//                the voice, each other."
//   JULY 17    — "One night in July, Instagram and Telegram both failed — so
//                she called me."
//   PHONE      — "That night it wasn't an app. It was just her voice on a
//                phone, the connection held anyway."
//   SILENCE    — "And then, the story grew quiet."  (transition only)
//
// These lines are narrative synthesis except the July 17 event, which the
// source explicitly supports. No timestamp, no durations, no acquisition story,
// no amma teasing, no invented dialogue. Opacity is scrub-driven by the Chapter
// 04 timeline via the data-narr attributes.

const LINE = 'font-display text-[clamp(1.1rem,3.4vw,2rem)] font-light leading-snug text-text'
const CENTERED =
  'absolute left-1/2 top-[30%] w-max max-w-[min(90vw,38rem)] -translate-x-1/2 -translate-y-1/2 text-center'

export default function NarrativeCopy() {
  return (
    <div className="pointer-events-none absolute inset-0" role="note" aria-label="Chapter four narrative">
      {/* opening — warm, restrained; kept above the anchor */}
      <p
        data-narr="opening"
        className={`${LINE} ${CENTERED} top-[24%]`}
        style={{ opacity: 0 }}
      >
        We kept calling. Every day, the same warm signal — the room, the voice,
        each other.
      </p>

      {/* july 17 — appears at the environmental disruption */}
      <p
        data-narr="july17"
        className={`${LINE} ${CENTERED}`}
        style={{ opacity: 0 }}
      >
        One night in July, Instagram and Telegram both failed — so she called
        me.
      </p>

      {/* phone continuation — appears as the alternate light reveals */}
      <p
        data-narr="phone"
        className={`${LINE} ${CENTERED}`}
        style={{ opacity: 0 }}
      >
        That night it wasn’t an app. It was just her voice on a phone, the
        connection held anyway.
      </p>

      {/* silence transition — appears during the final withdrawal */}
      <p
        data-narr="silence"
        className={`${LINE} ${CENTERED} top-[26%]`}
        style={{ opacity: 0 }}
      >
        And then, the story grew quiet.
      </p>
    </div>
  )
}