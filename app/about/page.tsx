"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Piano, Code, Heart, Globe } from "lucide-react";

export default function AboutPage() {
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
        <h1 className="font-display text-4xl font-medium tracking-tight">About Web Piano</h1>
        <p className="mt-3 text-lg text-stage-500 dark:text-ivory-200/55">
          A free, browser-based piano for everyone.
        </p>

        <div className="mt-10 space-y-8">
          <div className="rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white/70 dark:bg-stage-800/50 p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brass-500/10 text-brass-500">
                <Piano className="h-5 w-5" />
              </div>
              <h2 className="font-display text-xl font-medium">What is Web Piano?</h2>
            </div>
            <p className="text-sm leading-relaxed text-stage-500 dark:text-ivory-200/55">
              Web Piano is a free, browser-based piano application that lets you play piano directly
              from your computer keyboard. No downloads, no installations, no accounts required.
              Just open the website and start playing. It features realistic piano sounds sampled
              from a genuine grand piano, 28 built-in songs across four difficulty levels, practice
              mode with scoring, chord detection, recording with multiple export formats, and
              interactive lessons for beginners.
            </p>
          </div>

          <div className="rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white/70 dark:bg-stage-800/50 p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brass-500/10 text-brass-500">
                <Code className="h-5 w-5" />
              </div>
              <h2 className="font-display text-xl font-medium">Built with Modern Tech</h2>
            </div>
            <p className="text-sm leading-relaxed text-stage-500 dark:text-ivory-200/55">
              Built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, and Tone.js.
              The audio engine uses sampled grand piano recordings for realistic sound, with a
              synthesized fallback for offline use. The app is fully responsive and works on
              desktop, tablet, and mobile devices. It also supports PWA installation so you can
              add it to your home screen like a native app.
            </p>
          </div>

          <div className="rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white/70 dark:bg-stage-800/50 p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brass-500/10 text-brass-500">
                <Heart className="h-5 w-5" />
              </div>
              <h2 className="font-display text-xl font-medium">Free Forever</h2>
            </div>
            <p className="text-sm leading-relaxed text-stage-500 dark:text-ivory-200/55">
              Web Piano is completely free with no hidden fees, no account required, and no ads.
              Every feature — songs, practice mode, recording, lessons, chord detection — is
              available to everyone. The project is developed and maintained by{" "}
              <a
                href="https://www.linkedin.com/in/jojin-john-74386b34a/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brass-500 hover:text-brass-600 underline underline-offset-2"
              >
                Jojin John
              </a>.
            </p>
          </div>

          <div className="rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white/70 dark:bg-stage-800/50 p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brass-500/10 text-brass-500">
                <Globe className="h-5 w-5" />
              </div>
              <h2 className="font-display text-xl font-medium">Privacy First</h2>
            </div>
            <p className="text-sm leading-relaxed text-stage-500 dark:text-ivory-200/55">
              Everything happens in your browser. No audio, notes, or recordings are ever sent
              to any server. Your preferences are saved locally in your browser storage. The only
              external request is for piano samples from a public CDN on first load.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
