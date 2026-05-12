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
  { id: 'om-helgen',     label: 'Om helgen'      },
  { id: 'getting-there', label: 'Veibeskrivelse' },
  { id: 'parking',       label: 'Parkering'      },
  { id: 'sleeping',      label: 'Overnatting'    },
  { id: 'pack',          label: 'Husk å ta med'  },
  { id: 'program',       label: 'Program'        },
  { id: 'vaer',          label: 'Vær'            },
  { id: 'discord',       label: 'Discord'        },
]

// --- Hero ---
export const HERO = {
  eyebrow:    '',
  title:      'Velkommen til fest i skjærgården!',
  lead:       'En helg på hytta i Farsund med 50+ av de beste menneskene vi kjenner',
  dateLabel:  '📅 Dato',
  placeLabel: '📍 Sted',
  guestLabel: '👥 Gjester',
  calendarDropdownTitle: 'Legg til i kalender',
  calendarGoogle:        'Google Kalender',
  calendarIcs:           'Apple / Outlook (.ics)',
}

// --- Om helgen ---
export const ABOUT = {
  title: 'Om helgen',
  body:  'Vi gleder oss stort til å feire med dere alle sammen! \n' +
      '\n' +
      'Vi har laget et program for helgen, men vi legger opp til lavt tempo med muligheter for soling, bading, fisking, noe leskende i skyggen og god prat. ' +
      'Vi satser selvsagt på strålende sol siden mesteparten av festen vil skje ute, men vi har en plan B dersom værgudene slår seg vrange\n' +
      '\n' +
      'Vi står for mat (noe krever litt egeninnsats) og drikke til maten, men ta gjerne med deg det du har lyst til å drikke utover dette. \n' +
      '\n' +
      'Vi har bare ett gaveønske og det er at det blir en bra fest 🙂',
  planLabel: 'Lilly Ann (93281027) i samarbeid med Hildegunn og Linda styrer programmet',
  planners:  '',
}

// --- Velkommen ---
export const WELCOME = {
  title:    'Velkommen!',
  subtitle: 'Her finner du alt av informasjon du trenger for helga',
}

// --- Veibeskrivelse ---
export const GETTING_THERE = {
  title:    'Slik finner du frem',
  subtitle: 'Hytta ligger i Bekkevik i Spind i Farsund kommune',
  addressHeading: '📍 Adresse',
  addressLine:    EVENT_ADDRESS,
  coordinates:    '58.0922° N, 6.8338° Ø',
  directionsBtn:  'Veibeskrivelse fra Bergen →',
  byCarTitle:     'Med bil',
  byCar:          'Fra Bergen tar turen 6.5 til 7 timer, litt avhengig av trafikk og om du treffer på ferjen(e). Google maps er din venn.',
  noCarTitle:     'Uten bil',
  noCar:          'Bruk gjerne Discord til å koordinere felles transport. Vi vet allerede om noen som kommer med fly til Kjevik',
  mapCaption:     'Klikk på markøren for Google Maps navigering',
}

// --- Parkering ---
export const PARKING = {
  title:    'Parkering',
  subtitle: 'Det er lite parkering i nærheten av hytta. Biler parkeres i Farsund by, og så ordner vi transport derfra ut til hytta',
  tipTitle: '🚗 Tips:',
  tip1:     'Det er mulig å kjøre nesten frem til hytta, slippe av folk og bagasje, og deretter kjøre tilbake til Farsund for å parkere. Det er 5 minutters gange fra parkeringsplassen til hytta',
  tip2:     'Transport mellom Farsund og hytta blir mest sannsynlig med båt. Mer info om dette kommer',
  mapsLabel: '📍 Vis i Google Maps →',
  options: [
    {
      icon: '🏬',
      name: 'Senteret i Farsund',
      details: [
        { label: 'Kapasitet',  value: 'Stor parkeringsplass' },
        { label: 'Varighet',   value: 'Hele helgen' },
        { label: 'Elbillader', value: 'Ja ⚡' },
      ],
      note:   'Beste alternativet for de fleste. Stort parkeringsanlegg ved kjøpesenteret. Man kan parkere gratis på de hvite feltene. De gule tilhører senteret',
      mapUrl: 'https://maps.app.goo.gl/x75zczvKHeH8ZUPK7',
    },
    {
      icon: '🏘️',
      name: 'Enebolig i Farsund',
      details: [
        { label: 'Kapasitet',  value: '8–10 biler' },
        { label: 'Varighet',   value: 'Hele helgen' },
        { label: 'Elbillader', value: 'Nei' },
      ],
      note:   'Praktisk for de som overnatter i eneboligen',
      mapUrl: 'https://maps.app.goo.gl/GuCLargTyf5LDrSg7',
    },
  ],
}

