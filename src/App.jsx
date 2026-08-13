import { useState } from 'react'
import Atmosphere from './components/shared/Atmosphere'
import LoadingScreen from './components/loading/LoadingScreen'
import DesignLab from './components/DesignLab'
import Chapter01 from './sections/Chapter01'
import { useSmoothScroll } from './hooks/useSmoothScroll'

// ?lab=1 renders the dev-only DesignLab instead of the real experience.
const isLab = new URLSearchParams(window.location.search).get('lab') === '1'

function App() {
  const [booted, setBooted] = useState(false)

  // Single global Lenis instance (desktop + reduced-motion gated).
  useSmoothScroll()

  return (
    <>
      <Atmosphere />

      {!booted && <LoadingScreen onExit={() => setBooted(true)} />}

      <main className="relative z-10" inert={!booted}>
        {isLab ? <DesignLab /> : <Chapter01 />}
      </main>
    </>
  )
}

export default App