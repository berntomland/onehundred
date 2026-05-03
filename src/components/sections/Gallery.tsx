import { Container, Row, Col } from 'react-bootstrap'

const photos = [
  '2026-05-01 09.31.31.jpg',
  '2026-05-01 11.02.49.jpg',
  '2026-05-01 11.02.53.jpg',
  '2026-05-01 17.30.57.jpg',
  '2026-05-01 17.31.04.jpg',
  '2026-05-01 17.31.57.jpg',
  '2026-05-01 17.32.02.jpg',
  '2026-05-01 17.32.18.jpg',
  '2026-05-01 17.32.32.jpg',
  '2026-05-01 17.32.34.jpg',
  '2026-05-01 17.32.39.jpg',
  '2026-05-01 17.32.56.jpg',
  '2026-05-01 17.33.01.jpg',
  '2026-05-01 17.33.21.jpg',
  '2026-05-01 17.33.24.jpg',
  '2026-05-01 17.35.02.jpg',
  '2026-05-01 17.35.06.jpg',
  '2026-05-01 17.35.10.jpg',
  '2026-05-01 17.35.21.jpg',
  '2026-05-01 18.08.17.jpg',
  '2026-05-01 18.08.33.jpg',
  '2026-05-01 18.08.46.jpg',
  '2026-05-02 14.16.39.jpg',
  '2026-05-02 14.16.44.jpg',
  '2026-05-02 14.17.35.jpg',
  '2026-05-02 14.17.48.jpg',
  '2026-05-02 14.17.58.jpg',
  '2026-05-02 14.18.39.jpg',
  '2026-05-02 14.22.16.jpg',
  '2026-05-02 14.22.27.jpg',
]

export default function Gallery() {
  return (
    <section id="gallery" style={{ backgroundColor: 'var(--party-light)' }}>
      <Container>
        <div className="text-center mb-5">
          <h2 className="section-title">Sjekk hva vi har å se frem til</h2>
          <div className="section-divider" />
          <p className="text-muted">Dette er hytten. Ja, det er like bra som det ser ut.</p>
        </div>
        <Row className="g-2">
          {photos.map(name => (
            <Col key={name} xs={6} sm={4} md={3}>
              <a
                href={`/images/${name}`}
                target="_blank"
                rel="noreferrer"
                style={{ display: 'block', aspectRatio: '4/3', overflow: 'hidden', borderRadius: 8 }}
              >
                <img
                  src={`/images/${name}`}
                  alt=""
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </a>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}
