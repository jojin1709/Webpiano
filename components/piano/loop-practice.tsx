"use client";

import { useState } from "react";
import { Repeat, SkipBack, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LoopPracticeProps {
  totalNotes: number;
  currentIndex: number;
  loopStart: number | null;
  loopEnd: number | null;
  loopEnabled: boolean;
  onSetLoopStart: (index: number | null) => void;
  onSetLoopEnd: (index: number | null) => void;
  onToggleLoop: (enabled: boolean) => void;
}

export function LoopPractice({
  totalNotes,
  currentIndex,
  loopStart,
  loopEnd,
  loopEnabled,
  onSetLoopStart,
  onSetLoopEnd,
  onToggleLoop,
}: LoopPracticeProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Button
        variant={loopEnabled ? "secondary" : "outline"}
        size="sm"
        onClick={() => onToggleLoop(!loopEnabled)}
        className={cn(
          "h-8 text-[11px]",
          loopEnabled && "bg-brass-500/20 text-brass-600 dark:text-brass-400"
        )}
      >
        <Repeat className="h-3.5 w-3.5" /> Loop
      </Button>

      {loopEnabled && (
        <>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSetLoopStart(loopStart === currentIndex ? null : currentIndex)}
            className={cn(
              "h-8 text-[11px]",
              loopStart !== null && "border-brass-500/40 text-brass-600 dark:text-brass-400"
            )}
          >
            <SkipBack className="h-3 w-3" /> Start
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onSetLoopEnd(loopEnd === currentIndex ? null : currentIndex)}
            className={cn(
              "h-8 text-[11px]",
              loopEnd !== null && "border-brass-500/40 text-brass-600 dark:text-brass-400"
            )}
          >
            End <SkipForward className="h-3 w-3" />
          </Button>

          <span className="text-[11px] text-stage-400 dark:text-ivory-200/35">
            {loopStart !== null && loopEnd !== null
              ? `Loop: ${loopStart + 1}-${loopEnd + 1} of ${totalNotes}`
              : loopStart !== null
              ? `Start: ${loopStart + 1} — set End`
              : "Set Start"}
          </span>
        </>
      )}
    </div>
  );
}
