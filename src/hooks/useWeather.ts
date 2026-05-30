import { useEffect, useState } from 'react'

const LAT = 58.0922
const LON = 6.8338

export type DayForecast = {
  date: string
  dayName: string
  emoji: string
  maxTemp: number
  precipitation: number
}

export type WeatherState = {
  current: { temp: number; emoji: string } | null
  days: DayForecast[]
}

const symbolToEmoji: Record<string, string> = {
  clearsky: '☀️',
  fair: '🌤️',
  partlycloudy: '⛅',
  cloudy: '☁️',
  fog: '🌫️',
  lightrain: '🌦️',
  lightrainshowers: '🌦️',
  rainshowers: '🌦️',
  rain: '🌧️',
  heavyrain: '🌧️',
  heavyrainshowers: '🌧️',
  lightsleet: '🌨️',
  sleetshowers: '🌨️',
  sleet: '🌨️',
  lightsnow: '❄️',
  snowshowers: '❄️',
  snow: '❄️',
  heavysnow: '❄️',
  thunder: '⛈️',
  lightrainandthunder: '⛈️',
  rainandthunder: '⛈️',
  heavyrainandthunder: '⛈️',
}

function toEmoji(code: string): string {
  const base = code.replace(/_day$|_night$|_polartwilight$/, '')
  return symbolToEmoji[base] ?? '🌡️'
}

export function useWeather(): WeatherState {
  const [state, setState] = useState<WeatherState>({ current: null, days: [] })

  useEffect(() => {
    fetch(
      `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${LAT}&lon=${LON}`,
      { headers: { 'User-Agent': 'fest-i-skjaergarden/1.0 github.com' } }
    )
      .then(r => r.json())
      .then(json => {
        const timeseries: any[] = json?.properties?.timeseries ?? []
        if (!timeseries.length) return

        // Current conditions from first entry
        const first = timeseries[0]
        const currentTemp = Math.round(first.data.instant.details.air_temperature)
        const currentSymbol =
          first.data.next_1_hours?.summary?.symbol_code ??
          first.data.next_6_hours?.summary?.symbol_code ?? ''

        // Aggregate by date — only entries where next_6_hours exists (at 0,6,12,18 UTC)
        // to avoid double-counting precipitation
        const byDate: Record<string, { temps: number[]; precip: number; symbolAt12: string }> = {}

        timeseries.forEach((entry: any) => {
          const date = entry.time.slice(0, 10)
          const hour = parseInt(entry.time.slice(11, 13))
          const temp: number = entry.data.instant.details.air_temperature

          if (!byDate[date]) byDate[date] = { temps: [], precip: 0, symbolAt12: '' }
          byDate[date].temps.push(temp)

          // Only sum non-overlapping 6-hour blocks anchored at 0, 6, 12, 18 UTC
          if (entry.data.next_6_hours && [0, 6, 12, 18].includes(hour)) {
            byDate[date].precip += entry.data.next_6_hours.details.precipitation_amount ?? 0
            if (hour === 12) {
              byDate[date].symbolAt12 = entry.data.next_6_hours.summary.symbol_code
            }
          }
        })

        const todayStr = timeseries[0].time.slice(0, 10)
        const days: DayForecast[] = Object.entries(byDate)
          .filter(([date]) => date >= todayStr)
          .slice(0, 5)
          .map(([date, { temps, precip, symbolAt12 }]) => {
            const d = new Date(date + 'T12:00:00')
            const dayName = d.toLocaleDateString('nb-NO', { weekday: 'short' })
            return {
              date,
              dayName: dayName.charAt(0).toUpperCase() + dayName.slice(1, 3),
              emoji: toEmoji(symbolAt12 || currentSymbol),
              maxTemp: Math.round(Math.max(...temps)),
              precipitation: Math.round(precip * 10) / 10,
            }
          })

        setState({
          current: { temp: currentTemp, emoji: toEmoji(currentSymbol) },
          days,
        })
      })
      .catch(() => {})
  }, [])

  return state
}
