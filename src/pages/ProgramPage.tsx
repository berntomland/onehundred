import { Link } from 'react-router-dom'
import './ProgramPage.css'

type Event = {
  time: string
  title: string
  note?: string
  ansvarlig?: string
  highlight?: boolean
}

type Day = {
  label: string
  color: string
  events: Event[]
}

const program: Day[] = [
  {
    label: 'Torsdag 25. juni — forberedelser',
    color: '#888',
    events: [
      {
        time: '',
        title: 'Lage dressing og tilbehør til skalldyr',
        note: 'Gjøres dagen før for å spare tid lørdag.',
      },
      {
        time: '',
        title: 'Sitrus våtservietter / sitrusbad',
        note: 'Trenger boller til dette. Klargjøres på forhånd.',
      },
    ],
  },
  {
    label: 'Fredag 26. juni',
    color: '#3b6ea5',
    events: [
      {
        time: '15:00',
        title: 'Klargjøring',
        note: 'Mat og grill klargjøres. Bord og stoler settes opp. Bakervarer hentes. Krabber ankommer fra Rema 1000.',
      },
      {
        time: '16:00',
        title: 'Båttransport starter',
        note: 'Gjester fraktes fra Farsund til hytta gjennom kvelden.',
        ansvarlig: 'Benjamin og Lea',
      },
      {
        time: '16:00',
        title: 'Første gjester ankommer',
        note: 'Alle oppfordres til å komme til hytten — også de som skal sove i byen. Antrekk: rødt, hvitt og blått 🇳🇴',
      },
      {
        time: '20:00',
        title: 'Offisiell åpning',
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
        title: 'Finn din soveplass',
        note: 'Finn deg til rette når du ønsker.',
      },
    ],
  },
  {
    label: 'Lørdag 27. juni',
    color: '#2c9e58',
    events: [
      {
        time: 'Morgen',
        title: 'Klargjøre søppelstasjoner',
        note: 'Settes opp før frokost.',
      },
      {
        time: '09:00',
        title: 'Frokost',
        note: 'Sett frem mat, lag kaffe, rydd etterpå. De som sover i byen møter til båtturen.',
        ansvarlig: 'TBD (2–4 pers)',
      },
      {
        time: '10:45',
        title: 'Oppmøte på bryggen',
        note: 'Alle møter på bryggen. Ha klart ansvar for drikke i hvert båtlag.',
        highlight: true,
      },
      {
        time: '11:00',
        title: 'Avgang — båttur i skjærgården',
        note: '4 båter. Hvert lag har én båtsjef og én drikkeansvarlig. Hvert lag har fått et oppdrag som fremføres på kvelden — dikt, sang, dans, standup eller noe eget. Båtfordeling kunngjøres i forkant.',
        ansvarlig: 'Båtsjef × 4: TBD',
      },
      {
        time: '14:00–15:00',
        title: 'Tilbake på hytta',
        note: 'Bading, soling, skifte klær, kubb, dart, prat — gjør det du har lyst til.',
      },
      {
        time: '16:00',
        title: 'Musikk på',
        note: 'Spilles fra nå og gjennom hele kvelden.',
        ansvarlig: 'Tor Erik / Thomas / Jørgen',
      },
      {
        time: '16:00',
        title: 'Dekking og klargjøring til middag',
        note: 'Pynte bord, sette frem rekvisita og dekke til.',
        ansvarlig: 'Liv Karin / Ragnhild',
      },
      {
        time: '16:00',
        title: 'Matforberedelser',
        note: 'Steke lapper og servere boller. Klargjøre skalldyrmenyen.',
        ansvarlig: 'Beate / Bettina / Thomas / Christian',
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
        title: 'Kransekake, konfekt og kaffe',
        ansvarlig: '2 stk kaffe + kaker, 4 stk rydder',
      },
      {
        time: '22:00',
        title: 'Samling foran annekset',
        note: 'Bålpannen er tent. Musikk, underholdning og dans.',
        highlight: true,
      },
      {
        time: '22:00',
        title: 'Jenka og dansing',
        ansvarlig: 'Kjell Arne',
      },
      {
        time: '23:30',
        title: 'Pølsefest',
        ansvarlig: '2 stk ansvarlig (TBD)',
      },
      {
        time: '~01:00',
        title: 'Bading?',
        note: 'For de spreke.',
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
        ansvarlig: 'Håvard / Kari',
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
                  {ev.ansvarlig && (
                    <span className="pp-ansvarlig">Ansvarlig: {ev.ansvarlig}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
