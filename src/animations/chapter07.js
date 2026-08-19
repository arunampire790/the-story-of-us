import gsap, { ScrollTrigger } from './setup'

// Chapter 07 — Distance. "THE 7-YEAR HORIZON".
//
// A pure narrative chapter: three real, source-supported lines about the
// designed pause and the shared future (the same feeling; the seven years;
// the financial stability). No interaction, no lock, no dialogue beyond the
// approved lines, no invented fight details.
//
// Unlike the sticky-stage chapters, this chapter LIVES IN THE FLOW: the three
// lines are physically separated by tall vertical padding (the scroll runway),
// so the distance between the words is literal. Each line is scrubbed in as it
// crosses the viewport — a soft opacity rise with a slight upward settle. At
// the end the lines drift out and a thin vertical guide line draws down,
// pointing toward the Train Journey (Chapter 08).
//
// Reduced motion collapses to a simple cross-fade: each line (and the guide)
// fades to its resting opacity once, with no spatial drift and no scrub.

const S = (key) => `[data-dst="${key}"]`

export function createDistanceTimeline(scope, { reduced = false } = {}) {
  const line1 = scope.querySelector(S('line-1'))
  const line2 = scope.querySelector(S('line-2'))
  const line3 = scope.querySelector(S('line-3'))
  const guide = scope.querySelector(S('guide'))

  if (!line1 || !line2 || !line3 || !guide) return () => {}

  gsap.set([line1, line2, line3], { opacity: 0, y: 48 })
  gsap.set(guide, { opacity: 0, scaleY: 0 })

  if (reduced) {
    // Simple cross-fade fallback — no movement, no scrub, no drift.
    gsap.set([line1, line2, line3], { y: 0 })
    const tl = gsap.timeline({ defaults: { ease: 'power1.out', duration: 0.9 } })
    tl.to(line1, { opacity: 0.95 })
      .to(line2, { opacity: 0.95 }, '+=0.2')
      .to(line3, { opacity: 0.95 }, '+=0.2')
      .to(guide, { opacity: 0.5, scaleY: 1 }, '+=0.2')
    return () => tl.kill()
  }

  const reveal = (el) =>
    ScrollTrigger.create({
      trigger: el,
      start: 'top 78%',
      end: 'top 35%',
      scrub: 1,
      animation: gsap.fromTo(
        el,
        { opacity: 0, y: 48 },
        { opacity: 0.95, y: 0, ease: 'none', immediateRender: false },
      ),
    })

  const t1 = reveal(line1)
  const t2 = reveal(line2)
  const t3 = reveal(line3)

  // The guide draws down toward Chapter 08 only at the very end, after the
  // lines have passed. scaleY keeps it GPU-friendly (opacity + transform).
  // Trailing runout below the guide gives it room to complete in the flow.
  const tGuide = ScrollTrigger.create({
    trigger: guide,
    start: 'top 78%',
    end: 'top 30%',
    scrub: 1,
    animation: gsap.fromTo(
      guide,
      { opacity: 0, scaleY: 0 },
      { opacity: 0.55, scaleY: 1, ease: 'none', immediateRender: false },
    ),
  })

  return () => {
    t1.kill()
    t2.kill()
    t3.kill()
    tGuide.kill()
  }
}
