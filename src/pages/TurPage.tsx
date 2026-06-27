import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { FormEvent } from 'react'

const COOKIE_NAME = 'tur_bat'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7

const BOAT_NAMES: Record<number, string> = {
  1: 'Aida',
  2: 'Prøven',
  3: 'Snekke 1',
  4: 'Plastbåten',
}

const BOAT_EMOJI: Record<number, string> = {
  1: '⛵',
  2: '🚢',
  3: '🛥️',
  4: '⚓',
}

const HERO_IMG = 'https://images.unsplash.com/photo-1500627964684-141351970a7a?w=800&h=400&fit=crop&auto=format'

function getCookie(): { name: string; boat: number } | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]+)`))
  if (!match) return null
  try {
    const decoded = decodeURIComponent(match[1])
    const [name, boatStr] = decoded.split('|')
    const boat = Number(boatStr)
    if (name && boat >= 1 && boat <= 4) return { name, boat }
  } catch { /* ignore */ }
  return null
}

function setCookie(name: string, boat: number) {
  const val = encodeURIComponent(`${name}|${boat}`)
  document.cookie = `${COOKIE_NAME}=${val}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`
}

export default function TurPage() {
  const existing = getCookie()
  const [boat, setBoat] = useState<number | null>(existing?.boat ?? null)
  const [assignedName, setAssignedName] = useState(existing?.name ?? '')
  const [name, setName] = useState('')
  const [full, setFull] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed || loading) return

    setLoading(true)
    setError(false)

    fetch('/api/tur', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: trimmed }),
    })
      .then(r => r.json())
      .then(data => {
        if (data.boat) {
          setCookie(trimmed, data.boat)
          setBoat(data.boat)
          setAssignedName(trimmed)
        } else if (data.full) {
          setFull(true)
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bs-body-bg)', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 500, margin: '0 auto', textAlign: 'center' }}>
        <Link
          to="/"
          style={{ fontSize: '0.9rem', color: 'var(--party-secondary)', textDecoration: 'none', display: 'block', textAlign: 'left' }}
        >
          &larr; Tilbake til forsiden
        </Link>

        <img
          src={HERO_IMG}
          alt="Trebåter ved bryggekanten"
          style={{
            width: '100%',
            height: 220,
            objectFit: 'cover',
            borderRadius: '0.75rem',
            marginTop: '1.5rem',
            marginBottom: '1.5rem',
          }}
        />

        <h1 className="fw-bold mb-2">Båttur</h1>
        <p className="text-muted mb-4">
          Skriv inn navnet ditt for å se hvilken båt du er på lørdag.
        </p>

        {!boat && !full && (
          <form onSubmit={submit} style={{ maxWidth: 360, margin: '0 auto' }}>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Skriv inn navnet ditt"
              className="form-control form-control-lg mb-3"
              autoComplete="off"
              autoFocus
              disabled={loading}
            />
            <button
              type="submit"
              className="btn btn-primary btn-lg w-100"
              disabled={!name.trim() || loading}
            >
              {loading ? 'Trekker båt…' : 'Se min båt'}
            </button>
          </form>
        )}

        {error && (
          <div className="alert alert-warning mt-3">
            Klarte ikke å koble til serveren. Prøv igjen.
          </div>
        )}

        {full && !boat && (
          <div className="alert alert-info mt-3">
            Alle båtene er fulle! Snakk med Vibeke eller Bernt.
          </div>
        )}

        {boat && (
          <div className="card border-0 shadow-sm mt-3" style={{ maxWidth: 400, margin: '0 auto' }}>
            <div className="card-body p-4">
              <div style={{ fontSize: '4rem', lineHeight: 1, marginBottom: '0.5rem' }}>
                {BOAT_EMOJI[boat]}
              </div>
              <p className="text-muted small mb-1">Hei {assignedName}!</p>
              <h2 className="fw-bold mb-1">{BOAT_NAMES[boat]}</h2>
              <p className="text-muted mb-0">
                Du skal være med på <strong>{BOAT_NAMES[boat]}</strong>. Mer info om oppmøte kommer.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
