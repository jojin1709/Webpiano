"use client";

import { motion } from "framer-motion";
import { Accordion } from "@/components/ui/accordion";

const FAQS = [
  {
    id: "cost",
    question: "Is Web Piano free?",
    answer: "Yes. Every feature — songs, practice mode, recording, and lessons — is free forever, with no account required.",
  },
  {
    id: "device",
    question: "Do I need a MIDI keyboard?",
    answer: "No. Your computer keyboard plays the piano out of the box. A mouse or touchscreen works too, and MIDI-controller support can be added later.",
  },
  {
    id: "offline",
    question: "Does it work offline?",
    answer: "Web Piano needs an internet connection the first time it loads piano samples. After that, most features keep working even with a spotty connection.",
  },
  {
    id: "sound",
    question: "What makes the sound realistic?",
    answer: "We use sampled recordings of a real grand piano across the full keyboard range, rather than a synthesized approximation.",
  },
  {
    id: "recordings",
    question: "Can I download what I play?",
    answer: "Yes — the Recorder captures every note you play and exports a standard MIDI file you can open in any DAW or notation app.",
  },
  {
    id: "mobile",
    question: "Does it work on my phone?",
    answer: "Web Piano is fully responsive and touch-enabled, though a larger screen makes wide keyboard ranges easier to reach.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <p className="mb-2 text-sm font-medium text-brass-500">Questions</p>
        <h2 className="font-display text-3xl font-medium sm:text-4xl">Frequently asked</h2>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white/70 dark:bg-stage-800/50 px-6"
      >
        <Accordion items={FAQS} />
      </motion.div>
    </section>
  );
}
