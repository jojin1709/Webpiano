"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { PianoProvider } from "@/lib/piano-context";
import { PianoKeyboard } from "@/components/piano/piano-keyboard";
import { Button } from "@/components/ui/button";

export function Preview() {
  return (
    <section id="preview" className="bg-gradient-to-b from-black/[0.02] to-transparent dark:from-white/[0.02] py-24">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="mx-auto mb-4 inline-flex items-center gap-1.5 rounded-full bg-brass-500/10 px-3 py-1 text-xs font-medium text-brass-600 dark:text-brass-400">
            <Sparkles className="h-3 w-3" /> Interactive Demo
          </div>
          <h2 className="font-display text-3xl font-medium sm:text-4xl">
            No download. Just click and play.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-stage-500 dark:text-ivory-200/50">
            This is the real instrument — click a key or press A, W, S, E, D on your keyboard
            to hear it.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <PianoProvider>
            <PianoKeyboard />
          </PianoProvider>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex justify-center"
        >
          <Link href="/piano">
            <Button variant="outline" size="lg" className="group">
              Open the full studio
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
