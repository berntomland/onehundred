// ============================================================
// INNHOLD — endre tekster her, ikke i komponentfilene
// ============================================================

// --- Generelt ---
export const SITE_TITLE = 'Fest i skjærgården'
export const EVENT_DATE_DISPLAY = '26.–28. juni 2026'
export const EVENT_LOCATION = 'Bekkevik - Farsund'
export const EVENT_GUESTS = '50+ personer'
export const EVENT_ADDRESS = 'Bekkevik 85, 4550 Farsund'

// --- NavBar ---
export const NAV_SECTIONS = [
  { id: 'getting-there', label: 'Veibeskrivelse' },
  { id: 'parking',       label: 'Parkering'      },
  { id: 'sleeping',      label: 'Overnatting'    },
  { id: 'program',       label: 'Program'        },
  { id: 'vaer',          label: 'Vær'            },
]

// --- Hero ---
export const HERO = {
  eyebrow:    '',
  title:      'Velkommen til ' + SITE_TITLE,
  lead:       'En hel helg på hytta i Farsund — 50+ av de beste menneskene vi kjenner',
  dateLabel:  '📅 Dato',
  placeLabel: '📍 Sted',
  guestLabel: '👥 Gjester',
  calendarDropdownTitle: 'Legg til i kalender',
  calendarGoogle:        'Google Kalender',
  calendarIcs:           'Apple / Outlook (.ics)',
}

// --- Velkommen ---
export const WELCOME = {
  title:    'Velkommen!',
  subtitle: 'Her finner du alt av informasjon du trenger for helga',
}

// --- Veibeskrivelse ---
export const GETTING_THERE = {
  title:    'Slik finner du frem',
  subtitle: 'Hytten ligger i Bekkevik i Spind i Farsund kommune.',
  addressHeading: '📍 Adresse',
  addressLine:    EVENT_ADDRESS,
  coordinates:    '58.0922° N, 6.8338° Ø',
  directionsBtn:  'Veibeskrivelse fra Bergen →',
  byCarTitle:     'Med bil',
  byCar:          'Turen tar 6.5 til 7 timer. Litt avhengig av trafikk og om du treffer på ferja. Google maps er din venn',
  noCarTitle:     'Uten bil',
  noCar:          'Samkjøring er bra. Bruk gjerne facebooksiden til å alliere deg med noen',
  mapCaption:     'Klikk på markøren for Google Maps',
}

// --- Parkering ---
export const PARKING = {
  title:    'Parkering',
  subtitle: 'Det er lite parkering i nærheten av ved hytten — biler parkeres i Farsund by, og man tar seg frem til hytten derfra.',
  tipTitle: '🚗 Tips: slipp av folk og bagasje først',
  tip1:     'Det er mulig å kjøre neste frem til hytten, slippe av folk og bagasje, og deretter kjøre tilbake til Farsund for å parkere. Det er bare 5 minutters gange fra parkeringsplassen til hytten.',
  tip2:     'Transport mellom Farsund og hytten blir mest sannsynlig med båt — mer info om dette kommer.',
  mapsLabel: '📍 Vis i Google Maps →',
  options: [
    {
      icon: '🏬',
      name: 'Senteret i Farsund',
      tag: 'Anbefalt',
      tagColor: 'var(--party-primary)',
      details: [
        { label: 'Kapasitet',  value: 'Stor parkeringsplass' },
        { label: 'Varighet',   value: 'Hele helgen' },
        { label: 'Elbillader', value: 'Ja ⚡' },
      ],
      note:   'Beste alternativet for de fleste. Stort parkeringsanlegg ved kjøpesenteret — ingen problemer med å stå her hele helgen.',
      mapUrl: 'https://maps.app.goo.gl/x75zczvKHeH8ZUPK7',
    },
    {
      icon: '🏘️',
      name: 'Eneboligen i Farsund',
      tag: 'Begrenset',
      tagColor: 'var(--party-secondary)',
      details: [
        { label: 'Kapasitet',  value: '8–10 biler' },
        { label: 'Varighet',   value: 'Hele helgen' },
        { label: 'Elbillader', value: 'Ikke bekreftet' },
      ],
      note:   'Praktisk for de som overnatter i eneboligen',
      mapUrl: 'https://maps.app.goo.gl/GuCLargTyf5LDrSg7',
    },
  ],
}

