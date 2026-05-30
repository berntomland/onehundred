import { useState, useRef, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { HERO, EVENT_DATE_DISPLAY, EVENT_LOCATION, EVENT_GUESTS } from '../content'
import WeatherWidget from './WeatherWidget'
import NotpronWinners from './NotpronWinners'

const BANNER_IMAGE = '/images/hovedlogo.jpg'

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
        title={HERO.calendarDropdownTitle}
      >
        <div className="fw-bold fs-5">{HERO.dateLabel}</div>
        <div style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'underline dotted' }}>
          {EVENT_DATE_DISPLAY}
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
            {HERO.calendarDropdownTitle}
          </p>
          <a
            href={GOOGLE_CAL_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
            style={menuItemStyle}
          >
            <img src="https://www.google.com/favicon.ico" width={16} height={16} alt="" style={{ borderRadius: 3 }} />
            {HERO.calendarGoogle}
          </a>
          <a
            href="/fest-i-skjaergarden.ics"
            download
            onClick={() => setOpen(false)}
            style={menuItemStyle}
          >
            <span style={{ fontSize: '1rem' }}>📆</span>
            {HERO.calendarIcs}
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
        minHeight: 'auto',
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

      <Container className="text-white py-5" style={{ position: 'relative', zIndex: 1 }}>
        <Row className="align-items-center gy-4">
          <Col xs={12} md={7} className="text-center text-md-start">
            <h1
              className="display-2 fw-bold mb-3"
              style={{
                color: '#f0f8ff',
                letterSpacing: '0.04em',
                textShadow: [
                  '0 1px 0 rgba(255,255,255,0.25)',
                  '0 2px 4px rgba(0,0,0,0.5)',
                  '0 4px 12px rgba(0,0,0,0.4)',
                  '0 8px 32px rgba(0,0,0,0.35)',
                  '0 0 60px rgba(255,255,255,0.08)',
                ].join(', '),
              }}
            >
              {HERO.title}
            </h1>
            <p
              className="lead mb-4"
              style={{ color: 'rgba(255,255,255,0.82)' }}
            >
              {HERO.lead}
            </p>
            <div
              className="d-inline-flex flex-wrap gap-4 px-4 py-3 rounded-3"
              style={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(10px)' }}
            >
              <DateButton />
              <div className="d-none d-sm-block" style={{ borderLeft: '1px solid rgba(255,255,255,0.2)' }} />
              <div>
                <div className="fw-bold fs-5">{HERO.placeLabel}</div>
                <div style={{ color: 'rgba(255,255,255,0.75)' }}>{EVENT_LOCATION}</div>
              </div>
              <div className="d-none d-sm-block" style={{ borderLeft: '1px solid rgba(255,255,255,0.2)' }} />
              <div>
                <div className="fw-bold fs-5">{HERO.guestLabel}</div>
                <div style={{ color: 'rgba(255,255,255,0.75)' }}>{EVENT_GUESTS}</div>
              </div>
            </div>
          </Col>
          <Col xs={12} md={5} className="d-flex flex-wrap justify-content-center justify-content-md-end gap-3">
            <NotpronWinners />
            <WeatherWidget />
          </Col>
        </Row>
      </Container>
    </div>
  )
}
