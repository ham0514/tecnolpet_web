import { useTranslation } from 'react-i18next'
import { PageHero } from '../components/PageHero'
import { QuejasForm } from '../components/QuejasForm'
import { QuejasIcon } from '../components/QuejasIcon'
import { Reveal } from '../components/Reveal'
import './Quejas.css'

const NC_PROCEDURE_PDF = '/files/politicas/gestion_nc.pdf'

export function QuejasPage() {
  const { t } = useTranslation()

  return (
    <>
      <PageHero titleKey="quejas.title" leadKey="quejas.lead" />
      <section className="section">
        <div className="container quejas-layout">
          <div className="quejas-copy">
            <Reveal>
              <article className="panel quejas-card">
                <div className="quejas-card__head">
                  <QuejasIcon name="definitions" />
                  <h2>{t('quejas.definitionsTitle')}</h2>
                </div>
                <dl className="quejas-defs">
                  <div>
                    <dt>{t('quejas.complaintTerm')}</dt>
                    <dd>{t('quejas.complaintDef')}</dd>
                  </div>
                  <div>
                    <dt>{t('quejas.appealTerm')}</dt>
                    <dd>{t('quejas.appealDef')}</dd>
                  </div>
                </dl>
              </article>
            </Reveal>

            <Reveal delay={0.08}>
              <article className="panel quejas-card">
                <div className="quejas-card__head">
                  <QuejasIcon name="channels" />
                  <h2>{t('quejas.howTitle')}</h2>
                </div>
                <p className="quejas-channels-lead">{t('quejas.howLead')}</p>
                <ul className="quejas-channels">
                  <li>{t('quejas.channels.email')}</li>
                  <li>{t('quejas.channels.phone')}</li>
                  <li>{t('quejas.channels.inPerson')}</li>
                </ul>
              </article>
            </Reveal>

            <Reveal delay={0.12}>
              <article className="panel quejas-card">
                <div className="quejas-card__head">
                  <QuejasIcon name="procedure" />
                  <h2>{t('quejas.procedureTitle')}</h2>
                </div>
                <p className="quejas-channels-lead">{t('quejas.procedureLead')}</p>
                <a
                  className="quejas-doc-link"
                  href={NC_PROCEDURE_PDF}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('quejas.procedureLink')}
                  <span aria-hidden>↗</span>
                </a>
              </article>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <QuejasForm />
          </Reveal>
        </div>
      </section>
    </>
  )
}
