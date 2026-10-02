import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState, type CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'

const PILLARS = [
  {
    key: 'competence',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden>
        <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1.8" />
        <path d="M11 16.5l3.2 3.2L21.5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: 'impartial',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden>
        <path d="M16 5 L26 9 V16 C26 22 21 26.5 16 29 C11 26.5 6 22 6 16 V9 Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M12 16h8M16 12v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: 'field',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden>
        <path d="M16 5c4.5 0 8 3.4 8 7.6 0 5.2-8 14.4-8 14.4S8 17.8 8 12.6C8 8.4 11.5 5 16 5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <circle cx="16" cy="12.5" r="2.6" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
] as const

/** 3D pillar deck + cycling copy for the home about panel. */
export function HomeAboutVisual() {
  const { t } = useTranslation()
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (reduce) return
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % PILLARS.length)
    }, 3000)
    return () => window.clearInterval(id)
  }, [reduce])

  const current = PILLARS[active]

  return (
    <div className="home-about__visual panel">
      <div className="home-about__stage" aria-hidden>
        <div className={`home-about__scene${reduce ? ' is-static' : ''}`}>
          <span className="home-about__aura" />
          <span className="home-about__orbit home-about__orbit--a" />
          <span className="home-about__orbit home-about__orbit--b" />
          <span className="home-about__scan" />

          <div className="home-about__deck">
            {PILLARS.map((pillar, i) => {
              const offset = i - active
              return (
                <div
                  key={pillar.key}
                  className={`home-about__card${i === active ? ' is-active' : ''}`}
                  style={{
                    '--offset': offset,
                    zIndex: i === active ? 5 : 3 - Math.abs(offset),
                  } as CSSProperties}
                >
                  <span className="home-about__card-icon">{pillar.icon}</span>
                  <span className="home-about__card-code mono">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="home-about__copy">
        <div className="home-about__dots">
          {PILLARS.map((pillar, i) => (
            <span
              key={pillar.key}
              className={`home-about__dot${i === active ? ' is-active' : ''}`}
            />
          ))}
        </div>
        <p className="mono home-about__eyebrow">{t('home.aboutVisual.eyebrow')}</p>
        <AnimatePresence mode="wait">
          <motion.div
            key={current.key}
            className="home-about__pillar"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3>{t(`home.aboutVisual.pillars.${current.key}.title`)}</h3>
            <p>{t(`home.aboutVisual.pillars.${current.key}.body`)}</p>
          </motion.div>
        </AnimatePresence>
        <div className="home-about__creds mono">
          <span>{t('home.trustIso')}</span>
          <span aria-hidden>·</span>
          <span>{t('home.trustQms')}</span>
        </div>
      </div>
    </div>
  )
}
