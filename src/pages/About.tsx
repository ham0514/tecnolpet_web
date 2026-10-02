import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { AboutVisual } from '../components/AboutVisual'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import './About.css'

export function AboutPage() {
  const { t } = useTranslation()

  const blocks = [
    ['missionTitle', 'mission'],
    ['visionTitle', 'vision'],
    ['qualityTitle', 'quality'],
    ['socialTitle', 'social'],
    ['confTitle', 'conf'],
    ['impartialTitle', 'impartial'],
    ['digitalTitle', 'digital'],
    ['historyTitle', 'history'],
  ] as const

  const pillars = ['p1', 'p2', 'p3'] as const

  return (
    <>
      <PageHero titleKey="about.title" leadKey="about.lead" />
      <section className="section">
        <div className="container">
          <div className="about-intro-row">
            <Reveal>
              <p className="section-lead about-intro">{t('about.intro')}</p>
            </Reveal>
            <AboutVisual />
          </div>
          <div className="grid-2 about-blocks">
            {blocks.map(([title, body], i) => (
              <Reveal key={title} delay={(i % 2) * 0.06}>
                <article className="panel about-card">
                  <h2>{t(`about.${title}`)}</h2>
                  <p>{t(`about.${body}`)}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="sustentabilidad" className="section about-sustainability">
        <div className="container">
          <Reveal>
            <p className="section-kicker mono">{t('nav.about')}</p>
            <h2 className="section-title">{t('sustainability.title')}</h2>
            <p className="section-lead">{t('sustainability.lead')}</p>
            <p className="section-lead about-sustainability__body">{t('sustainability.body')}</p>
          </Reveal>
          <div className="grid-3 about-blocks">
            {pillars.map((key, i) => (
              <Reveal key={key} delay={i * 0.07}>
                <article className="panel about-card">
                  <h3>{t(`sustainability.pillars.${key}.title`)}</h3>
                  <p>{t(`sustainability.pillars.${key}.body`)}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="about-related">
              <Link className="btn btn-ghost" to="/acreditaciones">
                {t('nav.accreditations')}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
