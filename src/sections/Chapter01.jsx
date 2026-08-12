import { chapter01Data } from '../data/chapter01'
import CinematicSection from '../components/shared/CinematicSection'
import Beat01TheRoom from '../components/chapter01/Beat01TheRoom'

// CHAPTER 01 — THE FIRST SIGNAL
// Shell renders Chapter 01 and its implemented beats.
// Beat 01 is the only beat currently implemented; the shell ends after it
// (no fake empty sections for future beats). Uses the shared primitives and
// inherits the global Atmosphere from App.
export default function Chapter01() {
  const { meta, beats } = chapter01Data

  return (
    <CinematicSection
      id={meta.id}
      anchor={meta.anchor}
      width="cinematic"
    >
      <Beat01TheRoom data={beats.beat01} />
    </CinematicSection>
  )
}