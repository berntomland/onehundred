import { useWeather } from '../hooks/useWeather'

export default function WeatherWidget() {
  const { days } = useWeather()

  if (days.length === 0) return null

  return (
    <div
      style={{
        background: 'rgba(29, 53, 87, 0.45)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderRadius: 16,
        padding: '0.9rem 1.2rem',
        minWidth: 210,
        boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
        color: '#fff',
      }}
    >
      <p
        className="mb-2"
        style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: 1.5, opacity: 0.65, textTransform: 'uppercase' }}
      >
        Farsund
      </p>
      {days.map(({ date, dayName, emoji, maxTemp, precipitation }) => (
        <div
          key={date}
          className="d-flex align-items-center"
          style={{ gap: '0.6rem', marginBottom: '0.45rem' }}
        >
          <span style={{ minWidth: 32, fontSize: '0.92rem', fontWeight: 600, opacity: 0.9 }}>{dayName}</span>
          <span style={{ fontSize: '1.15rem', lineHeight: 1 }}>{emoji}</span>
          <span style={{ minWidth: 38, fontSize: '0.92rem', fontWeight: 700, textAlign: 'right' }}>{maxTemp}°</span>
          <span style={{ fontSize: '0.82rem', opacity: 0.65, minWidth: 50, textAlign: 'right' }}>
            {precipitation > 0 ? `💧${precipitation}mm` : '—'}
          </span>
        </div>
      ))}
    </div>
  )
}
