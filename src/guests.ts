// Gjestliste — importert fra invitasjonsskjema (kolonne 3 = "Ja")
// Oppdatert: 2026-06-20
// Kolonne 4 = overnatting, mappet til lokasjoner i content.ts

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
  { name: 'Jørgen Nordahl',          sleeping: 'Annekset' },
  { name: 'Bettina Bødtker',         sleeping: 'Annekset' },
  { name: 'Kjell Arne Johannsson',   sleeping: 'Annekset' },
  { name: 'Ingrid Miljeteig',        sleeping: 'Annekset' },
  { name: 'Håvard Enge',             sleeping: 'Annekset' },
  { name: 'Ingrid Drange',           sleeping: 'Annekset' },
  { name: 'Liv Karin Thommasen',     sleeping: 'Annekset' },
  { name: 'Kari Walle',              sleeping: 'Annekset' },
  { name: 'Beate Bernes',            sleeping: 'Annekset' },
  { name: 'Agnes Tvinnereim',        sleeping: 'Annekset' },
  { name: 'Jon Tvinnereim',          sleeping: 'Annekset' },

  // --- Hovedhytta ---
  { name: 'Alma Wang',               sleeping: 'Hovedhytta' },
  { name: 'Oline Wang',              sleeping: 'Hovedhytta' },
  { name: 'Kari Nordstoga',          sleeping: 'Hovedhytta' },
  { name: 'Svein Erik Wang',         sleeping: 'Hovedhytta' },
  { name: 'Anne Marie Kaldestad',    sleeping: 'Hovedhytta' },
  { name: 'Vibeke Wang',             sleeping: 'Hovedhytta' },
  { name: 'Bernt Omland',            sleeping: 'Hovedhytta' },

  // --- Lånehytte ---
  { name: 'Trude Grini',             sleeping: 'Lånehytte' },
  { name: 'Einar Fjelldal',          sleeping: 'Lånehytte' },
  { name: 'Kirsti Teigen',           sleeping: 'Lånehytte' },
  { name: 'Ståle Teigen',            sleeping: 'Lånehytte' },
  { name: 'Annabel Ohldieck',        sleeping: 'Lånehytte' },
  { name: 'Christian Ohldieck',      sleeping: 'Lånehytte' },
  { name: 'Frode Halland',           sleeping: 'Lånehytte' },
  { name: 'Siri Fauske',             sleeping: 'Lånehytte' },
  { name: 'Heidi Westli',            sleeping: 'Lånehytte' },
  { name: 'Gaute Westli',            sleeping: 'Lånehytte' },

  // --- Enebolig i Farsund ---
  { name: 'Kjersti Power',           sleeping: 'Enebolig i Farsund' },
  { name: 'Øystein Power',           sleeping: 'Enebolig i Farsund' },
  { name: 'Geir Pedersen',           sleeping: 'Enebolig i Farsund' },
  { name: 'Ragnhild Nordenborg',     sleeping: 'Enebolig i Farsund' },
  { name: 'Lennart Frimannslund',    sleeping: 'Enebolig i Farsund' },
  { name: 'Torunn Strand',           sleeping: 'Enebolig i Farsund' },
  { name: 'Synnøve Misje',           sleeping: 'Enebolig i Farsund' },
  { name: 'Toli Espeland',           sleeping: 'Enebolig i Farsund' },
  { name: 'Ragnhild Muriaas',        sleeping: 'Enebolig i Farsund' },
  { name: 'Lovise Aalen',            sleeping: 'Enebolig i Farsund' },
  { name: 'Hildegunn Adde',          sleeping: 'Enebolig i Farsund' },
  { name: 'Ronny Adde',              sleeping: 'Enebolig i Farsund' },
  { name: 'Linda Lindeberg',         sleeping: 'Enebolig i Farsund' },
  { name: 'Stig Lauvsland',          sleeping: 'Enebolig i Farsund' },
  { name: 'Lilly Ann Jensen',        sleeping: 'Enebolig i Farsund' },
  { name: 'Tom-Ivar Waage Jensen',   sleeping: 'Enebolig i Farsund' },
  { name: 'Lea Vollen',              sleeping: 'Enebolig i Farsund' },
  { name: 'Benjamin Solli',          sleeping: 'Enebolig i Farsund' },
  { name: 'Rob McCann',              sleeping: 'Enebolig i Farsund' },
  { name: 'Thomas Caldwell',         sleeping: 'Enebolig i Farsund' },
]

export const GUEST_COUNT = GUESTS.length
