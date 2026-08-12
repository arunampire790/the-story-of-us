// Placeholder hook.
//
// Future role: report a normalized scroll progress (0..1) for the current
// section so cinematic GSAP timelines can drive content from it.
// Intentionally un-implemented until ScrollTrigger wiring is designed.
//
// Returns a stable 0 progress value so callers can mount safely today.

export function useSectionProgress() {
  return 0
}