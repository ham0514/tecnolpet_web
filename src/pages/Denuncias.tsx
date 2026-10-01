import { useTranslation } from 'react-i18next'
import { ContactForm } from '../components/ContactForm'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'

export function DenunciasPage() {
  const { t } = useTranslation()

  return (
    <>
      <PageHero titleKey="denuncias.title" leadKey="denuncias.lead" />
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ marginBottom: '2rem' }}>
            <Reveal>
              <article className="panel" style={{ padding: '1.4rem' }}>
                <h2 style={{ fontSize: '1.35rem' }}>{t('denuncias.antiTitle')}</h2>
                <p>{t('denuncias.anti')}</p>
              </article>
            </Reveal>
            <Reveal delay={0.08}>
              <article className="panel" style={{ padding: '1.4rem' }}>
                <h2 style={{ fontSize: '1.35rem' }}>{t('denuncias.harassTitle')}</h2>
                <p>{t('denuncias.harass')}</p>
              </article>
            </Reveal>
          </div>
          <Reveal>
            <div style={{ maxWidth: '40rem' }}>
              <ContactForm type="denuncias" submitLabelKey="denuncias.submit" extraFields={[]} />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
