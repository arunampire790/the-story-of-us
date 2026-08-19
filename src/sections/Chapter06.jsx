import { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { createHeldLineController } from '../animations/chapter06'
import ConfessionField from '../components/chapter06/ConfessionField'
import ConfessionLine from '../components/chapter06/ConfessionLine'

// CHAPTER 06 — CONFESSION. "THE HELD LINE".
//
// The two real confession fragments are present; the user presses and holds the
// dark field and the environment grows heavier while the words stay. Releasing
// early returns to a quiet idle (retry freely). Holding through the full
// silence is the only completion: both fragments recede TOGETHER into
// unresolved dark that hands to Distance. There is no reply, no resolution, no
// timestamp, no progress, no meter, no success indicator, no instruction copy.
//
//   Chapter 03 = REMEMBER   (produce knowledge -> unlock)
//   Chapter 06 = STAY       (endure presence -> remain)
//
// Interaction model (state-driven, not scroll):
//   - The entire sticky stage is the hold target; it is deliberately NOT a
//     button. No pointer cursor, no border, no label.
//   - Desktop/pen: press-and-hold claims immediately. Pointer captured so the
//     gesture persists through drift.
//   - Touch: a still press becomes a hold after a short acknowledge window; a
//     quick vertical swipe is left to native scroll (vertical scrolling stays
//     possible — no page trap).
//   - Keyboard: focusing the stage and holding Space performs the same hold.
//   - Completion is a hidden silence arc (tunable, never shown): the ONLY
//     visible change is mounting heaviness, then the fragments fading together.
//   - pointercancel / touchcancel / lostcapture / blur / visibility loss all
//     release safely — no stuck held state.
//   - Reduced motion collapses to a single instant presence step (no long hold).
//
// Scroll: an invisible, temporary forward clamp prevents crossing into Chapter
// 07 until completion; backward scroll is always free. No global overflow
// hidden, no permanent touch-action lock.

// Tunable interaction constants (never rendered).
const HOLD_ARC_MS = 12000 // how long the silence must be held (felt, not a clock)
const ACK_MS = 180 // touch: still-press window before it becomes a hold
const DRIFT_PX = 10 // touch: travel above this = scroll, not a hold

export default function Chapter06() {
  const rootRef = useRef(null)
  const stageRef = useRef(null)
  const poolRef = useRef(null)
  const reduced = useReducedMotion()
  const reducedRef = useRef(reduced)
  const controllerRef = useRef(null)
  const completedRef = useRef(false)
  const holdActiveRef = useRef(false)
  const keyboardHoldRef = useRef(false)
  const pendingRef = useRef(null)
  const arcTimerRef = useRef(null)

  useEffect(() => {
    reducedRef.current = reduced
  }, [reduced])

  useEffect(() => {
    poolRef.current = rootRef.current?.querySelector('[data-conf="pool"]') ?? null
    return () => {
      poolRef.current = null
    }
  }, [])

  useGSAP(
    () => {
      const controller = createHeldLineController(rootRef.current, { reduced })
      controllerRef.current = controller
      return () => {
        controller?.kill()
        controllerRef.current = null
      }
    },
    { scope: rootRef, dependencies: [reduced] },
  )

  const cancelArc = () => {
    if (arcTimerRef.current != null) {
      clearTimeout(arcTimerRef.current)
      arcTimerRef.current = null
    }
  }

  const releaseHold = () => {
    holdActiveRef.current = false
    keyboardHoldRef.current = false
    pendingRef.current = null
    cancelArc()
    if (!completedRef.current) controllerRef.current?.release()
  }

  const completeHold = () => {
    if (completedRef.current) return
    completedRef.current = true
    holdActiveRef.current = false
    keyboardHoldRef.current = false
    pendingRef.current = null
    cancelArc()
    controllerRef.current?.carry()
    document.body.style.overscrollBehaviorY = ''
  }

  const startArc = () => {
    cancelArc()
    arcTimerRef.current = setTimeout(completeHold, HOLD_ARC_MS)
  }

  const claimHold = () => {
    if (completedRef.current) return
    holdActiveRef.current = true
    keyboardHoldRef.current = false
    controllerRef.current?.begin()
    startArc()
  }

  // Reduced motion: a single instant presence step performs the recession.
  const instantPresence = () => {
    if (completedRef.current) return
    completedRef.current = true
    controllerRef.current?.carry()
    document.body.style.overscrollBehaviorY = ''
  }

  const releaseCapture = (e) => {
    try {
      stageRef.current?.releasePointerCapture(e.pointerId)
    } catch {
      /* noop */
    }
  }

  const movePool = (x, y) => {
    const pool = poolRef.current
    if (pool) pool.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
  }

  const onPointerDown = (e) => {
    if (completedRef.current) return
    if (e.isPrimary === false) return

    if (reducedRef.current) {
      instantPresence()
      return
    }

    if (e.pointerType === 'mouse' || e.pointerType === 'pen') {
      if (e.pointerType === 'mouse' && e.button !== 0) return
      try {
        stageRef.current?.setPointerCapture(e.pointerId)
      } catch {
        /* noop */
      }
      pendingRef.current = null
      claimHold()
      return
    }

    // touch — a still press becomes a hold; movement cancels it (native scroll).
    if (pendingRef.current) return
    pendingRef.current = {
      id: e.pointerId,
      x: e.clientX,
      y: e.clientY,
      timer: setTimeout(() => {
        const pending = pendingRef.current
        if (!pending) return
        pendingRef.current = null
        try {
          stageRef.current?.setPointerCapture(pending.id)
        } catch {
          /* noop */
        }
        claimHold()
      }, ACK_MS),
    }
  }

  const onPointerMove = (e) => {
    if (e.pointerType === 'mouse') movePool(e.clientX, e.clientY)

    const pending = pendingRef.current
    if (pending && e.pointerId === pending.id) {
      if (Math.abs(e.clientX - pending.x) + Math.abs(e.clientY - pending.y) > DRIFT_PX) {
        clearTimeout(pending.timer)
        pendingRef.current = null // travelled -> native scroll
      }
    }
  }

  const endPointer = (e) => {
    const pending = pendingRef.current
    if (pending && e.pointerId === pending.id) {
      clearTimeout(pending.timer)
      pendingRef.current = null
    }
    if (holdActiveRef.current) {
      releaseCapture(e)
      if (!completedRef.current) releaseHold()
      else {
        holdActiveRef.current = false
        keyboardHoldRef.current = false
      }
    } else {
      releaseCapture(e)
    }
  }

  const onPointerUp = endPointer
  const onPointerCancel = endPointer
  const onLostPointerCapture = () => {
    if (holdActiveRef.current) releaseHold()
  }

  const onPointerEnter = (e) => {
    if (e.pointerType !== 'mouse' || reducedRef.current) return
    const pool = poolRef.current
    if (pool) pool.style.opacity = '0.5'
  }
  const onPointerLeave = (e) => {
    if (e.pointerType !== 'mouse') return
    const pool = poolRef.current
    if (pool) pool.style.opacity = '0'
    if (holdActiveRef.current && !completedRef.current && !keyboardHoldRef.current) {
      releaseHold()
    }
  }

  const onKeyDown = (e) => {
    if (completedRef.current) return
    if (e.repeat) return
    if (e.key === ' ' || e.code === 'Space') {
      e.preventDefault()
      if (reducedRef.current) {
        instantPresence()
        return
      }
      keyboardHoldRef.current = true
      holdActiveRef.current = true
      controllerRef.current?.begin()
      startArc()
    }
  }

  const onKeyUp = (e) => {
    if (e.key === ' ' || e.code === 'Space') {
      e.preventDefault()
      if (keyboardHoldRef.current) {
        keyboardHoldRef.current = false
        if (!completedRef.current) releaseHold()
      }
    }
  }

  // Safe interruptions: window blur / visibility loss release the hold.
  useEffect(() => {
    const onBlur = () => {
      if (holdActiveRef.current) releaseHold()
    }
    const onVisibility = () => {
      if (document.hidden && holdActiveRef.current) releaseHold()
    }
    window.addEventListener('blur', onBlur)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      window.removeEventListener('blur', onBlur)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  // Invisible, temporary forward clamp on the Ch06 -> Ch07 boundary until
  // completion. Mirrors the Chapter 03 gate pattern but with no lock visuals
  // and no permanent page lock.
  useEffect(() => {
    const section = rootRef.current
    if (!section) return

    let limit = 0
    const computeLimit = () => {
      limit = Math.max(0, section.offsetTop + section.offsetHeight - window.innerHeight - 48)
    }
    computeLimit()

    const onScroll = () => {
      if (completedRef.current) return
      if (window.scrollY > limit) window.scrollTo(0, limit)
    }

    const onWheel = (e) => {
      if (completedRef.current) return
      if (e.deltaY <= 0) return
      if (window.scrollY >= limit || window.scrollY + e.deltaY > limit) {
        e.preventDefault()
        e.stopPropagation()
        window.scrollTo(0, limit)
      }
    }

    let lastTouchY = null
    const onTouchStart = (e) => {
      lastTouchY = e.touches[0]?.clientY ?? null
    }
    const onTouchMove = (e) => {
      if (completedRef.current) return
      if (lastTouchY === null) return
      const y = e.touches[0]?.clientY
      if (y === undefined) return
      const scrollingDown = y < lastTouchY
      lastTouchY = y
      if (window.scrollY >= limit && scrollingDown) e.preventDefault()
    }

    if (!completedRef.current) document.body.style.overscrollBehaviorY = 'contain'

    window.addEventListener('resize', computeLimit)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('wheel', onWheel, { passive: false, capture: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    return () => {
      cancelArc()
      window.removeEventListener('resize', computeLimit)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('wheel', onWheel, { capture: true })
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      document.body.style.overscrollBehaviorY = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section id="chapter-06" data-anchor="confession" ref={rootRef} className="relative w-full">
      {/* sticky stage — the persistent field + the two real fragments. The whole
          stage is the hold target. Not a button: default cursor, no border,
          no instruction. */}
      <div
        ref={stageRef}
        tabIndex={0}
        role="region"
        aria-describedby="ch06-hold-desc"
        className="sticky top-0 z-0 h-[100svh] w-full select-none overflow-x-clip"
        style={{ touchAction: 'pan-y', cursor: 'default' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onLostPointerCapture={onLostPointerCapture}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
      >
        <ConfessionField />
        <ConfessionLine />
        {/* assistive-tech-only description (never visible on screen). */}
        <span id="ch06-hold-desc" className="sr-only">
          This space keeps what was spoken. Become still within it, and it will
          pass.
        </span>
      </div>

      {/* runway — scroll distance over which the silent hold happens. The
          invisible forward clamp lives at its end until the hold is carried. */}
      <div className="relative z-10 min-h-[300svh]" aria-hidden="true" />
    </section>
  )
}