import { useTranslation } from 'react-i18next'
import { ContactForm } from '../components/ContactForm'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'

export function QuejasPage() {
  const { t } = useTranslation()

  return (
    <>
      <PageHero titleKey="quejas.title" leadKey="quejas.lead" />
      <section className="section">
        <div className="container" style={{ maxWidth: '40rem' }}>
          <Reveal>
            <p className="section-lead">{t('quejas.body')}</p>
            <ContactForm type="quejas" submitLabelKey="quejas.submit" extraFields={['company']} />
          </Reveal>
        </div>
      </section>
    </>
  )
}