// --- Overnatting ---
export const SLEEPING = {
  title:    'Hvor sover man?',
  subtitle: 'Vi har plass til alle — fordelt på fem lokasjoner.',
  packTitle: '📋 Husk å ta med',
  packItems: [
    'Laken + sovepose <strong>eller</strong> dyne — vi har noen dyner, men langt fra nok til alle',
    'Vi er avhengige av at noen tar med <strong>luftmadrasser</strong> — mer info om dette kommer',
    'Romfordeling deles ut nærmere arrangementet',
    'De fleste må regne med å dele rom med noen. Vi skal gjøre vårt beste for at du deler med noen du kjenner 🙂',
  ],
  searchTitle:       'Finn din soveplass',
  searchPlaceholder: 'Skriv inn navnet ditt...',
  searchHit:         (name: string, location: string, icon: string) =>
                       `${name} sover i ${location} ${icon}`,
  searchMiss:        'Fant ingen med det navnet — har du stavet riktig?',
  mapsLabel:         '📍 Vis i Google Maps →',
  locations: [
    {
      icon: '🏠',
      name: 'Annekset',
      capacity: 'ca. 10–11 personer',
      mapUrl: 'https://maps.app.goo.gl/dycKm6uXgmJn7Sx78',
      spots: [
        { label: 'Hems',     count: '6 plasser (litt trangt, men hyggelig)' },
        { label: 'Soverom',  count: '2–3 plasser' },
        { label: 'Stuegulv', count: '2 på madrass' },
      ],
      note: null as string | null,
      guests: ['Jørgen', 'Bettina', 'Øyvind', 'Liv Karin'],
    },
    {
      icon: '🏡',
      name: 'Hovedhytten',
      capacity: '8 personer',
      mapUrl: 'https://maps.app.goo.gl/6mhuKGEjVa8MiRm7A',
      spots: [
        { label: 'Sengeplasser', count: '8 stk' },
      ],
      note: 'Hovedoppholdsstedet for hele gjengen — ingen gulvsovere her.',
      guests: ['Alma', 'Oline', 'Bernt', 'Vibeke', 'Svein Erik', 'Anne Marie'],
    },
    {
      icon: '🛖',
      name: 'Hytte 2',
      capacity: 'ca. 10 personer',
      mapUrl: 'https://maps.app.goo.gl/YmSBqqNAxovP7WsXA',
      spots: [
        { label: 'Sengeplasser', count: '6 stk' },
        { label: 'Stue',         count: '2 på madrass' },
        { label: 'Vinterhage',   count: '2 på madrass' },
      ],
      note: null as string | null,
      guests: ['Kjell Arne', 'Ingrid', 'Annabelle', 'Christian'],
    },
    {
      icon: '⚓',
      name: 'Båthuset',
      capacity: '2 personer',
      mapUrl: 'https://maps.app.goo.gl/mYfihk454TiB3nCa8',
      spots: [
        { label: 'Madrass', count: '2 plasser' },
      ],
      note: 'Meld deg frivillig! Du sover med bølgeskvulp som lydkulisse. Eksklusivt for de som vet å sette pris på det.',
      guests: ['Håvard', 'Ingrid'],
    },
    {
      icon: '🏘️',
      name: 'Enebolig i Farsund',
      capacity: '15–20+ personer',
      mapUrl: 'https://maps.app.goo.gl/GuCLargTyf5LDrSg7',
      spots: [
        { label: 'Sengeplasser',     count: '15 stk' },
        { label: 'Med luftmadrasser', count: 'Enkelt å utvide til 20+' },
        { label: 'Anneks ved sjøen', count: '3 av plassene ligger her' },
      ],
      note: 'Ligger i Farsund by. De som sover her blir plukket opp til båtturen lørdag morgen.',
      guests: ['Hildegunn', 'Lilly Ann', 'Linda', 'Tom-Ivar', 'Stig', 'Tor Erik', 'Christine', 'Lennart', 'Synnøve', 'Toli', 'Ronny', 'Thomas', 'Øystein', 'Kjersti', 'Louise'],
    },
  ],
}

