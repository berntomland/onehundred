import { Container, Row, Col, Card, Alert } from 'react-bootstrap'

const options = [
  {
    icon: '🏬',
    name: 'Senteret i Farsund',
    tag: 'Anbefalt',
    tagColor: 'var(--party-primary)',
    details: [
      { label: 'Kapasitet', value: 'Stor parkeringsplass' },
      { label: 'Varighet', value: 'Hele helgen' },
      { label: 'Elbillader', value: 'Ja ⚡' },
    ],
    note: 'Beste alternativet for de fleste. Stort parkeringsanlegg ved kjøpesenteret — ingen problemer med å stå her hele helgen.',
    mapUrl: 'https://maps.app.goo.gl/x75zczvKHeH8ZUPK7',
  },
  {
    icon: '🏘️',
    name: 'Eneboligen i Farsund',
    tag: 'Begrenset',
    tagColor: 'var(--party-secondary)',
    details: [
      { label: 'Kapasitet', value: '8–10 biler' },
      { label: 'Varighet', value: 'Hele helgen' },
      { label: 'Elbillader', value: 'Ikke bekreftet' },
    ],
    note: 'Praktisk for de som overnatter i eneboligen. Begrenset antall plasser — first come, first served.',
    mapUrl: 'https://maps.app.goo.gl/GuCLargTyf5LDrSg7',
  },
]

export default function Parking() {
  return (
    <section id="parking" style={{ backgroundColor: 'var(--party-light)' }}>
      <Container>
        <div className="text-center mb-5">
          <h2 className="section-title">Parkering</h2>
          <div className="section-divider" />
          <p className="text-muted">
            Det er lite parkering rett ved hytten — biler parkeres i Farsund by, og man tar seg frem til hytten derfra.
          </p>
        </div>

        <Row className="g-4 mb-4">
          {options.map(({ icon, name, tag, tagColor, details, note, mapUrl }) => (
            <Col key={name} xs={12} md={6}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <div className="d-flex align-items-center gap-2">
                      <span style={{ fontSize: '1.6rem' }}>{icon}</span>
                      <Card.Title className="fw-bold mb-0" style={{ color: 'var(--party-dark)' }}>{name}</Card.Title>
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
                      📍 Vis i Google Maps →
                    </a>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Alert variant="info">
          <Alert.Heading className="fs-6 fw-bold">🚗 Tips: slipp av folk og bagasje først</Alert.Heading>
          <p className="mb-2">
            Det er mulig å kjøre helt frem til hytten, slippe av folk og bagasje, og deretter kjøre tilbake til Farsund for å parkere. Det er bare <strong>5 minutters gange</strong> fra parkeringsplassen til hytten.
          </p>
          <p className="mb-0">
            Transport mellom Farsund og hytten blir mest sannsynlig <strong>med båt</strong> — mer info om dette kommer.
          </p>
        </Alert>
      </Container>
    </section>
  )
}
