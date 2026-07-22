"use client";

import { motion } from "framer-motion";
import { Music, BookOpen, Zap, Smartphone } from "lucide-react";

const STATS = [
  { icon: Music, value: "88", label: "Keys available", suffix: "" },
  { icon: BookOpen, value: "8", label: "Songs to learn", suffix: "" },
  { icon: Zap, value: "100", label: "Free forever", suffix: "%" },
  { icon: Smartphone, value: "3", label: "Screen sizes", suffix: "" },
];

export function Stats() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <div className="grid grid-cols-2 gap-4 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-gradient-to-br from-white/80 to-white/50 dark:from-stage-800/60 dark:to-stage-800/30 p-6 sm:grid-cols-4 sm:p-10">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="flex flex-col items-center text-center"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brass-500/10 text-brass-500">
              <s.icon className="h-5 w-5" />
            </div>
            <p className="font-display text-3xl font-semibold tracking-tight text-brass-500 sm:text-4xl">
              {s.value}{s.suffix}
            </p>
            <p className="mt-1 text-[13px] text-stage-500 dark:text-ivory-200/50">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
