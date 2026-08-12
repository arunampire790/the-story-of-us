import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins once, centrally, before any timeline is created.
gsap.registerPlugin(ScrollTrigger)

export default gsap
export { ScrollTrigger }