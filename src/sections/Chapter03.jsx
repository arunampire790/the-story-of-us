import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { createLockTimeline, releaseLock } from '../animations/chapter03'
import LockField from '../components/chapter03/LockField'
import LockCopy from '../components/chapter03/LockCopy'

// CHAPTER 03 — THE LOCK. FINAL IMPLEMENTATION.
// A small interactive memory checkpoint between the voice (Ch02) and the calls
// (Ch04). The user remembers the nickname she gave — "Tutor". The lock is an
// experience, NOT a real security system.
//
// Flow:  Ch02 voice → Ch03 LOCK → user enters "Tutor" → LOCK UNLOCKS → SUBTLE
//        UNLOCK → the lock ZOOMS OUT (camera pulls away) → lock + local frame
//        fade → Ch03 field falls quiet → the user continues NORMAL scroll →
//        Chapter 04 naturally enters.
//
// SCROLL GATE — Chapter 03 acts as a gate on the Ch03 → Ch04 boundary ONLY.
// While the lock is unsolved the user can scroll freely backward (into Ch02)
// and interact with the lock, but downward scrolling clamps just before Chapter
// 04 so it cannot be crossed. The gate never freezes the document, never hides
// the scrollbar, and is removed immediately on unlock — the physical scroll is
// the only mechanism that moves the user into Chapter 04.
//
// Unlock NEVER navigates: no scrollIntoView, no location change, no route
// change, no forced jump. The release is a time-based visual beat INSIDE this
// chapter, and releasing the gate simply lets the existing document flow reach
// Chapter 04.
//
// It is deliberately distinct from Chapter 02: it does NOT reuse VoiceMotif,
// SignalRings, or the language fragments (thambi · akka · vanga · ponga ·
// 日本語 · english). The lock is its own chapter, not another showing of Ch02's
// language.
//
// Architecture: a sticky stage (lock field + interactive copy) + a short runway
// whose scrub drives ONLY the OPENING establish. The unlock is state-driven —
// it never depends on scroll, and scrolling never reveals the next chapter.
// Reduced motion keeps the same logical flow without animation.
export default function Chapter03() {
  const rootRef = useRef(null)
  const reduced = useReducedMotion()
  const [unlocked, setUnlocked] = useState(false)
  const unlockedRef = useRef(false)

  // Keep the gate's scroll listener reading the live unlocked state without
  // re-subscribing on every change.
  useEffect(() => {
    unlockedRef.current = unlocked
  }, [unlocked])

  // Opening establish (scrub) for the sticky stage + runway.
  useGSAP(
    () => {
      const timeline = createLockTimeline(rootRef.current, { reduced })
      return () => timeline?.kill()
    },
    { scope: rootRef, dependencies: [reduced] },
  )

  // State-driven release on the correct answer: SUBTLE UNLOCK → LOCK ZOOMS OUT
  // → LOCK + FRAME FADE → field falls quiet. Time-based and fully inside
  // Chapter 03 — never navigates or scrolls.
  useGSAP(
    () => {
      if (!unlocked) return
      const timeline = releaseLock(rootRef.current, { reduced })
      return () => timeline?.kill()
    },
    { scope: rootRef, dependencies: [unlocked, reduced] },
  )

  // FORWARD-ONLY SCROLL GATE. Least-invasive clamping: a scroll listener that
  // holds the only scroll position at which Chapter 04 would start to reveal.
  // Backward movement is untouched; the document, scrollbar and Lenis all keep
  // working. On unlock the clamp is released immediately, mid-gesture.
  useEffect(() => {
    const section = rootRef.current
    if (!section) return

    let limit = 0
    const computeLimit = () => {
      // Just before Chapter 04's top touches the viewport bottom.
      limit = Math.max(0, section.offsetTop + section.offsetHeight - window.innerHeight - 48)
    }
    computeLimit()

    const onScroll = () => {
      if (unlockedRef.current) return
      if (window.scrollY > limit) window.scrollTo(0, limit)
    }

    if (!unlockedRef.current) {
      document.body.style.overscrollBehaviorY = 'contain'
    }

    window.addEventListener('resize', computeLimit)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('resize', computeLimit)
      window.removeEventListener('scroll', onScroll)
      document.body.style.overscrollBehaviorY = ''
    }
  }, [])

  // Release the gate the moment the lock is solved — no second interaction.
  useEffect(() => {
    if (unlocked) document.body.style.overscrollBehaviorY = ''
  }, [unlocked])

  return (
    <section id="chapter-03" data-anchor="the-lock" ref={rootRef} className="relative w-full">
      {/* sticky stage — the memory lock (decorative field + interactive copy).
          The release tween animates the lock/frame wrappers inside the copy,
          not this stage, so the opening scrub and the zoom-out never conflict. */}
      <div
        data-lk="stage"
        className="sticky top-0 z-0 h-[100svh] w-full overflow-x-clip"
        style={{ opacity: 1 }}
      >
        <LockField />
        <LockCopy onUnlock={() => setUnlocked(true)} />
      </div>

      {/* runway — scroll distance that drives the OPENING establish via scrub.
          The runway exists so the opening reveals naturally; the unlock itself
          is completed in place. The gate clamps at the end of this runway, and
          once solved the user simply continues scrolling it and into Chapter
          04. */}
      <div className="pointer-events-none relative z-10 min-h-[120svh]" aria-hidden="true" />
    </section>
  )
}