import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import './SjekklistePage.css'

type Item = {
  id: string
  oppgave: string
  notat?: string
  kontakt?: string
  pris?: number
}

type Kategori = {
  navn: string
  items: Item[]
}

const kategorier: Kategori[] = [
  {
    navn: 'Torsdag 25. juni — forberedelser',
    items: [
      {
        id: 'tors-dressing',
        oppgave: 'Lage dressing og tilbehør til skalldyr',
        notat: 'Gjøres dagen før for å spare tid lørdag.',
      },
      {
        id: 'tors-sitrus',
        oppgave: 'Klargjøre sitrus våtservietter / sitrusbad',
        notat: 'Trenger boller til dette.',
      },
    ],
  },
  {
    navn: 'Kontakter — ring / sjekk',
    items: [
      {
        id: 'lilly-bord',
        oppgave: 'Bord, stoler og lydanlegg',
        notat: 'Sjekke tilgjengelighet og koordinere transport til hytta.',
        kontakt: 'Lilly Ann / Tom Ivar',
      },
      {
        id: 'livkarin-kanon',
        oppgave: 'Videokanon / prosjektor',
        notat: 'Til fotballkampen fredag og eventuell underholdning lørdag.',
        kontakt: 'Liv Karin',
      },
      {
        id: 'livkarin-service',
        oppgave: 'Engangsservice — tallerkener, bestikk, kopper',
        notat: 'Sjekke hva som finnes og om det rekker til 50+ personer.',
        kontakt: 'Liv Karin',
      },
      {
        id: 'hotell-is',
        oppgave: 'Is til drinker og kjøling',
        notat: 'Sjekke mulighet for å hente is — trolig trenger vi mye.',
        kontakt: 'Farsund Fjordhotell',
      },
      {
        id: 'benjamin-lea-bat',
        oppgave: 'Bekrefte båttransport fredag 16:00–24:00',
        notat: 'Frakt av gjester mellom Farsund og hytta hele fredagskvelden.',
        kontakt: 'Benjamin / Lea',
      },
    ],
  },
  {
    navn: 'Mat — sjømat til middag',
    items: [
      {
        id: 'reker-blaskjell',
        oppgave: 'Reker — ca. 15 kg',
        notat: '300g × 50 pers. Bestilles utenom butikk.',
        kontakt: 'TBD — avklar kilde',
        pris: 6000,
      },
      {
        id: 'blaskjell',
        oppgave: 'Blåskjell — ca. 7,5 kg',
        notat: '150g × 50 pers. Pris ca. 89 kr/kg.',
        pris: 668,
      },
      {
        id: 'krabbe-raeg',
        oppgave: 'Krabber — 25 stk ✓ bestilt',
        notat: 'Bestilt fra Stig i Søgne. Bekrefte levering/henting.',
        kontakt: 'Stig i Søgne',
        pris: 3000,
      },
    ],
  },
  {
    navn: 'Mat — middag og kveldsmat',
    items: [
      {
        id: 'lapper-boller',
        oppgave: 'Lapper og boller',
        notat: 'Serveres lørdag ettermiddag etter båtturen (ca. 16:00).',
      },
      {
        id: 'kransekake',
        oppgave: 'Kransekake og konfekt',
        notat: 'Dessert etter middagen. Sjekke om det bestilles eller lages.',
      },
      {
        id: 'nattmat',
        oppgave: 'Nattmat',
        notat: 'Enkelt å spise sent. Brød, pålegg, rester.',
      },
    ],
  },
  {
    navn: 'Mat — pølsefest (23:30)',
    items: [
      {
        id: 'polser',
        oppgave: 'Wienerpølser — 5 × 1,5 kg pakke (ca. 100 pølser)',
        notat: '2 pølser per person × 50 pers. Ca. 59 kr/pakke på Rema.',
        pris: 295,
      },
      {
        id: 'polsebroed',
        oppgave: 'Pølsebrød — 17 × 6-pk (ca. 100 stk)',
        notat: 'Ca. 28 kr per 6-pk.',
        pris: 476,
      },
      {
        id: 'lomper',
        oppgave: 'Lomper — 10 × 10-pk (100 stk)',
        notat: 'Ca. 30 kr per 10-pk.',
        pris: 300,
      },
      {
        id: 'polse-sauser',
        oppgave: 'Sennep og ketchup til pølsene',
        pris: 100,
      },
    ],
  },
  {
    navn: 'Mat — hamburger fredag',
    items: [
      {
        id: 'burger-kjott',
        oppgave: 'Kjøttdeig — ca. 7,5 kg (150g × 50 pers)',
        notat: 'Ca. 140 kr/kg på Rema/Kiwi.',
        pris: 1050,
      },
      {
        id: 'burger-brod',
        oppgave: 'Burgerbrød — 9 × 6-pk (ca. 54 stk)',
        notat: 'Ca. 28 kr per 6-pk.',
        pris: 252,
      },
      {
        id: 'burger-topping',
        oppgave: 'Topping: issbergsalat (3 hoder), tomat (10), rødløk (5), agurk (3)',
        pris: 300,
      },
      {
        id: 'burger-ost',
        oppgave: 'Skivet ost — 1 kg',
        pris: 160,
      },
      {
        id: 'burger-bacon',
        oppgave: 'Bacon — 1 kg',
        pris: 120,
      },
      {
        id: 'burger-sauser',
        oppgave: 'Sauser: ketchup, majones, sennep, relish',
        pris: 200,
      },
    ],
  },
  {
    navn: 'Mat — frokost lørdag og søndag',
    items: [
      {
        id: 'frokost-boller',
        oppgave: 'Boller — 50 stk fra lokal baker',
        notat: 'Bestilles/hentes fredag. Ca. 25 kr/stk (estimat).',
        pris: 1250,
      },
      {
        id: 'frokost-brod',
        oppgave: 'Brød — 10 stk',
        notat: '2 skiver × 50 pers × 2 frokoster = 200 skiver, ca. 20 skiver per brød.',
        pris: 400,
      },
      {
        id: 'frokost-ost',
        oppgave: 'Ost — ca. 2 kg',
        notat: '~20g per skive × 100 skiver (av 200 med ost). Ca. 160 kr/kg.',
        pris: 320,
      },
      {
        id: 'frokost-skinke',
        oppgave: 'Skinke — ca. 2 kg',
        notat: '~20g per skive × 100 skiver (av 200 med skinke). Ca. 200 kr/kg.',
        pris: 400,
      },
      {
        id: 'frokost-gronnsaker',
        oppgave: 'Grønnsaker: tomat (30 stk), agurk (6 stk), paprika (10 stk)',
        notat: 'Til begge frokostene.',
        pris: 300,
      },
      {
        id: 'frokost-juice',
        oppgave: 'Juice — 10 × 2L kartong (20L)',
        notat: 'Ca. 200ml per person per frokost × 50 pers × 2 dager.',
        pris: 700,
      },
      {
        id: 'frokost-melk',
        oppgave: 'Melk — 10L',
        notat: 'Til å drikke og til kaffe.',
        pris: 300,
      },
      {
        id: 'frokost-kaffe',
        oppgave: 'Kaffe, te og sukker',
        notat: 'Sjekke at kaffetrakterne på hytta er nok til mengden.',
      },
    ],
  },
  {
    navn: 'Vin til middag og kveld',
    items: [
      {
        id: 'hvitvin',
        oppgave: 'Hvitvin — 7 × 3L kartong (21L, ca. 140 glass)',
        notat: 'Til middag + litt ekstra til kvelden. Kjøpes på Vinmonopolet.',
        pris: 3500,
      },
      {
        id: 'rodvin',
        oppgave: 'Rødvin — 2 × 3L kartong (6L, ca. 40 glass)',
        notat: 'For de som ønsker rødvin til maten.',
        pris: 1000,
      },
    ],
  },
  {
    navn: 'Bar og drinker',
    items: [
      {
        id: 'moscow-vodka',
        oppgave: 'Vodka — 3 × 0,7L flasker',
        notat: 'Moscow Mule: 50ml per drink × 40 = 2 000ml. Absolut ca. 390 kr/fl.',
        pris: 1170,
      },
      {
        id: 'moscow-ginger',
        oppgave: 'Ginger beer (Fever-Tree) — 12 × 0,5L flasker',
        notat: 'Moscow Mule: 150ml per drink × 40 = 6 000ml. Ca. 49 kr/fl.',
        pris: 588,
      },
      {
        id: 'moscow-lime',
        oppgave: 'Lime — 25 stk',
        notat: 'Moscow Mule: ½ lime per drink × 40 = 20, pluss margin. Ca. 7 kr/stk.',
        pris: 175,
      },
      {
        id: 'moscow-mynte',
        oppgave: 'Mynte — 2 potter (valgfritt)',
        notat: 'Til pynt i Moscow Mule.',
      },
      {
        id: 'aperol',
        oppgave: 'Aperol Spritz',
        notat: 'Aperol, Prosecco, brus, appelsiner, is.',
      },
      {
        id: 'ekstra-drikke',
        oppgave: 'Ekstra drikke til folk som har tatt med for lite',
        notat: 'Øl, vin og brus i reserve.',
      },
      {
        id: 'bar-anneks',
        oppgave: 'Bar-oppsett nede ved annekset',
        notat: 'Bord, lyslenker, drinkeutstyr — settes opp etter middagen.',
      },
      {
        id: 'cocktail-utstyr',
        oppgave: 'Cocktailutstyr: shaker, blender, målebeger',
      },
      {
        id: 'kopper-glass',
        oppgave: 'Glass / plastglass / papirkopper til festen',
        notat: 'Avklare med Liv Karin hva som finnes av service.',
      },
    ],
  },
  {
    navn: 'Lyd og AV-utstyr',
    items: [
      {
        id: 'av-pa-anlegg',
        oppgave: 'PA-anlegg / lydutstyr',
        notat: 'Avklare hva som er tilgjengelig og om det er nok kapasitet til 50+ pers utendørs.',
        kontakt: 'Lilly Ann / Tom Ivar',
      },
      {
        id: 'av-musikk-skiskole',
        oppgave: 'Musikkspiller fra skiskolen — bekrefte lån',
        notat: 'Kontakte skiskolen i god tid for å sikre at spilleren er ledig helgen 26.–28. juni.',
      },
      {
        id: 'av-projektor',
        oppgave: 'Lerret og projektor — sterk nok til utendørs',
        notat: 'Til fotballkampen fredag (utendørs eller innendørs?). Projektor bør ha minst 3 000–4 000 ANSI-lumen for dagslys/skumring ute.',
        kontakt: 'Liv Karin',
      },
      {
        id: 'av-kabler',
        oppgave: 'Kabler og adaptere — laptop til projektor og ekstern lyd',
        notat: 'HDMI-kabel (langt nok), USB-C→HDMI-adapter, minijack eller RCA til PA-anlegg. Test koblingen på forhånd.',
      },
    ],
  },
  {
    navn: 'Utstyr og rekvisita',
    items: [
      {
        id: 'serveringsfat',
        oppgave: 'Serveringsfat',
        notat: 'Kjøpe på Price.',
      },
      {
        id: 'balpanne',
        oppgave: 'Bålpanne ved annekset',
        notat: 'Sjekke at bålpanna er tilgjengelig og har kull/ved. Fyres opp til samlingen ca. 22:00.',
      },
      {
        id: 'boetter-is',
        oppgave: 'Bøtter / kar til is og kjøling av drikke',
        notat: 'Til bar ved annekset og båtturen.',
      },
      {
        id: 'kjoleposer',
        oppgave: 'Kjølebager / isposer',
      },
      {
        id: 'strom',
        oppgave: 'Forlengelseskabler og strømskjøter',
        notat: 'Til musikkanlegg, lyslenker og lading.',
      },
      {
        id: 'soppelposer',
        oppgave: 'Søppelposer — mange',
        notat: '50+ pers over en helg. Ta med dobbelt så mange som du tror.',
      },
      {
        id: 'kubb-dart',
        oppgave: 'Kubb og dart',
        notat: 'Sjekke at det er tilgjengelig på hytta.',
      },
      {
        id: 'livvester',
        oppgave: 'Livvester i båtene',
        notat: 'Sjekke at det er nok til alle i hvert av de 4 båtlagene.',
      },
      {
        id: 'forstehjelp',
        oppgave: 'Førstehjelpsskrin',
        notat: 'Sjekke at det er tilgjengelig og oppdatert.',
      },
      {
        id: 'toalettpapir',
        oppgave: 'Ekstra toalettpapir og papirhåndklær',
      },
    ],
  },
  {
    navn: 'Dekorasjon',
    items: [
      {
        id: 'dekor-budsjett',
        oppgave: 'Dekorasjon — totalbudsjett',
        notat: 'Lyslenker, blomster, lys, duker og annet. Estimert midtpunkt brukt i totalen.',
        pris: 2500,
      },
      {
        id: 'lyslenker',
        oppgave: 'Lyslenker',
        notat: 'Til middagsbordet og bar ved annekset.',
      },
      {
        id: 'vaser',
        oppgave: 'Småvaser fra garasjen',
      },
      {
        id: 'servietter',
        oppgave: 'Servietter',
      },
      {
        id: 'papirduker',
        oppgave: 'Papirduker',
      },
      {
        id: 'telys',
        oppgave: 'Stearinlys / telys',
        notat: 'Til middagsbordet og dekorasjon rundt hytta.',
      },
    ],
  },
  {
    navn: 'Logistikk og transport',
    items: [
      {
        id: 'transport-farsund-hytte',
        oppgave: 'Båttransport Farsund ↔ hytta fredag 16:00–24:00',
        notat: 'Benjamin og Lea er ansvarlige. Koordinere ruter og kapasitet.',
        kontakt: 'Benjamin / Lea',
      },
      {
        id: 'soppelstasjoner',
        oppgave: 'Klargjøre søppelstasjoner',
        notat: 'Settes opp lørdag morgen før frokost. Egne stasjoner for mat, glass og restavfall.',
      },
      {
        id: 'opphenting-enebolig',
        oppgave: 'Opphenting av gjester fra Eneboligen lørdag morgen',
        notat: 'Ca. 20 pers som sover i eneboligen må til hytta til frokost og båttur.',
      },
      {
        id: 'bater-battur',
        oppgave: '4 båter til båtturen lørdag',
        notat: 'Hvem stiller opp med båt? Kapasitet og fordeling av passasjerer.',
      },
      {
        id: 'plan-b-vaer',
        oppgave: 'Plan B ved dårlig vær',
        notat: 'Hva gjør vi med båtturen og utendørsaktiviteter ved regn?',
      },
    ],
  },
]

