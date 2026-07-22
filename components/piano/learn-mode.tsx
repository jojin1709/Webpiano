"use client";

import { useEffect, useState } from "react";
import { Check, ChevronRight, ChevronLeft, GraduationCap, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePiano } from "@/lib/piano-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Lesson {
  id: string;
  title: string;
  description: string;
  targetNotes: string[];
}

const LESSONS: Lesson[] = [
  {
    id: "white-keys",
    title: "1. The white keys",
    description:
      "The white keys spell the musical alphabet: C, D, E, F, G, A, B. Play C4 through B4 in order.",
    targetNotes: ["C4", "D4", "E4", "F4", "G4", "A4", "B4"],
  },
  {
    id: "black-keys",
    title: "2. The black keys",
    description:
      "Black keys sit in groups of two and three, and are named sharp (#) or flat (b). Play this run of sharps.",
    targetNotes: ["C#4", "D#4", "F#4", "G#4", "A#4"],
  },
  {
    id: "octaves",
    title: "3. Octaves",
    description:
      "An octave is the distance from one note to the next note with the same name. Play C4, then C5, one octave up.",
    targetNotes: ["C4", "C5"],
  },
  {
    id: "major-scale",
    title: "4. The C major scale",
    description: "A scale is a stepwise sequence of notes. Play the full C major scale.",
    targetNotes: ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"],
  },
  {
    id: "c-major-chord",
    title: "5. Your first chord: C major",
    description:
      "A chord is three or more notes played together. Play C4, E4, and G4 — you can hold them one at a time.",
    targetNotes: ["C4", "E4", "G4"],
  },
  {
    id: "simple-song",
    title: "6. Play a simple phrase",
    description: "Put it together with the opening of Twinkle Twinkle Little Star.",
    targetNotes: ["C4", "C4", "G4", "G4", "A4", "A4", "G4"],
  },
];

export function LearnMode() {
  const { subscribeNotePlayed } = usePiano();
  const [lessonIndex, setLessonIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [justCompleted, setJustCompleted] = useState(false);

  const lesson = LESSONS[lessonIndex];

  useEffect(() => {
    setProgress(0);
    setJustCompleted(false);
  }, [lessonIndex]);

  useEffect(() => {
    return subscribeNotePlayed((note) => {
      const expected = lesson.targetNotes[progress];
      if (note === expected) {
        const next = progress + 1;
        if (next >= lesson.targetNotes.length) {
          setCompleted((prev) => new Set(prev).add(lesson.id));
          setJustCompleted(true);
          setProgress(0);
        } else {
          setProgress(next);
        }
      }
    });
  }, [lesson, progress, subscribeNotePlayed]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-brass-500" /> Learn to Play
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Lesson pills */}
        <div className="mb-5 flex flex-wrap gap-1.5">
          {LESSONS.map((l, i) => (
            <button
              key={l.id}
              onClick={() => setLessonIndex(i)}
              className={cn(
                "flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium transition-all duration-200",
                i === lessonIndex
                  ? "border-brass-500/40 bg-brass-500/10 text-brass-600 dark:text-brass-400 shadow-sm"
                  : completed.has(l.id)
                  ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-600/70 dark:text-emerald-400/60"
                  : "border-black/10 dark:border-white/10 text-stage-500 dark:text-ivory-200/45 hover:border-black/20 dark:hover:border-white/20",
              )}
            >
              {completed.has(l.id) && <Check className="h-3 w-3" />}
              {l.title.split(". ")[1]}
            </button>
          ))}
        </div>

        {/* Lesson content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={lesson.id}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="font-display text-xl font-medium">{lesson.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-stage-500 dark:text-ivory-200/55">
              {lesson.description}
            </p>

            {/* Note targets */}
            <div className="mt-5 flex flex-wrap gap-2">
              {lesson.targetNotes.map((note, i) => (
                <motion.span
                  key={`${note}-${i}`}
                  initial={false}
                  animate={
                    i < progress
                      ? { scale: [1, 1.1, 1], transition: { duration: 0.3 } }
                      : i === progress
                      ? { scale: [1, 1.05, 1], transition: { duration: 1.5, repeat: Infinity } }
                      : {}
                  }
                  className={cn(
                    "flex h-10 min-w-10 items-center justify-center rounded-xl border px-2.5 font-mono text-sm font-medium transition-colors duration-200",
                    i < progress
                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : i === progress
                      ? "border-brass-500/60 bg-brass-500/15 text-brass-600 dark:text-brass-400 shadow-[0_0_12px_rgba(200,155,93,0.15)]"
                      : "border-black/10 dark:border-white/10 text-stage-400 dark:text-ivory-200/30",
                  )}
                >
                  {note}
                </motion.span>
              ))}
            </div>

            {/* Completion message */}
            <AnimatePresence>
              {completed.has(lesson.id) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-500/10 px-4 py-2.5 text-sm font-medium text-emerald-600 dark:text-emerald-400"
                >
                  <Sparkles className="h-4 w-4" />
                  {justCompleted ? "Lesson complete! Great job!" : "Lesson completed"}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            disabled={lessonIndex <= 0}
            onClick={() => setLessonIndex((i) => Math.max(0, i - 1))}
            className="text-stage-500"
          >
            <ChevronLeft className="h-3.5 w-3.5" /> Previous
          </Button>
          <span className="text-[11px] text-stage-400 dark:text-ivory-200/30">
            {lessonIndex + 1} of {LESSONS.length}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={lessonIndex >= LESSONS.length - 1}
            onClick={() => setLessonIndex((i) => Math.min(LESSONS.length - 1, i + 1))}
          >
            Next <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
