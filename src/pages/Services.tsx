import { useTranslation } from 'react-i18next'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import './Services.css'

const ndt = ['vt', 'mt', 'pt', 'ut'] as const
const tests = ['tension', 'load', 'extra'] as const

export function ServicesPage() {
  const { t } = useTranslation()

  return (
    <>
      <PageHero titleKey="services.title" leadKey="services.lead" />
      <section className="section">
        <div className="container">
          <Reveal>
            <p className="section-lead">{t('services.intro')}</p>
          </Reveal>

          <Reveal>
            <h2 className="services-heading">{t('services.ndtTitle')}</h2>
          </Reveal>
          <div className="grid-2">
            {ndt.map((key, i) => (
              <Reveal key={key} delay={i * 0.05}>
                <article className="panel service-card">
                  <span className="mono service-card__code">{t(`services.items.${key}.code`)}</span>
                  <h3>{t(`services.items.${key}.title`)}</h3>
                  <p>{t(`services.items.${key}.body`)}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <h2 className="services-heading">{t('services.testsTitle')}</h2>
          </Reveal>
          <div className="grid-3">
            {tests.map((key, i) => (
              <Reveal key={key} delay={i * 0.05}>
                <article className="panel service-card">
                  <span className="mono service-card__code">{t(`services.items.${key}.code`)}</span>
                  <h3>{t(`services.items.${key}.title`)}</h3>
                  <p>{t(`services.items.${key}.body`)}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="services-trust">{t('services.trust')}</p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
