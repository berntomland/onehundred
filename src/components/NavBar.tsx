import { useState, useRef, useEffect } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { useWeather } from '../hooks/useWeather'

const sections = [
  { id: 'welcome', label: 'Velkommen' },
  { id: 'getting-there', label: 'Veibeskrivelse' },
  { id: 'parking', label: 'Parkering' },
  { id: 'sleeping', label: 'Overnatting' },
  { id: 'program', label: 'Program' },
  { id: 'vaer', label: 'Vær' },
]

function WeatherDropdown() {
  const { current, days } = useWeather()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  if (!current) return null

  return (
    <div ref={ref} style={{ position: 'relative' }} className="ms-3">
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          background: open ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
          border: 'none',
          borderRadius: 20,
          padding: '4px 12px',
          color: '#fff',
          fontSize: '0.9rem',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          transition: 'background 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
        onMouseLeave={e => !open && (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
      >
        {current.emoji} {current.temp}°C{' '}
        <span style={{ opacity: 0.6, fontSize: '0.75rem' }}>Farsund</span>{' '}
        <span style={{ opacity: 0.5, fontSize: '0.7rem' }}>{open ? '▲' : '▼'}</span>
      </button>

      {open && days.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
            padding: '0.75rem',
            minWidth: 220,
            zIndex: 200,
          }}
        >
          <p className="small fw-bold mb-2 px-1" style={{ color: 'var(--party-dark)' }}>
            Farsund — 5 dager
          </p>
          {days.map(({ date, dayName, emoji, maxTemp, precipitation }) => (
            <div
              key={date}
              className="d-flex align-items-center justify-content-between px-1 py-1 rounded"
              style={{ gap: '0.5rem' }}
            >
              <span className="fw-semibold small" style={{ minWidth: 28, color: 'var(--party-dark)' }}>
                {dayName}
              </span>
              <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>{emoji}</span>
              <span className="fw-bold small" style={{ minWidth: 36, color: 'var(--party-dark)' }}>
                {maxTemp}°C
              </span>
              <span className="small text-muted" style={{ minWidth: 48, textAlign: 'right' }}>
                {precipitation > 0 ? `💧 ${precipitation} mm` : '—'}
              </span>
            </div>
          ))}
          <div className="mt-2 pt-2" style={{ borderTop: '1px solid #eee' }}>
            <a
              href="#vaer"
              onClick={() => setOpen(false)}
              className="small"
              style={{ color: 'var(--party-secondary)', textDecoration: 'none' }}
            >
              Se meteogram ↓
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default function NavBar() {
  const [expanded, setExpanded] = useState(false)

  return (
    <Navbar
      expand="md"
      sticky="top"
      expanded={expanded}
      onToggle={setExpanded}
      style={{ backgroundColor: 'var(--party-dark)' }}
    >
      <Container>
        <Navbar.Brand
          href="#welcome"
          className="fw-bold text-white fs-5"
          onClick={() => setExpanded(false)}
        >
          Fest i skjærgården
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" className="border-secondary" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto align-items-center">
            {sections.map(({ id, label }) => (
              <Nav.Link
                key={id}
                href={`#${id}`}
                className="text-white-50 px-3"
                style={{ transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = '')}
                onClick={() => setExpanded(false)}
              >
                {label}
              </Nav.Link>
            ))}
            <WeatherDropdown />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
