import { Container, Row, Col, Alert, Button } from 'react-bootstrap'
import MapFlyby from '../MapFlyby'
import { GETTING_THERE } from '../../content'

export default function GettingThere() {
  return (
    <section id="getting-there">
      <Container>
        <div className="text-center mb-5">
          <h2 className="section-title">{GETTING_THERE.title}</h2>
          <div className="section-divider" />
          <p className="text-muted">{GETTING_THERE.subtitle}</p>
        </div>
        <Row className="g-4 align-items-start">
          <Col md={5}>
            <Alert variant="info">
              <Alert.Heading>{GETTING_THERE.addressHeading}</Alert.Heading>
              <p className="mb-1"><strong>{GETTING_THERE.addressLine}</strong></p>
              <p className="mb-2 small text-muted">Koordinater: {GETTING_THERE.coordinates}</p>
              <Button
                variant="outline-primary"
                size="sm"
                href="https://www.google.com/maps/dir/Bergen/Bekkevik+85,+4550+Farsund"
                target="_blank"
                rel="noreferrer"
              >
                {GETTING_THERE.directionsBtn}
              </Button>
            </Alert>

            <h5 className="fw-bold mt-4 mb-3">{GETTING_THERE.byCarTitle}</h5>
            <p className="text-muted">
              {GETTING_THERE.byCar}
            </p>

            <h5 className="fw-bold mt-4 mb-3">{GETTING_THERE.noCarTitle}</h5>
            <p className="text-muted">
              {GETTING_THERE.noCar}
            </p>
          </Col>
          <Col md={7}>
            <MapFlyby />
            <p className="text-muted small mt-2 text-center">
              {GETTING_THERE.mapCaption}
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
