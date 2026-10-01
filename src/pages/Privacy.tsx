import { PageHero } from '../components/PageHero'
import { LegalDoc } from '../components/LegalDoc'

export function PrivacyPage() {
  return (
    <>
      <PageHero titleKey="privacy.title" leadKey="privacy.lead" />
      <section className="section">
        <LegalDoc ns="privacy" />
      </section>
    </>
  )
}
