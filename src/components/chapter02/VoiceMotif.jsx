import SignalRings from '../chapter01/SignalRings'

// VOICE MOTIF — Chapter 02 "aperture / doorway" reinterpretation of the
// Chapter 01 signal rings. Ch1's closing rings visually hand off into this
// open door into the room. Purely decorative (aria-hidden). NOT a repeated
// logo — it appears only at arrival and at the resting end of the chapter.
//
// The rings are APPROVED but must stay COMPLETELY STATIC here: the continuous
// .signal-ring-pulse from Chapter 01 is disabled for this component only (see
// .voice-motif .signal-ring in styles/index.css). All Chapter 02 motion belongs
// to PresenceLights + the master timeline + beat entrances, never the rings.
// Reduced-motion already forces animation:none globally; the static rings
// remain fully visible at their approved stroke/opacity/size.
export default function VoiceMotif() {
  return (
    <div
      className="voice-motif relative mx-auto w-full"
      role="presentation"
      aria-hidden="true"
    >
      <SignalRings />
    </div>
  )
}