type State = { checked: Set<string>; notes: Record<string, string> }

export default function SjekklistePage() {
  const [state, setState] = useState<State>({ checked: new Set(), notes: {} })
  const [loaded, setLoaded] = useState(false)
  const saveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const didLoad = useRef(false)

  useEffect(() => {
    fetch('/api/state')
      .then(r => r.json())
      .then(({ checked = [], notes = {} }) => {
        setState({ checked: new Set(checked), notes })
        setLoaded(true)
      })
      .catch(() => setLoaded(true))
  }, [])

  useEffect(() => {
    if (!loaded) return
    if (!didLoad.current) { didLoad.current = true; return }
    clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      fetch('/api/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ checked: [...state.checked], notes: state.notes }),
      }).catch(() => {})
    }, 600)
  }, [state, loaded])

  const toggle = useCallback((id: string) => {
    setState(prev => {
      const next = new Set(prev.checked)
      if (next.has(id)) next.delete(id); else next.add(id)
      return { ...prev, checked: next }
    })
  }, [])

  const setNote = useCallback((id: string, val: string) => {
    setState(prev => ({ ...prev, notes: { ...prev.notes, [id]: val } }))
  }, [])

  const totalItems = kategorier.reduce((s, k) => s + k.items.length, 0)
  const totalDone = state.checked.size

  if (!loaded) {
    return (
      <div className="sl-page">
        <header className="sl-header">
          <Link to="/">← Tilbake</Link>
          <h1>Sjekkliste — forberedelser</h1>
        </header>
        <div style={{ textAlign: 'center', padding: '3rem', color: '#adb5bd', fontSize: '0.9rem' }}>
          Laster…
        </div>
      </div>
    )
  }

  return (
    <div className="sl-page">
      <header className="sl-header">
        <Link to="/">← Tilbake</Link>
        <h1>Sjekkliste — forberedelser</h1>
        <div className="sl-header-meta">
          <span className="sl-progress-overall">{totalDone}/{totalItems}</span>
        </div>
      </header>

      <div className="sl-body">
        {kategorier.map(kat => {
          const done = kat.items.filter(i => state.checked.has(i.id)).length
          return (
            <div key={kat.navn} className="sl-kategori">
              <div className="sl-kat-header">
                <span className="sl-kat-navn">{kat.navn}</span>
                <div className="sl-kat-meta">
                  <span className="sl-kat-teller">{done}/{kat.items.length}</span>
                </div>
              </div>
              {kat.items.map(item => {
                const isDone = state.checked.has(item.id)
                return (
                  <div key={item.id} className={`sl-item${isDone ? ' is-done' : ''}`}>
                    <input
                      type="checkbox"
                      className="sl-cb"
                      checked={isDone}
                      onChange={() => toggle(item.id)}
                      id={item.id}
                    />
                    <div className="sl-content">
                      <div className="sl-oppgave-row">
                        <label htmlFor={item.id} className="sl-oppgave" style={{ cursor: 'pointer' }}>
                          {item.oppgave}
                        </label>
                        {item.kontakt && (
                          <span className="sl-kontakt">📞 {item.kontakt}</span>
                        )}
                      </div>
                      {item.notat && (
                        <div className="sl-notat">{item.notat}</div>
                      )}
                      <textarea
                        className="sl-status-input"
                        rows={1}
                        placeholder="Status / notater..."
                        value={state.notes[item.id] || ''}
                        onChange={e => setNote(item.id, e.target.value)}
                        onInput={e => {
                          const el = e.currentTarget
                          el.style.height = 'auto'
                          el.style.height = el.scrollHeight + 'px'
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
