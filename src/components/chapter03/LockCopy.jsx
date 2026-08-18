// CHAPTER 03 — THE LOCK. INTERACTIVE CHAMBER.
//
// The real, accessible interaction: a nickname input + Unlock control, built
// INSIDE a compact mechanical-lock object so it reads as part of the lock, not
// a form dropped on the page. This is a narrative activity, not a security
// system. Everything here is UI/game copy only — none of the teasing lines or
// hints are source-of-truth memories.
//
// Composition (top → bottom, clear vertical breathing room):
//   CHAPTER 03 (label)  →  THE LOCK (title)  →  gap  →  LOCK OBJECT
//   [ small combination dial ]  →  [ recessed input chamber ]  →  instruction
//   →  UNLOCK control.
//
// Behaviour (unchanged from the approved implementation):
//   • Empty input → focus stays, nothing is counted (gentle, never punishing).
//   • Wrong answer → playfully teasing lines exactly as approved, one per
//     attempt.
//   • 4th wrong attempt → teasing line + Hint 1 unlock ("Naan unakku vecha
//     peru."); if still failing → Hint 2 unlocks ("Naan unna koopta peru.").
//   • Further attempts are always allowed — the user can never be trapped.
//   • Correct = TUTOR (case-insensitive, surrounding whitespace ignored).
//   • Success announces UNLOCKED and calls onUnlock for the visual release.
//   • Real <input> + <button>, Enter submits, keyboard accessible, announced
//     states, sufficient contrast. No drag-only interaction.
//   • The input is NOT masked (no bullets) — a memory game, not a password.
//
// The lock object as a whole (data-lk="chamber") is scrub-revealed by the
// Chapter 03 timeline; the dial (data-lk="dial" inside data-lk="dial-shell") is
// the scrub/release mechanism target. Everything stays dark; only the object
// carries local contrast.

import { useId, useRef, useState } from 'react'

const ANSWER = 'tutor'

const TEASING = [
  'unga appa name ila.',
  'konjam yosichu podu.',
  'ivlo seekrama marandhutiya?',
  'seri… oru hint kudukava?',
]

const HINT_ONE = 'Naan unakku vecha peru.'
const HINT_TWO = 'Naan unna koopta peru.'

function normalize(value) {
  return value.trim().toLowerCase()
}

