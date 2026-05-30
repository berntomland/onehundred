import { useCallback, useEffect, useRef, useState } from 'react'

const REINERT_YOUTUBE_ID = 'EgiPmQeM3iQ'

const GRID = 20
const CELL = 20
const TICK_MS = 130
const POINTS_PER_FOOD = 5
const WIN_SCORE = 25

const NAME_STORAGE_KEY = 'notpron_name'
export const NOTPRON_WON_EVENT = 'notpron-won'

type Direction = 'up' | 'down' | 'left' | 'right'
type Point = { x: number; y: number }
type Status = 'naming' | 'playing' | 'lost' | 'won'

const OPPOSITE: Record<Direction, Direction> = {
  up: 'down', down: 'up', left: 'right', right: 'left',
}

const VEC: Record<Direction, Point> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
}

interface Props {
  open: boolean
  onClose: () => void
}

interface Winner {
  name: string
  completedAt: number
}

function readStoredName(): string {
  try { return localStorage.getItem(NAME_STORAGE_KEY) ?? '' }
  catch { return '' }
}

async function recordWinner(name: string) {
  try {
    const res = await fetch('/api/notpron')
    const data: { winners?: Winner[] } = res.ok ? await res.json() : {}
    const winners: Winner[] = Array.isArray(data.winners) ? data.winners : []
    winners.push({ name, completedAt: Date.now() })
    await fetch('/api/notpron', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ winners }),
    })
    window.dispatchEvent(new CustomEvent(NOTPRON_WON_EVENT))
  } catch { /* ignore — easter egg shouldn't block */ }
}

