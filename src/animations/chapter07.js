import gsap, { ScrollTrigger } from './setup'

// Chapter 07 — DISTANCE. "THE WIDENED SPAN".
//
// Two people remain present, but the space between them becomes the subject.
// The cause of the fight is intentionally not recorded. A horizontal
// hairline and two edge presences carry the visual metaphor while short,
// source-safe prose appears through a single scrubbed timeline.
//
// Architecture: sticky 100svh stage + 300svh runway, matching the established
// Chapter 03–06 pattern. Opacity only. No wheel/touch handlers, loops, timers,
// layout animation, or interaction state. Reverse scroll reverses naturally.

const S = (key) => `[data-distance="${key}"]`

export function createDistanceTimeline(scope, { reduced = false } = {}) {
  const left = S('presence-left')
  const right = S('presence-right')
  const span = S('span')
  const crease = S('crease')
  const bloom = S('bloom')
  const copyOpening = S('copy-opening')
  const copyFight = S('copy-fight')
  const copyPause = S('copy-pause')
  const copyFuture = S('copy-future')
  const copySeven = S('copy-seven')

  gsap.set(left, { opacity: 0 })
  gsap.set(right, { opacity: 0 })
  gsap.set(span, { opacity: 0 })
  gsap.set(crease, { opacity: 0 })
  gsap.set(bloom, { opacity: 0 })
  gsap.set(copyOpening, { opacity: 0 })
  gsap.set(copyFight, { opacity: 0 })
  gsap.set(copyPause, { opacity: 0 })
  gsap.set(copyFuture, { opacity: 0 })
  gsap.set(copySeven, { opacity: 0 })

  if (reduced) {
    // Static meaningful settled state: the two presences and span remain,
    // with the final future line readable. No scrub, movement, or timer.
    gsap.set(left, { opacity: 0.48 })
    gsap.set(right, { opacity: 0.48 })
    gsap.set(span, { opacity: 0.22 })
    gsap.set(bloom, { opacity: 0.18 })
    gsap.set(copySeven, { opacity: 0.92 })
    return null
  }

  const t = gsap.timeline({ defaults: { ease: 'none' }, paused: true })

  // 0–10 — two people remain, but the distance between them resolves into view.
  t.to(left, { opacity: 0.48, duration: 8, ease: 'power1.out' }, 0)
    .to(right, { opacity: 0.48, duration: 8, ease: 'power1.out' }, 0)
    .to(span, { opacity: 0.22, duration: 10, ease: 'power1.out' }, 0)
    .to(copyOpening, { opacity: 0.82, duration: 10, ease: 'power1.out' }, 4)

  // 18–34 — the fight is acknowledged; its cause stays visually withheld.
  t.to(copyOpening, { opacity: 0, duration: 5 }, 18)
    .to(crease, { opacity: 0.34, duration: 8, ease: 'power1.out' }, 20)
    .to(copyFight, { opacity: 0.88, duration: 10, ease: 'power1.out' }, 22)

  // 34–55 — designed pause. The two presences and span hold; copy thins away.
  t.to(copyFight, { opacity: 0, duration: 6 }, 40)
    .to(copyPause, { opacity: 0.72, duration: 8, ease: 'power1.out' }, 44)

  // 55–76 — later conversations about the future.
  t.to(copyPause, { opacity: 0, duration: 6 }, 58)
    .to(copyFuture, { opacity: 0.86, duration: 10, ease: 'power1.out' }, 62)

  // 76–90 — the seven-years / financial-stability idea enters without invented
  // scheduling or dialogue.
  t.to(copyFuture, { opacity: 0, duration: 6 }, 78)
    .to(copySeven, { opacity: 0.92, duration: 10, ease: 'power1.out' }, 80)

  // 90–100 — the span warms and the two presences become perceptually nearer
  // through restrained emphasis only. They never touch; no reunion is shown.
  t.to(crease, { opacity: 0, duration: 7, ease: 'power1.in' }, 90)
    .to(span, { opacity: 0.28, duration: 10, ease: 'power1.out' }, 90)
    .to(bloom, { opacity: 0.28, duration: 10, ease: 'power1.out' }, 90)
    .to(left, { opacity: 0.62, duration: 10, ease: 'power1.out' }, 90)
    .to(right, { opacity: 0.62, duration: 10, ease: 'power1.out' }, 90)

  ScrollTrigger.create({
    trigger: scope,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1,
    animation: t,
  })

  return t
}
