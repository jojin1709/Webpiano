"use client";

import { motion } from "framer-motion";
import { Keyboard, Headphones, Music2, Download } from "lucide-react";

const STEPS = [
  {
    icon: Keyboard,
    step: "1",
    title: "Press a key",
    description: "Use your computer keyboard or click the on-screen keys. Each key maps to a real piano note.",
  },
  {
    icon: Headphones,
    step: "2",
    title: "Hear real sound",
    description: "Audio samples from a genuine grand piano play instantly — no latency, no plugins.",
  },
  {
    icon: Music2,
    step: "3",
    title: "Learn & practice",
    description: "Follow guided lessons, play along with songs, or let the chord detector teach you theory.",
  },
  {
    icon: Download,
    step: "4",
    title: "Record & export",
    description: "Capture your performance and download it as a standard MIDI file for any DAW.",
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <div className="mb-12 text-center">
        <p className="mb-2 text-sm font-medium text-brass-500">Simple as 1-2-3-4</p>
        <h2 className="font-display text-3xl font-medium sm:text-4xl">How it works</h2>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, i) => (
          <motion.div
            key={s.step}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative text-center"
          >
            {/* Connector line */}
            {i < STEPS.length - 1 && (
              <div className="absolute left-[calc(50%+28px)] top-8 hidden h-px w-[calc(100%-56px)] bg-brass-500/20 lg:block" />
            )}
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brass-400/20 to-brass-600/10 text-brass-500 ring-1 ring-brass-500/20">
              <s.icon className="h-6 w-6" />
            </div>
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-brass-500/60">
              Step {s.step}
            </div>
            <h3 className="mb-1.5 font-display text-lg font-medium">{s.title}</h3>
            <p className="text-sm leading-relaxed text-stage-500 dark:text-ivory-200/45">
              {s.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
