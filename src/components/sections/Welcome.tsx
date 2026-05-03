import { Container } from 'react-bootstrap'

export default function Welcome() {
  return (
    <section id="welcome" style={{ backgroundColor: 'var(--party-light)' }}>
      <Container>
        <div className="text-center">
          <h2 className="section-title">Velkommen!</h2>
          <div className="section-divider" />
          <p className="lead text-muted mx-auto" style={{ maxWidth: 640 }}>
            Her finner du alt av informasjon du trenger for helgen.
          </p>
        </div>
      </Container>
    </section>
  )
}
