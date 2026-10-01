import { ContactForm } from '../components/ContactForm'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'

export function ConsultasPage() {
  return (
    <>
      <PageHero titleKey="consultas.title" leadKey="consultas.lead" />
      <section className="section">
        <div className="container" style={{ maxWidth: '40rem' }}>
          <Reveal>
            <ContactForm type="consultas" submitLabelKey="consultas.submit" />
          </Reveal>
        </div>
      </section>
    </>
  )
}
