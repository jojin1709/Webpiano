"use client";

import { useEffect, useRef, useState } from "react";
import {
  Volume2,
  Maximize,
  Minimize,
  Tag,
  Music2,
  ArrowLeftRight,
  Piano as PianoIcon,
  Zap,
} from "lucide-react";
import * as Tone from "tone";
import { usePiano } from "@/lib/piano-context";
import { PianoSize } from "@/lib/note-utils";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { audioEngine } from "@/lib/audio-engine";
import { cn } from "@/lib/utils";

const SIZES: PianoSize[] = [49, 61, 88];

export function PianoControls() {
  const {
    pianoSize,
    setPianoSize,
    baseOctave,
    setBaseOctave,
    transpose,
    setTranspose,
    volumeDb,
    setVolumeDb,
    showLabels,
    toggleLabels,
    showPressedNotes,
    togglePressedNotes,
    metronomeOn,
    toggleMetronome,
    tempo,
    setTempo,
  } = usePiano();

  const [isFullscreen, setIsFullscreen] = useState(false);
  const clickLoop = useRef<Tone.Loop | null>(null);
  const clickSynth = useRef<Tone.MembraneSynth | null>(null);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  useEffect(() => {
    Tone.getTransport().bpm.value = tempo;
  }, [tempo]);

  useEffect(() => {
    if (!metronomeOn) {
      clickLoop.current?.dispose();
      clickLoop.current = null;
      clickSynth.current?.dispose();
      clickSynth.current = null;
      Tone.getTransport().stop();
      return;
    }
    if (!audioEngine.isRunning()) return;

    clickSynth.current = new Tone.MembraneSynth({
      pitchDecay: 0.01,
      octaves: 4,
      oscillator: { type: "sine" },
      envelope: { attack: 0.001, decay: 0.08, sustain: 0, release: 0.05 },
    }).toDestination();
    clickSynth.current.volume.value = -12;

    clickLoop.current = new Tone.Loop((time) => {
      clickSynth.current?.triggerAttackRelease("C2", 0.03, time, 0.3);
    }, "4n").start(0);
    Tone.getTransport().start();

    return () => {
      clickLoop.current?.dispose();
      clickLoop.current = null;
      clickSynth.current?.dispose();
      clickSynth.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metronomeOn]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white/70 dark:bg-stage-800/50 p-3 md:flex-row md:items-center md:justify-between">
      {/* Sliders row */}
      <div className="grid flex-1 grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-4">
        <Slider
          label="Vol"
          valueLabel={`${volumeDb} dB`}
          min={-40}
          max={6}
          step={1}
          value={volumeDb}
          onChange={(e) => setVolumeDb(Number(e.target.value))}
        />
        <Slider
          label="Oct"
          valueLabel={`${baseOctave}`}
          min={0}
          max={6}
          step={1}
          value={baseOctave}
          onChange={(e) => setBaseOctave(Number(e.target.value))}
        />
        <Slider
          label="Trans"
          valueLabel={transpose > 0 ? `+${transpose}` : `${transpose}`}
          min={-12}
          max={12}
          step={1}
          value={transpose}
          onChange={(e) => setTranspose(Number(e.target.value))}
        />
        <Slider
          label="BPM"
          valueLabel={`${tempo}`}
          min={40}
          max={220}
          step={1}
          value={tempo}
          onChange={(e) => setTempo(Number(e.target.value))}
        />
      </div>

      {/* Buttons row */}
      <div className="flex flex-wrap items-center gap-1.5">
        {/* Piano size selector */}
        <div className="flex items-center rounded-lg bg-black/5 dark:bg-white/5 p-0.5">
          {SIZES.map((s) => (
            <button
              key={s}
              onClick={() => setPianoSize(s)}
              className={cn(
                "flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition-all duration-200",
                pianoSize === s
                  ? "bg-white dark:bg-stage-700 text-stage-950 dark:text-ivory-100 shadow-sm"
                  : "text-stage-500 dark:text-ivory-200/50 hover:text-stage-700 dark:hover:text-ivory-200/80",
              )}
            >
              <PianoIcon className="h-3 w-3" /> {s}
            </button>
          ))}
        </div>

        <div className="h-5 w-px bg-black/10 dark:bg-white/10 hidden sm:block" />

        {/* Toggle buttons */}
        <Button
          variant={showLabels ? "secondary" : "outline"}
          size="icon"
          aria-pressed={showLabels}
          aria-label="Toggle key labels"
          onClick={toggleLabels}
          className="h-8 w-8"
        >
          <Tag className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant={showPressedNotes ? "secondary" : "outline"}
          size="icon"
          aria-pressed={showPressedNotes}
          aria-label="Toggle pressed-note display"
          onClick={togglePressedNotes}
          className="h-8 w-8"
        >
          <ArrowLeftRight className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant={metronomeOn ? "secondary" : "outline"}
          size="icon"
          aria-pressed={metronomeOn}
          aria-label="Toggle metronome"
          onClick={toggleMetronome}
          className={cn("h-8 w-8", metronomeOn && "bg-brass-500/20 text-brass-600 dark:text-brass-400")}
        >
          <Music2 className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          aria-label="Toggle fullscreen"
          onClick={toggleFullscreen}
          className="h-8 w-8"
        >
          {isFullscreen ? <Minimize className="h-3.5 w-3.5" /> : <Maximize className="h-3.5 w-3.5" />}
        </Button>

        <div className="h-5 w-px bg-black/10 dark:bg-white/10 hidden sm:block" />

        {/* Sustain hint */}
        <div className="hidden sm:flex items-center gap-1.5 rounded-lg border border-black/10 dark:border-white/10 px-2.5 py-1.5 text-[11px] text-stage-500 dark:text-ivory-200/60">
          <Zap className="h-3 w-3 text-brass-500" /> Space = Sustain
        </div>
      </div>
    </div>
  );
}
