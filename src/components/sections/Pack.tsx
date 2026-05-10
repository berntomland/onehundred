import { Container, Row, Col } from 'react-bootstrap'
import { PACK } from '../../content'

export default function Pack() {
  return (
    <section id="pack" style={{ background: 'var(--bs-warning-bg-subtle)' }}>
      <Container>
        <div className="text-center mb-5">
          <h2 className="section-title">{PACK.title}</h2>
          <div className="section-divider" />
        </div>

        <Row className="g-4 justify-content-center">
          <Col xs={12} md={6}>
            <div
              className="p-4 rounded-3 h-100"
              style={{ background: 'var(--bs-warning-border-subtle)', borderLeft: '4px solid var(--bs-warning)' }}
            >
              <h5 className="fw-bold mb-3">{PACK.mustHaveTitle}</h5>
              <ul className="mb-0">
                {PACK.mustHaveItems.map((item, i) => (
                  <li key={i} className="mb-2" dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ul>
            </div>
          </Col>

          <Col xs={12} md={6}>
            <div
              className="p-4 rounded-3 h-100"
              style={{ background: 'var(--bs-warning-border-subtle)', borderLeft: '4px solid var(--bs-warning)' }}
            >
              <h5 className="fw-bold mb-3">{PACK.niceToHaveTitle}</h5>
              <ul className="mb-0">
                {PACK.niceToHaveItems.map((item, i) => (
                  <li key={i} className="mb-2" dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
