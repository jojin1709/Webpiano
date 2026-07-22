/**
 * Core music-theory + keyboard-mapping utilities used across the piano app.
 * All note names use scientific pitch notation, e.g. "C4", "F#5", "Bb3".
 */

export const NOTE_NAMES = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
] as const;

export type NoteName = (typeof NOTE_NAMES)[number];

/** Returns true if the given note (e.g. "C#4") is a black key. */
export function isBlackKey(note: string): boolean {
  return note.includes("#");
}

/** MIDI note number for a note like "C4" (MIDI 60 = C4, following Tone.js convention). */
export function noteToMidi(note: string): number {
  const match = note.match(/^([A-G]#?)(-?\d+)$/);
  if (!match) return 60;
  const [, name, octaveStr] = match;
  const idx = NOTE_NAMES.indexOf(name as NoteName);
  const octave = parseInt(octaveStr, 10);
  return (octave + 1) * 12 + idx;
}

export function midiToNote(midi: number): string {
  const octave = Math.floor(midi / 12) - 1;
  const name = NOTE_NAMES[midi % 12];
  return `${name}${octave}`;
}

/** Generates an ordered array of note names between two MIDI numbers (inclusive). */
export function noteRange(startMidi: number, endMidi: number): string[] {
  const notes: string[] = [];
  for (let m = startMidi; m <= endMidi; m++) notes.push(midiToNote(m));
  return notes;
}

export type PianoSize = 49 | 61 | 88;

/** Returns the [startMidi, endMidi] range for a given piano size, centered around C4 (MIDI 60). */
export function rangeForSize(size: PianoSize): [number, number] {
  switch (size) {
    case 88:
      return [21, 108]; // A0 - C8
    case 61:
      return [36, 96]; // C2 - C7
    case 49:
    default:
      return [36, 84]; // C2 - C6
  }
}

/**
 * Computer-keyboard -> note mapping, laid out across two rows so a full two-octave
 * span is reachable without modifier keys. Row 1 (lower octave): Z row + A row hybrid
 * as specified in the product brief; Row 2 (upper octave): Q row for the next octave up.
 * The mapping is relative to a selectable base octave (see PianoContext).
 */
export const KEY_TO_SEMITONE: Record<string, number> = {
  // Lower octave — home row
  a: 0, // C
  w: 1, // C#
  s: 2, // D
  e: 3, // D#
  d: 4, // E
  f: 5, // F
  t: 6, // F#
  g: 7, // G
  y: 8, // G#
  h: 9, // A
  u: 10, // A#
  j: 11, // B
  k: 12, // C (next octave)
  o: 13, // C#
  l: 14, // D
  p: 15, // D#
  ";": 16, // E
  // Upper octave — number row, one octave above the home row
  "1": 12,
  q: 13,
  "2": 14,
  z: 15,
  "3": 16,
  x: 17,
  "4": 18,
  c: 19,
  "5": 20,
  v: 21,
  "6": 22,
  b: 23,
  "7": 24,
};

export function keyToNote(key: string, baseOctave: number, transpose = 0): string | null {
  const semitone = KEY_TO_SEMITONE[key.toLowerCase()];
  if (semitone === undefined) return null;
  const midi = (baseOctave + 1) * 12 + semitone + transpose;
  if (midi < 0 || midi > 127) return null;
  return midiToNote(midi);
}

/** Human-readable label shown on a key (e.g. for the "A" computer key). */
export function labelForKey(key: string): string {
  return key === ";" ? ";" : key.toUpperCase();
}
