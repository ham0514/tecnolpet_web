import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import es from './locales/es.json'

const saved = typeof window !== 'undefined' ? localStorage.getItem('tecnolpet-lang') : null

void i18n.use(initReactI18next).init({
  resources: {
    es: { translation: es },
    en: { translation: en },
  },
  lng: saved === 'en' || saved === 'es' ? saved : 'es',
  fallbackLng: 'es',
  interpolation: { escapeValue: false },
})

export default i18n
