import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const LINKEDIN_URL = 'https://www.linkedin.com/company/tecnolpet-s-a'
const WHATSAPP_URL = 'https://wa.me/593989839318'

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.25h4.52V24H.24V8.25zM8.34 8.25h4.33v2.14h.06c.6-1.14 2.08-2.34 4.28-2.34 4.58 0 5.42 3.01 5.42 6.93V24h-4.52v-7.73c0-1.84-.03-4.21-2.57-4.21-2.57 0-2.96 2.01-2.96 4.08V24H8.34V8.25z" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.99.57 3.85 1.56 5.44L2 22l4.89-1.63a9.86 9.86 0 0 0 5.15 1.41h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2zm5.76 13.99c-.24.68-1.4 1.24-1.93 1.32-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.26-4.79-4.18-4.93-4.37-.14-.19-1.15-1.53-1.15-2.92 0-1.39.73-2.07.99-2.35.26-.28.57-.35.76-.35h.55c.18 0 .41-.07.64.49.24.58.81 2 .88 2.14.07.14.12.31.02.5-.1.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.56.16.28.7 1.15 1.5 1.86 1.03.92 1.9 1.2 2.17 1.34.27.14.43.12.59-.07.16-.19.68-.79.86-1.06.18-.28.36-.23.61-.14.24.1 1.55.73 1.81.86.27.14.44.2.51.31.07.12.07.67-.17 1.35z" />
    </svg>
  )
}

/** Compact accent strip under the contact form. */
export function ContactVisual() {
  const { t } = useTranslation()
  const reduce = useReducedMotion()

  return (
    <div className="contact-visual panel">
      <div className="contact-visual__row">
        <motion.span
          className={`contact-visual__dot${reduce ? ' is-static' : ''}`}
          aria-hidden
          animate={reduce ? undefined : { scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
          transition={reduce ? undefined : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="contact-visual__copy">
          <p className="mono contact-visual__kicker">{t('contact.visualKicker')}</p>
          <p className="contact-visual__title">{t('contact.visualTitle')}</p>
        </div>
        <div className="contact-visual__actions">
          <a
            className="btn btn-ghost contact-social-btn"
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon />
            <span>{t('contact.visualLinkedin')}</span>
          </a>
          <a
            className="btn btn-ghost contact-social-btn"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon />
            <span>{t('contact.visualWhatsapp')}</span>
          </a>
        </div>
      </div>
    </div>
  )
}
