import { Container, Row, Col } from 'react-bootstrap'
import { PROGRAM } from '../../content'

export default function Program() {
  return (
    <section id="program" className="bg-body-secondary">
      <Container>
        <div className="text-center mb-5">
          <h2 className="section-title">{PROGRAM.title}</h2>
          <div className="section-divider" />
        </div>
        <Row className="g-4">
          {PROGRAM.days.map(({ day, events }) => (
            <Col key={day} xs={12} md={4}>
              <div
                className="p-4 rounded-3 h-100"
                style={{ background: 'var(--bs-tertiary-bg)', borderLeft: '4px solid var(--bs-primary)' }}
              >
                <h5 className="fw-bold mb-4">{day}</h5>
                <ul className="list-unstyled mb-0">
                  {events.map(({ time, label, note }) => (
                    <li key={time} className="mb-4">
                      <span className="fw-semibold small d-block mb-1 text-primary">{time}</span>
                      <span className="fw-semibold d-block">{label}</span>
                      {note && (
                        <p className="text-muted small mb-0 mt-1">{note}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}
