// Decorative narrative motif: a thin horizontal line appearing from darkness
// with a very subtle CSS pulse. Not a loading indicator, not a medical
// waveform. GPU-friendly (opacity/transform only). Pulse is CSS-animated;
// reduced-motion CSS (in styles/index.css) disables the continuous pulse.
export default function SignalLine() {
  return <span className="signal-line" aria-hidden="true" />
}