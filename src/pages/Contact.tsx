import { useTranslation } from 'react-i18next'
import { ContactForm } from '../components/ContactForm'
import { ContactIcon } from '../components/ContactIcon'
import type { ContactIconKey } from '../components/ContactIcon'
import { ContactVisual } from '../components/ContactVisual'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import './Contact.css'

const MAP_EMBED =
  'https://maps.google.com/maps?q=-0.3988226,-76.9967921+(Tecnolpet+S.A.)&z=17&ie=UTF8&iwloc=B&output=embed'

const MAP_LINK =
  'https://www.google.com/maps/place/Tecnolpet+S.A./@-0.3988226,-76.9967921,17z/data=!3m1!4b1!4m6!3m5!1s0x91d7ba6318b68f9f:0xb3af0990bcc427f9!8m2!3d-0.3988226!4d-76.9967921!16s%2Fg%2F11bwfm86q9'

const channels: Array<{
  icon: ContactIconKey
  labelKey: string
  bodyKey: string
  href?: string
  secondaryKey?: string
  secondaryHref?: string
  secondaryNoteKey?: string
}> = [
  { icon: 'location', labelKey: 'addressLabel', bodyKey: 'address' },
  {
    icon: 'phone',
    labelKey: 'phoneLabel',
    bodyKey: 'phone',
    href: 'tel:+59362378070',
    secondaryKey: 'mobile',
    secondaryHref: 'https://wa.me/593989839318',
    secondaryNoteKey: 'mobileWhatsapp',
  },
  { icon: 'email', labelKey: 'emailLabel', bodyKey: 'email', href: 'mailto:mail@tecnolpet.com' },
  { icon: 'hours', labelKey: 'hoursLabel', bodyKey: 'hours' },
]

export function ContactPage() {
  const { t } = useTranslation()

  return (
    <>
      <PageHero titleKey="contact.title" leadKey="contact.lead" />
      <section className="section">
        <div className="container contact-layout">
          <div className="contact-side">
            <Reveal>
              <article className="panel contact-intro">
                <p className="mono contact-intro__kicker">{t('contact.sideKicker')}</p>
                <h2>{t('contact.sideTitle')}</h2>
                <p>{t('contact.sideBody')}</p>
              </article>
            </Reveal>

            <div className="contact-channels">
              {channels.map((channel, i) => (
                <Reveal key={channel.labelKey} delay={i * 0.05}>
                  <article className="panel contact-channel">
                    <div className="contact-channel__head">
                      <ContactIcon name={channel.icon} />
                      <p className="mono contact-channel__label">{t(`contact.${channel.labelKey}`)}</p>
                    </div>
                    {channel.href ? (
                      <a className="contact-channel__value" href={channel.href}>
                        {t(`contact.${channel.bodyKey}`)}
                      </a>
                    ) : (
                      <p className="contact-channel__value">{t(`contact.${channel.bodyKey}`)}</p>
                    )}
                    {channel.secondaryKey && channel.secondaryHref && (
                      <a
                        className="contact-channel__value contact-channel__value--secondary"
                        href={channel.secondaryHref}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t(`contact.${channel.secondaryKey}`)}
                        {channel.secondaryNoteKey ? ` · ${t(`contact.${channel.secondaryNoteKey}`)}` : ''}
                      </a>
                    )}
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.18}>
              <article className="panel contact-map-card">
                <div className="contact-map-card__top">
                  <div>
                    <p className="mono contact-channel__label">{t('contact.mapLabel')}</p>
                    <p className="contact-map-card__note">{t('contact.mapNote')}</p>
                  </div>
                  <a
                    className="contact-map-card__link"
                    href={MAP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('contact.mapOpen')}
                    <span aria-hidden>↗</span>
                  </a>
                </div>
                <div className="contact-map">
                  <iframe
                    title="Tecnolpet map"
                    src={MAP_EMBED}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </article>
            </Reveal>
          </div>

          <Reveal delay={0.08}>
            <div className="contact-form-wrap">
              <div className="contact-form-banner">
                <ContactIcon name="message" />
                <div>
                  <p className="mono contact-intro__kicker">{t('contact.formKicker')}</p>
                  <h2>{t('contact.formTitle')}</h2>
                  <p>{t('contact.formLead')}</p>
                </div>
              </div>
              <ContactForm type="contact" className="contact-form" />
              <Reveal delay={0.12}>
                <ContactVisual />
              </Reveal>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
