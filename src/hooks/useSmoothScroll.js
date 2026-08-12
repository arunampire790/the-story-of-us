// Placeholder hook.
//
// Future role: initialize Lenis-based smooth scrolling for desktop only,
// keeping native scrolling as the default (mobile + prefers-reduced-motion).
// Intentionally un-implemented until the integration is verified against the
// installed Lenis version and its official documentation.
//
// Returns a stable no-op instance so callers can mount safely today.

export function useSmoothScroll() {
  return {
    enabled: false,
    scrollTo: () => {},
    destroy: () => {},
  }
}