import SignalRings from '../chapter01/SignalRings'

// CHAPTER 02 — VOICE MOTIF
// Abstract, editorial extension of the Chapter 01 signal rings for the voice
// room: the rings stay the visual foundation (their CSS pulse is untouched);
// a warm radial glow behind them evokes the enclosed, warm room atmosphere
// the HelloTalk voice-room screenshot references. No waveform, avatar, call
// timer, message bubbles, or fake controls.
// Decorative only (aria-hidden). GSAP animates only the wrapper.
export default function VoiceMotif() {
  return (
    <div className="relative mx-auto w-full" role="presentation" aria-hidden="true">
      <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle, rgba(200, 161, 101, 0.18), rgba(200, 161, 101, 0.04) 55%, transparent 70%)' }} />
      <div className="relative w-full"><SignalRings /></div>
    </div>
  )
}