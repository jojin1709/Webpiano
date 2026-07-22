"use client";

import { useEffect, useRef, useState } from "react";
import { Circle, Square, Play, Download, Trash2, Pencil, Clock, Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePiano } from "@/lib/piano-context";
import { audioEngine } from "@/lib/audio-engine";
import { buildMidiFile, RecordedEvent } from "@/lib/midi-writer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Recording {
  id: string;
  name: string;
  events: RecordedEvent[];
  duration: number;
  createdAt: number;
}

export function Recorder() {
  const { subscribeActiveNotes } = usePiano();
  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const startTime = useRef(0);
  const openNotes = useRef<Map<string, number>>(new Map());
  const events = useRef<RecordedEvent[]>([]);
  const prevActive = useRef<Set<string>>(new Set());

  useEffect(() => {
    return subscribeActiveNotes((notes) => {
      if (!isRecording) {
        prevActive.current = new Set(notes);
        return;
      }
      const now = (performance.now() - startTime.current) / 1000;
      const nextSet = new Set(notes);

      nextSet.forEach((note) => {
        if (!prevActive.current.has(note)) {
          openNotes.current.set(note, now);
        }
      });
      prevActive.current.forEach((note) => {
        if (!nextSet.has(note)) {
          const start = openNotes.current.get(note) ?? now;
          events.current.push({ note, startTime: start, endTime: now, velocity: 0.85 });
          openNotes.current.delete(note);
        }
      });
      prevActive.current = nextSet;
    });
  }, [isRecording, subscribeActiveNotes]);

  const startRecording = () => {
    events.current = [];
    openNotes.current.clear();
    startTime.current = performance.now();
    setIsRecording(true);
  };

  const stopRecording = () => {
    const now = (performance.now() - startTime.current) / 1000;
    openNotes.current.forEach((start, note) => {
      events.current.push({ note, startTime: start, endTime: now, velocity: 0.85 });
      openNotes.current.delete(note);
    });
    setIsRecording(false);

    if (events.current.length === 0) return;
    const rec: Recording = {
      id: `rec-${Date.now()}`,
      name: `Recording ${recordings.length + 1}`,
      events: [...events.current].sort((a, b) => a.startTime - b.startTime),
      duration: Math.max(...events.current.map((e) => e.endTime), 0),
      createdAt: Date.now(),
    };
    setRecordings((prev) => [rec, ...prev]);
  };

  const play = async (rec: Recording) => {
    if (!audioEngine.isRunning()) await audioEngine.start();
    setPlayingId(rec.id);
    rec.events.forEach((e) => {
      window.setTimeout(() => {
        audioEngine.playNoteFor(e.note, Math.max(0.15, e.endTime - e.startTime), e.velocity);
      }, e.startTime * 1000);
    });
    window.setTimeout(() => setPlayingId(null), rec.duration * 1000 + 200);
  };

  const download = (rec: Recording) => {
    const blob = buildMidiFile(rec.events, 120);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${rec.name.replace(/\s+/g, "-").toLowerCase()}.mid`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const rename = (id: string) => {
    const name = prompt("Rename recording");
    if (!name) return;
    setRecordings((prev) => prev.map((r) => (r.id === id ? { ...r, name } : r)));
  };

  const remove = (id: string) => {
    setRecordings((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recorder</CardTitle>
        <Button
          variant={isRecording ? "secondary" : "primary"}
          size="sm"
          onClick={isRecording ? stopRecording : startRecording}
          className={isRecording ? "bg-ember/20 text-ember hover:bg-ember/30" : ""}
        >
          {isRecording ? (
            <>
              <Square className="h-3.5 w-3.5" /> Stop
            </>
          ) : (
            <>
              <Circle className="h-3.5 w-3.5 fill-current text-ember" /> Record
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <AnimatePresence>
          {isRecording && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-3 flex items-center gap-2 rounded-lg bg-ember/10 px-3 py-2 text-sm text-ember"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember/60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-ember" />
              </span>
              Recording — play the keyboard now
            </motion.div>
          )}
        </AnimatePresence>

        {recordings.length === 0 ? (
          <p className="py-4 text-center text-sm text-stage-400 dark:text-ivory-200/40">
            No recordings yet. Press Record, play a few notes, then Stop.
          </p>
        ) : (
          <ul className="space-y-1.5">
            {recordings.map((rec) => (
              <motion.li
                key={rec.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between gap-2 rounded-lg bg-black/[0.03] dark:bg-white/[0.04] px-3 py-2.5"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{rec.name}</p>
                  <div className="mt-0.5 flex items-center gap-2 text-[11px] text-stage-400 dark:text-ivory-200/40">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {rec.duration.toFixed(1)}s
                    </span>
                    <span className="flex items-center gap-1">
                      <Music className="h-3 w-3" /> {rec.events.length} notes
                    </span>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-0.5">
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Play recording"
                    onClick={() => play(rec)}
                    disabled={playingId === rec.id}
                    className="h-8 w-8"
                  >
                    <Play className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Download as MIDI"
                    onClick={() => download(rec)}
                    className="h-8 w-8"
                  >
                    <Download className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Rename recording"
                    onClick={() => rename(rec.id)}
                    className="h-8 w-8"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Delete recording"
                    onClick={() => remove(rec.id)}
                    className="h-8 w-8 text-ember/60 hover:text-ember"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </motion.li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
