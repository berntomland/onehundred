// Gjestliste — importert fra invitasjonsskjema (kolonne 3 = "Ja")
// Oppdatert: 2026-05-12
// Kolonne 4 = overnatting, mappet til lokasjoner i content.ts
// OBS: To rader i arket har "power" som navn — ukjente partnere, ikke lagt inn

export type SleepingLocation =
  | 'Annekset'
  | 'Hovedhytta'
  | 'Lånehytte'
  | 'Båthuset'
  | 'Enebolig i Farsund'
  | null

export type Guest = {
  name: string
  sleeping: SleepingLocation
}

export const GUESTS: Guest[] = [
  // --- Annekset ---
  { name: 'Åse',               sleeping: 'Annekset' },
  { name: 'Mike',              sleeping: 'Annekset' },
  { name: 'Siren',             sleeping: 'Annekset' },
  { name: 'Jørgen',            sleeping: 'Annekset' },
  { name: 'Kari Nordstoga',    sleeping: 'Annekset' },

  // --- Hovedhytta ---
  { name: 'Alma',              sleeping: 'Hovedhytta' },
  { name: 'Oline',             sleeping: 'Hovedhytta' },
  { name: 'Njål',              sleeping: 'Hovedhytta' },
  { name: 'Ingrid Enge',       sleeping: 'Hovedhytta' },
  { name: 'Beate',             sleeping: 'Hovedhytta' },
  { name: 'Svein Erik',        sleeping: 'Hovedhytta' },

  // --- Lånehytte ---
  { name: 'Torunn',            sleeping: 'Lånehytte' },
  { name: 'Synnøve',           sleeping: 'Lånehytte' },
  { name: 'Liv',               sleeping: 'Lånehytte' },
  { name: 'Ni',                sleeping: 'Lånehytte' },
  { name: 'Bettina',           sleeping: 'Lånehytte' },
  { name: 'Kjell',             sleeping: 'Lånehytte' },
  { name: 'Arne',              sleeping: 'Lånehytte' },
  { name: 'Ingrid Miljeteig',  sleeping: 'Lånehytte' },
  { name: 'Håvard',            sleeping: 'Lånehytte' },
  { name: 'Øyvind',            sleeping: 'Lånehytte' },
  { name: 'Kari Walle',        sleeping: 'Lånehytte' }, // NB: "Walle"-rad i arket sier Hovedhytta — avklar med arrangør

  // --- Enebolig i Farsund ---
  { name: 'Kjersti Power',     sleeping: 'Enebolig i Farsund' },
  { name: 'Øystein Power',     sleeping: 'Enebolig i Farsund' },
  { name: 'Geir',              sleeping: 'Enebolig i Farsund' },
  { name: 'Ragnhild Nordenborg', sleeping: 'Enebolig i Farsund' },
  { name: 'Tor Erik',          sleeping: 'Enebolig i Farsund' },
  { name: 'Einar',             sleeping: 'Enebolig i Farsund' },
  { name: 'Knut',              sleeping: 'Enebolig i Farsund' },
  { name: 'Kirsti',            sleeping: 'Enebolig i Farsund' },
  { name: 'Ståle',             sleeping: 'Enebolig i Farsund' },
  { name: 'Agnes',             sleeping: 'Enebolig i Farsund' },
  { name: 'Jon',               sleeping: 'Enebolig i Farsund' },
  { name: 'Annabelle',         sleeping: 'Enebolig i Farsund' },
  { name: 'Christian',         sleeping: 'Enebolig i Farsund' },
  { name: 'Frode',             sleeping: 'Enebolig i Farsund' },
  { name: 'Kåre',              sleeping: 'Enebolig i Farsund' },
  { name: 'Hildegunn',         sleeping: 'Enebolig i Farsund' },
  { name: 'Linda',             sleeping: 'Enebolig i Farsund' },

  // --- Ikke tildelt / daggjester ---
  { name: 'Kifle',             sleeping: null }, // Bekreftet, overnatting ukjent
  { name: 'Siri',              sleeping: null }, // Kommer, overnatter ikke
  { name: 'Anette',            sleeping: null }, // Kommer, overnatter ikke
]

export const GUEST_COUNT = GUESTS.length
