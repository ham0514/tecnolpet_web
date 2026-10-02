import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Logo } from './Logo'
import './Footer.css'

export function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div>
          <Logo layout="footer" className="site-footer__logo" />
          <p className="site-footer__blurb">{t('footer.blurb')}</p>
        </div>

        <div>
          <h3 className="mono">{t('footer.links')}</h3>
          <ul>
            <li><Link to="/acerca">{t('nav.about')}</Link></li>
            <li><Link to="/acerca#sustentabilidad">{t('nav.sustainability')}</Link></li>
            <li><Link to="/servicios">{t('nav.services')}</Link></li>
            <li><Link to="/aplicaciones">{t('nav.apps')}</Link></li>
            <li><Link to="/acreditaciones">{t('nav.accreditations')}</Link></li>
            <li><Link to="/faq">{t('nav.faq')}</Link></li>
            <li><Link to="/contacto">{t('nav.contact')}</Link></li>
            <li><Link to="/empleo">{t('nav.empleo')}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mono">{t('footer.legal')}</h3>
          <ul>
            <li><Link to="/quejas">{t('nav.quejas')}</Link></li>
            <li><Link to="/denuncias">{t('nav.denuncias')}</Link></li>
            <li><Link to="/privacidad">{t('nav.privacy')}</Link></li>
            <li><Link to="/terminos">{t('nav.terms')}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mono">{t('footer.contact')}</h3>
          <ul>
            <li><a href="tel:+59362378070">{t('contact.phone')}</a></li>
            <li><a href="mailto:mail@tecnolpet.com">{t('contact.email')}</a></li>
            <li>{t('contact.address')}</li>
          </ul>
        </div>
      </div>

      <div className="container site-footer__bottom">
        <span>© {year} Tecnolpet S.A. {t('footer.rights')}</span>
        <Logo layout="mark" className="site-footer__mark" alt="" />
      </div>
    </footer>
  )
}
