"use client";

import { motion } from "framer-motion";
import {
  Keyboard,
  Volume2,
  Disc3,
  BookOpen,
  Wand2,
  Smartphone,
  MoonStar,
  Sparkles,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const FEATURES = [
  {
    icon: Keyboard,
    title: "Keyboard Support",
    description: "Play with your computer keyboard, mapped one-to-one across two octaves.",
  },
  {
    icon: Volume2,
    title: "Real Piano Sounds",
    description: "Sampled from a genuine grand piano for warm, realistic tone.",
  },
  {
    icon: Disc3,
    title: "Record Performance",
    description: "Capture every note, play it back, and export a MIDI file.",
  },
  {
    icon: BookOpen,
    title: "Learn Songs",
    description: "28 classic pieces across 4 difficulty levels with demo playback and a searchable library.",
  },
  {
    icon: Wand2,
    title: "Chord Detection",
    description: "See the chord or scale you're playing in real time.",
  },
  {
    icon: Smartphone,
    title: "Responsive",
    description: "A full 88-key experience on desktop, tablet, and phone alike.",
  },
  {
    icon: MoonStar,
    title: "Dark Mode",
    description: "Easy on the eyes for late-night practice sessions.",
  },
  {
    icon: Sparkles,
    title: "Beginner Friendly",
    description: "Guided lessons take you from your first note to full songs.",
  },
];

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-14 max-w-xl"
      >
        <p className="mb-2 text-sm font-medium text-brass-500">Everything you need</p>
        <h2 className="font-display text-3xl font-medium sm:text-4xl">
          One instrument, every tool a pianist needs
        </h2>
      </motion.div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
          >
            <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brass-500/5 group">
              <CardContent className="pt-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brass-500/10 text-brass-500 transition-colors group-hover:bg-brass-500/20">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-1.5 font-medium">{f.title}</h3>
                <p className="text-[13px] leading-relaxed text-stage-500 dark:text-ivory-200/50">
                  {f.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