export default function LockCopy({ onUnlock }) {
  const inputId = useId()
  const [value, setValue] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [unlocked, setUnlocked] = useState(false)
  const [message, setMessage] = useState('')
  const inputRef = useRef(null)

  const showHintOne = attempts >= 4
  const showHintTwo = attempts >= 6

  const handleSubmit = (event) => {
    event.preventDefault()
    if (unlocked) return

    const plain = value
    if (!normalize(plain)) {
      // Empty input: gentler than a wrong attempt — just prompt for input.
      inputRef.current?.focus()
      return
    }

    if (normalize(plain) === ANSWER) {
      setUnlocked(true)
      setMessage('')
      setValue('')
      onUnlock?.()
      return
    }

    const next = attempts + 1
    setAttempts(next)
    // The teasing line rides alongside (and after) the hint cue.
    setMessage(TEASING[Math.min(next - 1, TEASING.length - 1)])
    setValue('')
    inputRef.current?.focus()
  }

  return (
    <div
      className="pointer-events-none absolute inset-0 px-6 text-center"
      role="note"
      aria-label="Chapter three, the lock"
    >
      <div data-lk="lock" className="flex h-full flex-col items-center justify-center">
        {/* chapter label + title — scrub-revealed by the Chapter 03 timeline */}
        <p
          data-lk="label"
          className="font-metadata text-[0.65rem] uppercase tracking-[0.42em] text-text-muted"
          style={{ opacity: 0 }}
        >
          Chapter 03
        </p>
        <h2
          data-lk="title"
          className="font-display mt-2 text-[clamp(2.4rem,9vw,4.2rem)] font-light leading-none text-text"
          style={{ opacity: 0 }}
        >
          The&nbsp;Lock
        </h2>

        {/* breathing room below the title */}
        <div className="h-8 sm:h-12" />

        {/* RELEASE-OWNED FRAME — the lock's local frame/chrome. The scrub only
            reveals the chamber inside it; this wrapper is only ever animated by
            the release (dim → transparent), so reverse scroll never fights it.
            It also sizes the object. */}
        <div data-lk="frame" className="relative w-full max-w-[20rem]">
          {/* release-owned subtle local light — a restrained, warm breath on
              recognition. Not a bloom; it dies with the zoom. */}
          <div
            data-lk="unlock-glow"
            className="pointer-events-none absolute -inset-6 rounded-full bg-[rgba(224,192,138,0.28)] blur-2xl"
            style={{ opacity: 0 }}
            aria-hidden="true"
          />

          {/* THE LOCK OBJECT — compact mechanical housing, scrub-revealed as one
              unit. Warm-neutral hairline, very dark interior, recessed chamber.
              Not a browser input, not a login card. This object stays MOUNTED in
              both locked and unlocked states so the release timeline can still
              find the dial shell; only the inner controls swap. */}
          <div
            data-lk="chamber"
            className="relative border border-[rgba(214,180,128,0.20)] bg-[rgba(18,15,12,0.55)] px-6 pb-5 pt-6"
            style={{ opacity: 0 }}
          >
          {/* subtle inner hairline — a recessed face */}
          <div className="pointer-events-none absolute inset-x-2 top-2 bottom-2 border border-[rgba(214,180,128,0.08)]" />

          {/* small combination dial — mechanism, not a clock. The dial-shell
              wrapper is the release-tween target (rotation) and the dial group
              is scrub-owned, so the mechanical click never fights the scroll. */}
          <div className="relative flex justify-center">
            <div data-lk="dial-shell" className="relative h-20 w-20 sm:h-24 sm:w-24">
              <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
                <g data-lk="dial" style={{ transformOrigin: '100px 100px' }}>
                  {/* outer hairline ring */}
                  <circle
                    cx="100"
                    cy="100"
                    r="88"
                    fill="none"
                    stroke="rgba(214,180,128,0.24)"
                    strokeWidth="1.2"
                  />
                  {/* faint inner ring */}
                  <circle
                    cx="100"
                    cy="100"
                    r="76"
                    fill="none"
                    stroke="rgba(214,180,128,0.12)"
                    strokeWidth="1"
                  />
                  {/* a few restrained ticks — enough to feel mechanical,
                      NOT a clock face */}
                  <line
                    x1="100"
                    y1="14"
                    x2="100"
                    y2="24"
                    stroke="rgba(214,180,128,0.30)"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="40"
                    y1="52"
                    x2="47"
                    y2="58"
                    stroke="rgba(214,180,128,0.18)"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                  <line
                    x1="160"
                    y1="52"
                    x2="153"
                    y2="58"
                    stroke="rgba(214,180,128,0.18)"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                  {/* central keyway — a quiet vertical slot, the dial's index */}
                  <path
                    d="M100 78 C 92 80, 88 88, 90 100 C 91 112, 96 118, 100 118 C 104 118, 109 112, 110 100 C 112 88, 108 80, 100 78 Z"
                    fill="rgba(11,10,8,0.9)"
                    stroke="rgba(214,180,128,0.26)"
                    strokeWidth="1"
                  />
                  <path
                    d="M100 86 L 100 112 M 98 100 L 102 100"
                    stroke="rgba(214,180,128,0.20)"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                </g>
              </svg>
            </div>
          </div>

          {!unlocked ? (
            <form className="pointer-events-auto" onSubmit={handleSubmit} aria-label="Unlock the memory lock">
              {/* the recessed input chamber — clearly where the user types */}
              <div className="relative mt-6">
                <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-[rgba(214,180,128,0.14)]" />
                <input
                  ref={inputRef}
                  id={inputId}
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  aria-label="Enter the nickname"
                  placeholder="type the nickname"
                  autoComplete="off"
                  spellCheck="false"
                  enterKeyHint="done"
                  className="font-display w-full bg-transparent px-1 py-3 text-center text-[clamp(1.35rem,6vw,1.9rem)] font-light tracking-[0.12em] text-text placeholder:text-text-muted caret-accent outline-none transition-colors focus:bg-[rgba(200,161,101,0.04)]"
                />
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-[rgba(214,180,128,0.14)]" />
              </div>

              {/* one small contextual instruction — UI text, not a memory.
                  Visually secondary to the input: establishes the act of
                  remembering a nickname without hinting at the answer. */}
              <p className="font-metadata mt-4 text-[0.62rem] uppercase tracking-[0.24em] text-text-muted/80">
                the name you gave her.
              </p>

              {/* unlock control — restrained, part of the object */}
              <button
                type="submit"
                className="font-metadata mt-5 inline-flex cursor-pointer items-center justify-center border border-[rgba(214,180,128,0.28)] px-8 py-2.5 text-[0.7rem] uppercase tracking-[0.32em] text-text transition-colors hover:border-accent hover:text-accent-warm focus-visible:outline-none"
              >
                Unlock
              </button>
            </form>
          ) : (
            /* SUCCESS — the lock releases into the unlocked state. The dial
                click / stage recess is driven from Chapter03. */
            <div className="pointer-events-none mt-6 flex flex-col items-center" data-lk="unlocked">
              <p
                className="font-metadata text-[0.65rem] uppercase tracking-[0.42em] text-text-muted"
                aria-live="assertive"
              >
                Unlocked
              </p>
              <h2 className="font-display mt-2 text-[clamp(1.8rem,6vw,2.8rem)] font-light leading-none text-accent-warm">
                UNLOCKED
              </h2>
            </div>
          )}
        </div>
        </div>

        {/* announce wrong attempts + hints; polite so it never interrupts */}
        {!unlocked && (
          <p
            className="font-metadata mt-5 min-h-[4.5rem] w-full max-w-[20rem] text-[0.8rem] leading-relaxed tracking-[0.02em] text-accent-warm"
            aria-live="polite"
            role="status"
          >
            {message && <span className="block">{message}</span>}
            {showHintOne && (
              <span className="mt-1 block text-text-muted">{HINT_ONE}</span>
            )}
            {showHintTwo && (
              <span className="mt-1 block text-text-muted">{HINT_TWO}</span>
            )}
          </p>
        )}
      </div>
    </div>
  )
}