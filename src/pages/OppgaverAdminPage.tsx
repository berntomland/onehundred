import { useEffect, useState, useMemo } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { GUESTS } from '../guests'

const ADMIN_AUTH_KEY = 'oppgaver_admin_auth'
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string | undefined

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

const DAY_ORDER: Record<Day, number> = { Fredag: 0, Lørdag: 1, Søndag: 2 }

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

  const taskGroups = useMemo(() => {
    const groups = new Map<string, { title: string; day: Day; from: string; to: string; people: string[] }>()
    for (const a of assignments) {
      for (const t of a.tasks) {
        const key = `${t.title}|${t.day}|${t.from}|${t.to}`
        if (!groups.has(key)) groups.set(key, { ...t, people: [] })
        groups.get(key)!.people.push(a.name)
      }
    }
    return [...groups.values()].sort((a, b) => {
      const d = DAY_ORDER[a.day] - DAY_ORDER[b.day]
      if (d !== 0) return d
      return a.from.localeCompare(b.from)
    })
  }, [assignments])

  const assignedNames = useMemo(() => new Set(assignments.map(a => a.name.toLowerCase())), [assignments])
  const unassigned = useMemo(
    () => GUESTS.filter(g => !assignedNames.has(g.name.toLowerCase())).map(g => g.name),
    [assignedNames],
  )

  const personView = useMemo(() =>
    [...assignments].sort((a, b) => a.name.localeCompare(b.name, 'nb')),
    [assignments],
  )

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bs-body-bg)', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <Link to="/" style={{ fontSize: '0.9rem', color: 'var(--party-secondary)', textDecoration: 'none' }}>
          ← Tilbake til forsiden
        </Link>
        <h1 className="fw-bold mt-3 mb-2">Oppgaver — oversikt</h1>
        <p className="text-muted mb-4">
          Lesevisning av publiserte oppgaver. Dette er det gjestene ser på <code>/oppgaver</code>.
        </p>

        {!loaded ? (
          <div className="text-center text-muted py-5">Laster…</div>
        ) : assignments.length === 0 ? (
          <div className="alert alert-info">
            Ingen oppgaver er publisert ennå.
          </div>
        ) : (
          <>
            <h2 className="fw-bold mb-3">Oppgaver etter tidspunkt</h2>
            <div className="table-responsive mb-5">
              <table className="table table-sm table-striped align-middle">
                <thead>
                  <tr>
                    <th>Dag</th>
                    <th>Tid</th>
                    <th>Oppgave</th>
                    <th>Ansvarlige</th>
                  </tr>
                </thead>
                <tbody>
                  {taskGroups.map((g, i) => (
                    <tr key={i}>
                      <td className="text-nowrap fw-semibold">{g.day}</td>
                      <td className="text-nowrap">{g.from}{g.to ? `–${g.to}` : ''}</td>
                      <td>{g.title}</td>
                      <td>{g.people.join(', ')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="fw-bold mb-3">Per person</h2>
            <div className="d-flex flex-column gap-2 mb-5">
              {personView.map(a => (
                <div key={a.name} className="card border-0 shadow-sm">
                  <div className="card-body p-3">
                    <div className="fw-semibold mb-1">{a.name}</div>
                    {a.tasks.map((t, i) => (
                      <div key={i} className="small text-muted">
                        {t.day} {t.from}{t.to ? `–${t.to}` : ''}: {t.title}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <h2 className="fw-bold mb-3">
              Uten oppgave ({unassigned.length} av {GUESTS.length})
            </h2>
            {unassigned.length === 0 ? (
              <p className="text-muted">Alle gjester har minst én oppgave.</p>
            ) : (
              <div className="d-flex flex-wrap gap-2 mb-4">
                {unassigned.map(name => (
                  <span key={name} className="badge bg-secondary fw-normal" style={{ fontSize: '0.85rem' }}>
                    {name}
                  </span>
                ))}
              </div>
            )}

            <p className="text-muted small mt-4">
              Totalt {assignments.length} personer med oppgaver · {GUESTS.length} gjester totalt
            </p>
          </>
        )}
      </div>
    </div>
  )
}
