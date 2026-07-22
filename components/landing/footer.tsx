"use client";

import Link from "next/link";
import { Piano } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="border-t border-black/[0.06] dark:border-white/[0.08] bg-ivory-50 dark:bg-stage-950">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brass-400 to-brass-600 text-stage-950 shadow-md shadow-brass-500/20">
                <Piano className="h-4 w-4" />
              </div>
              <span className="font-display text-lg font-semibold tracking-tight">Web Piano</span>
            </div>
            <p className="text-sm leading-relaxed text-stage-500 dark:text-ivory-200/45">
              A free, browser-based piano for playing, learning, and recording music. No installs required.
            </p>
          </div>

          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-wider text-stage-400 dark:text-ivory-200/30">Product</p>
            <ul className="space-y-2.5 text-sm text-stage-500 dark:text-ivory-200/50">
              <li><Link href="/piano" className="hover:text-brass-500 transition-colors">Play Now</Link></li>
              <li><Link href="/piano" className="hover:text-brass-500 transition-colors">Song Library</Link></li>
              <li><Link href="/piano" className="hover:text-brass-500 transition-colors">Practice Mode</Link></li>
              <li><Link href="/piano" className="hover:text-brass-500 transition-colors">Learn Piano</Link></li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-wider text-stage-400 dark:text-ivory-200/30">Resources</p>
            <ul className="space-y-2.5 text-sm text-stage-500 dark:text-ivory-200/50">
              <li><a href="#features" className="hover:text-brass-500 transition-colors">Features</a></li>
              <li><a href="#faq" className="hover:text-brass-500 transition-colors">FAQ</a></li>
              <li><a href="#songs" className="hover:text-brass-500 transition-colors">Preview</a></li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-wider text-stage-400 dark:text-ivory-200/30">Legal</p>
            <ul className="space-y-2.5 text-sm text-stage-500 dark:text-ivory-200/50">
              <li><Link href="/privacy" className="hover:text-brass-500 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-brass-500 transition-colors">Terms of Use</Link></li>
              <li><Link href="/contact" className="hover:text-brass-500 transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-black/[0.06] dark:border-white/[0.08] pt-6 text-xs text-stage-400 dark:text-ivory-200/30 sm:flex-row">
          <div className="flex flex-col items-center gap-1.5 sm:items-start">
            <p>&copy; {new Date().getFullYear()} Web Piano. All rights reserved.</p>
            <p className="flex items-center gap-1.5">
              Developed by{" "}
              <a
                href="https://www.linkedin.com/in/jojin-john-74386b34a/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-brass-500/80 hover:text-brass-500 transition-colors underline underline-offset-2 decoration-brass-500/30 hover:decoration-brass-500/60"
              >
                JOJIN JOHN
              </a>
            </p>
          </div>
          <p className="flex items-center gap-1.5">
            Built with <span className="text-brass-500/70">Next.js</span>, <span className="text-brass-500/70">Tailwind CSS</span>, and <span className="text-brass-500/70">Tone.js</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
