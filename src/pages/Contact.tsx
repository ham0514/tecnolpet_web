import { useTranslation } from 'react-i18next'
import { ContactForm } from '../components/ContactForm'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import './Contact.css'

export function ContactPage() {
  const { t } = useTranslation()

  return (
    <>
      <PageHero titleKey="contact.title" leadKey="contact.lead" />
      <section className="section">
        <div className="container contact-grid">
          <Reveal>
            <div className="panel contact-info">
              <div>
                <p className="mono accent">{t('contact.addressLabel')}</p>
                <p>{t('contact.address')}</p>
              </div>
              <div>
                <p className="mono accent">{t('contact.phoneLabel')}</p>
                <p><a href="tel:+59362378070">{t('contact.phone')}</a></p>
              </div>
              <div>
                <p className="mono accent">{t('contact.emailLabel')}</p>
                <p><a href="mailto:mail@tecnolpet.com">{t('contact.email')}</a></p>
              </div>
              <div>
                <p className="mono accent">{t('contact.hoursLabel')}</p>
                <p>{t('contact.hours')}</p>
              </div>
              <div>
                <p className="mono accent">Map</p>
                <p>{t('contact.mapNote')}</p>
                <div className="contact-map">
                  <iframe
                    title="Tecnolpet map"
                    src="https://maps.google.com/maps?q=El%20Coca%20Orellana%20Ecuador&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="220"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div>
              <h2 className="contact-form-title">{t('contact.formTitle')}</h2>
              <ContactForm type="contact" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
