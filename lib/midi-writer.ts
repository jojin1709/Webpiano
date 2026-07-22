import { noteToMidi } from "./note-utils";

export interface RecordedEvent {
  note: string;
  /** seconds from recording start */
  startTime: number;
  /** seconds from recording start */
  endTime: number;
  velocity: number; // 0..1
}

function writeVarLen(value: number): number[] {
  let buffer = value & 0x7f;
  const bytes: number[] = [];
  // eslint-disable-next-line no-cond-assign
  while ((value >>= 7)) {
    buffer <<= 8;
    buffer |= 0x80;
    buffer += value & 0x7f;
  }
  while (true) {
    bytes.push(buffer & 0xff);
    if (buffer & 0x80) buffer >>= 8;
    else break;
  }
  return bytes;
}

function u32(n: number): number[] {
  return [(n >> 24) & 0xff, (n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff];
}

function u16(n: number): number[] {
  return [(n >> 8) & 0xff, n & 0xff];
}

/** Builds a minimal, valid Standard MIDI File (format 0) from a list of note events. */
export function buildMidiFile(events: RecordedEvent[], bpm = 120): Blob {
  const ticksPerBeat = 480;
  const secondsPerTick = 60 / bpm / ticksPerBeat;

  type RawEvent = { tick: number; type: "on" | "off"; note: number; velocity: number };
  const raw: RawEvent[] = [];
  events.forEach((e) => {
    const midi = noteToMidi(e.note);
    raw.push({ tick: Math.round(e.startTime / secondsPerTick), type: "on", note: midi, velocity: Math.round(e.velocity * 127) });
    raw.push({ tick: Math.round(e.endTime / secondsPerTick), type: "off", note: midi, velocity: 0 });
  });
  raw.sort((a, b) => a.tick - b.tick);

  const trackBytes: number[] = [];
  // Tempo meta event
  const microsPerBeat = Math.round(60000000 / bpm);
  trackBytes.push(0x00, 0xff, 0x51, 0x03, (microsPerBeat >> 16) & 0xff, (microsPerBeat >> 8) & 0xff, microsPerBeat & 0xff);

  let lastTick = 0;
  raw.forEach((e) => {
    const delta = Math.max(0, e.tick - lastTick);
    lastTick = e.tick;
    trackBytes.push(...writeVarLen(delta));
    if (e.type === "on") {
      trackBytes.push(0x90, e.note & 0x7f, e.velocity & 0x7f);
    } else {
      trackBytes.push(0x80, e.note & 0x7f, 0x40);
    }
  });
  // End of track
  trackBytes.push(0x00, 0xff, 0x2f, 0x00);

  const header = [
    0x4d, 0x54, 0x68, 0x64, // "MThd"
    ...u32(6),
    ...u16(0), // format 0
    ...u16(1), // one track
    ...u16(ticksPerBeat),
  ];

  const track = [0x4d, 0x54, 0x72, 0x6b /* "MTrk" */, ...u32(trackBytes.length), ...trackBytes];

  const bytes = new Uint8Array([...header, ...track]);
  return new Blob([bytes], { type: "audio/midi" });
}
