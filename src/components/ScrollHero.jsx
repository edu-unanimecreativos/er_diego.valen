import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'

const EASE_OUT_EXPO  = [0.16, 1, 0.3, 1]
const EASE_OUT_QUINT = [0.83, 0, 0.17, 1]

const SLIDE_COUNT = 5
const SLIDE_INTERVAL = 300

export default function ScrollHero() {
  const heroRef = useRef(null)
  const polaroidRef = useRef(null)

  const [currentSlide, setCurrentSlide] = useState(0)
  const [frozen, setFrozen] = useState(false)
  const [initialClip, setInitialClip] = useState(null)
  const [vw, setVw] = useState(typeof window !== 'undefined' ? window.innerWidth : 1728)

  useLayoutEffect(() => {
    function onResize() { setVw(window.innerWidth) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const RAIL_W = vw <= 768 ? 56 : 92

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    if (p > 0.04 && !frozen) setFrozen(true)
    if (p <= 0.01 && frozen)  setFrozen(false)
  })

  useEffect(() => {
    if (frozen) return
    const id = setInterval(() => {
      setCurrentSlide((s) => (s + 1) % SLIDE_COUNT)
    }, SLIDE_INTERVAL)
    return () => clearInterval(id)
  }, [frozen])

  useLayoutEffect(() => {
    function measure() {
      if (!polaroidRef.current) return
      const rect = polaroidRef.current.getBoundingClientRect()
      const ww = window.innerWidth
      const wh = window.innerHeight
      setInitialClip({
        top:    (rect.top / wh) * 100,
        right:  ((ww - rect.right) / ww) * 100,
        bottom: ((wh - rect.bottom) / wh) * 100,
        left:   ((rect.left - RAIL_W) / (ww - RAIL_W)) * 100,
      })
    }
    measure()
    if (document.fonts?.ready) document.fonts.ready.then(measure)
    setTimeout(measure, 200)
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [RAIL_W, vw])

  const redScaleX = useTransform(scrollYProgress, (p) => {
    const t = clamp01((p - 0.20) / (0.55 - 0.20))
    return lerp(1, RAIL_W / vw, applyEase(t, EASE_OUT_QUINT))
  })

  const polaroidOpacity = useTransform(scrollYProgress, (p) => {
    const t = clamp01((p - 0.05) / (0.18 - 0.05))
    return 1 - applyEase(t, EASE_OUT_EXPO)
  })

  const clipPath = useTransform(scrollYProgress, (p) => {
    if (!initialClip) return 'inset(50% 50% 50% 50%)'
    const sub = clamp01((p - 0.15) / (0.55 - 0.15))
    const widthT  = applyEase(clamp01(sub / 0.6), EASE_OUT_EXPO)
    const heightT = applyEase(clamp01((sub - 0.55) / 0.45), EASE_OUT_EXPO)
    const top    = lerp(initialClip.top,    0, heightT)
    const right  = lerp(initialClip.right,  0, widthT)
    const bottom = lerp(initialClip.bottom, 0, heightT)
    const left   = lerp(initialClip.left,   0, widthT)
    return `inset(${top}% ${right}% ${bottom}% ${left}%)`
  })

  const giantOpacity = useTransform(scrollYProgress, (p) => {
    const t = clamp01((p - 0.55) / (0.85 - 0.55))
    return applyEase(t, EASE_OUT_EXPO)
  })

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero__sticky">
        <div className="hero__bg-black" />
        <motion.div className="hero__red" style={{ scaleX: redScaleX }} />

        <motion.div className="hero__big-image" style={{ clipPath }}>
          {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
            <div
              key={i}
              className={`slide slide--${i + 1} ${i === currentSlide ? 'is-on' : ''}`}
            />
          ))}
        </motion.div>

        <motion.div className="hero__row" style={{ opacity: polaroidOpacity }}>
          <span className="hero__word-sans">VALENTINA</span>
          <div className="hero__polaroid" ref={polaroidRef}>
            {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
              <div
                key={i}
                className={`slide slide--${i + 1} ${i === currentSlide ? 'is-on' : ''}`}
              />
            ))}
          </div>
          <span className="hero__word-script">Valdez</span>
        </motion.div>

        <motion.div className="hero__giant" style={{ opacity: giantOpacity }}>
          <span className="hero__giant-script">Valdez</span>
          <span className="hero__giant-sans">VALENTINA</span>
        </motion.div>
      </div>
    </section>
  )
}

function clamp01(v) { return Math.max(0, Math.min(1, v)) }
function lerp(a, b, t) { return a + (b - a) * t }
function applyEase(t, [x1, y1, x2, y2]) {
  if (t <= 0) return 0
  if (t >= 1) return 1
  let u = t
  for (let i = 0; i < 6; i++) {
    const x = bez(u, 0, x1, x2, 1)
    const dx = bezDeriv(u, 0, x1, x2, 1)
    if (Math.abs(dx) < 1e-6) break
    u -= (x - t) / dx
    u = Math.max(0, Math.min(1, u))
  }
  return bez(u, 0, y1, y2, 1)
}
function bez(u, p0, p1, p2, p3) {
  const i = 1 - u
  return i*i*i*p0 + 3*i*i*u*p1 + 3*i*u*u*p2 + u*u*u*p3
}
function bezDeriv(u, p0, p1, p2, p3) {
  const i = 1 - u
  return 3*i*i*(p1-p0) + 6*i*u*(p2-p1) + 3*u*u*(p3-p2)
}
