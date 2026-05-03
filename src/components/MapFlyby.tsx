import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix missing marker icons in Vite builds
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

const BERGEN: [number, number] = [60.3913, 5.3221]
const CABIN: [number, number] = [58.092213, 6.8338199]

function FlyToAnimation() {
  const map = useMap()

  useEffect(() => {
    map.setView(BERGEN, 8, { animate: false })

    const timer = setTimeout(() => {
      map.flyTo(CABIN, 16, { animate: true, duration: 5 })
    }, 800)

    return () => clearTimeout(timer)
  }, [map])

  return null
}

export default function MapFlyby() {
  return (
    <MapContainer
      center={BERGEN}
      zoom={8}
      style={{ height: 420, width: '100%', borderRadius: 12 }}
      zoomControl={true}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={CABIN}>
        <Popup>
          <strong>Bekkevik 85</strong><br />
          4550 Farsund<br />
          <a
            href="https://www.google.com/maps/dir/Bergen/Bekkevik+85,+4550+Farsund"
            target="_blank"
            rel="noreferrer"
          >
            Åpne i Google Maps →
          </a>
        </Popup>
      </Marker>
      <FlyToAnimation />
    </MapContainer>
  )
}
