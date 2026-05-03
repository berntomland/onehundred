import { Container, Row, Col, Alert, Button } from 'react-bootstrap'
import MapFlyby from '../MapFlyby'

export default function GettingThere() {
  return (
    <section id="getting-there" style={{ backgroundColor: '#fff' }}>
      <Container>
        <div className="text-center mb-5">
          <h2 className="section-title">Slik finner du frem</h2>
          <div className="section-divider" />
          <p className="text-muted">Hytten ligger i Farsund — ikke akkurat naboer, men absolutt verdt turen.</p>
        </div>
        <Row className="g-4 align-items-start">
          <Col md={5}>
            <Alert variant="info">
              <Alert.Heading>📍 Adresse</Alert.Heading>
              <p className="mb-1"><strong>Bekkevik 85, 4550 Farsund</strong></p>
              <p className="mb-2 small text-muted">Koordinater: 58.0922° N, 6.8338° Ø</p>
              <Button
                variant="outline-primary"
                size="sm"
                href="https://www.google.com/maps/dir/Bergen/Bekkevik+85,+4550+Farsund"
                target="_blank"
                rel="noreferrer"
              >
                Veibeskrivelse fra Bergen →
              </Button>
            </Alert>

            <h5 className="fw-bold mt-4 mb-3" style={{ color: 'var(--party-dark)' }}>Med bil</h5>
            <p className="text-muted">
              Fra Bergen: E39 sørover mot Stavanger, ta av ved Lyngdal og følg skilting mot Farsund. Regn med ca. 3–3,5 timer — perfekt tid til å lage den ultimate helgespillisten.
            </p>

            <h5 className="fw-bold mt-4 mb-3" style={{ color: 'var(--party-dark)' }}>Uten bil</h5>
            <p className="text-muted">
              Vi oppfordrer sterkt til samkjøring — ta en titt i gruppa og finn noen å kjøre med. Det er mer gøy, billigere, og miljøet takker deg.
            </p>
          </Col>
          <Col md={7}>
            <MapFlyby />
            <p className="text-muted small mt-2 text-center">
              Kartet flyr fra Bergen til hytten — omtrent like smooth som turen blir. Klikk på markøren for Google Maps.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
