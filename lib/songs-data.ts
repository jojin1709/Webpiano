export interface SongNote {
  note: string;
  /** duration in beats, quarter note = 1 */
  beats: number;
}

export interface Song {
  id: string;
  title: string;
  composer: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Master";
  bpm: number;
  notes: SongNote[];
}

const n = (note: string, beats = 1): SongNote => ({ note, beats });

export const SONGS: Song[] = [
  // ===== EASY =====
  {
    id: "happy-birthday",
    title: "Happy Birthday",
    composer: "Traditional",
    difficulty: "Easy",
    bpm: 100,
    notes: [
      n("C4", 0.75), n("C4", 0.25), n("D4", 1), n("C4", 1), n("F4", 1), n("E4", 2),
      n("C4", 0.75), n("C4", 0.25), n("D4", 1), n("C4", 1), n("G4", 1), n("F4", 2),
      n("C4", 0.75), n("C4", 0.25), n("C5", 1), n("A4", 1), n("F4", 1), n("E4", 1), n("D4", 2),
      n("A#4", 0.75), n("A#4", 0.25), n("A4", 1), n("F4", 1), n("G4", 1), n("F4", 2),
    ],
  },
  {
    id: "twinkle-twinkle",
    title: "Twinkle Twinkle Little Star",
    composer: "Traditional",
    difficulty: "Easy",
    bpm: 100,
    notes: [
      n("C4"), n("C4"), n("G4"), n("G4"), n("A4"), n("A4"), n("G4", 2),
      n("F4"), n("F4"), n("E4"), n("E4"), n("D4"), n("D4"), n("C4", 2),
      n("G4"), n("G4"), n("F4"), n("F4"), n("E4"), n("E4"), n("D4", 2),
      n("G4"), n("G4"), n("F4"), n("F4"), n("E4"), n("E4"), n("D4", 2),
      n("C4"), n("C4"), n("G4"), n("G4"), n("A4"), n("A4"), n("G4", 2),
      n("F4"), n("F4"), n("E4"), n("E4"), n("D4"), n("D4"), n("C4", 2),
    ],
  },
  {
    id: "mary-had-little-lamb",
    title: "Mary Had a Little Lamb",
    composer: "Traditional",
    difficulty: "Easy",
    bpm: 110,
    notes: [
      n("E4"), n("D4"), n("C4"), n("D4"), n("E4"), n("E4"), n("E4", 2),
      n("D4"), n("D4"), n("D4", 2), n("E4"), n("G4"), n("G4", 2),
      n("E4"), n("D4"), n("C4"), n("D4"), n("E4"), n("E4"), n("E4"),
      n("E4"), n("D4"), n("D4"), n("E4"), n("D4"), n("C4", 2),
    ],
  },
  {
    id: "jingle-bells",
    title: "Jingle Bells",
    composer: "Traditional",
    difficulty: "Easy",
    bpm: 120,
    notes: [
      n("E4"), n("E4"), n("E4", 2), n("E4"), n("E4"), n("E4", 2),
      n("E4"), n("G4"), n("C4"), n("D4"), n("E4", 4),
      n("F4"), n("F4"), n("F4"), n("F4"), n("F4"), n("E4"), n("E4"),
      n("E4", 0.5), n("E4", 0.5), n("E4"), n("D4"), n("D4"), n("E4"), n("D4"), n("G4", 2),
    ],
  },
  {
    id: "ode-to-joy",
    title: "Ode to Joy",
    composer: "Ludwig van Beethoven",
    difficulty: "Easy",
    bpm: 108,
    notes: [
      n("E4"), n("E4"), n("F4"), n("G4"), n("G4"), n("F4"), n("E4"), n("D4"),
      n("C4"), n("C4"), n("D4"), n("E4"), n("E4", 1.5), n("D4", 0.5), n("D4", 2),
      n("E4"), n("E4"), n("F4"), n("G4"), n("G4"), n("F4"), n("E4"), n("D4"),
      n("C4"), n("C4"), n("D4"), n("E4"), n("D4", 1.5), n("C4", 0.5), n("C4", 2),
    ],
  },
  {
    id: "mary-lamb",
    title: "London Bridge",
    composer: "Traditional",
    difficulty: "Easy",
    bpm: 110,
    notes: [
      n("G4"), n("A4"), n("G4"), n("F4"), n("E4"), n("F4"), n("G4", 2),
      n("D4"), n("E4"), n("F4", 2), n("E4"), n("F4"), n("G4", 2),
      n("G4"), n("A4"), n("G4"), n("F4"), n("E4"), n("F4"), n("G4", 2),
      n("D4"), n("G4"), n("E4"), n("C4", 2),
    ],
  },
  {
    id: "row-your-boat",
    title: "Row, Row, Row Your Boat",
    composer: "Traditional",
    difficulty: "Easy",
    bpm: 100,
    notes: [
      n("C4"), n("C4"), n("C4"), n("D4"), n("E4"), n("E4"),
      n("D4"), n("E4"), n("F4", 2), n("G4", 4),
      n("C5", 0.5), n("C5", 0.5), n("C5", 0.5), n("C5", 0.5), n("C5", 0.5), n("C5", 0.5),
      n("D4", 0.5), n("E4", 0.5), n("F4", 2), n("G4", 4),
    ],
  },
  {
    id: "brahms-lullaby",
    title: "Brahms' Lullaby",
    composer: "Johannes Brahms",
    difficulty: "Easy",
    bpm: 80,
    notes: [
      n("E4", 0.5), n("E4", 0.5), n("G4", 2),
      n("E4", 0.5), n("E4", 0.5), n("G4", 2),
      n("E4", 0.5), n("G4", 0.5), n("C5", 1), n("B4", 1), n("A4", 2),
      n("D4", 0.5), n("D4", 0.5), n("F4", 2),
      n("D4", 0.5), n("D4", 0.5), n("F4", 2),
      n("D4", 0.5), n("F4", 0.5), n("B4", 1), n("A4", 1), n("G4", 2),
    ],
  },
  {
    id: "minuet-in-g",
    title: "Minuet in G",
    composer: "Christian Petzold",
    difficulty: "Easy",
    bpm: 100,
    notes: [
      n("D5"), n("G4"), n("A4"), n("B4"), n("C5"), n("D5"), n("G4"), n("G4"),
      n("E5"), n("C5"), n("D5"), n("E5"), n("F#5"), n("G5"), n("G4"), n("G4"),
      n("G5"), n("D5"), n("E5"), n("F#5"), n("G5"), n("D5"), n("E5"), n("D5"),
      n("C5"), n("A4"), n("B4"), n("C5"), n("D5"), n("E5"), n("C5"), n("B4"),
    ],
  },
  {
    id: "amazing-grace",
    title: "Amazing Grace",
    composer: "John Newton",
    difficulty: "Easy",
    bpm: 80,
    notes: [
      n("D4", 2), n("G4", 1.5), n("B4", 0.5), n("G4", 1), n("B4", 1),
      n("A4", 2), n("G4", 1.5), n("E4", 0.5), n("D4", 1), n("D4", 1),
      n("G4", 2), n("B4", 1.5), n("A4", 0.5), n("G4", 1), n("B4", 1),
      n("A4", 2), n("G4", 1.5), n("E4", 0.5), n("D4", 1), n("G4", 1),
      n("D4", 2), n("B3", 1.5), n("D4", 0.5), n("G4", 2),
    ],
  },

  // ===== MEDIUM =====
  {
    id: "canon-in-d",
    title: "Canon in D (Bass Line)",
    composer: "Johann Pachelbel",
    difficulty: "Medium",
    bpm: 90,
    notes: [
      n("D3", 1), n("A3", 1), n("B3", 1), n("F#3", 1),
      n("G3", 1), n("D3", 1), n("G3", 1), n("A3", 1),
      n("D3", 1), n("A3", 1), n("B3", 1), n("F#3", 1),
      n("G3", 1), n("D3", 1), n("G3", 1), n("A3", 1),
    ],
  },
  {
    id: "harry-potter",
    title: "Hedwig's Theme (Excerpt)",
    composer: "John Williams",
    difficulty: "Medium",
    bpm: 110,
    notes: [
      n("B4", 1), n("E5", 1.5), n("G5", 0.5), n("F#5", 2),
      n("E5", 1.5), n("B5", 0.5), n("A5", 2),
      n("F#5", 1.5), n("E5", 0.5), n("G5", 1), n("F#5", 1), n("D#5", 2),
    ],
  },
  {
    id: "interstellar",
    title: "Interstellar (Main Theme)",
    composer: "Hans Zimmer",
    difficulty: "Medium",
    bpm: 90,
    notes: [
      n("C4", 1), n("G4", 1), n("A4", 1), n("G4", 1),
      n("F4", 1), n("C4", 1), n("D4", 1), n("C4", 2),
      n("C4", 1), n("G4", 1), n("A4", 1), n("G4", 1),
      n("F4", 1), n("A4", 1), n("G4", 2),
    ],
  },
  {
    id: "river-flows-in-you",
    title: "River Flows in You",
    composer: "Yiruma",
    difficulty: "Medium",
    bpm: 76,
    notes: [
      n("F#4", 0.5), n("A4", 0.5), n("B4", 0.5), n("A4", 0.5), n("F#4", 0.5), n("A4", 0.5), n("B4", 0.5), n("A4", 0.5),
      n("F#4", 0.5), n("A4", 0.5), n("B4", 0.5), n("A4", 0.5), n("F#4", 0.5), n("A4", 0.5), n("B4", 1),
      n("A4", 0.5), n("F#4", 0.5), n("A4", 0.5), n("B4", 0.5), n("A4", 0.5), n("F#4", 0.5), n("D4", 0.5), n("E4", 0.5),
      n("F#4", 1), n("E4", 1), n("D4", 1), n("E4", 1),
    ],
  },
  {
    id: "claire-de-lune",
    title: "Clair de Lune (Excerpt)",
    composer: "Claude Debussy",
    difficulty: "Medium",
    bpm: 66,
    notes: [
      n("D#5", 1), n("C5", 1), n("A#4", 1), n("F4", 1),
      n("G4", 1), n("A#4", 1), n("C5", 1), n("D#5", 1),
      n("F5", 1), n("D#5", 1), n("C5", 1), n("A#4", 1),
      n("F4", 2), n("D#4", 2),
    ],
  },
  {
    id: "clocks",
    title: "Clocks",
    composer: "Coldplay",
    difficulty: "Medium",
    bpm: 131,
    notes: [
      n("D#5", 0.5), n("A#4", 0.5), n("F4", 0.5), n("D#5", 0.5), n("A#4", 0.5), n("F4", 0.5),
      n("D5", 0.5), n("A#4", 0.5), n("F4", 0.5), n("D5", 0.5), n("A#4", 0.5), n("F4", 0.5),
      n("C5", 0.5), n("G4", 0.5), n("D#4", 0.5), n("C5", 0.5), n("G4", 0.5), n("D#4", 0.5),
      n("D#5", 0.5), n("A#4", 0.5), n("F4", 0.5), n("D#5", 0.5), n("A#4", 0.5), n("F4", 0.5),
    ],
  },
  {
    id: "moonlight-sonata-1st",
    title: "Moonlight Sonata (1st Mvt Theme)",
    composer: "Ludwig van Beethoven",
    difficulty: "Medium",
    bpm: 60,
    notes: [
      n("G#4", 0.5), n("C#5", 0.5), n("E5", 0.5), n("G#4", 0.5), n("C#5", 0.5), n("E5", 0.5),
      n("G#4", 0.5), n("C#5", 0.5), n("E5", 0.5), n("G#4", 0.5), n("C#5", 0.5), n("E5", 0.5),
      n("G#4", 0.5), n("C#5", 0.5), n("E5", 0.5), n("G#4", 0.5), n("C#5", 0.5), n("E5", 0.5),
      n("A4", 0.5), n("C#5", 0.5), n("E5", 0.5), n("A4", 0.5), n("C#5", 0.5), n("E5", 0.5),
    ],
  },

  // ===== HARD =====
  {
    id: "fur-elise",
    title: "Für Elise (Opening)",
    composer: "Ludwig van Beethoven",
    difficulty: "Hard",
    bpm: 120,
    notes: [
      n("E5", 0.5), n("D#5", 0.5), n("E5", 0.5), n("D#5", 0.5), n("E5", 0.5),
      n("B4", 0.5), n("D5", 0.5), n("C5", 0.5), n("A4", 1),
      n("C4", 0.5), n("E4", 0.5), n("A4", 0.5), n("B4", 1),
      n("E4", 0.5), n("G#4", 0.5), n("B4", 0.5), n("C5", 1),
      n("E5", 0.5), n("D#5", 0.5), n("E5", 0.5), n("D#5", 0.5), n("E5", 0.5),
      n("B4", 0.5), n("D5", 0.5), n("C5", 0.5), n("A4", 1),
    ],
  },
  {
    id: "pirates",
    title: "He's a Pirate (Excerpt)",
    composer: "Klaus Badelt",
    difficulty: "Hard",
    bpm: 140,
    notes: [
      n("A4", 0.5), n("C5", 0.5), n("D5", 0.5), n("D5", 0.25), n("E5", 0.25), n("F5", 0.5),
      n("D5", 0.5), n("D5", 0.5), n("C5", 0.5), n("E5", 0.5),
      n("A4", 0.5), n("C5", 0.5), n("D5", 0.5), n("D5", 0.25), n("E5", 0.25), n("F5", 0.5),
      n("D5", 0.5), n("C5", 0.5), n("D5", 1.5),
    ],
  },
  {
    id: "moonlight-sonata",
    title: "Moonlight Sonata (Opening)",
    composer: "Ludwig van Beethoven",
    difficulty: "Hard",
    bpm: 60,
    notes: [
      n("C#3", 2), n("G#3", 2), n("C#4", 2), n("E4", 2),
      n("C#3", 2), n("G#3", 2), n("C#4", 2), n("E4", 2),
      n("B2", 2), n("G#3", 2), n("C#4", 2), n("E4", 2),
      n("A2", 2), n("F#3", 2), n("C#4", 2), n("E4", 2),
    ],
  },
  {
    id: "star-wars",
    title: "Star Wars Main Theme",
    composer: "John Williams",
    difficulty: "Hard",
    bpm: 108,
    notes: [
      n("G4", 1), n("G4", 1), n("G4", 1), n("D#5", 1.5), n("A#4", 0.5),
      n("G5", 1.5), n("D#5", 0.5), n("A#4", 1), n("G5", 2),
      n("D5", 1.5), n("D5", 0.5), n("D5", 1), n("D#5", 1.5), n("A#4", 0.5),
      n("G5", 1.5), n("D#5", 0.5), n("A#4", 1), n("G5", 2),
    ],
  },
  {
    id: "nokia-ringtone",
    title: "Nokia Ringtone",
    composer: "Traditional",
    difficulty: "Hard",
    bpm: 140,
    notes: [
      n("E5", 0.5), n("D5", 0.5), n("F#4", 0.5), n("G#4", 0.5),
      n("C#5", 0.5), n("B4", 0.5), n("D4", 0.5), n("E4", 0.5),
      n("B4", 0.5), n("A4", 0.5), n("C#4", 0.5), n("E4", 0.5),
      n("A4", 2),
    ],
  },
  {
    id: "take-on-me",
    title: "Take On Me",
    composer: "a-ha",
    difficulty: "Hard",
    bpm: 169,
    notes: [
      n("F#5", 0.5), n("F#5", 0.5), n("E5", 0.5), n("D5", 0.5),
      n("F#5", 0.5), n("F#5", 0.5), n("E5", 0.5), n("D5", 0.5),
      n("F#5", 0.5), n("F#5", 0.5), n("E5", 0.5), n("D5", 0.5),
      n("F#5", 0.5), n("F#5", 0.5), n("E5", 0.5), n("D5", 0.5),
    ],
  },

  // ===== MASTER =====
  {
    id: "flight-of-bumblebee",
    title: "Flight of the Bumblebee",
    composer: "Nikolai Rimsky-Korsakov",
    difficulty: "Master",
    bpm: 180,
    notes: [
      n("B4", 0.25), n("A#4", 0.25), n("B4", 0.25), n("A#4", 0.25), n("B4", 0.25), n("G#4", 0.25), n("B4", 0.25), n("E4", 0.25),
      n("G#4", 0.25), n("F#4", 0.25), n("G#4", 0.25), n("F#4", 0.25), n("G#4", 0.25), n("E4", 0.25), n("G#4", 0.25), n("C#4", 0.25),
      n("E4", 0.25), n("D#4", 0.25), n("E4", 0.25), n("D#4", 0.25), n("E4", 0.25), n("B3", 0.25), n("D4", 0.25), n("C#4", 0.25),
      n("D4", 0.25), n("C#4", 0.25), n("D4", 0.25), n("B3", 0.25), n("D4", 0.25), n("A#3", 0.25), n("B3", 0.5),
    ],
  },
  {
    id: "chopin-nocturne",
    title: "Nocturne Op.9 No.2 (Theme)",
    composer: "Frédéric Chopin",
    difficulty: "Master",
    bpm: 60,
    notes: [
      n("D#5", 0.5), n("F5", 0.5), n("G#5", 1), n("F5", 0.5), n("D#5", 0.5),
      n("C5", 0.5), n("D#5", 0.5), n("F5", 1), n("D#5", 0.5), n("C5", 0.5),
      n("A#4", 0.5), n("C5", 0.5), n("D#5", 1), n("C5", 0.5), n("A#4", 0.5),
      n("G#4", 0.5), n("A#4", 0.5), n("C5", 1), n("A#4", 0.5), n("G#4", 0.5),
    ],
  },
  {
    id: "turkish-march",
    title: "Turkish March",
    composer: "Wolfgang Amadeus Mozart",
    difficulty: "Master",
    bpm: 144,
    notes: [
      n("B4", 0.5), n("A4", 0.25), n("G#4", 0.25), n("A4", 0.5), n("C5", 1),
      n("D5", 0.5), n("C5", 0.25), n("B4", 0.25), n("C5", 0.5), n("E5", 1),
      n("F5", 0.5), n("E5", 0.25), n("D#5", 0.25), n("E5", 0.5), n("B5", 0.5), n("A5", 0.5),
      n("G#5", 0.5), n("A5", 0.5), n("B5", 0.5), n("A5", 0.5), n("G#5", 0.5), n("A5", 0.5), n("B5", 0.5), n("A5", 0.5),
    ],
  },
  {
    id: "entertainer",
    title: "The Entertainer",
    composer: "Scott Joplin",
    difficulty: "Master",
    bpm: 72,
    notes: [
      n("D5", 0.25), n("D#5", 0.25), n("E5", 0.25), n("C6", 0.25), n("E5", 0.25), n("C6", 0.25), n("E5", 0.25), n("C6", 0.25),
      n("C6", 1), n("D5", 0.25), n("D#5", 0.25), n("E5", 0.25), n("C6", 0.25), n("E5", 0.25), n("C6", 0.25), n("E5", 0.25),
      n("A5", 1), n("G5", 0.25), n("E5", 0.25), n("C#5", 0.25), n("A5", 0.25), n("G5", 0.25), n("E5", 0.25), n("C#5", 0.25), n("A4", 0.25),
    ],
  },
  {
    id: "la-vie-en-rose",
    title: "La Vie en Rose",
    composer: "Édith Piaf",
    difficulty: "Master",
    bpm: 76,
    notes: [
      n("C4", 0.5), n("D4", 0.5), n("E4", 0.5), n("G4", 1), n("E4", 0.5), n("C4", 0.5),
      n("G3", 1), n("C4", 1), n("E4", 0.5), n("G4", 0.5), n("A4", 1), n("G4", 0.5), n("E4", 0.5),
      n("C4", 1), n("E4", 0.5), n("D4", 0.5), n("C4", 1), n("D4", 1),
      n("E4", 0.5), n("G4", 1), n("E4", 0.5), n("C4", 0.5), n("A3", 1), n("C4", 1),
    ],
  },
];
