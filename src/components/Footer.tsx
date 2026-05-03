import { Container } from 'react-bootstrap'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--party-dark)', color: 'rgba(255,255,255,0.6)' }} className="py-4">
      <Container className="text-center">
        <p className="mb-1 fw-semibold text-white">Fest i skjærgården — vi gleder oss!</p>
        <p className="mb-0 small">Spørsmål, innspill eller bare vil si at du gleder deg? Send melding til arrangørene.</p>
      </Container>
    </footer>
  )
}
