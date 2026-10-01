import { useTranslation } from 'react-i18next'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import './Accreditations.css'

const SCOPE_PDF =
  'https://sistema.acreditacion.gob.ec/storage/users/tecnolpet/accreditation_application/2720/pdf_actives_scopes/2026_04_01_10_22_42_Alcances_SAE%20INS%2015-016_20260401_102206.pdf'

export function AccreditationsPage() {
  const { t } = useTranslation()

  return (
    <>
      <PageHero titleKey="accreditations.title" leadKey="accreditations.lead" />
      <section className="section">
        <div className="container">
          <div className="grid-2">
            <Reveal>
              <article className="panel accred-card">
                <p className="mono accred-card__code">ISO/IEC 17020</p>
                <h2>{t('accreditations.iso17020')}</h2>
                <a
                  className="accred-card__link"
                  href={SCOPE_PDF}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('accreditations.scopeLink')}
                  <span aria-hidden>↗</span>
                </a>
              </article>
            </Reveal>
            <Reveal delay={0.08}>
              <article className="panel accred-card">
                <p className="mono accred-card__code">ISO 9001:2015</p>
                <h2>{t('accreditations.iso9001')}</h2>
              </article>
            </Reveal>
          </div>
          <Reveal>
            <p className="section-lead accred-body">{t('accreditations.body')}</p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
