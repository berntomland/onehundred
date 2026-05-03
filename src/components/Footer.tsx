import { Container } from 'react-bootstrap'
import { FOOTER } from '../content'

export default function Footer() {
  return (
    <footer className="py-4 bg-dark text-white">
      <Container className="text-center">
        <p className="mb-1 fw-semibold text-white">{FOOTER.tagline}</p>
        <p className="mb-0 small text-white-50">{FOOTER.contact}</p>
      </Container>
    </footer>
  )
}
