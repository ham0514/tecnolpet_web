import { useTranslation } from 'react-i18next'
import { EmpleoForm } from '../components/EmpleoForm'
import { EmpleoIcon } from '../components/EmpleoIcon'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import './Empleo.css'

const LOOKING = ['l1', 'l2', 'l3', 'l4'] as const
const STEPS = ['s1', 's2', 's3'] as const

export function EmpleoPage() {
  const { t } = useTranslation()

  return (
    <>
      <PageHero titleKey="empleo.title" leadKey="empleo.lead" />
      <section className="section">
        <div className="container empleo-layout">
          <div className="empleo-copy">
            <Reveal>
              <article className="panel empleo-card">
                <div className="empleo-card__head">
                  <EmpleoIcon name="team" />
                  <h2>{t('empleo.whyTitle')}</h2>
                </div>
                <p>{t('empleo.body')}</p>
              </article>
            </Reveal>

            <Reveal delay={0.08}>
              <article className="panel empleo-card">
                <div className="empleo-card__head">
                  <EmpleoIcon name="profiles" />
                  <h2>{t('empleo.lookingTitle')}</h2>
                </div>
                <ul className="empleo-list">
                  {LOOKING.map((key) => (
                    <li key={key}>{t(`empleo.looking.${key}`)}</li>
                  ))}
                </ul>
              </article>
            </Reveal>

            <Reveal delay={0.12}>
              <article className="panel empleo-card">
                <div className="empleo-card__head">
                  <EmpleoIcon name="process" />
                  <h2>{t('empleo.processTitle')}</h2>
                </div>
                <ol className="empleo-steps">
                  {STEPS.map((key, i) => (
                    <li key={key}>
                      <span className="empleo-steps__num">{i + 1}</span>
                      <span>{t(`empleo.process.${key}`)}</span>
                    </li>
                  ))}
                </ol>
              </article>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <EmpleoForm />
          </Reveal>
        </div>
      </section>
    </>
  )
}
