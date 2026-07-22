"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, AlertTriangle, RefreshCw, Scale } from "lucide-react";

export default function TermsPage() {
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
        <h1 className="font-display text-4xl font-medium tracking-tight">Terms of Use</h1>
        <p className="mt-2 text-sm text-stage-400 dark:text-ivory-200/35">Last updated: July 2026</p>

        <div className="mt-10 space-y-8">
          <Section icon={CheckCircle} title="Acceptable use">
            <p>
              Web Piano is provided free of charge, as-is, for personal, educational, and
              non-commercial use. Don&apos;t use it to distribute harmful content or to attempt to
              disrupt the service for other users.
            </p>
          </Section>

          <Section icon={AlertTriangle} title="No warranty">
            <p>
              Web Piano is offered without warranty of any kind. We aren&apos;t liable for any loss
              arising from its use, including lost recordings.
            </p>
          </Section>

          <Section icon={RefreshCw} title="Changes">
            <p>
              These terms may be updated from time to time as the product evolves. Continued use
              constitutes acceptance of any changes.
            </p>
          </Section>

          <Section icon={Scale} title="Intellectual property">
            <p>
              The Web Piano application, including its code, design, and UI components, is provided
              under its respective open-source license. Piano audio samples are sourced from public
              CDNs and remain property of their respective owners.
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
