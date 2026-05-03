import { Container, Row, Col } from 'react-bootstrap'

type Event = { time: string; label: string; note?: string }

const days: { day: string; events: Event[] }[] = [
  {
    day: 'Fredag 26. juni',
    events: [
      {
        time: 'Ettermiddag',
        label: 'Ankomst — endelig!',
        note: 'Kom når du kan. Hytten er klar fra ettermiddagen, og noen kommer sent på kvelden — begge deler er helt greit.',
      },
      {
        time: 'Hele kvelden',
        label: '🍔 Hamburger fra grillen',
        note: 'Selvlagde burgere fra grillen serveres løpende hele kvelden. Ingen fast middagstid — mat er klart når du ankommer.',
      },
      {
        time: 'Utover kvelden',
        label: '⚽ Norge vs. Frankrike på prosjektor',
        note: 'VM-åpningskampen vises utendørs på prosjektor. Ta med noe godt å sitte i og stem stemmen.',
      },
    ],
  },
  {
    day: 'Lørdag 27. juni',
    events: [
      {
        time: 'Morgenen',
        label: '🍳 Frokost på hytten',
        note: 'For de som sover på hytten. De som overnatter i byen møter vi opp og henter — ingen blir glemt.',
      },
      {
        time: 'Ca. 10:00',
        label: '⚓ Båttur — alle mann om bord!',
        note: 'Vi drar ut på sjøen i ca. 4 timer. Det blir enkel servering og drikke underveis, og det blir mulighet for å bade. Ta med badetøy og håndkle — vanntemperaturen er et sted mellom 10 og 20 grader, og det er opp til deg hva du synes om det.',
      },
      {
        time: 'Ettermiddagen',
        label: 'Tilbake på hytten — pust ut',
        note: 'Etter båtturen er det bare å slappe av, tørke seg, og lade opp til kvelden.',
      },
      {
        time: 'Kvelden',
        label: '🍽️ Middag, underholdning og god stemning',
        note: 'Ordentlig middag, og så holder vi på så lenge vi gidder. Utpå natten dukker det opp litt nattmat.',
      },
    ],
  },
  {
    day: 'Søndag 28. juni',
    events: [
      {
        time: 'Formiddagen',
        label: '🚶 Omvisning i Farsund by',
        note: 'For de som har lyst — en liten guidet spasertur i Farsund sentrum. Ingen tvang, men anbefales.',
      },
      {
        time: 'Hele dagen',
        label: 'Hytten er åpen',
        note: 'Dra når du vil, bli så lenge du vil. Ingen fasit på søndagen — gjør akkurat som du selv ønsker.',
      },
      {
        time: 'Etterpå',
        label: 'Savne alle umiddelbart',
        note: '',
      },
    ],
  },
]

export default function Program() {
  return (
    <section id="program" style={{ backgroundColor: '#fff' }}>
      <Container>
        <div className="text-center mb-5">
          <h2 className="section-title">Program</h2>
          <div className="section-divider" />
          <p className="text-muted">Her er planen — løs nok til å ha det gøy, konkret nok til at du vet hva du går til.</p>
        </div>
        <Row className="g-4">
          {days.map(({ day, events }) => (
            <Col key={day} xs={12} md={4}>
              <div
                className="p-4 rounded-3 h-100"
                style={{ background: 'var(--party-light)', borderLeft: '4px solid var(--party-primary)' }}
              >
                <h5 className="fw-bold mb-4" style={{ color: 'var(--party-dark)' }}>{day}</h5>
                <ul className="list-unstyled mb-0">
                  {events.map(({ time, label, note }) => (
                    <li key={time} className="mb-4">
                      <span className="fw-semibold small d-block mb-1" style={{ color: 'var(--party-secondary)' }}>{time}</span>
                      <span className="fw-semibold d-block" style={{ color: 'var(--party-dark)' }}>{label}</span>
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
