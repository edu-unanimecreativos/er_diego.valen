import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Lateral red rail (uniform across all pages) + menu overlay.
 *
 * Closed state: 92px-wide rail on the left edge.
 *   - Top: hamburger (44×11, 2 bars of 3px) — click to open menu
 *   - Center: "Valentina Valdez" vertical text
 *   - Bottom: Instagram + Mail icons (28×28)
 *
 * Open state (menu overlay): full-screen red panel with:
 *   - Top: X icon (close)
 *   - Center: navigation links (INICIO / PROYECTOS / ABOUT / CONTACTO)
 *   - Bottom: Instagram + Mail icons
 */
export default function RailNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // Close menu when route changes (after clicking a nav link)
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // Prevent body scroll while menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Close menu with Escape key
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape' && menuOpen) setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <>
      {/* Closed rail — always present */}
      <aside className="rail" aria-label="Navegación">
        <button
          className="rail__ham"
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
        />
        <div className="rail__label">
          <span className="rail__label-inner">Valentina Valdez</span>
        </div>
        <div className="rail__social">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
            <InstagramIcon />
          </a>
          <a href="mailto:hello@valentinavaldez.com" aria-label="Email">
            <MailIcon />
          </a>
        </div>
      </aside>

      {/* Menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
          >
            <button
              className="menu-close"
              onClick={() => setMenuOpen(false)}
              aria-label="Cerrar menú"
            >
              <CloseIcon />
            </button>

            <motion.nav
              className="menu-nav"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to="/" className="menu-nav__link">Inicio</Link>
              <Link to="/#proyectos" className="menu-nav__link">Proyectos</Link>
              <Link to="/about" className="menu-nav__link">About</Link>
              <Link to="/contact" className="menu-nav__link">Contacto</Link>
            </motion.nav>

            <div className="menu-social">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="mailto:hello@valentinavaldez.com" aria-label="Email">
                <MailIcon />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ----- Icons ----- */
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}
function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" />
    </svg>
  )
}
/* Close X icon — built from two rotated bars to match Figma exactly */
function CloseIcon() {
  return (
    <svg viewBox="0 0 44 44" aria-hidden="true">
      <line x1="6" y1="6" x2="38" y2="38" stroke="currentColor" strokeWidth="2" />
      <line x1="38" y1="6" x2="6" y2="38" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}
