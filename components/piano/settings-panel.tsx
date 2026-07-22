"use client";

import { Sun, Moon, Monitor, Info } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { usePiano } from "@/lib/piano-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

const THEMES = [
  { id: "dark", label: "Dark", icon: Moon },
  { id: "light", label: "Light", icon: Sun },
  { id: "system", label: "System", icon: Monitor },
] as const;

const KEY_MAP_ROWS = [
  { keys: ["A", "W", "S", "E", "D", "F", "T", "G", "Y", "H", "U", "J"], notes: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"] },
  { keys: ["K", "O", "L", "P", ";"], notes: ["C", "C#", "D", "D#", "E"] },
];

export function SettingsPanel() {
  const { theme, setTheme } = useTheme();
  const { volumeDb, setVolumeDb, showLabels, toggleLabels } = usePiano();

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div>
            <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-stage-400 dark:text-ivory-200/35">Theme</p>
            <div className="flex gap-2">
              {THEMES.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setTheme(id)}
                  className={cn(
                    "flex flex-1 flex-col items-center gap-1.5 rounded-xl border px-3 py-3 text-xs font-medium transition-all duration-200",
                    theme === id
                      ? "border-brass-500/40 bg-brass-500/10 text-brass-600 dark:text-brass-400 shadow-sm"
                      : "border-black/10 dark:border-white/10 text-stage-500 dark:text-ivory-200/50 hover:border-black/20 dark:hover:border-white/20",
                  )}
                >
                  <Icon className="h-4 w-4" /> {label}
                </button>
              ))}
            </div>
          </div>

          <Slider
            label="Master Volume"
            valueLabel={`${volumeDb} dB`}
            min={-40}
            max={6}
            step={1}
            value={volumeDb}
            onChange={(e) => setVolumeDb(Number(e.target.value))}
          />

          <label className="flex items-center justify-between rounded-xl bg-black/[0.03] dark:bg-white/[0.04] px-4 py-3 text-sm cursor-pointer hover:bg-black/[0.05] dark:hover:bg-white/[0.06] transition-colors">
            <span>Show key labels</span>
            <input
              type="checkbox"
              checked={showLabels}
              onChange={toggleLabels}
              className="h-4 w-4 accent-brass-500 rounded"
            />
          </label>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Keyboard Layout</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm leading-relaxed text-stage-500 dark:text-ivory-200/50">
            Your computer keyboard mirrors the piano layout. The home row plays one octave; the
            QWERTY row above plays the next octave up.
          </p>
          <div className="space-y-2">
            {KEY_MAP_ROWS.map((row, ri) => (
              <div key={ri} className="flex flex-wrap gap-1.5">
                {row.keys.map((k, i) => (
                  <div
                    key={k}
                    className="flex flex-col items-center gap-0.5 rounded-lg border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/[0.03] px-2 py-1.5 min-w-[36px]"
                  >
                    <span className="font-mono text-xs font-semibold">{k}</span>
                    <span className="text-[10px] text-stage-400 dark:text-ivory-200/35">
                      {row.notes[i]}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-start gap-2 rounded-lg bg-brass-500/5 dark:bg-brass-500/10 px-3 py-2.5 text-[11px] leading-relaxed text-stage-500 dark:text-ivory-200/45">
            <Info className="h-3.5 w-3.5 shrink-0 mt-0.5 text-brass-500/60" />
            Hold Space for sustain. Adjust base octave and transpose from the Play tab to shift the mapping.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
