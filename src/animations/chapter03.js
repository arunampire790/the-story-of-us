import gsap, { ScrollTrigger } from './setup'

// Chapter 03 — The Lock. Scrub timeline.
//
// The Lock is an INTERACTIVE memory checkpoint. Its opening establishes the
// piece (field light, dial, label, title, input chamber) via a short scrub on
// the runway. Crucially, the UNLOCK is driven by state (the user's correct
// answer), NOT by scroll: scrolling to the end of the runway never unlocks or
// reveals the next chapter. The rhetorical beats after OPENING (MEMORY SPACE,
// UNLOCK, HANDOFF) are carried by the React interaction and the release tween
// in the section — the lock is never a scroll obstacle.
//
// No pin, no loops, opacity/transform only, no RAF, no physics. Reduced motion:
// the lock is fully composed and interactive with no animation required.

const LK = (key) => `[data-lk="${key}"]`

export function createLockTimeline(scope, { reduced = false } = {}) {
  const field = scope.querySelector(LK('field'))
  const ground = scope.querySelector(LK('ground'))
  const dial = scope.querySelector(LK('dial'))
  const label = scope.querySelector(LK('label'))
  const title = scope.querySelector(LK('title'))
  const chamber = scope.querySelector(LK('chamber'))

  if (!field || !ground || !dial || !label || !title || !chamber) {
    return null
  }

  // Initial: darkness and stillness — the lock not yet open.
  gsap.set(field, { opacity: 0 })
  gsap.set(ground, { opacity: 0 })
  gsap.set(dial, { opacity: 0, rotation: -10, transformOrigin: '100px 100px' })
  gsap.set(label, { opacity: 0, y: 8 })
  gsap.set(title, { opacity: 0, y: 10 })
  gsap.set(chamber, { opacity: 0 })

  if (reduced) {
    // Static, complete, usable lock — no animation, fully interactive.
    gsap.set(field, { opacity: 0.75 })
    gsap.set(ground, { opacity: 0.85 })
    gsap.set(dial, { opacity: 0.9, rotation: 0 })
    gsap.set(label, { opacity: 0.85, y: 0 })
    gsap.set(title, { opacity: 1, y: 0 })
    gsap.set(chamber, { opacity: 1 })
    return null
  }

  const t = gsap.timeline({ defaults: { ease: 'none' }, paused: true })

  // OPENING 0–15 — darkness resolves into the lock: light, dial settling, label
  // and title, then the input chamber becomes active.
  t.to(field, { opacity: 0.75, duration: 12, ease: 'power1.out' }, 0)
    .to(ground, { opacity: 0.85, duration: 12, ease: 'power1.out' }, 0)
    .to(dial, { opacity: 0.9, rotation: 0, duration: 14, ease: 'power1.out' }, 1)
    .to(label, { opacity: 0.85, y: 0, duration: 6, ease: 'power1.out' }, 2)
    .to(title, { opacity: 1, y: 0, duration: 8, ease: 'power1.out' }, 4)
    .to(chamber, { opacity: 1, duration: 8, ease: 'power1.out' }, 8)

  // MEMORY SPACE (15–100): the lock stays present and quietly composed while
  // the user interacts. No unnecessary animation. Nothing is revealed by
  // scroll — the nickname must be entered first.

  ScrollTrigger.create({
    trigger: scope,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1,
    animation: t,
  })

  return t
}

// RELEASE — a restrained, state-driven unlock sequence (the opposite of a
// scroll reveal). Called once when the correct answer is given. It is a purely
// VISUAL beat that stays entirely inside Chapter 03: it never navigates, never
// scrolls, and never touches Chapter 04. The physical document scroll is the
// only thing that moves the user onward — releasing the Chapter 03 scroll gate.
//
// Sequence: LOCKED → ENTER TUTOR → SUBTLE UNLOCK → LOCK SCALES DOWN / ZOOMS OUT
// → LOCK + LOCAL FRAME FADE → FIELD FALLS QUIET → user scrolls normally into
// Chapter 04. The lock itself is the hero of the exit: a gentle camera pull-away
// (1 → 0.72), NOT an explosive or dramatic zoom. No confetti, no particles.
//
// To avoid fighting the scrub timeline, the release ONLY animates elements the
// scrub never owns: the dial SHELL (a wrapper around the decorative dial), the
// RELEASE FRAME (local chrome around the chamber), the LOCK wrapper (the whole
// composition) and a faint UNLOCK GLOW. The scrub-revealed chamber, field and
// dial group are never touched here, so reverse scroll never conflicts.
export function releaseLock(scope, { reduced = false } = {}) {
  const lock = scope.querySelector(LK('lock'))
  const frame = scope.querySelector(LK('frame'))
  const glow = scope.querySelector(LK('unlock-glow'))
  const shell = scope.querySelector(LK('dial-shell'))

  if (!lock || !frame || !shell) return null

  if (reduced) {
    // Reduced motion keeps the SAME logical flow without animation: the lock
    // switches directly to the unlocked state and the scroll gate releases —
    // no dial motion, no zoom/fade tween, no transition-dependent information.
    // The user simply scrolls onward into Chapter 04.
    return null
  }

  const tl = gsap.timeline({
    defaults: { ease: 'power2.inOut' },
  })

  // 1. RECOGNITION — the dial turns one quiet notch; a faint warm breath of
  //    local light. Restrained, not romantic.
  tl.to(shell, { rotation: 12, duration: 0.5, ease: 'power2.out', transformOrigin: '50% 50%' }, 0)
    .to(shell, { rotation: 5, duration: 0.7, ease: 'power2.inOut' }, 0.5)
    .to(glow, { opacity: 0.32, duration: 0.45, ease: 'power2.out' }, 0.15)
    .to(glow, { opacity: 0.32, duration: 0.8, ease: 'power1.out' }, 0.6)

  // 2. FRAME DIMS slightly first (chrome 1 → 0.25) before the lock lifts.
  tl.to(frame, { opacity: 0.25, duration: 0.5, ease: 'power2.out' }, 0.3)

  // 3. LOCK ZOOMS OUT + FADES — camera gently pulls away from the memory object.
  //    scale 1 → 0.72, opacity 1 → 0, ~1.5s, restrained power2.inOut.
  tl.to(lock, { scale: 0.72, opacity: 0, duration: 1.5, ease: 'power2.inOut', transformOrigin: '50% 50%' }, 0.55)
    .to(glow, { opacity: 0, duration: 1.2, ease: 'power1.out' }, 0.7)

  // 4. FRAME fully recedes to transparent as the object departs; the stage stays
  //    dark so the chapter falls quiet.
  tl.to(frame, { opacity: 0, duration: 1.0, ease: 'power2.in' }, 1.5)

  return tl
}