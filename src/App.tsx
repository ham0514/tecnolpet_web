import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AboutPage } from './pages/About'
import { AccreditationsPage } from './pages/Accreditations'
import { ApplicationsPage } from './pages/Applications'
import { ConsultasPage } from './pages/Consultas'
import { ContactPage } from './pages/Contact'
import { DenunciasPage } from './pages/Denuncias'
import { EmpleoPage } from './pages/Empleo'
import { FaqPage } from './pages/Faq'
import { HomePage } from './pages/Home'
import { PrivacyPage } from './pages/Privacy'
import { QuejasPage } from './pages/Quejas'
import { ServicesPage } from './pages/Services'
import { TermsPage } from './pages/Terms'

function Seo() {
  const { t, i18n } = useTranslation()
  const location = useLocation()

  useEffect(() => {
    document.documentElement.lang = i18n.language.startsWith('en') ? 'en' : 'es'
    document.title = `${t('meta.siteName')} · ${t('meta.tagline')}`

    const desc = t('meta.tagline')
    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', desc)

    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', document.title)
    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', desc)
  }, [t, i18n.language, location.pathname])

  return null
}

export default function App() {
  return (
    <>
      <Seo />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="acerca" element={<AboutPage />} />
          <Route path="servicios" element={<ServicesPage />} />
          <Route path="aplicaciones" element={<ApplicationsPage />} />
          <Route path="acreditaciones" element={<AccreditationsPage />} />
          <Route path="sustentabilidad" element={<Navigate to="/acerca#sustentabilidad" replace />} />
          <Route path="contacto" element={<ContactPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="consultas" element={<ConsultasPage />} />
          <Route path="empleo" element={<EmpleoPage />} />
          <Route path="quejas" element={<QuejasPage />} />
          <Route path="denuncias" element={<DenunciasPage />} />
          <Route path="privacidad" element={<PrivacyPage />} />
          <Route path="terminos" element={<TermsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  )
}