// --- Overnatting ---
export const SLEEPING = {
  title:    'Overnatting',
  subtitle: 'Vi har plass til alle! Dere blir fordelt på fem lokasjoner.',
  searchTitle:       'Finn din soveplass',
  searchPlaceholder: 'Skriv inn navnet ditt...',
  searchHit:         (name: string, location: string, icon: string) =>
                       `${name} sover i ${location} ${icon}`,
  searchMiss:        'Fant ikke noen med dette navnet, har du glemt å melde deg på!?',
  mapsLabel:         '📍 Vis i Google Maps →',
  locations: [
    {
      icon: '🏠',
      name: 'Annekset',
      capacity: 'ca. 10–11 personer',
      totalCapacity: 11,
      mapUrl: 'https://maps.app.goo.gl/dycKm6uXgmJn7Sx78',
      spots: [
        { label: 'Hems',     count: '6 plasser (litt trangt, men veldig hyggelig)' },
        { label: 'Soverom',  count: '2–3 plasser' },
        { label: 'Stuegulv', count: '2 på madrass' },
      ],
      note: null as string | null,
      guests: ['Jørgen', 'Bettina', 'Kjell Arne', 'Ingrid Miljeteig', 'Håvard', 'Ingrid Enge', 'Liv Karin', 'Kari Walle', 'Beate', 'Agnes', 'Jon'],
    },
    {
      icon: '🏡',
      name: 'Hovedhytta',
      capacity: '8 personer',
      totalCapacity: 8,
      mapUrl: 'https://maps.app.goo.gl/6mhuKGEjVa8MiRm7A',
      spots: [
        { label: 'Sengeplasser', count: '8 stk' },
      ],
      note: 'Hovedoppholdsstedet for hele gjengen — ingen gulvsovere her.',
      guests: ['Alma', 'Oline', 'Kari Nordstoga', 'Svein Erik', 'Anne Marie', 'Vibeke', 'Bernt'],
    },
    {
      icon: '🛖',
      name: 'Lånehytte',
      capacity: 'ca. 10 personer',
      totalCapacity: 10,
      mapUrl: 'https://maps.app.goo.gl/YmSBqqNAxovP7WsXA',
      spots: [
        { label: 'Sengeplasser', count: '6 stk' },
        { label: 'Stue',         count: '2 på madrass' },
        { label: 'Vinterhage',   count: '2 på madrass' },
      ],
      note: null as string | null,
      guests: ['Trude', 'Einar', 'Kirsti', 'Ståle', 'Annabelle', 'Christian', 'Frode', 'Siri', 'Erik', 'Anette', 'Heidi', 'Gaute', 'Anders', 'Hilde'],
    },
    {
      icon: '⚓',
      name: 'Båthuset',
      capacity: '2 personer',
      totalCapacity: 2,
      mapUrl: 'https://maps.app.goo.gl/mYfihk454TiB3nCa8',
      spots: [
        { label: 'Madrass', count: '2 plasser' },
      ],
      note: 'Meld deg frivillig! Du sover med bølgeskvulp som lydkulisse. Eksklusivt for de som vet å sette pris på det.',
      guests: [],
    },
    {
      icon: '🏘️',
      name: 'Enebolig i Farsund',
      capacity: '15–20+ personer',
      totalCapacity: 20,
      mapUrl: 'https://maps.app.goo.gl/GuCLargTyf5LDrSg7',
      spots: [
        { label: 'Sengeplasser',      count: '15 stk' },
        { label: 'Med luftmadrasser', count: 'Enkelt å utvide til 20+' },
        { label: 'Anneks ved sjøen',  count: '3 av plassene ligger her' },
      ],
      note: 'Ligger i Farsund by. De som sover her blir plukket opp til båtturen lørdag morgen.',
      guests: ['Kjersti Power', 'Øystein Power', 'Geir', 'Ragnhild Nordenborg', 'Tor Erik', 'Christine', 'Lennart', 'Torunn', 'Synnøve', 'Toli', 'Ragnhild Muriaas', 'Lovise', 'Hildegunn', 'Ronny', 'Linda', 'Stig', 'Lilly Ann', 'Tom-Ivar', 'Lea', 'Benjamin'],
    },
  ],
}

