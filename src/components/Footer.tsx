import { Container } from 'react-bootstrap'
import { FOOTER, DISCORD } from '../content'

export default function Footer() {
  return (
    <footer className="py-5 bg-dark text-white">
      <Container className="text-center">
        <p className="mb-1 fw-semibold text-white">{FOOTER.tagline}</p>
        <p className="mb-3 small text-white-50">{FOOTER.contact}</p>
        <div>
          <p className="mb-2 small text-white-50">{DISCORD.footerLabel}</p>
          <a
            href={DISCORD.inviteUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-sm fw-semibold px-4"
            style={{ background: '#5865F2', color: '#fff' }}
          >
            {DISCORD.footerBtn}
          </a>
        </div>
      </Container>
    </footer>
  )
}