export default function SnakeGame({ open, onClose }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const snakeRef = useRef<Point[]>([])
  const dirRef = useRef<Direction>('right')
  const nextDirRef = useRef<Direction>('right')
  const foodRef = useRef<Point>({ x: 10, y: 10 })
  const scoreRef = useRef(0)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const recordedRef = useRef(false)

  const [score, setScore] = useState(0)
  const [status, setStatus] = useState<Status>('naming')
  const [name, setName] = useState('')
  const [nameInput, setNameInput] = useState('')

  const placeFood = useCallback(() => {
    while (true) {
      const f = {
        x: Math.floor(Math.random() * GRID),
        y: Math.floor(Math.random() * GRID),
      }
      if (!snakeRef.current.some(s => s.x === f.x && s.y === f.y)) {
        foodRef.current = f
        return
      }
    }
  }, [])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.fillStyle = '#1a1a2e'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.strokeStyle = 'rgba(255,255,255,0.04)'
    ctx.lineWidth = 1
    for (let i = 1; i < GRID; i++) {
      ctx.beginPath()
      ctx.moveTo(i * CELL, 0)
      ctx.lineTo(i * CELL, GRID * CELL)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, i * CELL)
      ctx.lineTo(GRID * CELL, i * CELL)
      ctx.stroke()
    }

    const f = foodRef.current
    ctx.fillStyle = '#e63946'
    ctx.beginPath()
    ctx.arc(f.x * CELL + CELL / 2, f.y * CELL + CELL / 2, CELL / 2 - 2, 0, Math.PI * 2)
    ctx.fill()

    snakeRef.current.forEach((s, i) => {
      ctx.fillStyle = i === 0 ? '#a8dadc' : '#457b9d'
      ctx.fillRect(s.x * CELL + 1, s.y * CELL + 1, CELL - 2, CELL - 2)
    })
  }, [])

  const startPlaying = useCallback(() => {
    snakeRef.current = [
      { x: 5, y: 10 },
      { x: 4, y: 10 },
      { x: 3, y: 10 },
    ]
    dirRef.current = 'right'
    nextDirRef.current = 'right'
    scoreRef.current = 0
    recordedRef.current = false
    setScore(0)
    placeFood()
    setStatus('playing')
    draw()
  }, [placeFood, draw])

  const tick = useCallback(() => {
    const dir = nextDirRef.current
    dirRef.current = dir
    const vec = VEC[dir]
    const head = snakeRef.current[0]
    const newHead = { x: head.x + vec.x, y: head.y + vec.y }

    if (newHead.x < 0 || newHead.x >= GRID || newHead.y < 0 || newHead.y >= GRID) {
      setStatus('lost')
      return
    }
    if (snakeRef.current.some(s => s.x === newHead.x && s.y === newHead.y)) {
      setStatus('lost')
      return
    }

    snakeRef.current = [newHead, ...snakeRef.current]

    if (newHead.x === foodRef.current.x && newHead.y === foodRef.current.y) {
      scoreRef.current += POINTS_PER_FOOD
      setScore(scoreRef.current)
      if (scoreRef.current >= WIN_SCORE) {
        setStatus('won')
        return
      }
      placeFood()
    } else {
      snakeRef.current.pop()
    }

    draw()
  }, [draw, placeFood])

  useEffect(() => {
    if (!open) return
    const stored = readStoredName()
    if (stored) {
      setName(stored)
      setNameInput(stored)
      startPlaying()
    } else {
      setName('')
      setNameInput('')
      setStatus('naming')
    }
  }, [open, startPlaying])

  useEffect(() => {
    if (status !== 'won' || recordedRef.current || !name) return
    recordedRef.current = true
    recordWinner(name)
  }, [status, name])

  useEffect(() => {
    if (!open || status !== 'playing') return
    const id = window.setInterval(tick, TICK_MS)
    return () => window.clearInterval(id)
  }, [open, status, tick])

  useEffect(() => {
    if (!open || status === 'naming') return
    function handler(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      const map: Record<string, Direction> = {
        ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right',
        w: 'up', W: 'up', s: 'down', S: 'down',
        a: 'left', A: 'left', d: 'right', D: 'right',
      }
      const dir = map[e.key]
      if (!dir) return
      e.preventDefault()
      if (dir === OPPOSITE[dirRef.current]) return
      nextDirRef.current = dir
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, status, onClose])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [open])

  if (!open) return null

  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0]
    touchStartRef.current = { x: t.clientX, y: t.clientY }
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartRef.current
    if (!start) return
    const t = e.changedTouches[0]
    const dx = t.clientX - start.x
    const dy = t.clientY - start.y
    const absX = Math.abs(dx)
    const absY = Math.abs(dy)
    if (Math.max(absX, absY) < 20) return
    const dir: Direction = absX > absY
      ? (dx > 0 ? 'right' : 'left')
      : (dy > 0 ? 'down' : 'up')
    if (dir !== OPPOSITE[dirRef.current]) nextDirRef.current = dir
    touchStartRef.current = null
  }

  const submitName = () => {
    const trimmed = nameInput.trim().slice(0, 32)
    if (!trimmed) return
    try { localStorage.setItem(NAME_STORAGE_KEY, trimmed) } catch { /* ignore */ }
    setName(trimmed)
    startPlaying()
  }

  const editName = () => {
    setNameInput(name)
    setStatus('naming')
  }

  const boardSize = GRID * CELL

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
        zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          background: '#16213e', borderRadius: 16, padding: 20,
          maxWidth: 'min(95vw, 460px)', width: '100%',
          color: '#fff', boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0 fw-bold">🐍 Notpron</h5>
          <button
            onClick={onClose}
            aria-label="Lukk"
            style={{
              background: 'transparent', border: 'none', color: '#fff',
              fontSize: 28, lineHeight: 1, cursor: 'pointer', padding: '0 6px',
            }}
          >×</button>
        </div>

        {status === 'naming' ? (
          <div className="text-center py-3">
            <p className="mb-2 fw-semibold">Hva heter du?</p>
            <p className="small mb-3" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Navnet havner på Hall of Fame hvis du klarer {WIN_SCORE} poeng.
            </p>
            <input
              type="text"
              value={nameInput}
              onChange={e => setNameInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') submitName() }}
              autoFocus
              maxLength={32}
              placeholder="Ditt navn"
              className="form-control text-center mb-3"
              style={{ maxWidth: 280, margin: '0 auto' }}
            />
            <button
              onClick={submitName}
              disabled={!nameInput.trim()}
              className="btn btn-light btn-sm fw-semibold px-4"
            >
              Start
            </button>
          </div>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center mb-2 small">
              <span>
                <span style={{ color: 'rgba(255,255,255,0.6)' }}>Spiller: </span>
                <strong>{name}</strong>
                {status !== 'won' && (
                  <button
                    onClick={editName}
                    style={{
                      background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)',
                      fontSize: '0.75rem', cursor: 'pointer', padding: '0 0 0 6px',
                      textDecoration: 'underline',
                    }}
                  >endre</button>
                )}
              </span>
              <span>
                <span style={{ color: 'rgba(255,255,255,0.6)' }}>Score: </span>
                <strong>{score}</strong>
                <span style={{ color: 'rgba(255,255,255,0.4)' }}> / {WIN_SCORE}</span>
              </span>
            </div>

            {status === 'won' ? (
              <div className="text-center">
                <h5 className="mb-2">🎉 Du klarte det, {name}!</h5>
                <p className="small mb-3" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  Reinert med beinet, til ære for deg.
                </p>
                {REINERT_YOUTUBE_ID ? (
                  <iframe
                    width="100%"
                    height="225"
                    src={`https://www.youtube.com/embed/${REINERT_YOUTUBE_ID}?autoplay=1`}
                    title="Reinert med beinet"
                    style={{ border: 0, borderRadius: 8 }}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                ) : (
                  <p className="small" style={{ color: '#ffd166' }}>
                    Sett <code>REINERT_YOUTUBE_ID</code> i <code>SnakeGame.tsx</code> for å spille av sangen.
                  </p>
                )}
                <button className="btn btn-outline-light btn-sm mt-3" onClick={startPlaying}>
                  Spill igjen
                </button>
              </div>
            ) : (
              <>
                <div style={{ position: 'relative', width: '100%', maxWidth: boardSize, margin: '0 auto' }}>
                  <canvas
                    ref={canvasRef}
                    width={boardSize}
                    height={boardSize}
                    style={{
                      display: 'block', width: '100%', height: 'auto',
                      borderRadius: 8, touchAction: 'none',
                      imageRendering: 'pixelated',
                    }}
                  />
                  {status === 'lost' && (
                    <div
                      style={{
                        position: 'absolute', inset: 0,
                        background: 'rgba(0,0,0,0.7)', borderRadius: 8,
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      <h5 className="mb-2">Game over</h5>
                      <p className="small mb-3">Du fikk {score} poeng.</p>
                      <button className="btn btn-light btn-sm" onClick={startPlaying}>
                        Prøv igjen
                      </button>
                    </div>
                  )}
                </div>
                <p className="small text-center mt-3 mb-0" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  Piltaster eller WASD — eller sveip på mobil
                </p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
