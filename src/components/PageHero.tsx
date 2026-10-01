import { useTranslation } from 'react-i18next'
import './PageHero.css'

type PageHeroProps = {
  titleKey: string
  leadKey: string
}

export function PageHero({ titleKey, leadKey }: PageHeroProps) {
  const { t } = useTranslation()

  return (
    <section className="page-hero">
      <div className="container">
        <p className="section-kicker mono">Tecnolpet S.A.</p>
        <h1>{t(titleKey)}</h1>
        <p className="section-lead">{t(leadKey)}</p>
      </div>
    </section>
  )
}
