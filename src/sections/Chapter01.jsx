import { chapter01Data } from '../data/chapter01'
import CinematicSection from '../components/shared/CinematicSection'
import Beat01TheRoom from '../components/chapter01/Beat01TheRoom'
import Beat02TheEntry from '../components/chapter01/Beat02TheEntry'

// CHAPTER 01 — THE FIRST SIGNAL
// Shell renders Chapter 01 and its implemented beats.
// Beats 01–02 are implemented; the shell ends after them (no fake empty
// sections for future beats). Inherits the global Atmosphere from App.
export default function Chapter01() {
  const { meta, beats } = chapter01Data

  return (
    <CinematicSection id={meta.id} anchor={meta.anchor} width="cinematic">
      <Beat01TheRoom data={beats.beat01} />
      <Beat02TheEntry data={beats.beat02} />
    </CinematicSection>
  )
}