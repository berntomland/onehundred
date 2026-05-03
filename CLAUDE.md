# Fest i skjærgården — prosjektkontekst for Claude

## Om prosjektet
Festside for en helgefest 26.–28. juni 2026 på Bekkevik 85, 4550 Farsund.
Ca. 50+ gjester, alle norske venner som har bekreftet deltagelse.
Siden er statisk informasjonsside — ingen innlogging, ingen backend.

## Stack
- React 19 + TypeScript
- Vite 8
- Bootstrap 5 + react-bootstrap
- react-leaflet (kart med flyby-animasjon)
- Leaflet (underliggende kartbibliotek)

## Kjøre lokalt
```bash
npm install
npm run dev        # starter dev-server på http://localhost:5173
npm run build      # bygger til dist/
```

## Deploy (Linux + nginx)
```bash
npm run build
# kopier dist/ til serveren, bruk nginx.conf i rotkatalogen
```
`nginx.conf` ligger klar i roten av prosjektet.

## Struktur
```
src/
  components/
    NavBar.tsx          # Sticky navbar med live-vær fra met.no
    Hero.tsx            # Forsidebanner med bilde + kalender-dropdown
    Footer.tsx
    MapFlyby.tsx        # Leaflet-kart som flyr fra Bergen til hytten
    sections/
      Welcome.tsx
      GettingThere.tsx  # Veibeskrivelse + kart
      Parking.tsx       # Parkeringsalternativer med Google Maps-lenker
      Sleeping.tsx      # Overnatting med søkefunksjon for navneoppslag
      Program.tsx       # Helgeprogram fre–søn
      Weather.tsx       # Yr.no meteogram + lenke til full varsel
  hooks/
    useWeather.ts       # Henter 5-dagersvarsel fra api.met.no
public/
  images/               # Bilder av hytten (JPG). MP4-videoer er ekskludert fra git.
  fest-i-skjaergarden.ics  # Kalenderfil for Apple/Outlook
  favicon.svg
nginx.conf              # Klar til bruk på Linux-server
```

## Viktige detaljer
- **Dato:** 26.–28. juni 2026
- **Adresse:** Bekkevik 85, 4550 Farsund (koordinater: 58.0922° N, 6.8338° Ø)
- **Værlokasjon:** Yr.no location ID `1-649` (Farsund)
- **Bilder:** ligger i `public/images/`. Galleri-seksjonen er fjernet midlertidig — brukeren jobber med bildeutvalget.
- **Overnatting:** 5 lokasjoner med fordelte gjester og Google Maps-lenker. Navnesøk er implementert.
- **Parkering:** Senteret i Farsund (anbefalt, har elbillader) + Eneboligen.
- **Tone:** Uformell og gøyal — alle gjester er nære venner som har sagt ja.

## Ting som gjenstår / TBD i koden
- Bildegalleri skal legges tilbake når bildeutvalget er klart
- Full navneliste for overnatting er ikke komplett — eksempelliste er brukt
- Programdetaljer er delvis placeholder
- Parkeringsinfo for eneboligen: 8–10 plasser
- MP4-videoer ligger lokalt i `public/images/` men er ekskludert fra git (en er 124 MB)
