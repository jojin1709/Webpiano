"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { RotateCcw, Target, Trophy, CheckCircle, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SONGS, Song } from "@/lib/songs-data";
import { usePiano } from "@/lib/piano-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const DIFFICULTIES: Song["difficulty"][] = ["Easy", "Medium", "Hard", "Master"];

interface Score {
  correct: number;
  missed: number;
  elapsedMs: number;
}

export function PracticeMode({ initialSong }: { initialSong?: Song }) {
  const { subscribeNotePlayed } = usePiano();
  const [difficulty, setDifficulty] = useState<Song["difficulty"]>(
    initialSong?.difficulty ?? "Easy",
  );
  const [song, setSong] = useState<Song>(initialSong ?? SONGS[0]);
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(false);
  const [score, setScore] = useState<Score | null>(null);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [correctFlash, setCorrectFlash] = useState(false);

  const startedAt = useRef(0);
  const correctCount = useRef(0);
  const missedCount = useRef(0);

  const filteredSongs = SONGS.filter((s) => s.difficulty === difficulty);

  useEffect(() => {
    if (!filteredSongs.find((s) => s.id === song.id) && filteredSongs[0]) {
      setSong(filteredSongs[0]);
    }
  }, [difficulty, filteredSongs, song.id]);

  useEffect(() => {
    if (!active) return;
    return subscribeNotePlayed((note) => {
      const expected = song.notes[index]?.note;
      if (!expected) return;
      if (note === expected) {
        correctCount.current += 1;
        setCorrectFlash(true);
        window.setTimeout(() => setCorrectFlash(false), 200);
        setIndex((i) => i + 1);
      } else {
        missedCount.current += 1;
        setWrongFlash(true);
        window.setTimeout(() => setWrongFlash(false), 250);
      }
    });
  }, [active, index, song, subscribeNotePlayed]);

  useEffect(() => {
    if (active && index >= song.notes.length) {
      setActive(false);
      setScore({
        correct: correctCount.current,
        missed: missedCount.current,
        elapsedMs: Date.now() - startedAt.current,
      });
    }
  }, [index, song, active]);

  const start = () => {
    setIndex(0);
    setScore(null);
    correctCount.current = 0;
    missedCount.current = 0;
    startedAt.current = Date.now();
    setActive(true);
  };

  const reset = () => {
    setActive(false);
    setIndex(0);
    setScore(null);
  };

  const progressPct = Math.min(100, (index / song.notes.length) * 100);
  const upcoming = song.notes.slice(index, index + 8);
  const accuracy = score
    ? Math.round((score.correct / Math.max(1, score.correct + score.missed)) * 100)
    : null;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Practice Mode</CardTitle>
        <div className="flex items-center rounded-lg bg-black/5 dark:bg-white/5 p-0.5">
          {DIFFICULTIES.map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={cn(
                "rounded-md px-2.5 py-1 text-[11px] font-medium transition-all duration-200",
                difficulty === d
                  ? "bg-white dark:bg-stage-700 text-stage-950 dark:text-ivory-100 shadow-sm"
                  : "text-stage-500 dark:text-ivory-200/50 hover:text-stage-700 dark:hover:text-ivory-200/80",
              )}
            >
              {d}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <select
            aria-label="Choose a song to practice"
            value={song.id}
            onChange={(e) => setSong(SONGS.find((s) => s.id === e.target.value) ?? song)}
            disabled={active}
            className="rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm outline-none focus:border-brass-500/30"
          >
            {filteredSongs.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
          {!active ? (
            <Button size="sm" onClick={start}>
              <Target className="h-3.5 w-3.5" /> Start
            </Button>
          ) : (
            <Button size="sm" variant="secondary" onClick={reset}>
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </Button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key="active"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
            >
              {/* Progress bar */}
              <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-brass-500 to-brass-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>

              {/* Current note display */}
              <motion.div
                className={cn(
                  "flex items-center gap-4 rounded-xl p-5 transition-colors duration-150",
                  wrongFlash
                    ? "bg-ember/10 border border-ember/20"
                    : correctFlash
                    ? "bg-emerald-500/10 border border-emerald-500/20"
                    : "bg-gradient-to-br from-brass-500/5 to-transparent border border-brass-500/10",
                )}
                animate={wrongFlash ? { x: [0, -4, 4, -2, 0] } : {}}
                transition={{ duration: 0.25 }}
              >
                <div className="text-xs text-stage-400 dark:text-ivory-200/40 uppercase tracking-wider">Play</div>
                <span className="font-display text-3xl font-semibold text-brass-500">
                  {song.notes[index]?.note}
                </span>
                <span className="ml-auto text-[11px] text-stage-400 dark:text-ivory-200/35">
                  {upcoming.slice(1, 6).map((n) => n.note).join("  ")} ...
                </span>
              </motion.div>
            </motion.div>
          )}

          {score && (
            <motion.div
              key="score"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-2 grid grid-cols-3 gap-3 text-center"
            >
              <div className="rounded-xl bg-gradient-to-br from-brass-500/10 to-transparent p-4 border border-brass-500/10">
                <Trophy className="mx-auto mb-1 h-4 w-4 text-brass-500" />
                <p className="font-display text-2xl font-semibold">{accuracy}%</p>
                <p className="text-[11px] text-stage-400 dark:text-ivory-200/40">Accuracy</p>
              </div>
              <div className="rounded-xl bg-black/[0.03] dark:bg-white/[0.04] p-4">
                <XCircle className="mx-auto mb-1 h-4 w-4 text-ember/60" />
                <p className="font-display text-2xl font-semibold">{score.missed}</p>
                <p className="text-[11px] text-stage-400 dark:text-ivory-200/40">Missed</p>
              </div>
              <div className="rounded-xl bg-black/[0.03] dark:bg-white/[0.04] p-4">
                <CheckCircle className="mx-auto mb-1 h-4 w-4 text-emerald-500/60" />
                <p className="font-display text-2xl font-semibold">{(score.elapsedMs / 1000).toFixed(1)}s</p>
                <p className="text-[11px] text-stage-400 dark:text-ivory-200/40">Time</p>
              </div>
            </motion.div>
          )}

          {!active && !score && (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-stage-400 dark:text-ivory-200/35 py-4 text-center"
            >
              Pick a difficulty and song, then press Start. Play each highlighted note on the
              keyboard below to advance.
            </motion.p>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
