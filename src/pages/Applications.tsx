import { useTranslation } from 'react-i18next'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import './Applications.css'

const apps = [
  {
    key: 'fastdoing',
    code: 'FD',
    href: 'https://app.fastdoing.com',
  },
  {
    key: 'tecu',
    code: 'TU',
    href: 'https://lms.tecnolpet.com/',
  },
  {
    key: 'candidato',
    code: 'CV',
    href: 'https://candidatea.speedexam.net/login?site=ckwlp15ckwlp',
  },
  {
    key: 'email',
    code: 'EM',
    href: 'http://tecnolpet.com:2095',
  },
] as const

export function ApplicationsPage() {
  const { t } = useTranslation()

  return (
    <>
      <PageHero titleKey="apps.title" leadKey="apps.lead" />
      <section className="section">
        <div className="container">
          <Reveal>
            <p className="section-lead apps-intro">{t('apps.intro')}</p>
          </Reveal>

          <div className="grid-2 apps-grid">
            {apps.map((app, i) => (
              <Reveal key={app.key} delay={i * 0.06}>
                <article className="panel apps-card">
                  <span className="mono apps-card__code">{app.code}</span>
                  <h2>{t(`apps.items.${app.key}.title`)}</h2>
                  <p className="apps-card__subtitle">{t(`apps.items.${app.key}.subtitle`)}</p>
                  <p>{t(`apps.items.${app.key}.body`)}</p>
                  <a
                    className="btn apps-card__cta"
                    href={app.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('apps.open')}
                    <span aria-hidden>↗</span>
                  </a>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="apps-note">{t('apps.note')}</p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
