# Web Piano

A premium, browser-based piano. Play with your computer keyboard, mouse, or touchscreen, learn
real songs, practice with live scoring, detect chords and scales in real time, and record and
export your performances — all client-side, no backend required.

Built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and
**Tone.js**.

## Features

- **Realistic audio** — sampled grand piano via Tone.js, with a synthesized fallback if samples
  can't load
- **Full keyboard support** — computer-keyboard-to-note mapping across two octaves, multi-key
  chords, sustain pedal (hold <kbd>Space</kbd>)
- **Switchable piano size** — 49 / 61 / 88 keys
- **Chord & scale detector** — recognizes major, minor, diminished, augmented, sus2/4, and 7th
  chords, plus major, minor, pentatonic, blues, and dorian scales
- **Song library** — 8 songs (Happy Birthday, Twinkle Twinkle, Für Elise, Canon in D, Hedwig's
  Theme, Interstellar, He's a Pirate, Moonlight Sonata) with searchable list and demo playback
- **Practice mode** — play-along scoring with accuracy, missed notes, and elapsed time, filterable
  by difficulty
- **Learn mode** — six guided interactive lessons from white keys to your first chord and song
- **Recorder** — record, play back, rename, delete, and export recordings as standard MIDI files
- **Full control panel** — volume, octave, transpose, tempo, metronome, key labels, fullscreen
- **Dark / light / system theme**
- **Fully responsive**, accessible (ARIA labels, visible focus states, keyboard navigable), and
  SEO-complete (Open Graph, Twitter cards, sitemap, robots, structured data)

## Keyboard shortcuts

| Key | Note | Key | Note |
| --- | ---- | --- | ---- |
| A | C | K | C (next octave) |
| W | C# | O | C# |
| S | D | L | D |
| E | D# | P | D# |
| D | E | ; | E |
| F | F | | |
| T | F# | | |
| G | G | | |
| Y | G# | | |
| H | A | | |
| U | A# | | |
| J | B | | |

The number row (1–7) plus Q/Z/X/C/V/B mirrors the same pattern one octave higher. Hold
<kbd>Space</kbd> for the sustain pedal. Adjust **Octave** and **Transpose** in the control bar to
shift the whole mapping up or down.

## Getting started

### Prerequisites

- Node.js 18.18+ (or 20+)
- npm (or pnpm/yarn)

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm start
```

## Deployment (Vercel)

This project requires **no environment variables and no backend**. To deploy:

1. Push this repository to GitHub.
2. Import it into [Vercel](https://vercel.com/new).
3. Vercel auto-detects Next.js — click **Deploy**.

That's it. Piano samples are fetched client-side from a public audio CDN on first use.

## Project structure

```
web-piano/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout, fonts, metadata, structured data
│   ├── globals.css           # Design tokens, glass utilities, focus states
│   ├── loading.tsx / error.tsx / not-found.tsx
│   ├── sitemap.ts / robots.ts / favicon.svg
│   ├── privacy/ terms/ contact/
│   └── piano/
│       ├── page.tsx          # Main piano app (tabs: Play/Songs/Practice/Learn/Settings)
│       └── loading.tsx
├── components/
│   ├── landing/              # Hero, features, preview, stats, testimonials, FAQ, footer
│   ├── piano/                # Keyboard, controls, chord detector, recorder, song library,
│   │                         # practice mode, learn mode, settings panel
│   ├── ui/                   # Button, Card, Slider, Accordion, Tabs
│   ├── theme-provider.tsx / theme-toggle.tsx
├── lib/
│   ├── audio-engine.ts       # Tone.js sampler + synth fallback singleton
│   ├── note-utils.ts         # Note/MIDI/keyboard-mapping utilities
│   ├── piano-context.tsx     # Global piano state (settings, active notes)
│   ├── songs-data.ts         # Song note sequences
│   ├── chords.ts             # Chord/scale detection
│   ├── midi-writer.ts        # Minimal Standard MIDI File writer
│   └── utils.ts              # `cn` classname helper
└── public/
```

## Code quality

- Fully typed TypeScript, no `any` in application code
- Component-based, reusable UI primitives
- No placeholder logic — every listed feature (keyboard input, audio, recording, chord
  detection, practice scoring, MIDI export) is a real, working implementation

## License

MIT — free to use, modify, and deploy.
