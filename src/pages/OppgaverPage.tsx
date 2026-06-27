import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { SLEEPING } from '../content'


type Day = 'Fredag' | 'Lørdag' | 'Søndag'

interface Task {
  title: string
  day: Day
  from: string
  to: string
  note?: string
}

interface Assignment {
  name: string
  tasks: Task[]
}

const HOSTS = new Set(['Bernt Omland', 'Vibeke Wang'])

const ALL_GUESTS = SLEEPING.locations
  .flatMap(loc => loc.guests)
  .filter(n => !HOSTS.has(n))
  .sort((a, b) => a.localeCompare(b, 'nb'))

function normalize(s: string) {
  return s.toLowerCase().trim()
}

function matchScore(target: string, q: string): number {
  const t = normalize(target)
  if (t === q) return 0
  const words = t.split(/\s+/)
  if (words[0] === q) return 1
  if (words.some(w => w === q)) return 2
  if (words.some(w => w.startsWith(q))) return 3
  if (t.includes(q)) return 4
  return Infinity
}

function findMatches(assignments: Assignment[], q: string): Assignment[] {
  if (q.length < 2) return []
  let bestScore = Infinity
  const results: Assignment[] = []
  for (const a of assignments) {
    const s = matchScore(a.name, q)
    if (s < bestScore) { bestScore = s; results.length = 0; results.push(a) }
    else if (s === bestScore) { results.push(a) }
  }
  return bestScore < Infinity ? results : []
}

const DAY_ORDER: Record<Day, number> = { Fredag: 0, Lørdag: 1, Søndag: 2 }

function sortTasks(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    if (a.title === 'Skape god stemning') return 1
    if (b.title === 'Skape god stemning') return -1
    const d = DAY_ORDER[a.day] - DAY_ORDER[b.day]
    if (d !== 0) return d
    return a.from.localeCompare(b.from)
  })
}

function formatTime(t: Task): string {
  if (!t.from && !t.to) return t.day
  if (!t.to) return `${t.day} ${t.from}`
  if (!t.from) return `${t.day} – ${t.to}`
  return `${t.day} ${t.from}–${t.to}`
}

function taskKey(t: Task) {
  return `${t.title}|${t.day}|${t.from}|${t.to}`
}

const TASK_EXTRA_INFO: Record<string, string[]> = {
  'Klargjøre middag (skalldyrkveld)': [
    'Lage wasabimajones',
    'Finhakke vårløk',
  ],
}

