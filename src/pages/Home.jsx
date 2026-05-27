import { Link } from 'react-router-dom'
import RailNav from '../components/RailNav'
import ScrollHero from '../components/ScrollHero'
import { projects } from '../data/projects'

export default function Home() {
  return (
    <div className="home">
      <RailNav />

      <ScrollHero />

      <section className="intro">
        <p className="intro__text">
          Sesión privada de archivo — piezas vintage de los 90 puestas en
          diálogo con jóvenes diseñadores latinoamericanos.
        </p>
      </section>

      <header className="projects-header">
        <h2 className="projects-header__title">Proyectos</h2>
        <a className="projects-header__link" href="#proyectos">ver todos</a>
      </header>

      <div className="projects-stack" id="proyectos">
        {projects.map((p) => (
          <article key={p.slug} className="project-card">
            <div className={`project-card__image slide--${p.coverSlide}`} />
            <div className="project-card__content">
              <h3 className="project-card__title">{p.title}</h3>
              <p className="project-card__year">{p.year}</p>
            </div>
            <Link
              to={`/work/${p.slug}`}
              className="project-card__link"
              aria-label={`Ver ${p.title}`}
            />
          </article>
        ))}
      </div>
    </div>
  )
}
