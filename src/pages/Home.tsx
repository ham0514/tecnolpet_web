import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { AnimatedHeadline } from '../components/AnimatedHeadline'
import { HeroOrb } from '../components/HeroOrb'
import { HomeAboutVisual } from '../components/HomeAboutVisual'
import { Logo } from '../components/Logo'
import { Reveal } from '../components/Reveal'
import './Home.css'

const ROTATING_KEYS = ['ndt', 'iso', 'field', 'integrity'] as const

export function HomePage() {
  const { t, i18n } = useTranslation()
  const reduce = useReducedMotion()
  const [rotateIndex, setRotateIndex] = useState(0)

  const whyKeys = ['quality', 'tech', 'integrity', 'pros'] as const
  const segmentKeys = ['ndt', 'tools', 'tests', 'general'] as const

  useEffect(() => {
    if (reduce) return
    const id = window.setInterval(() => {
      setRotateIndex((i) => (i + 1) % ROTATING_KEYS.length)
    }, 2800)
    return () => window.clearInterval(id)
  }, [reduce, i18n.language])

  const rotatingKey = ROTATING_KEYS[rotateIndex]

  return (
    <div className="home">
      <section className="home-hero">
        <div className="home-hero__glow" aria-hidden />
        <div className="container home-hero__shell">
          <div className="home-hero__content">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <Logo layout="hero" className="home-hero__logo" />
            </motion.div>

            <motion.p
              className="section-kicker mono"
              initial={reduce ? false : { opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
            >
              {t('home.kicker')}
            </motion.p>

            <AnimatedHeadline text={t('home.headline')} />

            <motion.div
              className="home-hero__rotator mono"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              aria-live="polite"
            >
              <span className="home-hero__rotator-label">{t('home.rotatorLabel')}</span>
              <span className="home-hero__rotator-slot">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`${i18n.language}-${rotatingKey}`}
                    className="home-hero__rotator-value"
                    initial={reduce ? false : { y: 14, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={reduce ? undefined : { y: -14, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {t(`home.rotator.${rotatingKey}`)}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.div>

            <motion.p
              className="home-hero__sub"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.7 }}
            >
              {t('home.sub')}
            </motion.p>

            <motion.div
              className="btn-row"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.6 }}
            >
              <Link className="btn" to="/contacto">{t('home.ctaPrimary')}</Link>
              <Link className="btn btn-ghost" to="/servicios">{t('home.ctaSecondary')}</Link>
            </motion.div>
          </div>

          <HeroOrb />
        </div>

        <div className="home-hero__watermark" aria-hidden>
          <Logo layout="mark-t" />
        </div>
      </section>

      <section className="home-trust">
        <div className="container home-trust__row">
          {[t('home.trustIso'), t('home.trustQms'), t('home.trustNdt'), t('home.trustRegion')].map((item) => (
            <div key={item} className="home-trust__item mono">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <p className="section-kicker mono">01</p>
            <h2 className="section-title">{t('home.whyTitle')}</h2>
            <p className="section-lead">{t('home.whyLead')}</p>
          </Reveal>
          <div className="grid-4 home-why">
            {whyKeys.map((key, i) => (
              <Reveal key={key} delay={i * 0.08}>
                <article className="panel home-why__card">
                  <span className="mono home-why__index">0{i + 1}</span>
                  <h3>{t(`home.why.${key}.title`)}</h3>
                  <p>{t(`home.why.${key}.body`)}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section home-segments">
        <div className="container">
          <Reveal>
            <p className="section-kicker mono">02</p>
            <h2 className="section-title">{t('home.servicesTitle')}</h2>
            <p className="section-lead">{t('home.servicesLead')}</p>
          </Reveal>
          <div className="grid-2 home-segments__grid">
            {segmentKeys.map((key, i) => (
              <Reveal key={key} delay={i * 0.06}>
                <Link to="/servicios" className="panel home-segment">
                  <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{t(`home.segments.${key}.title`)}</h3>
                  <p>{t(`home.segments.${key}.body`)}</p>
                  <span className="home-segment__scan" aria-hidden />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section home-about">
        <div className="container home-about__grid">
          <Reveal>
            <p className="section-kicker mono">03</p>
            <h2 className="section-title">{t('home.aboutTitle')}</h2>
            <p className="section-lead">{t('home.aboutBody')}</p>
            <div className="btn-row">
              <Link className="btn" to="/acerca">{t('home.aboutCta')}</Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <HomeAboutVisual />
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <p className="section-kicker mono">04</p>
            <h2 className="section-title">{t('home.quotesTitle')}</h2>
            <p className="section-lead">{t('home.quotesLead')}</p>
          </Reveal>
          <div className="grid-2">
            {(['q1', 'q2'] as const).map((key, i) => (
              <Reveal key={key} delay={i * 0.1}>
                <blockquote className="panel home-quote">
                  <p>“{t(`home.quotes.${key}.text`)}”</p>
                  <footer>
                    <strong>{t(`home.quotes.${key}.name`)}</strong>
                    <span className="mono">{t(`home.quotes.${key}.place`)}</span>
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section home-cta">
        <div className="container">
          <Reveal>
            <div className="home-cta__band">
              <div>
                <h2>{t('home.ctaBandTitle')}</h2>
                <p>{t('home.ctaBandBody')}</p>
              </div>
              <Link className="btn" to="/contacto">{t('home.ctaBandBtn')}</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
