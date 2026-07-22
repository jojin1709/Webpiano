"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, MessageSquare, Heart } from "lucide-react";

export default function ContactPage() {
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
        <h1 className="font-display text-4xl font-medium tracking-tight">Contact</h1>
        <p className="mt-4 text-lg leading-relaxed text-stage-500 dark:text-ivory-200/55">
          Found a bug, have a feature idea, or just want to say hello? We&apos;d love to hear from you.
        </p>

        <div className="mt-10 space-y-4">
          <a
            href="mailto:hello@webpiano.app"
            className="group flex items-center gap-4 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white/70 dark:bg-stage-800/50 px-6 py-5 transition-all hover:border-brass-500/30 hover:shadow-lg hover:shadow-brass-500/5"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brass-500/10 text-brass-500 group-hover:bg-brass-500/20 transition-colors">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">Email us</p>
              <p className="text-sm text-stage-400 dark:text-ivory-200/40">hello@webpiano.app</p>
            </div>
          </a>

          <a
            href="https://github.com/jojin1709/Webpiano/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white/70 dark:bg-stage-800/50 px-6 py-5 transition-all hover:border-brass-500/30 hover:shadow-lg hover:shadow-brass-500/5"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brass-500/10 text-brass-500 group-hover:bg-brass-500/20 transition-colors">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">Open an issue</p>
              <p className="text-sm text-stage-400 dark:text-ivory-200/40">Report bugs or request features on GitHub</p>
            </div>
          </a>
        </div>

        <div className="mt-12 rounded-2xl bg-gradient-to-br from-brass-500/5 to-transparent dark:from-brass-500/10 p-6 text-center border border-brass-500/10">
          <Heart className="mx-auto mb-2 h-5 w-5 text-brass-500/60" />
          <p className="text-sm text-stage-500 dark:text-ivory-200/50">
            Web Piano is free and open-source. Every note you play supports the project.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
