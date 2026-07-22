"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Circle, Square, Play, Download, Trash2, Pencil, Clock, Music, FileAudio, FileText, FileCode, Music2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import * as Tone from "tone";
import { usePiano } from "@/lib/piano-context";
import { audioEngine } from "@/lib/audio-engine";
import { buildMidiFile, RecordedEvent } from "@/lib/midi-writer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Recording {
  id: string;
  name: string;
  events: RecordedEvent[];
  duration: number;
  createdAt: number;
}

type DownloadFormat = "midi" | "json" | "csv" | "mp3";

const FORMAT_OPTIONS: { value: DownloadFormat; label: string; icon: React.ElementType; ext: string }[] = [
  { value: "midi", label: "MIDI (.mid)", icon: FileAudio, ext: ".mid" },
  { value: "mp3", label: "MP3 (.mp3)", icon: Music2, ext: ".mp3" },
  { value: "json", label: "JSON (.json)", icon: FileCode, ext: ".json" },
  { value: "csv", label: "CSV (.csv)", icon: FileText, ext: ".csv" },
];

export function Recorder() {
  const { subscribeActiveNotes, tempo } = usePiano();
  const [isRecording, setIsRecording] = useState(false);
  const [countIn, setCountIn] = useState(false);
  const [countInBeat, setCountInBeat] = useState(0);
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

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

  const doStartRecording = useCallback(() => {
    events.current = [];
    openNotes.current.clear();
    startTime.current = performance.now();
    setIsRecording(true);
  }, []);

  const startRecording = useCallback(() => {
    if (!audioEngine.isRunning()) {
      audioEngine.start().then(() => {
        setCountIn(true);
      });
      return;
    }
    setCountIn(true);
  }, []);

  useEffect(() => {
    if (!countIn) return;
    let beat = 0;
    const ms = (60 / tempo) * 1000;
    const interval = setInterval(() => {
      beat++;
      setCountInBeat(beat);
      if (beat >= 4) {
        clearInterval(interval);
        setCountIn(false);
        setCountInBeat(0);
        doStartRecording();
      }
    }, ms);
    return () => clearInterval(interval);
  }, [countIn, tempo, doStartRecording]);

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

  const downloadMidi = (rec: Recording) => {
    const blob = buildMidiFile(rec.events, 120);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${rec.name.replace(/\s+/g, "-").toLowerCase()}.mid`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadMp3 = async (rec: Recording) => {
    // Use Tone.js offline rendering to create audio buffer
    const secPerBeat = 60 / 120;
    const totalDuration = rec.duration + 0.5;

    const offline = new Tone.OfflineContext(2, 44100 * totalDuration, 44100);

    // Create a synth in the offline context
    const synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "triangle" },
      envelope: { attack: 0.005, decay: 0.3, sustain: 0.15, release: 1 },
    }).connect(offline.destination);
    synth.volume.value = -6;

    // Schedule all notes
    rec.events.forEach((e) => {
      const duration = Math.max(0.1, e.endTime - e.startTime);
      synth.triggerAttackRelease(e.note, duration, e.startTime, e.velocity);
    });

    // Render
    const buffer = await offline.render();
    const audioData = buffer.getChannelData(0);

    // Convert to MP3 using lamejs
    const lamejs = await import("lamejs");
    const mp3Encoder = new lamejs.Mp3Encoder(1, 44100, 128);
    const mp3Data: Int8Array[] = [];

    const chunkSize = 1152;
    for (let i = 0; i < audioData.length; i += chunkSize) {
      const chunk = audioData.slice(i, i + chunkSize);
      const float32 = new Float32Array(chunk);
      const int16 = new Int16Array(float32.length);
      for (let j = 0; j < float32.length; j++) {
        const s = Math.max(-1, Math.min(1, float32[j]));
        int16[j] = s < 0 ? s * 0x8000 : s * 0x7FFF;
      }
      const mp3buf = mp3Encoder.encodeBuffer(int16);
      if (mp3buf.length > 0) mp3Data.push(mp3buf);
    }

    const end = mp3Encoder.flush();
    if (end.length > 0) mp3Data.push(end);

    const blob = new Blob(mp3Data, { type: "audio/mp3" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${rec.name.replace(/\s+/g, "-").toLowerCase()}.mp3`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadJson = (rec: Recording) => {
    const data = {
      name: rec.name,
      duration: rec.duration,
      bpm: 120,
      notes: rec.events.map((e) => ({
        note: e.note,
        startTime: Math.round(e.startTime * 1000) / 1000,
        endTime: Math.round(e.endTime * 1000) / 1000,
        duration: Math.round((e.endTime - e.startTime) * 1000) / 1000,
        velocity: e.velocity,
      })),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${rec.name.replace(/\s+/g, "-").toLowerCase()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadCsv = (rec: Recording) => {
    const header = "Note,Start (s),End (s),Duration (s),Velocity\n";
    const rows = rec.events
      .map((e) => `${e.note},${e.startTime.toFixed(3)},${e.endTime.toFixed(3)},${(e.endTime - e.startTime).toFixed(3)},${e.velocity.toFixed(2)}`)
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${rec.name.replace(/\s+/g, "-").toLowerCase()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const download = async (rec: Recording, format: DownloadFormat) => {
    setOpenMenu(null);
    switch (format) {
      case "midi": downloadMidi(rec); break;
      case "mp3": await downloadMp3(rec); break;
      case "json": downloadJson(rec); break;
      case "csv": downloadCsv(rec); break;
    }
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
    <>
      {/* Count-in overlay */}
      <AnimatePresence>
        {countIn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          >
            <div className="text-center">
              <motion.div
                key={countInBeat}
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="font-display text-8xl font-bold text-brass-500"
              >
                {countInBeat < 4 ? countInBeat + 1 : "GO!"}
              </motion.div>
              <div className="mt-4 flex items-center justify-center gap-2">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-3 w-3 rounded-full transition-colors",
                      i <= countInBeat ? "bg-brass-500" : "bg-white/20"
                    )}
                  />
                ))}
              </div>
              <p className="mt-4 text-sm text-ivory-200/60">Get ready to record...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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

                  {/* Download with format selector */}
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Download recording"
                      onClick={() => setOpenMenu(openMenu === rec.id ? null : rec.id)}
                      className="h-8 w-8"
                    >
                      <Download className="h-3.5 w-3.5" />
                    </Button>

                    <AnimatePresence>
                      {openMenu === rec.id && (
                        <motion.div
                          initial={{ opacity: 0, y: -4, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -4, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 top-full z-50 mt-1 w-40 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-stage-800 shadow-xl overflow-hidden"
                        >
                          <p className="px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-stage-400 dark:text-ivory-200/30 border-b border-black/5 dark:border-white/5">
                            Download as
                          </p>
                          {FORMAT_OPTIONS.map((opt) => {
                            const Icon = opt.icon;
                            return (
                              <button
                                key={opt.value}
                                onClick={() => download(rec, opt.value)}
                                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-stage-700 dark:text-ivory-200/80 hover:bg-brass-500/10 transition-colors"
                              >
                                <Icon className="h-3.5 w-3.5 text-brass-500" />
                                {opt.label}
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

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
    </>
  );
}