const TASK_VISUALS: Record<string, { img: string | string[]; emoji: string }> = {
  'Fotostand — finne plass, klargjøre og informere gjester':
    { img: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600&h=340&fit=crop&auto=format', emoji: '📸' },
  'Nattmat — pølser':
    { img: 'https://images.unsplash.com/photo-1619740455993-9d701c1eb6e1?w=600&h=340&fit=crop&auto=format', emoji: '🌭' },
  'Rydde etter frokost':
    { img: 'https://plus.unsplash.com/premium_photo-1677234147986-1e9f099e4cb8?w=600&h=340&fit=crop&auto=format', emoji: '🧹' },
  'Toastmaster':
    { img: 'https://images.unsplash.com/photo-1521457099099-f79e0cca6b64?w=600&h=340&fit=crop&auto=format', emoji: '🎤' },
  'Husansvarlig i Farsund':
    { img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=340&fit=crop&auto=format', emoji: '🏘️' },
  'PA-anlegg ansvarlig':
    { img: 'https://images.unsplash.com/photo-1545128485-c400e7702796?w=600&h=340&fit=crop&auto=format', emoji: '🔊' },
  'Sjåfør fredag kveld':
    { img: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&h=340&fit=crop&auto=format', emoji: '🚗' },
  'Musikk på dagen':
    { img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=340&fit=crop&auto=format', emoji: '🎶' },
  'Klargjøre fotballtelt og prosjektor':
    { img: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&h=340&fit=crop&auto=format', emoji: '⚽' },
  'Klargjøre grill':
    { img: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&h=340&fit=crop&auto=format', emoji: '🔥' },
  'Klargjøre frokost':
    { img: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=600&h=340&fit=crop&auto=format', emoji: '🍳' },
  'Få folk på plass til båtavgang i Farsund':
    { img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=340&fit=crop&auto=format', emoji: '🚢' },
  'Få folk klar til avgang på brygga':
    { img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=340&fit=crop&auto=format', emoji: '⚓' },
  'Båtansvarlig':
    { img: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=600&h=340&fit=crop&auto=format', emoji: '🛥️' },
  'Klargjøre middag (skalldyrkveld)':
    { img: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&h=340&fit=crop&auto=format', emoji: '🦞' },
  'Klargjøre og servere musserende drikke på brygga ved ankomst fra båttur. Legg drikke kaldt og ha klar nok glass til alle — kan settes klart i båthuset.':
    { img: 'https://images.unsplash.com/photo-1558618047-3c8c5d5b9a3f?w=600&h=340&fit=crop&auto=format', emoji: '🥂' },
  'Rydde etter middag':
    { img: 'https://plus.unsplash.com/premium_photo-1677234147986-1e9f099e4cb8?w=600&h=340&fit=crop&auto=format', emoji: '🧹' },
  'Lage drinker i baren (moscow mule)':
    { img: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&h=340&fit=crop&auto=format', emoji: '🍹' },
  'Band':
    { img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=340&fit=crop&auto=format', emoji: '🎸' },
  'Passe på at det alltid er kald drikke tilgjengelig':
    { img: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&h=340&fit=crop&auto=format', emoji: '🧊' },
  'Skape god stemning': {
    img: [
      'https://images.unsplash.com/photo-1758523981243-f6c84b644276?w=600&h=340&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1758599670001-f17186aaa307?w=600&h=340&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1758523981764-ec58becc84da?w=600&h=340&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1758523981262-6b4fe624875f?w=600&h=340&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1758523981337-7508dda01c3f?w=600&h=340&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1758523981230-1b705d6f8e88?w=600&h=340&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1758523981722-357d0a1e0ef0?w=600&h=340&fit=crop&auto=format',
      'https://plus.unsplash.com/premium_photo-1661310032917-518a836b4d1d?w=600&h=340&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1674173456096-9949cbde2f11?w=600&h=340&fit=crop&auto=format',
      'https://plus.unsplash.com/premium_photo-1764462537065-56b6f7e4564c?w=600&h=340&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1508028471618-6f8e1b73eb56?w=600&h=340&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1754462529584-a36c94600a07?w=600&h=340&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1713450606043-4bc520be8ba8?w=600&h=340&fit=crop&auto=format',
    ],
    emoji: '🎉',
  },
}

function TaskImage({ title, personName }: { title: string; personName?: string }) {
  const v = TASK_VISUALS[title]
  const [failedIndexes, setFailedIndexes] = useState<Set<number>>(new Set())

  if (!v) {
    return <div style={{ fontSize: '2.5rem', lineHeight: 1, marginBottom: '0.4rem' }}>✅</div>
  }

  const allImgs = Array.isArray(v.img) ? v.img : [v.img]
  const imgs = personName && allImgs.length > 1
    ? [allImgs[personName.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % allImgs.length]]
    : allImgs
  const allFailed = imgs.every((_, i) => failedIndexes.has(i))

  if (allFailed) {
    return <div style={{ fontSize: '2.5rem', lineHeight: 1, marginBottom: '0.4rem' }}>{v.emoji}</div>
  }

  const markFailed = (i: number) => setFailedIndexes(prev => new Set([...prev, i]))

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${imgs.length}, 1fr)`,
        gap: '0.35rem',
        marginBottom: '0.75rem',
      }}
    >
      {imgs.map((src, i) =>
        failedIndexes.has(i) ? null : (
          <img
            key={i}
            src={src}
            alt={title}
            onError={() => markFailed(i)}
            style={{
              width: '100%',
              height: imgs.length === 1 ? 180 : 130,
              objectFit: 'cover',
              borderRadius: '0.5rem',
              display: 'block',
            }}
          />
        )
      )}
    </div>
  )
}

function buildTaskGroups(assignments: Assignment[]) {
  const groups = new Map<string, { title: string; day: Day; from: string; to: string; people: string[] }>()
  for (const a of assignments) {
    for (const t of a.tasks) {
      const key = taskKey(t)
      if (!groups.has(key)) groups.set(key, { title: t.title, day: t.day, from: t.from, to: t.to, people: [] })
      groups.get(key)!.people.push(a.name)
    }
  }
  return groups
}

export default function OppgaverPage() {
  const [assignments, setAssignments] = useState<Assignment[] | null>(null)
  const [query, setQuery] = useState('')
  const [loadError, setLoadError] = useState(false)
  const [showNames, setShowNames] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch('/api/oppgaver')
      .then(r => r.ok ? r.json() as Promise<{ assignments?: Assignment[] }> : { assignments: [] })
      .then(data => {
        setAssignments(Array.isArray(data.assignments) ? data.assignments : [])
      })
      .catch(() => { setAssignments([]); setLoadError(true) })
  }, [])

  const q = normalize(query)
  const matches = assignments ? findMatches(assignments, q) : []
  const match = matches.length === 1 ? matches[0] : null
  const ambiguous = matches.length > 1
  const taskGroups = assignments ? buildTaskGroups(assignments) : new Map()
  const namesWithTasks = new Set((assignments ?? []).map(a => normalize(a.name)))
  const guestsWithoutTask = ALL_GUESTS.filter(n => !namesWithTasks.has(normalize(n)))


  const pickName = (name: string) => {
    setQuery(name)
    inputRef.current?.focus()
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bs-body-bg)', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <Link
          to="/"
          style={{ fontSize: '0.9rem', color: 'var(--party-secondary)', textDecoration: 'none' }}
        >
          ← Tilbake til forsiden
        </Link>

        <div className="d-flex align-items-baseline gap-3 mt-3 mb-1">
          <h1 className="fw-bold mb-0">Oppgaver</h1>
          <button
            onClick={() => setShowNames(v => !v)}
            className="btn btn-link btn-sm p-0 text-muted"
            style={{ fontSize: '0.8rem', textDecoration: 'none' }}
          >
            {showNames ? 'Skjul navneliste' : 'Vis navneliste'}
          </button>
        </div>
        <p className="text-muted mb-4">
          Alle gjester får én eller flere korte oppgaver i løpet av helgen (ca. én time).
          Skriv inn navnet ditt nedenfor for å se oppgaven din.
        </p>

        {/* Navneliste — vises mens data lastes og etter */}
        {assignments === null && (
          <div className="text-center text-muted py-5">Laster…</div>
        )}

        {assignments !== null && !loadError && showNames && (
          <div className="mb-4">
            {guestsWithoutTask.length > 0 && (
              <div className="mb-3">
                <div className="text-muted small fw-semibold mb-2">
                  Ikke tildelt oppgave ennå ({guestsWithoutTask.length} av {ALL_GUESTS.length}):
                </div>
                <div className="d-flex flex-wrap gap-2">
                  {guestsWithoutTask.map(name => (
                    <button
                      key={name}
                      onClick={() => pickName(name)}
                      className="btn btn-sm btn-outline-secondary"
                      style={{ borderRadius: 20 }}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {assignments.length > 0 && (
              <div>
                <div className="text-muted small fw-semibold mb-2">
                  Tildelt oppgave ({assignments.length} av {ALL_GUESTS.length}):
                </div>
                <div className="d-flex flex-wrap gap-2">
                  {[...assignments].sort((a, b) => a.name.localeCompare(b.name, 'nb')).map(a => (
                    <button
                      key={a.name}
                      onClick={() => pickName(a.name)}
                      className="btn btn-sm"
                      style={{
                        borderRadius: 20,
                        background: 'var(--party-secondary)',
                        color: '#fff',
                        border: 'none',
                        opacity: 0.9,
                      }}
                    >
                      {a.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {assignments.length === 0 && guestsWithoutTask.length > 0 && (
              <div className="alert alert-info mt-3 mb-0">
                Oppgavelisten er ikke publisert ennå. Prøv igjen litt nærmere helgen.
              </div>
            )}
          </div>
        )}

        {assignments !== null && loadError && (
          <div className="alert alert-warning mb-4">
            Klarte ikke å hente oppgavelisten. Last siden på nytt, eller spør Vibeke/Bernt.
          </div>
        )}

        {/* Søkefelt */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Skriv inn navnet ditt"
          className="form-control form-control-lg mb-4"
          autoComplete="off"
        />

        {/* Flere treff — velg hvem */}
        {assignments !== null && ambiguous && (
          <div className="mb-3">
            <p className="text-muted small mb-2">Mente du…?</p>
            <div className="d-flex flex-wrap gap-2">
              {matches.map(a => (
                <button
                  key={a.name}
                  onClick={() => setQuery(a.name)}
                  className="btn btn-outline-primary btn-sm"
                  style={{ borderRadius: 20 }}
                >
                  {a.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Søkeresultat */}
        {assignments !== null && assignments.length > 0 && q.length >= 2 && match && (
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <p className="text-muted small mb-2">Hei {match.name}!</p>
              <h4 className="fw-bold mb-3">
                Din{match.tasks.length > 1 ? 'e oppgaver' : ' oppgave'}:
              </h4>
              <ul className="list-unstyled mb-0">
                {sortTasks(match.tasks).map((task, i) => {
                  const colleagues = (taskGroups.get(taskKey(task))?.people ?? [])
                    .filter((p: string) => p !== match.name)
                  return (
                    <li
                      key={i}
                      className="mb-3 pb-3"
                      style={{
                        borderBottom: i < match.tasks.length - 1
                          ? '1px solid var(--bs-border-color)'
                          : 'none',
                      }}
                    >
                      <TaskImage title={task.title} personName={match.name} />
                      <div style={{ fontSize: '1.05rem', fontWeight: 600 }}>{task.title}</div>
                      <div className="small mt-1" style={{ color: 'var(--party-secondary)', fontWeight: 500 }}>
                        🕐 {formatTime(task)}
                      </div>
                      {task.note && (
                        <div className="small mt-1 text-muted fst-italic">{task.note}</div>
                      )}
                      {TASK_EXTRA_INFO[task.title] && (
                        <div className="small mt-2">
                          <div className="fw-semibold">Dette innebærer:</div>
                          <ul className="mb-0 ps-3 mt-1">
                            {TASK_EXTRA_INFO[task.title].map((info, j) => (
                              <li key={j}>{info}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {colleagues.length > 0 && task.title !== 'Skape god stemning' && (
                        <div className="small mt-1 text-muted">
                          👥 Sammen med: {colleagues.join(', ')}
                        </div>
                      )}
                    </li>
                  )
                })}
              </ul>
              <p className="text-muted small mt-3 mb-0">
                Spør Vibeke eller Bernt hvis noe er uklart.
              </p>
            </div>
          </div>
        )}

        {assignments !== null && assignments.length > 0 && q.length >= 2 && !match && !ambiguous && (
          <div className="alert alert-secondary">
            Finner ingen oppgave for «{query}». Sjekk stavingen — eller spør Vibeke/Bernt.
          </div>
        )}
      </div>
    </div>
  )
}
