import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'

const ADMIN_AUTH_KEY = 'oppgaver_admin_auth'
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string | undefined

type Day = 'Fredag' | 'Lørdag' | 'Søndag'
const DAYS: Day[] = ['Fredag', 'Lørdag', 'Søndag']

interface Task {
  title: string
  day: Day
  from: string
  to: string
}

interface Assignment {
  name: string
  tasks: Task[]
}

const T = (title: string, day: Day, from: string, to: string): Task => ({ title, day, from, to })

const SUGGESTED: Assignment[] = [
  // Fredag
  { name: 'Liv Karin', tasks: [T('Velkomst- og mottagelsesansvarlig', 'Fredag', '16:00', '19:00')] },
  { name: 'Kari Walle', tasks: [T('Velkomst- og mottagelsesansvarlig', 'Fredag', '16:00', '19:00')] },

  // Lørdag — frokost
  { name: 'Beate', tasks: [T('Klargjøre frokost', 'Lørdag', '08:00', '09:00')] },
  { name: 'Agnes', tasks: [T('Klargjøre frokost', 'Lørdag', '08:00', '09:00')] },
  { name: 'Jon', tasks: [T('Klargjøre frokost', 'Lørdag', '08:00', '09:00')] },
  { name: 'Alma', tasks: [T('Rydde etter frokost', 'Lørdag', '10:00', '11:00')] },
  { name: 'Oline', tasks: [T('Rydde etter frokost', 'Lørdag', '10:00', '11:00'), T('Sjåfør fredag kveld', 'Fredag', '19:00', '22:00')] },
  { name: 'Kari Nordstoga', tasks: [T('Rydde etter frokost', 'Lørdag', '10:00', '11:00')] },

  // Lørdag — lunsj
  { name: 'Svein Erik', tasks: [T('Klargjøre lunsj', 'Lørdag', '12:00', '13:30')] },
  { name: 'Anne Marie', tasks: [T('Klargjøre lunsj', 'Lørdag', '12:00', '13:30')] },

  // Lørdag — middag (skalldyrkveld)
  { name: 'Trude', tasks: [T('Klargjøre middag (skalldyrkveld)', 'Lørdag', '17:00', '19:00')] },
  { name: 'Einar', tasks: [T('Klargjøre middag (skalldyrkveld)', 'Lørdag', '17:00', '19:00')] },
  { name: 'Kirsti', tasks: [T('Klargjøre middag (skalldyrkveld)', 'Lørdag', '17:00', '19:00')] },
  { name: 'Annabelle', tasks: [T('Pynte til middag', 'Lørdag', '16:00', '18:00')] },
  { name: 'Anette', tasks: [T('Pynte til middag', 'Lørdag', '16:00', '18:00')] },
  { name: 'Heidi', tasks: [T('Pynte til middag', 'Lørdag', '16:00', '18:00')] },
  { name: 'Ståle', tasks: [T('Rydde etter middag', 'Lørdag', '22:00', '23:00')] },
  { name: 'Christian', tasks: [T('Rydde etter middag', 'Lørdag', '22:00', '23:00')] },
  { name: 'Frode', tasks: [T('Rydde etter middag', 'Lørdag', '22:00', '23:00')] },
  { name: 'Siri', tasks: [T('Rydde etter middag', 'Lørdag', '22:00', '23:00')] },

  // Lørdag natt
  { name: 'Erik', tasks: [T('Pølseansvarlig på natten', 'Lørdag', '01:00', '02:00')] },
  { name: 'Gaute', tasks: [T('Pølseansvarlig på natten', 'Lørdag', '01:00', '02:00')] },

  // Søndag — frokost
  { name: 'Kjersti Power', tasks: [T('Klargjøre frokost', 'Søndag', '08:00', '09:00')] },
  { name: 'Øystein Power', tasks: [T('Klargjøre frokost', 'Søndag', '08:00', '09:00'), T('Musikk på dagen', 'Lørdag', '10:00', '18:00')] },
  { name: 'Geir', tasks: [T('Klargjøre frokost', 'Søndag', '08:00', '09:00')] },
  { name: 'Ragnhild Nordenborg', tasks: [T('Rydde etter frokost', 'Søndag', '10:00', '11:00')] },
  { name: 'Tor Erik', tasks: [T('Rydde etter frokost', 'Søndag', '10:00', '11:00')] },
  { name: 'Christine', tasks: [T('Rydde etter frokost', 'Søndag', '10:00', '11:00')] },

  // Søndag — utsjekk
  { name: 'Lennart', tasks: [T('Sluttrydding og utsjekk', 'Søndag', '13:00', '15:00'), T('Musikk på dagen', 'Lørdag', '10:00', '18:00')] },
  { name: 'Torunn', tasks: [T('Sluttrydding og utsjekk', 'Søndag', '13:00', '15:00')] },
  { name: 'Synnøve', tasks: [T('Sluttrydding og utsjekk', 'Søndag', '13:00', '15:00')] },
  { name: 'Toli', tasks: [T('Sluttrydding og utsjekk', 'Søndag', '13:00', '15:00')] },

  // Bakgrunns-roller (hele helgen)
  { name: 'Vibeke', tasks: [T('Programansvarlig', 'Lørdag', '10:00', '23:00')] },
  { name: 'Bernt', tasks: [T('Programansvarlig', 'Lørdag', '10:00', '23:00'), T('Klargjøre grill', 'Fredag', '16:00', '18:00'), T('Klargjøre fotballtelt og prosjektor', 'Fredag', '19:00', '21:00')] },
  { name: 'Jørgen', tasks: [T('Musikkansvarlig', 'Lørdag', '18:00', '02:00'), T('Musikk på dagen', 'Lørdag', '10:00', '18:00'), T('Klargjøre fotballtelt og prosjektor', 'Fredag', '19:00', '21:00')] },
  { name: 'Bettina', tasks: [T('Musikkansvarlig', 'Lørdag', '18:00', '02:00')] },
  { name: 'Kjell Arne', tasks: [T('Baransvarlig', 'Lørdag', '18:00', '02:00')] },
  { name: 'Håvard', tasks: [T('Baransvarlig', 'Lørdag', '18:00', '02:00')] },
  { name: 'Ingrid Miljeteig', tasks: [T('Båtansvarlig', 'Lørdag', '09:00', '15:00')] },
  { name: 'Ingrid Enge', tasks: [T('Båtansvarlig', 'Lørdag', '09:00', '15:00')] },
  { name: 'Ragnhild Muriaas', tasks: [T('Bål- og vedansvarlig', 'Lørdag', '18:00', '23:00')] },
  { name: 'Lovise', tasks: [T('Bål- og vedansvarlig', 'Lørdag', '18:00', '23:00')] },
  { name: 'Hildegunn', tasks: [T('Søppel og resirkulering', 'Lørdag', '10:00', '22:00'), T('Toastmaster', 'Lørdag', '19:00', '23:00')] },
  { name: 'Ronny', tasks: [T('Søppel og resirkulering', 'Lørdag', '10:00', '22:00')] },
  { name: 'Linda', tasks: [T('Førstehjelp og sikkerhetsansvarlig', 'Lørdag', '10:00', '23:00'), T('Toastmaster', 'Lørdag', '19:00', '23:00')] },
  { name: 'Stig', tasks: [T('Fotograf/videoansvarlig', 'Lørdag', '10:00', '23:00')] },
  { name: 'Lilly Ann', tasks: [T('Toastmaster', 'Lørdag', '19:00', '23:00'), T('Husansvarlig i Farsund', 'Fredag', '16:00', '')] },
  { name: 'Tom-Ivar', tasks: [T('Skål- og talekoordinator', 'Lørdag', '19:00', '22:00'), T('PA-anlegg ansvarlig', 'Lørdag', '17:00', '23:00')] },
  { name: 'Lea', tasks: [T('Kaffe- og teansvarlig', 'Lørdag', '08:00', '22:00')] },
  { name: 'Benjamin', tasks: [T('Kaffe- og teansvarlig', 'Lørdag', '08:00', '22:00')] },
  { name: 'Rob', tasks: [T('Naboansvarlig', 'Lørdag', '18:00', '02:00')] },
]

