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
    title: "Interstellar (Main Theme Excerpt)",
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
    difficulty: "Master",
    bpm: 60,
    notes: [
      n("C#3", 2), n("G#3", 2), n("C#4", 2), n("E4", 2),
      n("C#3", 2), n("G#3", 2), n("C#4", 2), n("E4", 2),
      n("B2", 2), n("G#3", 2), n("C#4", 2), n("E4", 2),
      n("A2", 2), n("F#3", 2), n("C#4", 2), n("E4", 2),
    ],
  },
];

export function findSong(id: string): Song | undefined {
  return SONGS.find((s) => s.id === id);
}
