import { useState } from 'react'
import Atmosphere from './components/shared/Atmosphere'
import LoadingScreen from './components/loading/LoadingScreen'
import DesignLab from './components/DesignLab'
import Chapter01 from './sections/Chapter01'

// TEMPORARY: DesignLab is a dev-only visual test page.
// Keep it available for development validation; not part of the story.
function App() {
  const [booted, setBooted] = useState(false)

  return (
    <>
      <Atmosphere />

      {!booted && <LoadingScreen onExit={() => setBooted(true)} />}

      <main className="relative z-10" inert={!booted}>
        <DesignLab />
        <Chapter01 />
      </main>
    </>
  )
}

export default App