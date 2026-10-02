import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { AboutIcon } from '../components/AboutIcon'
import type { AboutIconKey } from '../components/AboutIcon'
import { AboutVisual } from '../components/AboutVisual'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import './About.css'

const POLICY_BASE = '/files/politicas'

type PolicyDoc = {
  labelKey: string
  file: string
}

const blocks: Array<{
  title: string
  body: string
  icon: AboutIconKey
  docs?: PolicyDoc[]
}> = [
  { title: 'missionTitle', body: 'mission', icon: 'mission' },
  { title: 'visionTitle', body: 'vision', icon: 'vision' },
  {
    title: 'qualityTitle',
    body: 'quality',
    icon: 'quality',
    docs: [{ labelKey: 'quality', file: 'calidad.pdf' }],
  },
  {
    title: 'socialTitle',
    body: 'social',
    icon: 'social',
    docs: [{ labelKey: 'social', file: 'social.pdf' }],
  },
  {
    title: 'confTitle',
    body: 'conf',
    icon: 'confidentiality',
    docs: [{ labelKey: 'confidentiality', file: 'confidencialidad.pdf' }],
  },
  {
    title: 'impartialTitle',
    body: 'impartial',
    icon: 'impartiality',
    docs: [{ labelKey: 'impartiality', file: 'imparcialidad.pdf' }],
  },
]

const pillars = ['p1', 'p2', 'p3'] as const
const historyKeys = ['origins', 'y2016', 'y2018', 'today'] as const

export function AboutPage() {
  const { t } = useTranslation()

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

          <Reveal>
            <article className="panel about-card about-card--history">
              <div className="about-card__head">
                <AboutIcon name="history" />
                <div>
                  <h2>{t('about.historyTitle')}</h2>
                  <p className="about-history__lead">{t('about.historyLead')}</p>
                </div>
              </div>
              <ol className="about-timeline">
                {historyKeys.map((key) => (
                  <li key={key} className="about-timeline__item">
                    <p className="about-timeline__year mono">{t(`about.history.${key}.year`)}</p>
                    <p className="about-timeline__body">{t(`about.history.${key}.body`)}</p>
                  </li>
                ))}
              </ol>
            </article>
          </Reveal>

          <div className="grid-2 about-blocks">
            {blocks.map(({ title, body, icon, docs }, i) => (
              <Reveal key={title} delay={(i % 2) * 0.06}>
                <article className="panel about-card">
                  <div className="about-card__head">
                    <AboutIcon name={icon} />
                    <h2>{t(`about.${title}`)}</h2>
                  </div>
                  <p>{t(`about.${body}`)}</p>
                  {docs && docs.length > 0 && (
                    <div className="about-card__docs">
                      {docs.map((doc) => (
                        <a
                          key={doc.file}
                          className="about-doc-btn"
                          href={`${POLICY_BASE}/${doc.file}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span>{t(`about.policies.${doc.labelKey}`)}</span>
                          <span aria-hidden>↗</span>
                        </a>
                      ))}
                    </div>
                  )}
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
