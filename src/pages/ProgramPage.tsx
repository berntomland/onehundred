import { Link } from 'react-router-dom'
import './ProgramPage.css'

type Event = {
  time: string
  title: string
  note?: string
  highlight?: boolean
}

type Day = {
  label: string
  color: string
  events: Event[]
}

const program: Day[] = [
  {
    label: 'Fredag 26. juni',
    color: '#3b6ea5',
    events: [
      {
        time: '16:00',
        title: 'Første gjester ankommer',
        note: 'Alle oppfordres til å komme til hytten — også de som skal sove i byen. Antrekk: Noe som passer til fotballkamp',
      },
      {
        time: '20:00',
        title: 'Festen starter',
        note: 'Velkommen og oppjazzing til fotballkampen.',
        highlight: true,
      },
      {
        time: '21:00',
        title: 'Fotballkamp',
        note: 'Kampen vises på prosjektor.',
        highlight: true,
      },
      {
        time: 'Kvelden',
        title: 'Hamburger fra grillen',
        note: 'Serveres løpende. Vil du ha mer enn en burger tar du med det du ønsker selv.',
      },
      {
        time: 'Når du vil',
        title: 'Legg deg når du vil',
        note: 'Oline er sjåfør for de som trenger transport til byen.',
      },
    ],
  },
  {
    label: 'Lørdag 27. juni',
    color: '#2c9e58',
    events: [
      {
        time: '09:00',
        title: 'Frokost',
        note: 'Sett frem mat, lag kaffe, rydd etterpå.',
      },
      {
        time: '',
        title: 'For deg som sover i byen',
        note: 'Du kan enten komme til hytten for frokost, eller møte direkte på kaia i Farsund til båtturen. Mer informasjon om dette kommer uken før.',
      },
      {
        time: '10:45',
        title: 'Avgang fra bryggen i Bekkeviga',
        note: 'De som er på hytta møter på bryggen for å bli plukket opp til båtturen.',
        highlight: true,
      },
      {
        time: '11:00',
        title: 'Avgang — båttur i skjærgården',
        note: '4 båter. Hvert lag har én båtsjef og én drikkeansvarlig. Hvert lag har fått et oppdrag som fremføres på kvelden — dikt, sang, dans, standup eller noe eget. Båtfordeling kunngjøres i forkant.',
      },
      {
        time: '14:00–15:00',
        title: 'Tilbake på hytta',
        note: 'Bading, soling, skifte klær, kubb, dart, prat — gjør det du har lyst til.',
      },
      {
        time: '17:00',
        title: 'Sommerkjoler og drinker i baren',
        note: 'Alle pynter seg. Drinker og mingling.',
      },
      {
        time: '18:00',
        title: 'Middag',
        note: 'Sørlandsmeny. Under middagen er det anledning til å holde taler, fremvise båtlagets oppdrag og annen underholdning.',
        highlight: true,
      },
      {
        time: 'Etter middag',
        title: 'Drinker i baren',
      },
      {
        time: '~21:00',
        title: 'Samling foran annekset',
        note: 'Bålpannen er tent. Musikk, underholdning og dans. Det er fortsatt mulighet for å holde taler, underholde, fortelle en vits, synge en sang — eller bare kose seg.',
        highlight: true,
      },
      {
        time: '21:15',
        title: 'Underholdning, dans og mingling',
      },
      {
        time: '23:30',
        title: 'Pølsefest',
      },
      {
        time: '~01:00',
        title: 'Nattbad?',
      },
      {
        time: 'Utover natten',
        title: 'Transport tilbake til byen',
        note: 'Transport går puljevis, enten med båt eller maxitaxi. Detaljer kommer uken før.',
      },
    ],
  },
  {
    label: 'Søndag 28. juni',
    color: '#c0692a',
    events: [
      {
        time: '11:00',
        title: 'Frokost',
        note: 'For de som ønsker. Sen start — ingen hastverk.',
      },
      {
        time: '13:00',
        title: 'Guidet tur i Farsund',
        note: 'For de som har lyst. Forutsetter godt vær.',
      },
      {
        time: 'Hele dagen',
        title: 'Åpent program',
        note: 'Dra når du vil, bli så lenge du vil. Ingen fasit på søndagen.',
      },
    ],
  },
]

export default function ProgramPage() {
  return (
    <div className="pp-page">
      <header className="pp-header">
        <Link to="/">← Tilbake</Link>
        <h1>Detaljert program</h1>
      </header>

      <div className="pp-body">
        {program.map(day => (
          <div key={day.label} className="pp-day">
            <div className="pp-day-heading" style={{ color: day.color }}>
              {day.label}
            </div>
            {day.events.map((ev, i) => (
              <div key={i} className="pp-event">
                <div className="pp-time">{ev.time}</div>
                <div className="pp-content">
                  <div className={`pp-title${ev.highlight ? ' is-highlight' : ''}`}>
                    {ev.title}
                  </div>
                  {ev.note && <div className="pp-note">{ev.note}</div>}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
