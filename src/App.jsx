import Atmosphere from './components/shared/Atmosphere'
import DesignLab from './components/DesignLab'

// TEMPORARY: DesignLab is a dev-only visual test page.
// Swap this out for the real story sections once approved.
function App() {
  return (
    <>
      <Atmosphere />
      <main className="relative z-10">
        <DesignLab />
      </main>
    </>
  )
}

export default App