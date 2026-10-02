import { useTranslation } from 'react-i18next'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { ServiceIcon, type ServiceIconKey } from '../components/ServiceIcon'
import { ServicesVisual } from '../components/ServicesVisual'
import './Services.css'

const ndt = ['vt', 'mt', 'pt', 'ut', 'emi', 'drillpipe'] as const
const tests = ['tension', 'load', 'extra'] as const
const rental = ['tools', 'tubing', 'accessories'] as const
const training = ['trainNdt', 'trainSafety', 'trainTech'] as const

function ServiceCard({
  itemKey,
  delay,
}: {
  itemKey: ServiceIconKey
  delay: number
}) {
  const { t, i18n } = useTranslation()
  const detailsKey = `services.items.${itemKey}.details`
  const expanded = i18n.exists(detailsKey) ? t(detailsKey) : ''

  return (
    <Reveal delay={delay}>
      <article className={`panel service-card${itemKey === 'drillpipe' ? ' service-card--wide' : ''}`}>
        <div className="service-card__top">
          <ServiceIcon name={itemKey} />
          <span className="mono service-card__code">{t(`services.items.${itemKey}.code`)}</span>
        </div>
        <h3>{t(`services.items.${itemKey}.title`)}</h3>
        <p>{t(`services.items.${itemKey}.body`)}</p>
        {expanded ? <p className="service-card__details">{expanded}</p> : null}
      </article>
    </Reveal>
  )
}

export function ServicesPage() {
  const { t } = useTranslation()

  return (
    <>
      <PageHero titleKey="services.title" leadKey="services.lead" />
      <section className="section">
        <div className="container">
          <div className="services-intro">
            <Reveal>
              <p className="section-lead services-intro__copy">{t('services.intro')}</p>
            </Reveal>
            <ServicesVisual />
          </div>

          <Reveal>
            <h2 className="services-heading">{t('services.ndtTitle')}</h2>
          </Reveal>
          <div className="services-grid">
            {ndt.map((key, i) => (
              <ServiceCard key={key} itemKey={key} delay={i * 0.05} />
            ))}
          </div>

          <Reveal>
            <h2 className="services-heading">{t('services.testsTitle')}</h2>
          </Reveal>
          <div className="grid-3">
            {tests.map((key, i) => (
              <ServiceCard key={key} itemKey={key} delay={i * 0.05} />
            ))}
          </div>

          <Reveal>
            <h2 className="services-heading">{t('services.rentalTitle')}</h2>
            <p className="section-lead services-category-lead">{t('services.rentalLead')}</p>
          </Reveal>
          <div className="grid-3">
            {rental.map((key, i) => (
              <ServiceCard key={key} itemKey={key} delay={i * 0.05} />
            ))}
          </div>

          <Reveal>
            <h2 className="services-heading">{t('services.trainingTitle')}</h2>
            <p className="section-lead services-category-lead">{t('services.trainingLead')}</p>
          </Reveal>
          <div className="grid-3">
            {training.map((key, i) => (
              <ServiceCard key={key} itemKey={key} delay={i * 0.05} />
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
