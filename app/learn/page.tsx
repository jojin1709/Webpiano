"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Music, Keyboard, Mic } from "lucide-react";

export default function LearnPage() {
  const guides = [
    {
      icon: Keyboard,
      title: "How to Play Piano with Your Keyboard",
      description: "Learn the keyboard mapping: A=W/S/E/D plays C/C#/D/D#/E on the lower octave. The number row plays the upper octave. Hold Space for sustain.",
      content: [
        "The lower octave uses the home row: A=C, W=C#, S=D, E=D#, D=E, F=F, T=F#, G=G, Y=G#, H=A, U=A#, J=B",
        "The upper octave uses the number/QWERTY row: 1=C, Q=C#, 2=D, Z=D#, 3=E, X=F, 4=F#, C=G, 5=G#, V=A#, 6=B, 7=C",
        "Hold the Space bar for sustain pedal - notes ring out even after you release the keys",
        "Use the Octave slider to shift the entire keyboard up or down",
      ],
    },
    {
      icon: Music,
      title: "Learn Your First Song: Happy Birthday",
      description: "Happy Birthday is one of the easiest songs to learn. It uses only white keys in the key of C major.",
      content: [
        "The melody starts: C C D C F E (repeat the first C twice quickly)",
        "Second phrase: C C D C G F (similar pattern, different ending)",
        "Third phrase: C C C5 A F E D (reaches up to high C)",
        "Final phrase: A# A# A F G F (resolves back to C)",
        "Practice each phrase separately, then combine them",
      ],
    },
    {
      icon: BookOpen,
      title: "Understanding Chords: Major and Minor",
      description: "Chords are groups of 3 or more notes played together. Major chords sound happy, minor chords sound sad.",
      content: [
        "Major chord: Root + 4 semitones + 7 semitones (e.g., C-E-G = C Major)",
        "Minor chord: Root + 3 semitones + 7 semitones (e.g., C-D#-G = C Minor)",
        "The chord detector shows you what chord you're playing in real time",
        "Try playing C-E-G together, then C-D#-G to hear the difference",
      ],
    },
    {
      icon: Mic,
      title: "Recording and Exporting Your Performance",
      description: "Web Piano lets you record your playing and export it as MIDI, MP3, JSON, or CSV files.",
      content: [
        "Click the Record button - a 4-beat count-in gives you time to prepare",
        "Play your piece on the keyboard while recording",
        "Click Stop when finished - your recording appears in the list",
        "Click the download icon and choose your format: MIDI for DAWs, MP3 for audio, JSON for data, CSV for spreadsheets",
      ],
    },
  ];

  return (
    <div className="mx-auto min-h-screen max-w-3xl px-6 py-16">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-stage-500 dark:text-ivory-200/50 hover:text-brass-500 transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-display text-4xl font-medium tracking-tight">Learn Piano</h1>
        <p className="mt-3 text-lg text-stage-500 dark:text-ivory-200/55">
          Step-by-step guides to help you get started with Web Piano.
        </p>

        <div className="mt-10 space-y-8">
          {guides.map((guide, i) => {
            const Icon = guide.icon;
            return (
              <motion.div
                key={guide.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white/70 dark:bg-stage-800/50 p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brass-500/10 text-brass-500">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="font-display text-xl font-medium">{guide.title}</h2>
                </div>
                <p className="mb-4 text-sm text-stage-500 dark:text-ivory-200/55">{guide.description}</p>
                <ul className="space-y-2">
                  {guide.content.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-stage-600 dark:text-ivory-200/70">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brass-500/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/piano"
            className="inline-flex items-center gap-2 rounded-xl bg-brass-500 px-6 py-3 text-sm font-medium text-stage-950 hover:bg-brass-400 transition-colors"
          >
            Start Playing Now
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
