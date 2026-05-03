import { Container } from 'react-bootstrap'
import { WELCOME } from '../../content'

export default function Welcome() {
  return (
    <section id="welcome" className="bg-body-secondary">
      <Container>
        <div className="text-center">
          <h2 className="section-title">{WELCOME.title}</h2>
          <div className="section-divider" />
          <p className="lead text-muted mx-auto" style={{ maxWidth: 640 }}>
            {WELCOME.subtitle}
          </p>
        </div>
      </Container>
    </section>
  )
}
