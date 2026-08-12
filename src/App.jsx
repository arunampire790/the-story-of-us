import { useState } from 'react'
import Atmosphere from './components/shared/Atmosphere'
import LoadingScreen from './components/loading/LoadingScreen'
import DesignLab from './components/DesignLab'

// TEMPORARY: DesignLab is a dev-only visual test page.
// Swap this out for the real story shell once approved.
function App() {
  const [booted, setBooted] = useState(false)

  return (
    <>
      <Atmosphere />

      {!booted && <LoadingScreen onExit={() => setBooted(true)} />}

      <main className="relative z-10" inert={!booted}>
        <DesignLab />
      </main>
    </>
  )
}

export default App