import { useTranslation } from 'react-i18next'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'

export function FaqPage() {
  const { t } = useTranslation()
  const items = ['i1', 'i2', 'i3', 'i4'] as const

  return (
    <>
      <PageHero titleKey="faq.title" leadKey="faq.lead" />
      <section className="section">
        <div className="container" style={{ display: 'grid', gap: '1rem', maxWidth: '48rem' }}>
          {items.map((key, i) => (
            <Reveal key={key} delay={i * 0.05}>
              <details className="panel" style={{ padding: '1.1rem 1.25rem' }}>
                <summary style={{ cursor: 'pointer', fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                  {t(`faq.items.${key}.q`)}
                </summary>
                <p style={{ marginTop: '0.75rem', marginBottom: 0 }}>{t(`faq.items.${key}.a`)}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
