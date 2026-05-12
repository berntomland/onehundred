import { useState, useRef } from 'react'
import { Container, Row, Col, Card, Form, InputGroup } from 'react-bootstrap'
import { SLEEPING } from '../../content'

const locations = SLEEPING.locations

function normalize(s: string) {
  return s.toLowerCase().trim()
}

export default function Sleeping() {
  const [query, setQuery] = useState('')
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const q = normalize(query)
  const matchIndex = q.length >= 2
    ? locations.findIndex(loc =>
        loc.guests.some(g => normalize(g).includes(q))
      )
    : -1
  const matchedGuest = matchIndex >= 0
    ? locations[matchIndex].guests.find(g => normalize(g).includes(q))
    : null

  function handleSearch(value: string) {
    setQuery(value)
    const idx = value.trim().length >= 2
      ? locations.findIndex(loc =>
          loc.guests.some(g => normalize(g).includes(normalize(value)))
        )
      : -1
    if (idx >= 0) {
      setTimeout(() => {
        cardRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 100)
    }
  }

  return (
    <section id="sleeping">
      <Container>
        <div className="text-center mb-5">
          <h2 className="section-title">{SLEEPING.title}</h2>
          <div className="section-divider" />
          <p className="text-muted">{SLEEPING.subtitle}</p>
        </div>

        {/* Search */}
        <div className="mx-auto mb-4" style={{ maxWidth: 460 }}>
          <p className="fw-semibold text-center mb-2">
            {SLEEPING.searchTitle}
          </p>
          <InputGroup>
            <InputGroup.Text>🔍</InputGroup.Text>
            <Form.Control
              placeholder={SLEEPING.searchPlaceholder}
              value={query}
              onChange={e => handleSearch(e.target.value)}
              autoComplete="off"
            />
          </InputGroup>
          {query.length >= 2 && matchIndex < 0 && (
            <div className="mt-2 px-3 py-2 rounded-3 text-center alert alert-secondary mb-0">
              {SLEEPING.searchMiss}
            </div>
          )}
        </div>

        <Row className="g-4">
          {locations.map(({ icon, name, capacity, totalCapacity, mapUrl, spots, note, guests }, idx) => {
            const isMatch = idx === matchIndex
            const used = guests.length
            const pct = Math.min(used / totalCapacity, 1)
            const barColor = used > totalCapacity ? '#dc3545' : used === totalCapacity ? '#fd7e14' : '#198754'
            return (
              <Col key={name} xs={12} md={6} lg={4}>
                <div ref={el => { cardRefs.current[idx] = el }}>
                  <Card
                    className="h-100 border-0 shadow-sm"
                    style={isMatch ? { outline: '3px solid #198754', outlineOffset: 2 } : {}}
                  >
                    <Card.Body className="p-4">
                      {isMatch && (
                        <div className="alert alert-success py-2 px-3 mb-3 fw-semibold small text-center">
                          {SLEEPING.searchHit(matchedGuest!, name, icon)}
                        </div>
                      )}
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <span style={{ fontSize: '1.6rem' }}>{icon}</span>
                        <Card.Title className="fw-bold mb-0">{name}</Card.Title>
                      </div>
                      <p className="small fw-semibold mb-2 text-muted">
                        {capacity}
                      </p>
                      <div className="mb-3">
                        <div className="d-flex justify-content-between small mb-1">
                          <span className="text-muted">Plasser tatt</span>
                          <span className="fw-bold" style={{ color: barColor }}>{used} / {totalCapacity}</span>
                        </div>
                        <div style={{ height: 6, background: 'var(--bs-secondary-bg)', borderRadius: 4, overflow: 'hidden' }}>
                          <div style={{ width: `${pct * 100}%`, height: '100%', background: barColor, borderRadius: 4, transition: 'width 0.3s' }} />
                        </div>
                      </div>
                      <ul className="list-unstyled mb-0">
                        {spots.map(({ label, count }) => (
                          <li key={label} className="d-flex justify-content-between small text-muted border-bottom py-1">
                            <span>{label}</span>
                            <span className="fw-semibold">{count}</span>
                          </li>
                        ))}
                      </ul>
                      {note && <p className="small text-muted mt-3 mb-0 fst-italic">{note}</p>}

                      {mapUrl && (
                        <a
                          href={mapUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="small fw-semibold d-inline-block mt-3"
                          style={{ color: 'var(--party-secondary)' }}
                        >
                          {SLEEPING.mapsLabel}
                        </a>
                      )}
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            )
          })}
        </Row>

      </Container>
    </section>
  )
}
