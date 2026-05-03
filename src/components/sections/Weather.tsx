import { Container } from 'react-bootstrap'
import { WEATHER } from '../../content'

const YR_ID = '1-649'
const YR_LINK = 'https://www.yr.no/nb/v%C3%A6rvarsel/daglig-tabell/1-649/Norge/Agder/Farsund/Farsund'

export default function Weather() {
  return (
    <section id="vaer">
      <Container>
        <div className="text-center mb-5">
          <h2 className="section-title">{WEATHER.title}</h2>
          <div className="section-divider" />
          <p className="text-muted">
            {WEATHER.subtitle}{' '}
            <a href={YR_LINK} target="_blank" rel="noreferrer">
              {WEATHER.yrLinkText}
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
              className="btn btn-primary btn-lg fw-semibold px-5"
            >
              {WEATHER.fullForecastBtn}
            </a>
          </div>
        </div>

        <p className="text-center small text-muted mt-3">
          {WEATHER.credit}{' '}
          <a href="https://www.yr.no" target="_blank" rel="noreferrer">
            {WEATHER.creditLink}
          </a>
          {' '}{WEATHER.creditSuffix}
        </p>
      </Container>
    </section>
  )
}
