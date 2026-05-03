import { Container } from 'react-bootstrap'

const YR_ID = '1-649'
const YR_LINK = 'https://www.yr.no/nb/v%C3%A6rvarsel/daglig-tabell/1-649/Norge/Agder/Farsund/Farsund'

export default function Weather() {
  return (
    <section id="vaer" style={{ backgroundColor: 'var(--party-light)' }}>
      <Container>
        <div className="text-center mb-5">
          <h2 className="section-title">Været i Farsund</h2>
          <div className="section-divider" />
          <p className="text-muted">
            Hva sier værgudene? Her er oppdatert varsel fra Yr — direkte fra{' '}
            <a href={YR_LINK} target="_blank" rel="noreferrer" style={{ color: 'var(--party-secondary)' }}>
              yr.no
            </a>
            .
          </p>
        </div>

        <div className="text-center">
          <img
            src={`https://www.yr.no/nb/content/${YR_ID}/meteogram.svg`}
            alt="Værkart for Farsund"
            style={{ width: '100%', maxWidth: 900, borderRadius: 12, display: 'inline-block' }}
          />
          <div className="mt-4">
            <a
              href={YR_LINK}
              target="_blank"
              rel="noreferrer"
              className="btn btn-lg fw-semibold px-5"
              style={{ background: 'var(--party-secondary)', color: '#fff', border: 'none' }}
            >
              Se full 10-dagers varsel på Yr.no →
            </a>
          </div>
        </div>

        <p className="text-center small text-muted mt-3">
          Værdata levert av{' '}
          <a href="https://www.yr.no" target="_blank" rel="noreferrer" style={{ color: 'var(--party-secondary)' }}>
            Yr.no
          </a>
          {' '}/ Meteorologisk institutt
        </p>
      </Container>
    </section>
  )
}