function PasswordPrompt({ onAuth }: { onAuth: () => void }) {
  const [pw, setPw] = useState('')
  const [error, setError] = useState(false)
  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (ADMIN_PASSWORD && pw === ADMIN_PASSWORD) {
      try { sessionStorage.setItem(ADMIN_AUTH_KEY, 'ok') } catch { /* ignore */ }
      onAuth()
    } else {
      setError(true)
    }
  }
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <form onSubmit={submit} style={{ maxWidth: 360, width: '100%' }}>
        <h3 className="fw-bold mb-3 text-center">Admin — passord</h3>
        <input
          type="password"
          autoFocus
          value={pw}
          onChange={e => { setPw(e.target.value); setError(false) }}
          className={`form-control ${error ? 'is-invalid' : ''}`}
          placeholder="Admin-passord"
        />
        {error && <div className="invalid-feedback d-block">Feil passord</div>}
        <button type="submit" className="btn btn-primary w-100 mt-3">Logg inn</button>
      </form>
    </div>
  )
}

export default function OppgaverAdminPage() {
  const [authed, setAuthed] = useState(() => {
    try { return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'ok' } catch { return false }
  })
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [loaded, setLoaded] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  useEffect(() => {
    if (!authed) return
    fetch('/api/oppgaver')
      .then(r => r.ok ? r.json() as Promise<{ assignments?: Assignment[] }> : { assignments: [] })
      .then(data => {
        setAssignments(Array.isArray(data.assignments) ? data.assignments : [])
        setLoaded(true)
      })
      .catch(() => { setAssignments([]); setLoaded(true) })
  }, [authed])

  if (!authed) return <PasswordPrompt onAuth={() => setAuthed(true)} />

  const updateName = (i: number, name: string) => {
    setAssignments(prev => prev.map((a, idx) => idx === i ? { ...a, name } : a))
  }
  const updateTask = (i: number, ti: number, patch: Partial<Task>) => {
    setAssignments(prev => prev.map((a, idx) => {
      if (idx !== i) return a
      return { ...a, tasks: a.tasks.map((t, j) => j === ti ? { ...t, ...patch } : t) }
    }))
  }
  const removeTask = (i: number, ti: number) => {
    setAssignments(prev => prev.map((a, idx) => {
      if (idx !== i) return a
      return { ...a, tasks: a.tasks.filter((_, j) => j !== ti) }
    }))
  }
  const addTask = (i: number) => {
    setAssignments(prev => prev.map((a, idx) => {
      if (idx !== i) return a
      return { ...a, tasks: [...a.tasks, { title: '', day: 'Lørdag', from: '', to: '' }] }
    }))
  }
  const removeRow = (i: number) => {
    setAssignments(prev => prev.filter((_, idx) => idx !== i))
  }
  const addRow = () => {
    setAssignments(prev => [...prev, { name: '', tasks: [{ title: '', day: 'Lørdag', from: '', to: '' }] }])
  }
  const loadSuggestion = () => {
    if (assignments.length > 0 && !window.confirm('Dette overskriver eksisterende fordeling. Fortsett?')) return
    setAssignments(SUGGESTED)
  }

  const save = async () => {
    setSaveStatus('saving')
    try {
      const valid = assignments
        .map(a => ({ ...a, tasks: a.tasks.filter(t => t.title.trim()) }))
        .filter(a => a.name.trim() && a.tasks.length > 0)
      const res = await fetch('/api/oppgaver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assignments: valid }),
      })
      setSaveStatus(res.ok ? 'saved' : 'error')
      setTimeout(() => setSaveStatus('idle'), 2500)
    } catch {
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 2500)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bs-body-bg)', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <Link to="/" style={{ fontSize: '0.9rem', color: 'var(--party-secondary)', textDecoration: 'none' }}>
          ← Tilbake til forsiden
        </Link>
        <h1 className="fw-bold mt-3 mb-2">Oppgaver — admin</h1>
        <p className="text-muted mb-4">
          Redigér tilordninger og lagre. Endringer er synlige umiddelbart på <code>/oppgaver</code>.
        </p>

        <div className="d-flex gap-2 mb-4 flex-wrap align-items-center">
          <button onClick={loadSuggestion} className="btn btn-outline-secondary btn-sm">
            Bruk foreslått fordeling
          </button>
          <button onClick={addRow} className="btn btn-outline-secondary btn-sm">
            + Ny person
          </button>
          <span className="text-muted small ms-2">{assignments.length} personer</span>
          <div className="ms-auto d-flex align-items-center gap-3">
            {saveStatus === 'saved' && <span className="text-success small fw-semibold">✓ Lagret</span>}
            {saveStatus === 'error' && <span className="text-danger small fw-semibold">Feil ved lagring</span>}
            <button
              onClick={save}
              disabled={saveStatus === 'saving'}
              className="btn btn-primary btn-sm"
            >
              {saveStatus === 'saving' ? 'Lagrer…' : 'Lagre'}
            </button>
          </div>
        </div>

        {!loaded ? (
          <div className="text-center text-muted py-5">Laster…</div>
        ) : assignments.length === 0 ? (
          <div className="alert alert-info">
            Ingen tilordninger ennå. Klikk «Bruk foreslått fordeling» for å starte.
          </div>
        ) : (
          <div className="d-flex flex-column gap-2">
            {assignments.map((a, i) => (
              <div key={i} className="card border-0 shadow-sm">
                <div className="card-body p-3">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={a.name}
                      onChange={e => updateName(i, e.target.value)}
                      placeholder="Navn"
                      className="form-control form-control-sm fw-semibold"
                      style={{ maxWidth: 220 }}
                    />
                    <button
                      onClick={() => removeRow(i)}
                      className="btn btn-outline-danger btn-sm ms-auto"
                      title="Slett person"
                    >×</button>
                  </div>
                  <div className="d-flex flex-column gap-1">
                    {a.tasks.map((t, ti) => (
                      <div key={ti} className="d-flex gap-1 align-items-center flex-wrap">
                        <input
                          type="text"
                          value={t.title}
                          onChange={e => updateTask(i, ti, { title: e.target.value })}
                          placeholder="Oppgave"
                          className="form-control form-control-sm"
                          style={{ flex: '1 1 240px', minWidth: 200 }}
                        />
                        <select
                          value={t.day}
                          onChange={e => updateTask(i, ti, { day: e.target.value as Day })}
                          className="form-select form-select-sm"
                          style={{ width: 100 }}
                        >
                          {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                        <input
                          type="time"
                          value={t.from}
                          onChange={e => updateTask(i, ti, { from: e.target.value })}
                          className="form-control form-control-sm"
                          style={{ width: 105 }}
                        />
                        <span className="text-muted small">til</span>
                        <input
                          type="time"
                          value={t.to}
                          onChange={e => updateTask(i, ti, { to: e.target.value })}
                          className="form-control form-control-sm"
                          style={{ width: 105 }}
                        />
                        <button
                          onClick={() => removeTask(i, ti)}
                          className="btn btn-outline-secondary btn-sm"
                          title="Slett oppgave"
                        >–</button>
                      </div>
                    ))}
                    <button
                      onClick={() => addTask(i)}
                      className="btn btn-link btn-sm align-self-start p-0"
                      style={{ textDecoration: 'none' }}
                    >
                      + oppgave
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
