import { useEffect } from 'react'
import gsap from 'gsap'
import Lenis from 'lenis'
import { motion } from 'motion/react'
import { Heart } from 'lucide-react'

function App() {
  useEffect(() => {
    const lenis = new Lenis()
    const raf = (time) => lenis.raf(time)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  return (
    <main className="min-h-svh">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Heart aria-hidden="true" />
      </motion.div>
    </main>
  )
}

export default App