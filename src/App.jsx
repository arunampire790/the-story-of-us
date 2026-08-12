import { motion } from 'motion/react'
import { useReducedMotion } from './hooks/useReducedMotion'

function App() {
  useReducedMotion()

  return (
    <main className="min-h-svh">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} aria-hidden="true" />
    </main>
  )
}

export default App