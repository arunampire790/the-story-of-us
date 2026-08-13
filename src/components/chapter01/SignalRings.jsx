// Chapter 01 signal motif — three concentric rings, echoing the Loading
// experience. Decorative only (aria-hidden, non-interactive).
// The staggered, irregular pulse is CSS-driven (styles/index.css), GPU-friendly
// (transform/opacity). Entrance is choreographed by GSAP on the parent wrapper.
export default function SignalRings() {
  return (
    <svg
      className="signal-rings"
      viewBox="0 0 200 200"
      width="100%"
      height="auto"
      role="presentation"
      aria-hidden="true"
    >
      <circle
        className="signal-ring signal-ring--outer"
        cx="100"
        cy="100"
        r="84"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="1"
      />
      <circle
        className="signal-ring signal-ring--middle"
        cx="100"
        cy="100"
        r="58"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="0.75"
      />
      <circle
        className="signal-ring signal-ring--inner"
        cx="100"
        cy="100"
        r="34"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="0.75"
      />
    </svg>
  )
}