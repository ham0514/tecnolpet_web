import { useTranslation } from 'react-i18next'
import { DenunciasForm } from '../components/DenunciasForm'
import { DenunciasIcon } from '../components/DenunciasIcon'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import './Denuncias.css'

const CODE_OF_CONDUCT_PDF = '/files/politicas/codigo_conducta.pdf'

export function DenunciasPage() {
  const { t } = useTranslation()

  return (
    <>
      <PageHero titleKey="denuncias.title" leadKey="denuncias.lead" />
      <section className="section">
        <div className="container denuncias-layout">
          <div className="denuncias-copy">
            <Reveal>
              <article className="panel denuncias-card">
                <div className="denuncias-card__head">
                  <DenunciasIcon name="integrity" />
                  <div>
                    <p className="mono denuncias-card__kicker">{t('denuncias.antiKicker')}</p>
                    <h2>{t('denuncias.antiTitle')}</h2>
                  </div>
                </div>
                <p>{t('denuncias.anti')}</p>
              </article>
            </Reveal>

            <Reveal delay={0.08}>
              <article className="panel denuncias-card">
                <div className="denuncias-card__head">
                  <DenunciasIcon name="workplace" />
                  <div>
                    <p className="mono denuncias-card__kicker">{t('denuncias.harassKicker')}</p>
                    <h2>{t('denuncias.harassTitle')}</h2>
                  </div>
                </div>
                <p>{t('denuncias.harass')}</p>
              </article>
            </Reveal>

            <Reveal delay={0.12}>
              <article className="panel denuncias-card denuncias-card--note">
                <div className="denuncias-card__head">
                  <DenunciasIcon name="confidential" />
                  <h2>{t('denuncias.noteTitle')}</h2>
                </div>
                <p>{t('denuncias.note')}</p>
              </article>
            </Reveal>

            <Reveal delay={0.16}>
              <article className="panel denuncias-card">
                <div className="denuncias-card__head">
                  <DenunciasIcon name="conduct" />
                  <div>
                    <p className="mono denuncias-card__kicker">{t('denuncias.conductKicker')}</p>
                    <h2>{t('denuncias.conductTitle')}</h2>
                  </div>
                </div>
                <p>{t('denuncias.conduct')}</p>
                <a
                  className="denuncias-doc-link"
                  href={CODE_OF_CONDUCT_PDF}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('denuncias.conductLink')}
                  <span aria-hidden>↗</span>
                </a>
              </article>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <DenunciasForm />
          </Reveal>
        </div>
      </section>
    </>
  )
}
