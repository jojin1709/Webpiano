"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, Database, Globe, Mail } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="mx-auto min-h-screen max-w-2xl px-6 py-16">
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
        <h1 className="font-display text-4xl font-medium tracking-tight">Privacy Policy</h1>
        <p className="mt-2 text-sm text-stage-400 dark:text-ivory-200/35">Last updated: July 2026</p>

        <div className="mt-10 space-y-8">
          <Section icon={Shield} title="Browser-only execution">
            <p>
              Web Piano runs entirely in your browser. Playing, recording, and practicing all happen
              on your device — no audio, notes, or recordings are ever sent to a server.
            </p>
          </Section>

          <Section icon={Database} title="What we store">
            <p>
              Your theme and control preferences (volume, octave, labels) are saved locally in your
              browser&apos;s storage so they persist between visits. Recordings you make stay in
              memory for your current session only and are not uploaded anywhere.
            </p>
          </Section>

          <Section icon={Globe} title="Third-party audio samples">
            <p>
              Piano samples are loaded from a public audio CDN the first time you play a note. That
              request is subject to the CDN provider&apos;s own privacy practices.
            </p>
          </Section>

          <Section icon={Mail} title="Contact">
            <p>
              Questions about this policy can be sent through the{" "}
              <Link href="/contact" className="text-brass-500 hover:text-brass-600 underline underline-offset-2">
                Contact page
              </Link>.
            </p>
          </Section>
        </div>
      </motion.div>
    </div>
  );
}

function Section({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white/70 dark:bg-stage-800/50 p-6">
      <div className="mb-3 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brass-500/10 text-brass-500">
          <Icon className="h-4 w-4" />
        </div>
        <h2 className="font-display text-lg font-medium">{title}</h2>
      </div>
      <div className="text-sm leading-relaxed text-stage-500 dark:text-ivory-200/55">
        {children}
      </div>
    </div>
  );
}
