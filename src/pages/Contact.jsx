import { Link } from 'react-router-dom'
import RailNav from '../components/RailNav'

export default function Contact() {
  return (
    <div className="contact-page">
      <RailNav />

      {/* Top bar — back to home */}
      <div className="contact-page__topbar">
        <Link to="/" className="bar-link">
          <ArrowLeft />
          <span>INICIO</span>
        </Link>
      </div>

      {/* Left: profile portrait (placeholder) */}
      <div className="contact-page__image profile-portrait" aria-hidden="true" />

      {/* Right: bio + contact info */}
      <div className="contact-page__content">
        <p className="contact-page__hello">contacto</p>

        <div>
          <h1 className="contact-page__name">Valentina Valdez</h1>
          <p className="contact-page__role">Stylist</p>
        </div>

        <p className="contact-page__bio">
          Estilista y directora creativa con más de una década de experiencia en
          editorial, campañas comerciales y dirección de arte. Trabajo desde
          archivos personales, archivos prestados y piezas recién hechas para
          construir imágenes con tensión, ironía y memoria.
        </p>

        <dl className="contact-page__info">
          <div className="contact-row">
            <dt className="contact-row__key">email</dt>
            <a
              className="contact-row__val"
              href="mailto:hello@valentinavaldez.com"
            >
              hello@valentinavaldez.com
            </a>
          </div>
          <div className="contact-row">
            <dt className="contact-row__key">instagram</dt>
            <a
              className="contact-row__val"
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              @valentinavaldez
            </a>
          </div>
          <div className="contact-row">
            <dt className="contact-row__key">representación</dt>
            <span className="contact-row__val">Independiente</span>
          </div>
          <div className="contact-row">
            <dt className="contact-row__key">basada en</dt>
            <span className="contact-row__val">Barcelona</span>
          </div>
        </dl>
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
