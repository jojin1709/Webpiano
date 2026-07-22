"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Play, GraduationCap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHITE_KEYS = 14;
const BLACK_KEYS = [0, 1, 3, 4, 5, 7, 8, 10, 11, 12];
const GLOW_SEQUENCE = [2, 4, 7, 9, 4, 2, 0, 7, 9, 11, 9, 7, 4, 2];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-stage-950 pt-24 pb-12 text-ivory-100">
      {/* Background effects */}
      <div className="grain pointer-events-none absolute inset-0" />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[50rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(closest-side, #d4ac66, transparent)" }}
      />
      <div
        className="pointer-events-none absolute top-1/2 right-0 h-64 w-64 rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(closest-side, #c89b5d, transparent)" }}
      />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-ivory-200/70 backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brass-400 animate-pulse" />
          88 keys. Zero installs. Free forever.
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="text-balance font-display text-5xl font-medium tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Web{" "}
          <span className="bg-gradient-to-r from-brass-300 via-brass-400 to-brass-600 bg-clip-text text-transparent">
            Piano
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="text-balance mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ivory-200/60"
        >
          Play piano directly from your keyboard. Learn songs, practice scales, record
          performances, and master piano online — all in your browser.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="/piano">
            <Button size="lg" className="group">
              <Play className="h-4 w-4" /> Start Playing
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
          <Link href="/piano">
            <Button size="lg" variant="outline" className="border-white/15 text-ivory-100 hover:bg-white/5">
              <GraduationCap className="h-4 w-4" /> Learn Piano
            </Button>
          </Link>
        </motion.div>

        {/* Developer credit */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 text-xs text-ivory-200/30"
        >
          Developed by{" "}
          <a
            href="https://www.linkedin.com/in/jojin-john-74386b34a/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brass-500/60 hover:text-brass-500/90 transition-colors underline underline-offset-2 decoration-brass-500/20 hover:decoration-brass-500/50"
          >
            JOJIN JOHN
          </a>
        </motion.p>
      </div>

      {/* Animated piano illustration */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
        className="relative mx-auto mt-20 max-w-3xl px-6"
      >
        <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-stage-800 to-stage-900 p-3 shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
          {/* Top reflection */}
          <div className="absolute top-0 left-0 right-0 h-4 rounded-t-2xl bg-gradient-to-b from-white/5 to-transparent" />

          <div className="relative flex h-44 overflow-hidden rounded-xl sm:h-56">
            {Array.from({ length: WHITE_KEYS }).map((_, i) => (
              <div
                key={i}
                className="relative flex-1 border-r border-black/20 last:border-r-0"
                style={{
                  background: "linear-gradient(to bottom, #faf8f3, #ebe4d3)",
                }}
              >
                {GLOW_SEQUENCE.includes(i) && (
                  <motion.span
                    className="absolute bottom-0 left-0 right-0 rounded-b-lg"
                    style={{
                      background: "linear-gradient(to top, rgba(200,155,93,0.5), transparent)",
                    }}
                    animate={{ height: ["0%", "70%", "0%"] }}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      repeatDelay: GLOW_SEQUENCE.length * 0.35,
                      delay: GLOW_SEQUENCE.indexOf(i) * 0.35,
                      ease: "easeInOut",
                    }}
                  />
                )}
              </div>
            ))}
            {/* Black keys overlay */}
            <div className="pointer-events-none absolute inset-0 flex">
              {Array.from({ length: WHITE_KEYS - 1 }).map((_, i) => {
                if (!BLACK_KEYS.includes(i)) return <div key={i} className="flex-1" />;
                return (
                  <div key={i} className="relative flex-1">
                    <div
                      className="absolute -right-[22%] top-0 h-[62%] w-[45%] rounded-b-md"
                      style={{
                        background: "linear-gradient(to bottom, #1a1a1f, #0a0a0d)",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.5)",
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Shadow underneath */}
        <div className="mx-auto mt-4 h-4 w-3/4 rounded-full bg-black/20 blur-xl" />
      </motion.div>
    </section>
  );
}
