import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import './SjekklistePage.css'

type Item = {
  id: string
  oppgave: string
  notat?: string
  pris?: number
}

type Kategori = {
  navn: string
  items: Item[]
}

const kategorier: Kategori[] = [
  {
    navn: 'Båttur lørdag — leie og servering',
    items: [
      {
        id: 'bat-aida',
        oppgave: 'Skonnerten AIDA — leie 3,5 timer (kr 2 750/t)',
        notat: 'Serverer fiskesuppe, kaffe og mineralvann om bord.',
        pris: 9925,
      },
      {
        id: 'bat-proven',
        oppgave: 'Prøven — leie',
        pris: 2500,
      },
      {
        id: 'bat-gave-snekke',
        oppgave: 'Gave til snekkene — kr 1 000 per stk',
        notat: 'Én snekke tilnærmet 100% bekreftet. Juster antall ved flere.',
        pris: 1000,
      },
      {
        id: 'bat-fiskesuppe',
        oppgave: 'Fiskesuppe m/tilbehør — 40 pers × kr 175',
        notat: 'Bestilles til 40 — holder til 50. Serveres i containere, holder seg varm.',
        pris: 7000,
      },
      {
        id: 'bat-kaffe',
        oppgave: 'Kaffe om bord — 50 pers × kr 30',
        pris: 1500,
      },
      {
        id: 'bat-vann',
        oppgave: 'Mineralvann — 50 pers × kr 30',
        notat: 'Erfaringsmessig velger de fleste vann til fiskesuppa.',
        pris: 1500,
      },
    ],
  },
  {
    navn: 'Sjømat — bestilles',
    items: [
      {
        id: 'inn-reker',
        oppgave: 'Reker — ca. 15 kg',
        notat: '300g × 50 pers. Avklar kilde og leveringstidspunkt.',
        pris: 6000,
      },
      {
        id: 'inn-blaskjell',
        oppgave: 'Blåskjell — ca. 7,5 kg',
        notat: '150g × 50 pers. Ca. 89 kr/kg.',
        pris: 668,
      },
      {
        id: 'inn-krabber',
        oppgave: 'Krabber — 25 stk ✓ bestilt fra Stig i Søgne',
        notat: 'Bekrefte levering/henting i god tid.',
        pris: 3000,
      },
    ],
  },
  {
    navn: 'Lokal baker',
    items: [
      {
        id: 'inn-boller',
        oppgave: 'Boller — 50 stk',
        notat: 'Bestilles/hentes fredag. Ca. 25 kr/stk.',
        pris: 1250,
      },
      {
        id: 'inn-kransekake',
        oppgave: 'Kransekake og konfekt',
        notat: 'Dessert etter middagen lørdag.',
      },
    ],
  },
  {
    navn: 'Rema 1000 / Kiwi — mat og dagligvarer',
    items: [
      {
        id: 'inn-kjottdeig',
        oppgave: 'Kjøttdeig — ca. 7,5 kg (hamburger fredag)',
        notat: '150g × 50 pers. Ca. 140 kr/kg.',
        pris: 1050,
      },
      {
        id: 'inn-burgerbroed',
        oppgave: 'Burgerbrød — 9 × 6-pk (ca. 54 stk)',
        notat: 'Ca. 28 kr per 6-pk.',
        pris: 252,
      },
      {
        id: 'inn-burger-topping',
        oppgave: 'Burgertilbehør: issbergsalat (3 hoder), tomat (10), rødløk (5), agurk (3)',
        pris: 300,
      },
      {
        id: 'inn-burger-ost',
        oppgave: 'Skivet ost — 1 kg',
        pris: 160,
      },
      {
        id: 'inn-bacon',
        oppgave: 'Bacon — 1 kg',
        pris: 120,
      },
      {
        id: 'inn-sauser',
        oppgave: 'Sauser: ketchup, majones, sennep, relish',
        notat: 'Til både hamburger og pølser.',
        pris: 200,
      },
      {
        id: 'inn-polser',
        oppgave: 'Wienerpølser — 5 × 1,5 kg pakke (ca. 100 pølser)',
        notat: '2 pølser × 50 pers. Ca. 59 kr/pakke.',
        pris: 295,
      },
      {
        id: 'inn-polsebroed',
        oppgave: 'Pølsebrød — 17 × 6-pk (ca. 100 stk)',
        notat: 'Ca. 28 kr per 6-pk.',
        pris: 476,
      },
      {
        id: 'inn-lomper',
        oppgave: 'Lomper — 10 × 10-pk (100 stk)',
        notat: 'Ca. 30 kr per 10-pk.',
        pris: 300,
      },
      {
        id: 'inn-frokost-brod',
        oppgave: 'Brød — 10 stk (frokost)',
        notat: 'Ca. 20 skiver per brød × 10 stk = 200 skiver.',
        pris: 400,
      },
      {
        id: 'inn-frokost-ost',
        oppgave: 'Ost — ca. 2 kg (frokost)',
        notat: 'Ca. 160 kr/kg.',
        pris: 320,
      },
      {
        id: 'inn-frokost-skinke',
        oppgave: 'Skinke — ca. 2 kg (frokost)',
        notat: 'Ca. 200 kr/kg.',
        pris: 400,
      },
      {
        id: 'inn-gronnsaker',
        oppgave: 'Grønnsaker frokost: tomat (30 stk), agurk (6 stk), paprika (10 stk)',
        notat: 'Til begge frokostene.',
        pris: 300,
      },
      {
        id: 'inn-juice',
        oppgave: 'Juice — 10 × 2L kartong',
        notat: 'Ca. 200ml × 50 pers × 2 frokoster.',
        pris: 700,
      },
      {
        id: 'inn-melk',
        oppgave: 'Melk — 10L',
        notat: 'Til å drikke og til kaffe.',
        pris: 300,
      },
      {
        id: 'inn-kaffe',
        oppgave: 'Kaffe, te og sukker',
        notat: 'Sjekke at kaffetrakterne på hytta er nok til mengden.',
      },
      {
        id: 'inn-soppelposer',
        oppgave: 'Søppelposer — store pakker',
        notat: '50 pers over en helg. Ta med dobbelt så mange som du tror.',
      },
      {
        id: 'inn-loff-grovbrod',
        oppgave: '6 loff og 6 grovbrød',
      },
      {
        id: 'inn-hamburgerost',
        oppgave: 'Ost til hamburger',
      },
      {
        id: 'inn-kaffe-ekstra',
        oppgave: 'Kaffe — 3 poser til',
      },
      {
        id: 'inn-hjertesalat',
        oppgave: 'Hjertesalat',
      },
      {
        id: 'inn-sitron',
        oppgave: 'Sitroner — 10 stk',
      },
      {
        id: 'inn-majones-ekstra',
        oppgave: 'Ekstra majones — 2 stk',
      },
      {
        id: 'inn-varlok',
        oppgave: 'Vårløk',
      },
      {
        id: 'inn-smor',
        oppgave: 'Smør — 3 pakker',
      },
      {
        id: 'inn-appelsinjuice',
        oppgave: 'Appelsinjuice — 4 liter',
      },
    ],
  },
  {
    navn: 'Vinmonopolet',
    items: [
      {
        id: 'inn-hvitvin',
        oppgave: 'Hvitvin — 7 × 3L kartong (21L, ca. 140 glass)',
        notat: 'Til middag og kveld.',
        pris: 3500,
      },
      {
        id: 'inn-rodvin',
        oppgave: 'Rødvin — 2 × 3L kartong (6L, ca. 40 glass)',
        notat: 'For de som foretrekker rødvin til maten.',
        pris: 1000,
      },
      {
        id: 'inn-vodka',
        oppgave: 'Vodka — 3 × 0,7L (Moscow Mule)',
        notat: '50ml × 40 drinker = 2 000ml. Absolut ca. 390 kr/fl.',
        pris: 1170,
      },
      {
        id: 'inn-prosecco-battur',
        oppgave: 'Prosecco til båtturen — 25 flasker (750ml)',
        notat: '3 glass × 50 pers ÷ 6 glass per flaske. Ca. 200 kr/fl. Fordeles på de 4 båtene.',
        pris: 5000,
      },
      {
        id: 'inn-prosecco-alkfri',
        oppgave: 'Alkoholfri prosecco — 4 flasker (1 per båt)',
        notat: 'Til 6–7 personer som ikke drikker alkohol. Minst én flaske tilgjengelig i hvert båtlag.',
        pris: 500,
      },
      {
        id: 'inn-aperol',
        oppgave: 'Aperol — 1–2 flasker',
        notat: 'Til Aperol Spritz.',
      },
      {
        id: 'inn-prosecco',
        oppgave: 'Prosecco — 3–4 flasker (Aperol Spritz)',
        notat: 'Til Aperol Spritz og velkomstdrikk på hytta.',
      },
    ],
  },
  {
    navn: 'Meny / spesialbutikk',
    items: [
      {
        id: 'inn-ginger',
        oppgave: 'Ginger beer (Fever-Tree) — 12 × 0,5L',
        notat: '150ml × 40 drinker = 6 000ml. Ca. 49 kr/fl.',
        pris: 588,
      },
      {
        id: 'inn-lime',
        oppgave: 'Lime — 25 stk',
        notat: '½ lime per Moscow Mule × 40, pluss margin. Ca. 7 kr/stk.',
        pris: 175,
      },
      {
        id: 'inn-mynte',
        oppgave: 'Mynte — 2 potter',
        notat: 'Til pynt i Moscow Mule.',
      },
      {
        id: 'inn-sitrus',
        oppgave: 'Sitroner og appelsiner til sitrusbad',
        notat: 'Fingerbowl / våtservietter til skalldyrsmiddagen.',
      },
    ],
  },
  {
    navn: 'Diverse / Price',
    items: [
      {
        id: 'inn-dekor',
        oppgave: 'Dekorasjon — lyslenker, blomster, lys, duker',
        notat: 'Totalbudsjett. Handle i god tid — gjerne uken før.',
        pris: 2500,
      },
      {
        id: 'inn-serveringsfat',
        oppgave: 'Serveringsfat',
        notat: 'Til sjømat og kveldsmat. Kjøpes på Price.',
      },
    ],
  },
]