// --- Program ---
export const PROGRAM = {
  title: 'Program',
  days: [
    {
      day: 'Fredag 26. juni',
      events: [
        {
          time:  'Ettermiddag',
          label: 'Ankomst',
          note:  'Kom når du kan. Hytten er klar fra ettermiddagen. Gi en lyd når du vet omtrent når du kommer så finner vi ut av logistikken',
        },
        {
          time:  'Hele kvelden',
          label: '🍔 Hamburger fra grillen',
          note:  'Selvlagde burgere fra grillen serveres løpende hele kvelden. Ingen fast middagstid — mat er klart når du ankommer.',
        },
        {
          time:  'Utover kvelden',
          label: '⚽ Norge vs. Frankrike på prosjektor',
          note:  'VM-åpningskampen vises utendørs på prosjektor. Ta med noe godt å sitte i og stem stemmen.',
        },
      ],
    },
    {
      day: 'Lørdag 27. juni',
      events: [
        {
          time:  'Morgenen',
          label: '🍳 Frokost på hytten',
          note:  'For de som sover på hytta. De som overnatter i byen møter vi opp og henter — ingen blir glemt.',
        },
        {
          time:  'Ca. 10:00',
          label: '⚓ Båttur — alle mann om bord!',
          note:  'Vi drar ut på sjøen i ca. 4 timer. Det blir enkel servering og drikke underveis, og det blir mulighet for å bade. Ta med badetøy og håndkle — vanntemperaturen er et sted mellom 10 og 20 grader, og det er opp til deg hva du synes om det.',
        },
        {
          time:  'Ettermiddagen',
          label: 'Tilbake på hytten — pust ut',
          note:  'Etter båtturen er det bare å slappe av, tørke seg, og lade opp til kvelden.',
        },
        {
          time:  'Kvelden',
          label: '🍽️ Middag, underholdning og god stemning',
          note:  'Ordentlig middag, og så holder vi på så lenge vi gidder. Utpå natten dukker det opp litt nattmat.',
        },
      ],
    },
    {
      day: 'Søndag 28. juni',
      events: [
        {
          time:  'Formiddagen',
          label: '🚶 Omvisning i Farsund by',
          note:  'For de som har lyst — en liten guidet spasertur i Farsund sentrum. Ingen tvang, men anbefales.',
        },
        {
          time:  'Hele dagen',
          label: 'Hytten er åpen',
          note:  'Dra når du vil, bli så lenge du vil. Ingen fasit på søndagen — gjør akkurat som du selv ønsker.',
        },
        {
          time:  'Etterpå',
          label: 'Savne alle umiddelbart',
          note:  '',
        },
      ],
    },
  ],
}

// --- Vær ---
export const WEATHER = {
  title:      'Været i Farsund',
  subtitle:   'Hva sier værgudene? Her er oppdatert varsel fra Yr — direkte fra',
  yrLinkText: 'yr.no',
  fullForecastBtn: 'Se full 10-dagers varsel på Yr.no →',
  credit:     'Værdata levert av',
  creditLink: 'Yr.no',
  creditSuffix: '/ Meteorologisk institutt',
  dropdownTitle: 'Farsund — 5 dager',
  meteogramLink: 'Se meteogram ↓',
}

// --- Footer ---
export const FOOTER = {
  tagline:  `${SITE_TITLE} — vi gleder oss!`,
  contact:  'Spørsmål, innspill eller bare vil si at du gleder deg? Send melding til arrangørene.',
}
