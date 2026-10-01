import { PageHero } from '../components/PageHero'
import { LegalDoc } from '../components/LegalDoc'

export function TermsPage() {
  return (
    <>
      <PageHero titleKey="terms.title" leadKey="terms.lead" />
      <section className="section">
        <LegalDoc ns="terms" />
      </section>
    </>
  )
}
