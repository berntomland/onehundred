import { Container, Row, Col } from 'react-bootstrap'
import { DISCORD } from '../../content'

const GUILD_ID = '1503083919329988800'

export default function DiscordSection() {
  return (
    <section id="discord" className="bg-body-secondary">
      <Container>
        <div className="text-center mb-5">
          <h2 className="section-title">Discord</h2>
          <div className="section-divider" />
          <p className="text-muted">Koordiner reisen, still spørsmål og chat med de andre gjestene</p>
        </div>

        <Row className="align-items-center justify-content-center g-4">
          <Col xs={12} md={5}>
            <h5 className="fw-bold mb-3">Bli med i chatten 💬</h5>
            <p className="text-muted mb-3">
              Vi bruker Discord for å koordinere logistikk, dele bilder og holde praten gående
              — både før, under og etter helgen.
            </p>
            <ul className="text-muted mb-4">
              <li>Transport og samkjøring</li>
              <li>Spørsmål til arrangørene</li>
              <li>Bilder og minner fra helgen</li>
            </ul>
            <a
              href={DISCORD.inviteUrl}
              target="_blank"
              rel="noreferrer"
              className="btn fw-semibold px-4"
              style={{ background: '#5865F2', color: '#fff' }}
            >
              {DISCORD.footerBtn}
            </a>
          </Col>

          <Col xs={12} md={5} className="text-center">
            <iframe
              src={`https://discord.com/widget?id=${GUILD_ID}&theme=dark`}
              width="100%"
              height="500"
              allowTransparency={true}
              frameBorder={0}
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
              style={{ borderRadius: '0.5rem' }}
              title="Discord"
            />
          </Col>
        </Row>
      </Container>
    </section>
  )
}
