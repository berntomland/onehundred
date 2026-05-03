import { Container, Row, Col, Card, Alert } from 'react-bootstrap'
import { PARKING } from '../../content'

export default function Parking() {
  return (
    <section id="parking" className="bg-body-secondary">
      <Container>
        <div className="text-center mb-5">
          <h2 className="section-title">{PARKING.title}</h2>
          <div className="section-divider" />
          <p className="text-muted">{PARKING.subtitle}</p>
        </div>

        <Row className="g-4 mb-4">
          {PARKING.options.map(({ icon, name, tag, tagColor, details, note, mapUrl }) => (
            <Col key={name} xs={12} md={6}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <div className="d-flex align-items-center gap-2">
                      <span style={{ fontSize: '1.6rem' }}>{icon}</span>
                      <Card.Title className="fw-bold mb-0">{name}</Card.Title>
                    </div>
                    <span
                      className="small fw-semibold px-2 py-1 rounded-pill"
                      style={{ background: tagColor, color: '#fff', fontSize: '0.75rem' }}
                    >
                      {tag}
                    </span>
                  </div>
                  <ul className="list-unstyled mt-3 mb-0">
                    {details.map(({ label, value }) => (
                      <li key={label} className="d-flex justify-content-between small text-muted border-bottom py-1">
                        <span>{label}</span>
                        <span className="fw-semibold">{value}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="small text-muted mt-3 mb-0 fst-italic">{note}</p>
                  {mapUrl && (
                    <a
                      href={mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="small fw-semibold d-inline-block mt-2"
                      style={{ color: 'var(--party-secondary)' }}
                    >
                      {PARKING.mapsLabel}
                    </a>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Alert variant="info">
          <Alert.Heading className="fs-6 fw-bold">{PARKING.tipTitle}</Alert.Heading>
          <p className="mb-2" dangerouslySetInnerHTML={{ __html: PARKING.tip1 }} />
          <p className="mb-0" dangerouslySetInnerHTML={{ __html: PARKING.tip2 }} />
        </Alert>
      </Container>
    </section>
  )
}
