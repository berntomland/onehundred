import { useState } from 'react'
import { Container, Form, Button, Card } from 'react-bootstrap'
import { SITE_TITLE } from '../content'

const CORRECT = import.meta.env.VITE_SITE_PASSWORD as string

const SESSION_KEY = 'fest_auth'

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(() =>
    sessionStorage.getItem(SESSION_KEY) === CORRECT
  )
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)

  if (unlocked) return <>{children}</>

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (input === CORRECT) {
      sessionStorage.setItem(SESSION_KEY, CORRECT)
      setUnlocked(true)
    } else {
      setError(true)
      setInput('')
    }
  }

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{ background: 'var(--bs-body-bg)' }}
    >
      <Container style={{ maxWidth: 400 }}>
        <Card className="border-0 shadow-lg">
          <Card.Body className="p-5 text-center">
            <div style={{ fontSize: '3rem' }} className="mb-3">🏖️</div>
            <h4 className="fw-bold mb-1">{SITE_TITLE}</h4>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Passord"
                  value={input}
                  onChange={e => { setInput(e.target.value); setError(false) }}
                  isInvalid={error}
                  autoFocus
                />
                <Form.Control.Feedback type="invalid">
                  Feil passord — prøv igjen
                </Form.Control.Feedback>
              </Form.Group>
              <Button type="submit" variant="primary" className="w-100">
                Enter
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}
