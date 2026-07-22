"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { PianoSize } from "./note-utils";

export interface PianoSettings {
  pianoSize: PianoSize;
  baseOctave: number;
  transpose: number;
  volumeDb: number;
  showLabels: boolean;
  showPressedNotes: boolean;
  metronomeOn: boolean;
  tempo: number;
  audioReady: boolean;
}

interface PianoContextValue extends PianoSettings {
  activeNotes: string[];
  setPianoSize: (s: PianoSize) => void;
  setBaseOctave: (o: number) => void;
  setTranspose: (t: number) => void;
  setVolumeDb: (v: number) => void;
  toggleLabels: () => void;
  togglePressedNotes: () => void;
  toggleMetronome: () => void;
  setTempo: (t: number) => void;
  setAudioReady: (r: boolean) => void;
  pressNote: (note: string) => void;
  releaseNote: (note: string) => void;
  subscribeActiveNotes: (cb: (notes: string[]) => void) => () => void;
  subscribeNotePlayed: (cb: (note: string) => void) => () => void;
}

const PianoContext = createContext<PianoContextValue | null>(null);

export function PianoProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<PianoSettings>({
    pianoSize: 61,
    baseOctave: 3,
    transpose: 0,
    volumeDb: -6,
    showLabels: true,
    showPressedNotes: true,
    metronomeOn: false,
    tempo: 100,
    audioReady: false,
  });

  const [activeNotes, setActiveNotes] = useState<string[]>([]);
  const listeners = useRef<Set<(notes: string[]) => void>>(new Set());
  const notePlayedListeners = useRef<Set<(note: string) => void>>(new Set());

  // Notify listeners OUTSIDE of setState to avoid setState-during-render
  useEffect(() => {
    listeners.current.forEach((cb) => cb(activeNotes));
  }, [activeNotes]);

  const pressNote = useCallback(
    (note: string) => {
      setActiveNotes((prev) => {
        if (prev.includes(note)) return prev;
        return [...prev, note];
      });
      notePlayedListeners.current.forEach((cb) => cb(note));
    },
    [],
  );

  const releaseNote = useCallback(
    (note: string) => {
      setActiveNotes((prev) => prev.filter((n) => n !== note));
    },
    [],
  );

  const subscribeActiveNotes = useCallback((cb: (notes: string[]) => void) => {
    listeners.current.add(cb);
    return () => listeners.current.delete(cb);
  }, []);

  const subscribeNotePlayed = useCallback((cb: (note: string) => void) => {
    notePlayedListeners.current.add(cb);
    return () => notePlayedListeners.current.delete(cb);
  }, []);

  const value: PianoContextValue = useMemo(
    () => ({
      ...settings,
      activeNotes,
      setPianoSize: (pianoSize) => setSettings((s) => ({ ...s, pianoSize })),
      setBaseOctave: (baseOctave) => setSettings((s) => ({ ...s, baseOctave })),
      setTranspose: (transpose) => setSettings((s) => ({ ...s, transpose })),
      setVolumeDb: (volumeDb) => setSettings((s) => ({ ...s, volumeDb })),
      toggleLabels: () => setSettings((s) => ({ ...s, showLabels: !s.showLabels })),
      togglePressedNotes: () =>
        setSettings((s) => ({ ...s, showPressedNotes: !s.showPressedNotes })),
      toggleMetronome: () => setSettings((s) => ({ ...s, metronomeOn: !s.metronomeOn })),
      setTempo: (tempo) => setSettings((s) => ({ ...s, tempo })),
      setAudioReady: (audioReady) => setSettings((s) => ({ ...s, audioReady })),
      pressNote,
      releaseNote,
      subscribeActiveNotes,
      subscribeNotePlayed,
    }),
    [settings, activeNotes, pressNote, releaseNote, subscribeActiveNotes, subscribeNotePlayed],
  );

  return <PianoContext.Provider value={value}>{children}</PianoContext.Provider>;
}

export function usePiano() {
  const ctx = useContext(PianoContext);
  if (!ctx) throw new Error("usePiano must be used within a PianoProvider");
  return ctx;
}