// --- Husk å ta med ---
export const PACK = {
  title: 'Husk å ta med',
  mustHaveTitle: '✅ Må ha med',
  mustHaveItems: [
    'Laken + sovepose <strong>eller</strong> dyne. Vi har noen dyner, men langt fra nok til alle',
    'Vi er avhengige av at noen tar med <strong>luftmadrasser</strong>. Mer info om dette kommer',
  ],
  niceToHaveTitle: '👍 Greit å ta med',
  niceToHaveItems: [
    'Badetøy og håndkle',
    'Solkrem og solbriller',
    'Varme klær til kveldene',
    'Muligens regntøy (sjekk værmeldingen her på siden)',
    'Egne drikkevarer utover det vi tilbyr',
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
          note:  'Kom når du kan. Gi en lyd når du vet omtrent ankomstid, så finner vi ut av logistikken.',
        },
        {
          time:  'Hele kvelden',
          label: '🍔 Hamburger fra grillen',
          note:  'Selvkomponerte burgere fra grillen serveres løpende hele kvelden. Det blir mingling og kos.',
        },
        {
          time:  'Fra klokken 20:55',
          label: '⚽ Norge vs. Frankrike på prosjektor',
          note:  'VM-åpningskampen vises utendørs på prosjektor for de som ønsker det.',
        },
      ],
    },
    {
      day: 'Lørdag 27. juni',
      events: [
        {
          time:  '09:00',
          label: '🍳 Frokost på hytta',
          note:  'De som bor i byen må pakke med seg klær for hele dagen.',
        },
        {
          time:  'Ca. 11:00',
          label: '⚓ Båttur',
          note:  'Vi drar ut i Farsunds vakre skjærgård på en liten rundtur. Været avgjør hvor langt og hvor lenge. Det blir enkel servering og drikke underveis.. Ta med badetøy, håndkle og klær etter været.',
        },
        {
          time:  'Ca: 16:00',
          label: 'Tilbake på hytta',
          note:  'Avslapning og kos.',
        },
        {
          time:  'Kvelden',
          label: '🍽️ Middag, underholdning og fest',
          note:  'Sørlandsmeny med ræg og krabber. Litt tapas blir det også. Nattmat serveres når det mørkner.',
        },
      ],
    },
    {
      day: 'Søndag 28. juni',
      events: [
        {
          time:  'Sen frokost på hytta for de som vil',
          label: '🚶 Åpent program',
          note:  '',
        },
        {
          time:  '+/- 13:00',
          label: '🚶 Åpent program',
          note:  'Guidet tur i Farsund sentrum for de som har lyst til det.',
        },
        {
          time:  'Hele dagen',
          label: '',
          note:  'Gjør akkurat som du selv ønsker. Dra når du vil, bli så lenge du vil. Ingen fasit på søndagen. ',
        },
      ],
    },
  ],
}

// --- Vær ---
export const WEATHER = {
  title:      'Været i Farsund',
  subtitle:   'Her er oppdatert varsel fra Yr — direkte fra',
  yrLinkText: 'yr.no',
  fullForecastBtn: 'Se full 10-dagers varsel på Yr.no →',
  credit:     'Værdata levert av',
  creditLink: 'Yr.no',
  creditSuffix: '/ Meteorologisk institutt',
  dropdownTitle: 'Farsund — 5 dager',
  meteogramLink: 'Se meteogram ↓',
}

// --- Discord ---
export const DISCORD = {
  inviteUrl: 'https://discord.gg/SZ7qBrVXdz',
  label:     'Discord',
  navLabel:  'Chat 💬',
  footerLabel: 'Bli med i Discord-chatten vår',
  footerBtn:   'Åpne Discord →',
}

// --- Footer ---
export const FOOTER = {
  tagline:  `${SITE_TITLE} — vi gleder oss!`,
  contact:  'Spørsmål, innspill eller bare vil si at du gleder deg? Send melding til Vibeke eller Bernt.',
}
