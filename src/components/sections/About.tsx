import { Container } from 'react-bootstrap'
import { ABOUT } from '../../content'

export default function About() {
  return (
    <section id="om-helgen" className="bg-body-secondary">
      <Container>
        <div className="text-center">
          <h2 className="section-title">{ABOUT.title}</h2>
          <div className="section-divider" />
          <p className="lead mx-auto mb-4" style={{ maxWidth: 680 }}>
            {ABOUT.body}
          </p>
          <p className="text-muted mb-1">{ABOUT.planLabel}</p>
          <p className="fw-semibold fs-5">{ABOUT.planners}</p>
        </div>
      </Container>
    </section>
  )
}
