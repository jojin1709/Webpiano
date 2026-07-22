"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Piano as PianoIcon,
  Music,
  Target,
  GraduationCap,
  Settings as SettingsIcon,
  Home,
  Zap,
} from "lucide-react";
import { PianoProvider } from "@/lib/piano-context";
import { PianoKeyboard } from "@/components/piano/piano-keyboard";
import { PianoControls } from "@/components/piano/controls";
import { ChordDetector } from "@/components/piano/chord-detector";
import { Recorder } from "@/components/piano/recorder";
import { SongLibrary } from "@/components/piano/song-library";
import { PracticeMode } from "@/components/piano/practice-mode";
import { LearnMode } from "@/components/piano/learn-mode";
import { SettingsPanel } from "@/components/piano/settings-panel";
import { SheetMusic } from "@/components/piano/sheet-music";
import { MetronomeVisual } from "@/components/piano/metronome-visual";
import { ThemeToggle } from "@/components/theme-toggle";
import { Tabs } from "@/components/ui/tabs";
import { Song } from "@/lib/songs-data";

type TabId = "play" | "songs" | "practice" | "learn" | "settings";

const TABS = [
  { id: "play", label: "Play", icon: <PianoIcon className="h-4 w-4" /> },
  { id: "songs", label: "Songs", icon: <Music className="h-4 w-4" /> },
  { id: "practice", label: "Practice", icon: <Target className="h-4 w-4" /> },
  { id: "learn", label: "Learn", icon: <GraduationCap className="h-4 w-4" /> },
  { id: "settings", label: "Settings", icon: <SettingsIcon className="h-4 w-4" /> },
];

export default function PianoPage() {
  const [tab, setTab] = useState<TabId>("play");
  const [practiceSong, setPracticeSong] = useState<Song | undefined>(undefined);

  return (
    <PianoProvider>
      <div className="min-h-screen bg-ivory-50 dark:bg-stage-950">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-black/[0.06] dark:border-white/[0.08] bg-ivory-50/80 dark:bg-stage-950/80 backdrop-blur-xl">
          <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:px-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brass-400 to-brass-600 text-stage-950 shadow-md shadow-brass-500/20 transition-transform group-hover:scale-105">
                <PianoIcon className="h-4 w-4" />
              </div>
              <span className="font-display text-lg font-semibold tracking-tight">Web Piano</span>
            </Link>
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="hidden items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm text-stage-500 dark:text-ivory-200/60 hover:bg-black/5 dark:hover:bg-white/5 hover:text-stage-900 dark:hover:text-ivory-100 transition-colors sm:flex"
              >
                <Home className="h-3.5 w-3.5" /> Home
              </Link>
              <span className="hidden text-[11px] text-stage-400 dark:text-ivory-200/30 sm:inline">
                by{" "}
                <a
                  href="https://www.linkedin.com/in/jojin-john-74386b34a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brass-500/60 hover:text-brass-500 transition-colors"
                >
                  Jojin John
                </a>
              </span>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-6 md:px-6">
          {/* Tabs */}
          <div className="mb-5">
            <Tabs items={TABS} value={tab} onChange={(id) => setTab(id as TabId)} />
          </div>

          {/* Tab content with animation */}
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {tab === "play" && (
              <div className="grid gap-5 lg:grid-cols-3">
                <div className="space-y-5 lg:col-span-2">
                  <PianoControls />
                  <MetronomeVisual />
                  <PianoKeyboard />
                </div>
                <div className="space-y-5">
                  <SheetMusic />
                  <ChordDetector />
                  <Recorder />
                </div>
              </div>
            )}

            {tab === "songs" && (
              <div className="grid gap-5 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <SongLibrary
                    onPractice={(song) => {
                      setPracticeSong(song);
                      setTab("practice");
                    }}
                  />
                </div>
                <div className="space-y-5">
                  <PianoControls />
                </div>
              </div>
            )}

            {tab === "practice" && (
              <div className="grid gap-5 lg:grid-cols-3">
                <div className="space-y-5 lg:col-span-2">
                  <PracticeMode initialSong={practiceSong} />
                  <PianoKeyboard compact />
                </div>
                <div className="space-y-5">
                  <SheetMusic />
                  <ChordDetector />
                </div>
              </div>
            )}

            {tab === "learn" && (
              <div className="grid gap-5 lg:grid-cols-3">
                <div className="space-y-5 lg:col-span-2">
                  <LearnMode />
                  <PianoKeyboard compact />
                </div>
                <div className="space-y-5">
                  <SheetMusic />
                  <ChordDetector />
                </div>
              </div>
            )}

            {tab === "settings" && <SettingsPanel />}
          </motion.div>
        </main>
      </div>
    </PianoProvider>
  );
}
