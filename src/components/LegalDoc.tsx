import { useTranslation } from 'react-i18next'
import { Reveal } from './Reveal'
import './LegalDoc.css'

type LegalSection = {
  title: string
  paragraphs: string[]
}

type LegalDocProps = {
  ns: 'privacy' | 'terms'
}

export function LegalDoc({ ns }: LegalDocProps) {
  const { t, i18n } = useTranslation()
  const sections = t(`${ns}.sections`, { returnObjects: true }) as LegalSection[]

  return (
    <div className="container legal-doc">
      <Reveal>
        <p className="legal-doc__intro">{t(`${ns}.intro`)}</p>
        <p className="mono legal-doc__updated">{t(`${ns}.updated`)}</p>
      </Reveal>

      <div className="legal-doc__sections">
        {Array.isArray(sections) &&
          sections.map((section, i) => (
            <Reveal key={`${i18n.language}-${section.title}`} delay={(i % 3) * 0.04}>
              <article className="panel legal-doc__section">
                <h2>{section.title}</h2>
                {section.paragraphs.map((p) => (
                  <p key={p.slice(0, 48)}>{p}</p>
                ))}
              </article>
            </Reveal>
          ))}
      </div>

      {ns === 'privacy' && (
        <Reveal>
          <p className="legal-doc__note">{t('privacy.contactNote')}</p>
        </Reveal>
      )}
    </div>
  )
}
