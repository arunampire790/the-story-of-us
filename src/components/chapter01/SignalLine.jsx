// Chapter 01 signal motif, echoing the Loading experience.
// Extremely restrained thin horizontal line with a subtle CSS pulse.
// CSS-driven, GPU-friendly (opacity/transform); no JS animation loop.
// Reduced-motion CSS (styles/index.css) disables the continuous pulse.
export default function SignalLine() {
  return <span className="signal-line" aria-hidden="true" />
}