import { useState, useRef } from 'react'
import { Container, Row, Col, Card, Alert, Form, InputGroup } from 'react-bootstrap'

const locations = [
  {
    icon: '🏠',
    name: 'Annekset',
    capacity: 'ca. 10–11 personer',
    mapUrl: 'https://maps.app.goo.gl/dycKm6uXgmJn7Sx78',
    spots: [
      { label: 'Hems', count: '6 plasser (litt trangt, men hyggelig)' },
      { label: 'Soverom', count: '2–3 plasser' },
      { label: 'Stuegulv', count: '2 på madrass' },
    ],
    note: null as string | null,
    guests: ['Jørgen', 'Bettina', 'Øyvind', 'Liv Karin'],
  },
  {
    icon: '🏡',
    name: 'Hovedhytten',
    capacity: '8 personer',
    mapUrl: 'https://maps.app.goo.gl/6mhuKGEjVa8MiRm7A',
    spots: [
      { label: 'Sengeplasser', count: '8 stk' },
    ],
    note: 'Hovedoppholdsstedet for hele gjengen — ingen gulvsovere her.',
    guests: ['Alma', 'Oline', 'Bernt', 'Vibeke', 'Svein Erik', 'Anne Marie'],
  },
  {
    icon: '🛖',
    name: 'Hytte 2',
    capacity: 'ca. 10 personer',
    mapUrl: 'https://maps.app.goo.gl/YmSBqqNAxovP7WsXA',
    spots: [
      { label: 'Sengeplasser', count: '6 stk' },
      { label: 'Stue', count: '2 på madrass' },
      { label: 'Vinterhage', count: '2 på madrass' },
    ],
    note: null,
    guests: ['Kjell Arne', 'Ingrid', 'Annabelle', 'Christian'],
  },
  {
    icon: '⚓',
    name: 'Båthuset',
    capacity: '2 personer',
    mapUrl: 'https://maps.app.goo.gl/mYfihk454TiB3nCa8',
    spots: [
      { label: 'Madrass', count: '2 plasser' },
    ],
    note: 'Meld deg frivillig! Du sover med bølgeskvulp som lydkulisse. Eksklusivt for de som vet å sette pris på det.',
    guests: ['Håvard', 'Ingrid'],
  },
  {
    icon: '🏘️',
    name: 'Enebolig i Farsund',
    capacity: '15–20+ personer',
    mapUrl: 'https://maps.app.goo.gl/GuCLargTyf5LDrSg7',
    spots: [
      { label: 'Sengeplasser', count: '15 stk' },
      { label: 'Med luftmadrasser', count: 'Enkelt å utvide til 20+' },
      { label: 'Anneks ved sjøen', count: '3 av plassene ligger her' },
    ],
    note: 'Ligger i Farsund by. De som sover her blir plukket opp til båtturen lørdag morgen.',
    guests: ['Hildegunn', 'Lilly Ann', 'Linda', 'Tom-Ivar', 'Stig', 'Tor Erik', 'Christine', 'Lennart', 'Synnøve', 'Toli', 'Ronny', 'Thomas', 'Øystein', 'Kjersti', 'Louise'],
  },
]

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
    <section id="sleeping" style={{ backgroundColor: '#fff' }}>
      <Container>
        <div className="text-center mb-5">
          <h2 className="section-title">Hvor sover man?</h2>
          <div className="section-divider" />
          <p className="text-muted">Vi har plass til alle — fordelt på fem lokasjoner.</p>
        </div>

        {/* Search */}
        <div className="mx-auto mb-5" style={{ maxWidth: 460 }}>
          <p className="fw-semibold text-center mb-2" style={{ color: 'var(--party-dark)' }}>
            Finn din soveplass
          </p>
          <InputGroup>
            <InputGroup.Text>🔍</InputGroup.Text>
            <Form.Control
              placeholder="Skriv inn navnet ditt..."
              value={query}
              onChange={e => handleSearch(e.target.value)}
              autoComplete="off"
            />
          </InputGroup>
          {query.length >= 2 && matchIndex >= 0 && (
            <div
              className="mt-2 px-3 py-2 rounded-3 text-center fw-semibold"
              style={{ background: '#d1e7dd', color: '#0a3622' }}
            >
              {matchedGuest} sover på <strong>{locations[matchIndex].name}</strong> {locations[matchIndex].icon}
            </div>
          )}
          {query.length >= 2 && matchIndex < 0 && (
            <div
              className="mt-2 px-3 py-2 rounded-3 text-center text-muted"
              style={{ background: '#f8f9fa' }}
            >
              Fant ingen med det navnet — sjekk stavingen eller spør arrangørene.
            </div>
          )}
        </div>

        <Alert variant="warning" className="mb-5">
          <Alert.Heading className="fs-6 fw-bold">📋 Husk å ta med</Alert.Heading>
          <ul className="mb-0">
            <li>Laken + sovepose <strong>eller</strong> dyne — vi har noen dyner, men langt fra nok til alle</li>
            <li>Vi er avhengige av at noen tar med <strong>luftmadrasser</strong> — mer info om dette kommer</li>
            <li>Romfordeling deles ut nærmere arrangementet</li>
            <li>De fleste må rekne med å dele rom — det er en del av moroa 🙂</li>
          </ul>
        </Alert>

        <Row className="g-4">
          {locations.map(({ icon, name, capacity, mapUrl, spots, note, guests }, idx) => {
            const isMatch = idx === matchIndex
            return (
              <Col key={name} xs={12} md={6} lg={4}>
                <div ref={el => { cardRefs.current[idx] = el }}>
                  <Card
                    className="h-100 border-0 shadow-sm"
                    style={isMatch ? { outline: '3px solid #198754', outlineOffset: 2 } : {}}
                  >
                    <Card.Body className="p-4">
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <span style={{ fontSize: '1.6rem' }}>{icon}</span>
                        <Card.Title className="fw-bold mb-0" style={{ color: 'var(--party-dark)' }}>{name}</Card.Title>
                      </div>
                      <p className="small fw-semibold mb-3" style={{ color: 'var(--party-secondary)' }}>
                        {capacity}
                      </p>
                      <ul className="list-unstyled mb-0">
                        {spots.map(({ label, count }) => (
                          <li key={label} className="d-flex justify-content-between small text-muted border-bottom py-1">
                            <span>{label}</span>
                            <span className="fw-semibold">{count}</span>
                          </li>
                        ))}
                      </ul>
                      {note && <p className="small text-muted mt-3 mb-0 fst-italic">{note}</p>}

                      {/* Guest list */}
                      <div className="mt-3 pt-3" style={{ borderTop: '1px solid #dee2e6' }}>
                        <p className="small fw-semibold mb-2" style={{ color: 'var(--party-dark)' }}>
                          Sover her:
                        </p>
                        <div className="d-flex flex-wrap gap-1">
                          {guests.map(guest => {
                            const isThisPerson = q.length >= 2 && normalize(guest).includes(q)
                            return (
                              <span
                                key={guest}
                                className="small px-2 py-1 rounded-pill"
                                style={{
                                  background: isThisPerson ? '#198754' : 'var(--party-light)',
                                  color: isThisPerson ? '#fff' : 'var(--party-dark)',
                                  fontWeight: isThisPerson ? 700 : 400,
                                  transition: 'all 0.2s',
                                }}
                              >
                                {guest}
                              </span>
                            )
                          })}
                        </div>
                      </div>

                      {mapUrl && (
                        <a
                          href={mapUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="small fw-semibold d-inline-block mt-3"
                          style={{ color: 'var(--party-secondary)' }}
                        >
                          📍 Vis i Google Maps →
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
