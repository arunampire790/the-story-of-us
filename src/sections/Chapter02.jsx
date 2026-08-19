import { chapter02Data } from '../data/chapter02'
import CinematicSection from '../components/shared/CinematicSection'
import Chapter02Beat01TheRoom from '../components/chapter02/Chapter02Beat01TheRoom'
import Chapter02Beat02TheSignal from '../components/chapter02/Chapter02Beat02TheSignal'
import Chapter02Beat03TheVoice from '../components/chapter02/Chapter02Beat03TheVoice'
import Chapter02Beat04Continuing from '../components/chapter02/Chapter02Beat04Continuing'

// CHAPTER 02 — THE VOICE ROOM
// Shell renders Chapter 02 and its implemented beats. Covers the text → voice
// transition begun on HelloTalk, stopping BEFORE the daily-call cadence and
// BEFORE July 17 / the July 18 confession. Inherits the global Atmosphere from
// App. NOTE: not yet mounted in App.jsx (PASS 1 is file creation + verification
// only); Chapter 02 will be wired after approval.
export default function Chapter02() {
  const { meta, beats } = chapter02Data

  return (
    <CinematicSection id={meta.id} anchor={meta.anchor} width="cinematic">
      <div aria-hidden="true" className="edge-fade edge-fade-top" />
      <Chapter02Beat01TheRoom data={beats.beat01} />
      <Chapter02Beat02TheSignal data={beats.beat02} />
      <Chapter02Beat03TheVoice data={beats.beat03} />
      <Chapter02Beat04Continuing data={beats.beat04} />
      <div aria-hidden="true" className="edge-fade edge-fade-bottom" />
    </CinematicSection>
  )
}