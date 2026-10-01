import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Logo } from '../components/Logo'
import { Reveal } from '../components/Reveal'
import './Home.css'

export function HomePage() {
  const { t } = useTranslation()
  const reduce = useReducedMotion()

  const whyKeys = ['quality', 'tech', 'integrity', 'pros'] as const
  const segmentKeys = ['ndt', 'tools', 'tests', 'general'] as const

  return (
    <div className="home">
      <section className="home-hero">
        <div className="home-hero__glow" aria-hidden />
        <div className="home-hero__arcs" aria-hidden />
        <div className="container home-hero__content">
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

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
          >
            {t('home.headline')}
          </motion.h1>

          <motion.p
            className="home-hero__sub"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            {t('home.sub')}
          </motion.p>

          <motion.div
            className="btn-row"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
          >
            <Link className="btn" to="/contacto">{t('home.ctaPrimary')}</Link>
            <Link className="btn btn-ghost" to="/servicios">{t('home.ctaSecondary')}</Link>
          </motion.div>
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
            <div className="home-about__visual panel">
              <Logo layout="mark" className="home-about__mark" />
              <p className="mono">{t('home.trustIso')}</p>
              <p className="mono">{t('home.trustQms')}</p>
            </div>
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
