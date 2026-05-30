import { useEffect, useState } from 'react'
import { NOTPRON_WON_EVENT } from './SnakeGame'

interface Winner {
  name: string
  completedAt: number
}

export default function NotpronWinners() {
  const [winners, setWinners] = useState<Winner[] | null>(null)

  useEffect(() => {
    let cancelled = false
    const load = () => {
      fetch('/api/notpron')
        .then(r => r.ok ? r.json() as Promise<{ winners?: Winner[] }> : { winners: [] })
        .then(data => {
          if (cancelled) return
          const list: Winner[] = Array.isArray(data.winners) ? data.winners : []
          setWinners(list)
        })
        .catch(() => { if (!cancelled) setWinners([]) })
    }
    load()
    const onWon = () => setTimeout(load, 300)
    window.addEventListener(NOTPRON_WON_EVENT, onWon)
    return () => {
      cancelled = true
      window.removeEventListener(NOTPRON_WON_EVENT, onWon)
    }
  }, [])

  if (!winners || winners.length === 0) return null

  const sorted = [...winners].sort((a, b) => a.completedAt - b.completedAt)

  return (
    <div
      style={{
        background: 'rgba(29, 53, 87, 0.45)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderRadius: 16,
        padding: '0.9rem 1.2rem',
        minWidth: 180,
        maxWidth: 220,
        boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
        color: '#fff',
      }}
    >
      <p
        className="mb-2"
        style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: 1.5, opacity: 0.65, textTransform: 'uppercase' }}
      >
        🐍 Hall of Fame
      </p>
      <ul className="list-unstyled mb-0" style={{ fontSize: '0.88rem' }}>
        {sorted.map((w, i) => (
          <li
            key={`${w.name}-${w.completedAt}`}
            style={{ marginBottom: 2, opacity: 0.92, display: 'flex', gap: '0.5rem', alignItems: 'baseline' }}
          >
            <span style={{ opacity: 0.5, minWidth: 18, fontSize: '0.78rem' }}>{i + 1}.</span>
            <span style={{ fontWeight: 600 }}>{w.name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
