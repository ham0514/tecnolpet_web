import { useTranslation } from 'react-i18next'
import './LanguageToggle.css'

export function LanguageToggle() {
  const { i18n, t } = useTranslation()
  const current = i18n.language.startsWith('en') ? 'en' : 'es'

  const setLang = (lng: 'es' | 'en') => {
    void i18n.changeLanguage(lng)
    localStorage.setItem('tecnolpet-lang', lng)
    document.documentElement.lang = lng
  }

  return (
    <div className="lang-toggle" role="group" aria-label={t('lang.label')}>
      <button
        type="button"
        className={current === 'es' ? 'is-active' : ''}
        onClick={() => setLang('es')}
      >
        {t('lang.es')}
      </button>
      <button
        type="button"
        className={current === 'en' ? 'is-active' : ''}
        onClick={() => setLang('en')}
      >
        {t('lang.en')}
      </button>
    </div>
  )
}
