// Gjestliste — importert fra invitasjonsskjema (kolonne 3 = "Ja")
// Oppdatert: 2026-05-12
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
  { name: 'Jørgen',            sleeping: 'Annekset' },
  { name: 'Bettina',           sleeping: 'Annekset' },
  { name: 'Kjell Arne',        sleeping: 'Annekset' },
  { name: 'Ingrid Miljeteig',  sleeping: 'Annekset' },
  { name: 'Håvard',            sleeping: 'Annekset' },
  { name: 'Ingrid Enge',       sleeping: 'Annekset' },
  { name: 'Liv Karin',         sleeping: 'Annekset' },
  { name: 'Kari Walle',        sleeping: 'Annekset' },
  { name: 'Beate',             sleeping: 'Annekset' },
  { name: 'Agnes',             sleeping: 'Annekset' },
  { name: 'Jon',               sleeping: 'Annekset' },

  // --- Hovedhytta ---
  { name: 'Alma',              sleeping: 'Hovedhytta' },
  { name: 'Oline',             sleeping: 'Hovedhytta' },
  { name: 'Kari Nordstoga',    sleeping: 'Hovedhytta' },
  { name: 'Anders',            sleeping: 'Lånehytte' },
  { name: 'Hilde',             sleeping: 'Lånehytte' },
  { name: 'Svein Erik',        sleeping: 'Hovedhytta' },
  { name: 'Anne Marie',        sleeping: 'Hovedhytta' },
  { name: 'Vibeke',            sleeping: 'Hovedhytta' },
  { name: 'Bernt',             sleeping: 'Hovedhytta' },

  // --- Lånehytte ---
  { name: 'Trude',             sleeping: 'Lånehytte' },
  { name: 'Einar',             sleeping: 'Lånehytte' },
  { name: 'Kirsti',            sleeping: 'Lånehytte' },
  { name: 'Ståle',             sleeping: 'Lånehytte' },
  { name: 'Annabelle',         sleeping: 'Lånehytte' },
  { name: 'Christian',         sleeping: 'Lånehytte' },
  { name: 'Frode',             sleeping: 'Lånehytte' },
  { name: 'Siri',              sleeping: 'Lånehytte' },
  { name: 'Erik',              sleeping: 'Lånehytte' },
  { name: 'Anette',            sleeping: 'Lånehytte' },
  { name: 'Heidi',             sleeping: 'Lånehytte' },
  { name: 'Gaute',             sleeping: 'Lånehytte' },

  // --- Enebolig i Farsund ---
  { name: 'Kjersti Power',     sleeping: 'Enebolig i Farsund' },
  { name: 'Øystein Power',     sleeping: 'Enebolig i Farsund' },
  { name: 'Geir',              sleeping: 'Enebolig i Farsund' },
  { name: 'Ragnhild Nordenborg', sleeping: 'Enebolig i Farsund' },
  { name: 'Tor Erik',          sleeping: 'Enebolig i Farsund' },
  { name: 'Christine',         sleeping: 'Enebolig i Farsund' },
  { name: 'Lennart',           sleeping: 'Enebolig i Farsund' },
  { name: 'Torunn',            sleeping: 'Enebolig i Farsund' },
  { name: 'Synnøve',           sleeping: 'Enebolig i Farsund' },
  { name: 'Toli',              sleeping: 'Enebolig i Farsund' },
  { name: 'Ragnhild Muriaas',  sleeping: 'Enebolig i Farsund' },
  { name: 'Lovise',            sleeping: 'Enebolig i Farsund' },
  { name: 'Hildegunn',         sleeping: 'Enebolig i Farsund' },
  { name: 'Ronny',             sleeping: 'Enebolig i Farsund' },
  { name: 'Linda',             sleeping: 'Enebolig i Farsund' },
  { name: 'Stig',              sleeping: 'Enebolig i Farsund' },
  { name: 'Lilly Ann',         sleeping: 'Enebolig i Farsund' },
  { name: 'Tom-Ivar',          sleeping: 'Enebolig i Farsund' },
  { name: 'Lea',               sleeping: 'Enebolig i Farsund' },
  { name: 'Benjamin',          sleeping: 'Enebolig i Farsund' },
]

export const GUEST_COUNT = GUESTS.length
