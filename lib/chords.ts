import { NOTE_NAMES, noteToMidi } from "./note-utils";

/** Interval fingerprints (semitones from root, sorted) for common chord qualities. */
const CHORD_SHAPES: { name: string; intervals: number[] }[] = [
  { name: "Major", intervals: [0, 4, 7] },
  { name: "Minor", intervals: [0, 3, 7] },
  { name: "Diminished", intervals: [0, 3, 6] },
  { name: "Augmented", intervals: [0, 4, 8] },
  { name: "Sus2", intervals: [0, 2, 7] },
  { name: "Sus4", intervals: [0, 5, 7] },
  { name: "Major 7", intervals: [0, 4, 7, 11] },
  { name: "Minor 7", intervals: [0, 3, 7, 10] },
  { name: "Dominant 7", intervals: [0, 4, 7, 10] },
];

const SCALE_SHAPES: { name: string; intervals: number[] }[] = [
  { name: "Major", intervals: [0, 2, 4, 5, 7, 9, 11] },
  { name: "Natural Minor", intervals: [0, 2, 3, 5, 7, 8, 10] },
  { name: "Major Pentatonic", intervals: [0, 2, 4, 7, 9] },
  { name: "Minor Pentatonic", intervals: [0, 3, 5, 7, 10] },
  { name: "Blues", intervals: [0, 3, 5, 6, 7, 10] },
  { name: "Dorian", intervals: [0, 2, 3, 5, 7, 9, 10] },
];

export interface ChordMatch {
  root: string;
  quality: string;
  label: string;
}

function pitchClassesFromNotes(notes: string[]): number[] {
  const set = new Set(notes.map((note) => noteToMidi(note) % 12));
  return Array.from(set).sort((a, b) => a - b);
}

/** Detects a chord from the currently-held notes (order-independent, any octave). */
export function detectChord(notes: string[]): ChordMatch | null {
  if (notes.length < 3) return null;
  const classes = pitchClassesFromNotes(notes);

  for (const rootPc of classes) {
    const relative = classes
      .map((pc) => (pc - rootPc + 12) % 12)
      .sort((a, b) => a - b);

    for (const shape of CHORD_SHAPES) {
      const shapeSet = [...shape.intervals].sort((a, b) => a - b);
      if (
        relative.length === shapeSet.length &&
        relative.every((v, i) => v === shapeSet[i])
      ) {
        const rootName = NOTE_NAMES[rootPc];
        return {
          root: rootName,
          quality: shape.name,
          label: `${rootName} ${shape.name}`,
        };
      }
    }
  }
  return null;
}

export interface ScaleMatch {
  root: string;
  name: string;
  label: string;
}

/** Detects the closest matching scale from a set of played (non-chordal) notes. */
export function detectScale(notes: string[]): ScaleMatch | null {
  const classes = pitchClassesFromNotes(notes);
  if (classes.length < 5) return null;

  let best: ScaleMatch | null = null;
  let bestScore = -1;

  for (let rootPc = 0; rootPc < 12; rootPc++) {
    const relative = new Set(classes.map((pc) => (pc - rootPc + 12) % 12));
    for (const shape of SCALE_SHAPES) {
      const shapeSet = new Set(shape.intervals);
      let matches = 0;
      relative.forEach((v) => {
        if (shapeSet.has(v)) matches++;
      });
      const score = matches / Math.max(shapeSet.size, relative.size);
      if (matches === relative.size && score > bestScore) {
        bestScore = score;
        best = {
          root: NOTE_NAMES[rootPc],
          name: shape.name,
          label: `${NOTE_NAMES[rootPc]} ${shape.name}`,
        };
      }
    }
  }
  return best;
}
