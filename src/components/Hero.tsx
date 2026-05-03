import { useState, useRef, useEffect } from 'react'
import { Container } from 'react-bootstrap'

const BANNER_IMAGE = '/images/2026-05-01 17.31.10.jpg'

const GOOGLE_CAL_URL =
  'https://calendar.google.com/calendar/render?action=TEMPLATE' +
  '&text=Fest+i+skj%C3%A6rg%C3%A5rden' +
  '&dates=20260626/20260629' +
  '&details=Helgefest+i+Farsund+med+50%2B+venner' +
  '&location=Bekkevik+85%2C+4550+Farsund'

function DateButton() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          color: 'inherit',
          textAlign: 'center',
        }}
        title="Legg til i kalender"
      >
        <div className="fw-bold fs-5">📅 Dato</div>
        <div style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'underline dotted' }}>
          26.–28. juni 2026
        </div>
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: '110%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#fff',
            borderRadius: 10,
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            padding: '0.5rem',
            minWidth: 210,
            zIndex: 100,
          }}
        >
          <p
            className="text-muted small mb-2 px-2 pt-1"
            style={{ color: '#666', fontWeight: 600 }}
          >
            Legg til i kalender
          </p>
          <a
            href={GOOGLE_CAL_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
            style={menuItemStyle}
          >
            <img src="https://www.google.com/favicon.ico" width={16} height={16} alt="" style={{ borderRadius: 3 }} />
            Google Kalender
          </a>
          <a
            href="/fest-i-skjaergarden.ics"
            download
            onClick={() => setOpen(false)}
            style={menuItemStyle}
          >
            <span style={{ fontSize: '1rem' }}>📆</span>
            Apple / Outlook (.ics)
          </a>
        </div>
      )}
    </div>
  )
}

const menuItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.6rem',
  padding: '0.5rem 0.75rem',
  borderRadius: 7,
  color: '#1d3557',
  textDecoration: 'none',
  fontSize: '0.9rem',
  transition: 'background 0.15s',
  cursor: 'pointer',
}

export default function Hero() {
  return (
    <div
      style={{
        position: 'relative',
        minHeight: '92vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("${BANNER_IMAGE}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.45)',
        }}
      />

      <Container className="text-center text-white py-5" style={{ position: 'relative', zIndex: 1 }}>
        <p
          className="text-uppercase fw-semibold mb-3"
          style={{ color: 'var(--party-accent)', letterSpacing: 4, fontSize: '0.85rem' }}
        >
          Det skjer, folkens!
        </p>
        <h1
          className="display-2 fw-bold mb-3"
          style={{ textShadow: '0 2px 24px rgba(0,0,0,0.6)' }}
        >
          Fest i skjærgården
        </h1>
        <p
          className="lead mb-4 mx-auto"
          style={{ color: 'rgba(255,255,255,0.82)', maxWidth: 600 }}
        >
          En hel helg på hytta i Farsund — 50+ av de beste menneskene vi kjenner, alt for mye god mat, musikk som ikke stopper og minner vi kommer til å snakke om i årevis.
        </p>

        <div
          className="d-inline-flex flex-wrap gap-4 px-4 py-3 rounded-3 mb-5"
          style={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(10px)' }}
        >
          <DateButton />
          <div className="d-none d-sm-block" style={{ borderLeft: '1px solid rgba(255,255,255,0.2)' }} />
          <div>
            <div className="fw-bold fs-5">📍 Sted</div>
            <div style={{ color: 'rgba(255,255,255,0.75)' }}>Farsund</div>
          </div>
          <div className="d-none d-sm-block" style={{ borderLeft: '1px solid rgba(255,255,255,0.2)' }} />
          <div>
            <div className="fw-bold fs-5">👥 Gjester</div>
            <div style={{ color: 'rgba(255,255,255,0.75)' }}>50+ personer</div>
          </div>
        </div>

      </Container>
    </div>
  )
}
