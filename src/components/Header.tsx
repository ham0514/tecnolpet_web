import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router-dom'
import { LanguageToggle } from './LanguageToggle'
import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'
import './Header.css'

const primary = [
  { to: '/', key: 'home', end: true },
  { to: '/acerca', key: 'about' },
  { to: '/servicios', key: 'services' },
  { to: '/aplicaciones', key: 'apps' },
  { to: '/acreditaciones', key: 'accreditations' },
  { to: '/contacto', key: 'contact' },
] as const

export function Header() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
        <div className="container site-header__inner">
          <Link to="/" className="site-header__brand" onClick={() => setOpen(false)} aria-label="Tecnolpet">
            <Logo layout="header" />
          </Link>

          <nav className="site-header__nav" aria-label="Primary">
            {primary.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={'end' in item ? item.end : false}
                onClick={() => setOpen(false)}
              >
                {t(`nav.${item.key}`)}
              </NavLink>
            ))}
          </nav>

          <div className="site-header__actions">
            <ThemeToggle />
            <LanguageToggle />
            <Link to="/contacto" className="btn site-header__cta" onClick={() => setOpen(false)}>
              {t('nav.cta')}
            </Link>
            <button
              type="button"
              className="site-header__burger"
              aria-expanded={open}
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <button
        type="button"
        className={`site-header__scrim ${open ? 'is-open' : ''}`}
        aria-label="Close menu"
        tabIndex={open ? 0 : -1}
        onClick={() => setOpen(false)}
      />

      <div className={`site-header__drawer ${open ? 'is-open' : ''}`} id="mobile-nav">
        <nav aria-label="Mobile">
          {primary.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={'end' in item ? item.end : false}
              onClick={() => setOpen(false)}
            >
              {t(`nav.${item.key}`)}
            </NavLink>
          ))}
          <Link to="/contacto" className="btn" onClick={() => setOpen(false)}>
            {t('nav.cta')}
          </Link>
        </nav>
      </div>
    </>
  )
}
