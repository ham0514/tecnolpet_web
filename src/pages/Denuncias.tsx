import { useTranslation } from 'react-i18next'
import { ContactForm } from '../components/ContactForm'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import './Denuncias.css'

export function DenunciasPage() {
  const { t } = useTranslation()

  return (
    <>
      <PageHero titleKey="denuncias.title" leadKey="denuncias.lead" />
      <section className="section">
        <div className="container denuncias-layout">
          <div className="denuncias-copy">
            <Reveal>
              <article className="panel">
                <h2>{t('denuncias.antiTitle')}</h2>
                <p>{t('denuncias.anti')}</p>
              </article>
            </Reveal>
            <Reveal delay={0.08}>
              <article className="panel">
                <h2>{t('denuncias.harassTitle')}</h2>
                <p>{t('denuncias.harass')}</p>
              </article>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <ContactForm type="denuncias" submitLabelKey="denuncias.submit" extraFields={[]} />
          </Reveal>
        </div>
      </section>
    </>
  )
}
