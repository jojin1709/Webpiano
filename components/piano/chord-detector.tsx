"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePiano } from "@/lib/piano-context";
import { detectChord, detectScale } from "@/lib/chords";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ChordDetector() {
  const { subscribeActiveNotes, activeNotes: initialNotes } = usePiano();
  const [notes, setNotes] = useState<string[]>(initialNotes);

  useEffect(() => subscribeActiveNotes(setNotes), [subscribeActiveNotes]);

  const chord = notes.length >= 3 ? detectChord(notes) : null;
  const scale = notes.length >= 5 && !chord ? detectScale(notes) : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chord &amp; Scale Detector</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex min-h-[100px] flex-col items-center justify-center rounded-xl bg-gradient-to-br from-brass-500/5 to-transparent dark:from-brass-500/10 p-6 text-center border border-brass-500/10">
          <AnimatePresence mode="wait">
            {chord ? (
              <motion.div
                key={chord.label}
                initial={{ opacity: 0, scale: 0.9, y: 4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -4 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <div className="font-display text-3xl font-semibold text-brass-500 tracking-wide">
                  {chord.label}
                </div>
                <div className="mt-1.5 text-xs font-medium uppercase tracking-wider text-brass-600/60 dark:text-brass-400/50">
                  Chord Detected
                </div>
              </motion.div>
            ) : scale ? (
              <motion.div
                key={scale.label}
                initial={{ opacity: 0, scale: 0.9, y: 4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -4 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <div className="font-display text-2xl font-semibold text-brass-500 tracking-wide">
                  {scale.label}
                </div>
                <div className="mt-1.5 text-xs font-medium uppercase tracking-wider text-brass-600/60 dark:text-brass-400/50">
                  Scale Detected
                </div>
              </motion.div>
            ) : (
              <motion.p
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-stage-400 dark:text-ivory-200/40"
              >
                {notes.length === 0
                  ? "Play three or more notes together to detect a chord."
                  : (
                    <span>
                      <span className="font-medium text-stage-500 dark:text-ivory-200/60">
                        {notes.length} note{notes.length !== 1 ? "s" : ""}
                      </span>{" "}
                      held: {notes.join(", ")}
                    </span>
                  )}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-stage-400 dark:text-ivory-200/35">
          Major, minor, diminished, augmented, sus2/4, 7th chords — plus major, minor, pentatonic,
          blues, and dorian scales.
        </p>
      </CardContent>
    </Card>
  );
}
