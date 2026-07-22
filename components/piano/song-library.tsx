"use client";

import { useMemo, useState } from "react";
import { Search, Play, Square, Music } from "lucide-react";
import { motion } from "framer-motion";
import { SONGS, Song } from "@/lib/songs-data";
import { audioEngine } from "@/lib/audio-engine";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const difficultyColor: Record<Song["difficulty"], string> = {
  Easy: "text-emerald-500 bg-emerald-500/10",
  Medium: "text-brass-500 bg-brass-500/10",
  Hard: "text-orange-500 bg-orange-500/10",
  Master: "text-ember bg-ember/10",
};

export function SongLibrary({ onPractice }: { onPractice?: (song: Song) => void }) {
  const [query, setQuery] = useState("");
  const [playingId, setPlayingId] = useState<string | null>(null);
  const timers = useMemo(() => new Set<number>(), []);

  const filtered = SONGS.filter(
    (s) =>
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.composer.toLowerCase().includes(query.toLowerCase()),
  );

  const stop = () => {
    timers.forEach((t) => window.clearTimeout(t));
    timers.clear();
    setPlayingId(null);
  };

  const play = async (song: Song) => {
    stop();
    if (!audioEngine.isRunning()) await audioEngine.start();
    setPlayingId(song.id);
    const secPerBeat = 60 / song.bpm;
    let t = 0;
    song.notes.forEach((n) => {
      const time = t;
      const id = window.setTimeout(() => {
        audioEngine.playNoteFor(n.note, n.beats * secPerBeat * 0.92, 0.8);
      }, time * 1000);
      timers.add(id);
      t += n.beats * secPerBeat;
    });
    const endId = window.setTimeout(() => setPlayingId(null), t * 1000 + 150);
    timers.add(endId);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        {/* Search */}
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] px-3 py-2.5 transition-colors focus-within:border-brass-500/30 focus-within:bg-white/50 dark:focus-within:bg-white/[0.05]">
          <Search className="h-4 w-4 text-stage-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search songs or composers..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-stage-400/60 dark:placeholder:text-ivory-200/25"
            aria-label="Search songs"
          />
        </div>

        {/* Song count */}
        <div className="mb-3 flex items-center gap-1.5 text-[11px] text-stage-400 dark:text-ivory-200/35">
          <Music className="h-3 w-3" />
          {filtered.length} song{filtered.length !== 1 ? "s" : ""}
        </div>

        {/* Song list */}
        <ul className="space-y-1">
          {filtered.map((song, idx) => (
            <motion.li
              key={song.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
              className="flex items-center justify-between gap-3 rounded-xl px-3 py-3 hover:bg-black/[0.03] dark:hover:bg-white/[0.03] transition-colors"
            >
              <div className="min-w-0">
                <p className="truncate font-medium text-sm">{song.title}</p>
                <div className="mt-0.5 flex items-center gap-2 text-[11px] text-stage-400 dark:text-ivory-200/40">
                  <span>{song.composer}</span>
                  <span className="text-stage-300 dark:text-ivory-200/20">|</span>
                  <span>{song.bpm} BPM</span>
                  <span className={cn(
                    "inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium",
                    difficultyColor[song.difficulty],
                  )}>
                    {song.difficulty}
                  </span>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => (playingId === song.id ? stop() : play(song))}
                  className={cn(
                    "h-8 text-[11px]",
                    playingId === song.id && "bg-ember/10 text-ember border-ember/20",
                  )}
                >
                  {playingId === song.id ? (
                    <>
                      <Square className="h-3 w-3" /> Stop
                    </>
                  ) : (
                    <>
                      <Play className="h-3 w-3" /> Demo
                    </>
                  )}
                </Button>
                {onPractice && (
                  <Button variant="primary" size="sm" onClick={() => onPractice(song)} className="h-8 text-[11px]">
                    Practice
                  </Button>
                )}
              </div>
            </motion.li>
          ))}
          {filtered.length === 0 && (
            <li className="py-8 text-center text-sm text-stage-400 dark:text-ivory-200/35">
              No songs match &ldquo;{query}&rdquo;
            </li>
          )}
        </ul>
      </CardContent>
    </Card>
  );
}
