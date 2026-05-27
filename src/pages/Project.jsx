import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import RailNav from '../components/RailNav'
import { projects } from '../data/projects'

export default function Project() {
  const { slug } = useParams()
  const navigate = useNavigate()

  // Scroll to top when entering/changing project so it starts from the info
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  const projectIndex = projects.findIndex((p) => p.slug === slug)
  const project = projects[projectIndex]
  const total = projects.length

  if (!project) {
    return (
      <div style={{ padding: 64 }}>
        <p>Proyecto no encontrado.</p>
        <Link to="/">← Volver</Link>
      </div>
    )
  }

  const prev = projects[(projectIndex - 1 + total) % total]
  const next = projects[(projectIndex + 1) % total]

  // Horizontal scroll mechanic
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const [trackWidth, setTrackWidth] = useState(0)
  const [vw, setVw] = useState(typeof window !== 'undefined' ? window.innerWidth : 1728)

  useLayoutEffect(() => {
    function measure() {
      if (trackRef.current) setTrackWidth(trackRef.current.scrollWidth)
      setVw(window.innerWidth)
    }
    measure()
    if (document.fonts?.ready) document.fonts.ready.then(measure)
    setTimeout(measure, 200)
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [project])

  const { scrollYProgress } = useScroll({ target: containerRef })

  // x = -p * (trackWidth - vw)
  const x = useTransform(scrollYProgress, (p) => {
    const max = Math.max(0, trackWidth - vw)
    return -p * max
  })

  // Container height = trackWidth (so we have exactly enough vertical scroll
  // to traverse the entire horizontal width). Fallback to 200vh while measuring.
  const containerHeight = trackWidth > 0 ? `${trackWidth}px` : '200vh'

  return (
    <div
      className="project-page"
      ref={containerRef}
      style={{ height: containerHeight }}
    >
      <RailNav />

      <div className="project-page__sticky">

        {/* Decorative giant VALENTINA wordmark (per Figma 31:6) */}
        <div className="project-page__giant" aria-hidden="true">
          <span>VALENTINA</span>
        </div>

        {/* Horizontal track: info column + image strip, translated as one */}
        <motion.div className="project-page__track" ref={trackRef} style={{ x }}>

          {/* Info column */}
          <aside className="project-page__info">
            <p className="project-page__num">
              {project.index} / {String(total).padStart(2, '0')}
            </p>

            <div className="project-page__head">
              <div className="project-page__title-block">
                <h1 className="project-page__title">{project.title}</h1>
                <p className="project-page__year">{project.year}</p>
              </div>
              <p className="project-page__desc">{project.description}</p>
            </div>

            <dl className="project-page__credits">
              {Object.entries(project.credits).map(([key, value]) => (
                <div key={key} className="credit-row">
                  <dt className="credit-row__key">{key}</dt>
                  <dd className="credit-row__val">
                    {Array.isArray(value)
                      ? value.map((v, i) => <span key={i}>{v}</span>)
                      : value}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>

          {/* Images strip */}
          <div className="project-page__strip">
            {project.images.map((slide, i) => (
              <div
                key={i}
                className={`project-page__img slide--${slide}`}
                aria-label={`Imagen ${i + 1} de ${project.images.length}`}
              />
            ))}
          </div>

        </motion.div>

      </div>

      {/* Top/bottom bars LIVE OUTSIDE the sticky so mix-blend-mode evaluates
          against whatever is below them in the viewport, not the sticky context. */}
      <div className="project-page__topbar">
        <button
          className="bar-link"
          onClick={() => navigate('/')}
          aria-label="Volver a proyectos"
        >
          <ArrowLeft />
          <span>PROYECTOS</span>
        </button>
        <span className="bar-text">
          {project.index} — {project.title.toUpperCase()}
        </span>
      </div>

      <div className="project-page__bottombar">
        <Link to={`/work/${prev.slug}`} className="bar-link">
          <ArrowLeft />
          <span>ANTERIOR</span>
        </Link>
        <span className="bar-text">
          {project.index} / {String(total).padStart(2, '0')}
        </span>
        <Link to={`/work/${next.slug}`} className="bar-link">
          <span>SIGUIENTE</span>
          <ArrowRight />
        </Link>
      </div>
    </div>
  )
}

function ArrowLeft() {
  return (
    <svg viewBox="0 0 12 11" fill="none" aria-hidden="true">
      <path d="M11 5.5H1M1 5.5L5 1M1 5.5L5 10" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}
function ArrowRight() {
  return (
    <svg viewBox="0 0 12 11" fill="none" aria-hidden="true">
      <path d="M1 5.5H11M11 5.5L7 1M11 5.5L7 10" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}
