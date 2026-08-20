import { useState } from 'react'
import Atmosphere from './components/shared/Atmosphere'
import LoadingScreen from './components/loading/LoadingScreen'
import DesignLab from './components/DesignLab'
import Chapter01 from './sections/Chapter01'
import Chapter02 from './sections/Chapter02'
import Chapter03 from './sections/Chapter03'
import Chapter04 from './sections/Chapter04'
import Chapter05 from './sections/Chapter05'
import Chapter06 from './sections/Chapter06'
import Chapter07 from './sections/Chapter07'
import Chapter08 from './sections/Chapter08'
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
        {isLab ? (
          <DesignLab />
        ) : (
          <>
            <Chapter01 />
            <Chapter02 />
            <Chapter03 />
            <Chapter04 />
            <Chapter05 />
            <Chapter06 />
            <Chapter07 />
            <Chapter08 />
          </>
        )}
      </main>
    </>
  )
}

export default App