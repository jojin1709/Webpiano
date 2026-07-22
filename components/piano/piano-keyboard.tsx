"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  isBlackKey,
  keyToNote,
  noteRange,
  rangeForSize,
  KEY_TO_SEMITONE,
  labelForKey,
} from "@/lib/note-utils";
import { audioEngine } from "@/lib/audio-engine";
import { usePiano } from "@/lib/piano-context";
import { cn } from "@/lib/utils";

interface KeyRipple {
  id: string;
  note: string;
}

export function PianoKeyboard({ compact = false }: { compact?: boolean }) {
  const {
    pianoSize,
    baseOctave,
    transpose,
    volumeDb,
    showLabels,
    setAudioReady,
    pressNote,
    releaseNote,
  } = usePiano();

  const [pressed, setPressed] = useState<Set<string>>(new Set());
  const [ripples, setRipples] = useState<KeyRipple[]>([]);
  const [sustainDown, setSustainDown] = useState(false);
  const heldByKey = useRef<Map<string, string>>(new Map());

  const [startMidi, endMidi] = rangeForSize(pianoSize);
  const notes = useMemo(() => noteRange(startMidi, endMidi), [startMidi, endMidi]);

  useEffect(() => {
    audioEngine.setVolume(volumeDb);
  }, [volumeDb]);

  const ensureStarted = useCallback(async () => {
    if (!audioEngine.isRunning()) {
      await audioEngine.start();
      setAudioReady(true);
    }
  }, [setAudioReady]);

  const noteOn = useCallback(
    async (note: string) => {
      await ensureStarted();
      audioEngine.noteOn(note, 0.85);
      pressNote(note);
      setPressed((prev) => new Set(prev).add(note));
      const id = `${note}-${Date.now()}-${Math.random()}`;
      setRipples((prev) => [...prev, { id, note }].slice(-40));
      window.setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 1400);
    },
    [ensureStarted, pressNote],
  );

  const noteOff = useCallback(
    (note: string) => {
      audioEngine.noteOff(note);
      releaseNote(note);
      setPressed((prev) => {
        const next = new Set(prev);
        next.delete(note);
        return next;
      });
    },
    [releaseNote],
  );

  useEffect(() => {
    const handleDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const target = e.target as HTMLElement;
      if (["INPUT", "TEXTAREA"].includes(target.tagName)) return;

      if (e.code === "Space") {
        e.preventDefault();
        setSustainDown(true);
        audioEngine.setSustain(true);
        return;
      }

      const key = e.key.toLowerCase();
      if (!(key in KEY_TO_SEMITONE)) return;
      e.preventDefault();
      const note = keyToNote(key, baseOctave, transpose);
      if (!note || heldByKey.current.has(key)) return;
      heldByKey.current.set(key, note);
      noteOn(note);
    };

    const handleUp = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        setSustainDown(false);
        audioEngine.setSustain(false);
        return;
      }
      const key = e.key.toLowerCase();
      const note = heldByKey.current.get(key);
      if (note) {
        heldByKey.current.delete(key);
        noteOff(note);
      }
    };

    window.addEventListener("keydown", handleDown);
    window.addEventListener("keyup", handleUp);
    return () => {
      window.removeEventListener("keydown", handleDown);
      window.removeEventListener("keyup", handleUp);
    };
  }, [baseOctave, transpose, noteOn, noteOff]);

  const whiteNotes = notes.filter((n) => !isBlackKey(n));
  const whiteWidthPct = 100 / whiteNotes.length;

  const noteKeyLabel = useMemo(() => {
    const map = new Map<string, string>();
    Object.entries(KEY_TO_SEMITONE).forEach(([key, semitone]) => {
      const midi = (baseOctave + 1) * 12 + semitone + transpose;
      if (midi >= startMidi && midi <= endMidi) {
        const note = notes.find((nn) => startMidi + notes.indexOf(nn) === midi);
        if (note && !map.has(note)) map.set(note, labelForKey(key));
      }
    });
    return map;
  }, [baseOctave, transpose, notes, startMidi, endMidi]);

  return (
    <div
      className={cn(
        "relative w-full select-none overflow-hidden rounded-2xl",
        "bg-gradient-to-b from-[#1a1410] via-[#0f0d0a] to-[#080604]",
        "p-4 shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_80px_rgba(200,155,93,0.06)]",
        compact ? "h-44" : "h-60 md:h-80",
      )}
      role="group"
      aria-label="Piano keyboard"
    >
      {/* Wood grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(200,155,93,0.3) 2px, rgba(200,155,93,0.3) 3px)`,
        }}
      />

      {/* Fallboard (top reflection area) */}
      <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-black/40 to-transparent z-10 pointer-events-none" />

      <div className="relative h-full w-full">
        {/* White keys container */}
        <div className="flex h-full w-full gap-[1px]">
          {whiteNotes.map((note, idx) => {
            const isPressed = pressed.has(note);
            const label = noteKeyLabel.get(note);
            const isC = note.startsWith("C");
            return (
              <button
                key={note}
                aria-label={`Play ${note}`}
                onMouseDown={() => noteOn(note)}
                onMouseUp={() => noteOff(note)}
                onMouseLeave={() => isPressed && noteOff(note)}
                onTouchStart={(e) => {
                  e.preventDefault();
                  noteOn(note);
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  noteOff(note);
                }}
                style={{ width: `${whiteWidthPct - 0.15}%` }}
                className={cn(
                  "relative flex h-full flex-col items-center justify-end rounded-b-lg transition-all duration-75 last:border-r-0",
                  "border border-black/20 border-t-0",
                  isPressed
                    ? "bg-gradient-to-b from-brass-200 to-brass-300 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1),0_2px_8px_rgba(200,155,93,0.3)] translate-y-[1px]"
                    : "bg-gradient-to-b from-[#faf8f3] via-[#f5f1e8] to-[#ebe4d3] hover:from-[#f5f1e8] hover:to-[#e0d8c8] shadow-[0_4px_6px_rgba(0,0,0,0.15),inset_0_-4px_6px_rgba(0,0,0,0.04)]",
                )}
              >
                {/* Key press glow */}
                <AnimatePresence>
                  {isPressed && (
                    <motion.div
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      exit={{ opacity: 0, scaleY: 0 }}
                      transition={{ duration: 0.15 }}
                      className="absolute bottom-0 left-0 right-0 h-full origin-bottom rounded-b-lg bg-gradient-to-t from-brass-400/30 via-brass-300/15 to-transparent"
                    />
                  )}
                </AnimatePresence>

                {/* Note ripple effect */}
                <AnimatePresence>
                  {ripples
                    .filter((r) => r.note === note)
                    .map((r) => (
                      <motion.div
                        key={r.id}
                        initial={{ opacity: 0.6, scale: 0.5 }}
                        animate={{ opacity: 0, scale: 2.5 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="absolute bottom-2 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-brass-400/50 pointer-events-none"
                      />
                    ))}
                </AnimatePresence>

                {/* C key marker */}
                {isC && (
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-3 rounded-full bg-stage-400/30" />
                )}

                {showLabels && (
                  <span className={cn(
                    "pointer-events-none z-10 font-mono text-[10px] mb-1 transition-colors duration-75",
                    isPressed ? "text-brass-700" : "text-stage-400",
                  )}>
                    {label ?? note.replace(/\d+/, "")}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Black keys */}
        <div className="pointer-events-none absolute inset-0">
          {notes.map((note, i) => {
            if (!isBlackKey(note)) return null;
            const whiteIndexBefore = notes.slice(0, i).filter((nn) => !isBlackKey(nn)).length;
            const leftPct = whiteIndexBefore * whiteWidthPct - whiteWidthPct * 0.3;
            const isPressed = pressed.has(note);
            const label = noteKeyLabel.get(note);
            return (
              <button
                key={note}
                aria-label={`Play ${note}`}
                onMouseDown={() => noteOn(note)}
                onMouseUp={() => noteOff(note)}
                onMouseLeave={() => isPressed && noteOff(note)}
                onTouchStart={(e) => {
                  e.preventDefault();
                  noteOn(note);
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  noteOff(note);
                }}
                style={{ left: `${leftPct}%`, width: `${whiteWidthPct * 0.6}%` }}
                className={cn(
                  "pointer-events-auto absolute top-0 z-20 flex h-[58%] flex-col items-center justify-end rounded-b-md transition-all duration-75",
                  isPressed
                    ? "bg-gradient-to-b from-brass-500 to-brass-700 shadow-[0_2px_8px_rgba(200,155,93,0.4)] translate-y-[1px]"
                    : "bg-gradient-to-b from-[#1a1a1f] via-[#111115] to-[#0a0a0d] hover:from-[#252528] hover:to-[#151518] shadow-[0_4px_8px_rgba(0,0,0,0.5),inset_0_-2px_4px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.05)]",
                )}
              >
                {/* Black key top highlight */}
                <div className="absolute top-0 left-0 right-0 h-[40%] rounded-t-md bg-gradient-to-b from-white/[0.06] to-transparent pointer-events-none" />

                {showLabels && (
                  <span className={cn(
                    "pointer-events-none font-mono text-[8px] mb-1 transition-colors duration-75",
                    isPressed ? "text-brass-200" : "text-ivory-200/40",
                  )}>
                    {label ?? ""}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sustain indicator */}
      <AnimatePresence>
        {sustainDown && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute right-4 top-3 z-30 flex items-center gap-1.5 rounded-full bg-brass-500/90 px-3 py-1 text-[11px] font-semibold text-stage-950 shadow-lg shadow-brass-500/20"
          >
            <div className="h-1.5 w-1.5 rounded-full bg-stage-950/40 animate-pulse" />
            Sustain
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom shadow for depth */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
    </div>
  );
}
