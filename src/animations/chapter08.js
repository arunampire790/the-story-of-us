import gsap, { ScrollTrigger } from './setup'

// Chapter 08 — Train Journey. "THE PINNED NIGHT SPINE".
//
// A pure scroll-driven narrative chapter, zero interaction. The section is
// EXPLICITLY PINNED for 2800px of scroll distance while one normalized timeline
// plays (scrub: 0.8, smooth physical response). Layers synchronize with the
// (now-correct) text timing:
//
//   Rails            opacity 0.2 → 0.7 → 0.2 (subtle pulse/glow)
//   Amber signal     x: -20vw → 30vw · opacity 0 → 0.5 → 0
//   Indigo signal    x: 20vw → -30vw · opacity 0 → 0.4 → 0
//   Streaks          x: 60vw → -60vw (speed)
//   Vignette         static, fades on exit
//   Line 1           0.12–0.32  in (scale 0.98→1) · HOLD · out
//   Line 2           0.38–0.58  in (scale 0.98→1) · HOLD · out
//   Line 3           0.64–0.84  in (scale 0.98→1) · HOLD · out
//   Exit             0.85–1.0   all visual layers + rails fade to 0 into dark
//
// At progress 1.0 the pin releases naturally into Chapter 09. No boxes, no
// borders — a high-end dark-slate editorial spine. Reduced motion collapses to
// a calm static, readable frame (no pin, no movement).

const S = (key) => `[data-train="${key}"]`

export function createTrainTimeline(scope, { reduced = false } = {}) {
  const railLeft = scope.querySelector(S('rail-left'))
  const railRight = scope.querySelector(S('rail-right'))
  const signalAmber = scope.querySelector(S('signal-amber'))
  const signalIndigo = scope.querySelector(S('signal-indigo'))
  const streaks = Array.from(scope.querySelectorAll(S('streak')))
  const vignette = scope.querySelector(S('vignette'))
  const lines = [1, 2, 3]
    .map((n) => scope.querySelector(S(`line-${n}`)))
    .filter(Boolean)

  const rails = [railLeft, railRight].filter(Boolean)
  const signals = [signalAmber, signalIndigo].filter(Boolean)
  if (lines.length !== 3 || rails.length !== 2 || signals.length !== 2) return () => {}

  const cleanups = []

  // Baselines.
  gsap.set(rails, { opacity: 0.2 })
  gsap.set(lines, { opacity: 0, scale: 0.98 })
  gsap.set(signals, { opacity: 0 })
  gsap.set(streaks, { opacity: 0.6, x: '60vw' })

  if (!reduced) {
    // Cold-first-visit guard: pinning measures positions at creation; a stale
    // read would shift the whole sequence. Re-measure next frame and on load.
    const onRefresh = () => ScrollTrigger.refresh()
    const raf = requestAnimationFrame(onRefresh)
    window.addEventListener('load', onRefresh)
    cleanups.push(() => {
      cancelAnimationFrame(raf)
      window.removeEventListener('load', onRefresh)
    })

    const tl = gsap.timeline({
      defaults: { ease: 'none', immediateRender: false },
      scrollTrigger: {
        trigger: scope,
        start: 'top top',
        end: '+=2800',
        pin: true,
        pinSpacing: true,
        scrub: 0.8,
      },
    })

    // Rails — subtle pulse/glow.
    tl.to(rails, { opacity: 0.7, duration: 0.4 }, 0.1)
      .to(rails, { opacity: 0.2, duration: 0.45 }, 0.5)

    // Ambient signals — borderless glows drifting as passing night lights.
    if (signalAmber)
      tl.fromTo(
          signalAmber,
          { x: '-20vw', opacity: 0 },
          { x: '30vw', opacity: 0.5, duration: 0.5 },
          0,
        )
        .to(signalAmber, { opacity: 0, duration: 0.5 }, 0.5)
    if (signalIndigo)
      tl.fromTo(
          signalIndigo,
          { x: '20vw', opacity: 0 },
          { x: '-30vw', opacity: 0.4, duration: 0.5 },
          0.05,
        )
        .to(signalIndigo, { opacity: 0, duration: 0.45 }, 0.55)

    // Speed streaks — glide across the X-axis.
    tl.fromTo(streaks, { x: '60vw' }, { x: '-60vw', duration: 1 }, 0)

    // LINE 1 — 0.12–0.32.
    tl.fromTo(
        lines[0],
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.06 },
        0.12,
      )
      .to(lines[0], { opacity: 1, duration: 0.12 }, 0.18) // HOLD 0.18–0.30
      .to(lines[0], { opacity: 0, duration: 0.02 }, 0.3)

    // LINE 2 — 0.38–0.58.
    tl.fromTo(
        lines[1],
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.06 },
        0.38,
      )
      .to(lines[1], { opacity: 1, duration: 0.12 }, 0.44) // HOLD 0.44–0.56
      .to(lines[1], { opacity: 0, duration: 0.02 }, 0.56)

    // LINE 3 — 0.64–0.84.
    tl.fromTo(
        lines[2],
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.06 },
        0.64,
      )
      .to(lines[2], { opacity: 1, duration: 0.12 }, 0.7) // HOLD 0.70–0.82
      .to(lines[2], { opacity: 0, duration: 0.02 }, 0.82)

    // EXIT — all visual layers + rails fade to 0 into dark base (Ch09).
    const exitTargets = [...rails, ...signals, ...streaks, vignette, ...lines].filter(Boolean)
    tl.to(exitTargets, { opacity: 0, duration: 0.15 }, 0.85)

    cleanups.push(() => tl.scrollTrigger?.kill())
    cleanups.push(() => tl.kill())

    return () => cleanups.forEach((fn) => fn())
  }

  // Reduced motion — calm static, readable frame. No pin, no movement.
  gsap.set(lines[0], { opacity: 0.95, y: -12 })
  gsap.set(lines[1], { opacity: 0.95, y: 0 })
  gsap.set(lines[2], { opacity: 0.95, y: 12 })
  gsap.set(rails, { opacity: 0.5 })
  gsap.set(signals, { opacity: 0.35 })
  gsap.set(streaks, { opacity: 0.4, x: 0 })

  return () => {}
}