type State = { checked: Set<string>; notes: Record<string, string> }

function fmtKr(n: number) {
  return n.toLocaleString('nb-NO') + ' kr'
}

export default function InnkjopPage() {
  const [state, setState] = useState<State>({ checked: new Set(), notes: {} })
  const [loaded, setLoaded] = useState(false)
  const saveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const didLoad = useRef(false)

  useEffect(() => {
    fetch('/api/innkjop')
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
      fetch('/api/innkjop', {
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
  const totalPris = kategorier.reduce((s, k) =>
    s + k.items.reduce((ss, i) => ss + (i.pris ?? 0), 0), 0
  )

  if (!loaded) {
    return (
      <div className="sl-page">
        <header className="sl-header">
          <Link to="/">← Tilbake</Link>
          <h1>Innkjøpsliste</h1>
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
        <h1>Innkjøpsliste</h1>
        <div className="sl-header-meta">
          <span className="sl-progress-overall">{totalDone}/{totalItems}</span>
          <span className="sl-total-pris">ca. {fmtKr(totalPris)}</span>
        </div>
      </header>

      <div className="sl-body">
        <div className="sl-prissum">
          <div className="sl-prissum-tittel">Estimert totalkostnad</div>
          {kategorier.filter(k => k.items.some(i => i.pris)).map(kat => {
            const sum = kat.items.reduce((s, i) => s + (i.pris ?? 0), 0)
            return (
              <div key={kat.navn} className="sl-prissum-rad">
                <span className="sl-prissum-rad-navn">{kat.navn}</span>
                <span className="sl-prissum-rad-sum">ca. {fmtKr(sum)}</span>
              </div>
            )
          })}
          <div className="sl-prissum-total">
            <span>Totalt</span>
            <span className="sl-prissum-total-sum">ca. {fmtKr(totalPris)}</span>
          </div>
        </div>

        {kategorier.map(kat => {
          const done = kat.items.filter(i => state.checked.has(i.id)).length
          const katPris = kat.items.reduce((s, i) => s + (i.pris ?? 0), 0)
          return (
            <div key={kat.navn} className="sl-kategori">
              <div className="sl-kat-header">
                <span className="sl-kat-navn">{kat.navn}</span>
                <div className="sl-kat-meta">
                  {katPris > 0 && <span className="sl-kat-pris">ca. {fmtKr(katPris)}</span>}
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
                        {item.pris && (
                          <span className="sl-pris">ca. {fmtKr(item.pris)}</span>
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
