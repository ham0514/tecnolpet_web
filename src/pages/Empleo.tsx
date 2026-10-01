import { useTranslation } from 'react-i18next'
import { ContactForm } from '../components/ContactForm'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'

export function EmpleoPage() {
  const { t } = useTranslation()

  return (
    <>
      <PageHero titleKey="empleo.title" leadKey="empleo.lead" />
      <section className="section">
        <div className="container" style={{ maxWidth: '40rem' }}>
          <Reveal>
            <p className="section-lead">{t('empleo.body')}</p>
            <ContactForm
              type="empleo"
              submitLabelKey="empleo.submit"
              extraFields={['role', 'cv']}
            />
          </Reveal>
        </div>
      </section>
    </>
  )
}
