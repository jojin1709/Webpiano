"use client";

import { useEffect, useState, useRef } from "react";
import { usePiano } from "@/lib/piano-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Full note-to-position mapping for treble and bass clef
const NOTE_POSITIONS: Record<string, { line: number; isBlack: boolean }> = {
  // Bass clef (below middle C)
  C2: { line: -8, isBlack: false },
  "C#2": { line: -8, isBlack: true },
  D2: { line: -7, isBlack: false },
  "D#2": { line: -7, isBlack: true },
  E2: { line: -6, isBlack: false },
  F2: { line: -5, isBlack: false },
  "F#2": { line: -5, isBlack: true },
  G2: { line: -4, isBlack: false },
  "G#2": { line: -4, isBlack: true },
  A2: { line: -3, isBlack: false },
  "A#2": { line: -3, isBlack: true },
  B2: { line: -2, isBlack: false },
  C3: { line: -1, isBlack: false },
  "C#3": { line: -1, isBlack: true },
  D3: { line: 0, isBlack: false },
  "D#3": { line: 0, isBlack: true },
  E3: { line: 1, isBlack: false },
  F3: { line: 2, isBlack: false },
  "F#3": { line: 2, isBlack: true },
  G3: { line: 3, isBlack: false },
  "G#3": { line: 3, isBlack: true },
  A3: { line: 4, isBlack: false },
  "A#3": { line: 4, isBlack: true },
  B3: { line: 5, isBlack: false },
  // Treble clef (middle C and above)
  C4: { line: 6, isBlack: false },
  "C#4": { line: 6, isBlack: true },
  D4: { line: 7, isBlack: false },
  "D#4": { line: 7, isBlack: true },
  E4: { line: 8, isBlack: false },
  F4: { line: 9, isBlack: false },
  "F#4": { line: 9, isBlack: true },
  G4: { line: 10, isBlack: false },
  "G#4": { line: 10, isBlack: true },
  A4: { line: 11, isBlack: false },
  "A#4": { line: 11, isBlack: true },
  B4: { line: 12, isBlack: false },
  C5: { line: 13, isBlack: false },
  "C#5": { line: 13, isBlack: true },
  D5: { line: 14, isBlack: false },
  "D#5": { line: 14, isBlack: true },
  E5: { line: 15, isBlack: false },
  F5: { line: 16, isBlack: false },
  "F#5": { line: 16, isBlack: true },
  G5: { line: 17, isBlack: false },
  "G#5": { line: 17, isBlack: true },
  A5: { line: 18, isBlack: false },
  "A#5": { line: 18, isBlack: true },
  B5: { line: 19, isBlack: false },
  C6: { line: 20, isBlack: false },
};

// Staff line positions (relative to note line positions)
// Treble clef: lines at E4(8), G4(10), B4(12), D5(14), F5(16)
// Bass clef: lines at G2(-4), B2(-2), D3(0), F3(2), A3(4)
const TREBLE_LINES = [8, 10, 12, 14, 16];
const BASS_LINES = [-4, -2, 0, 2, 4];

interface DisplayNote {
  id: string;
  note: string;
  x: number;
  y: number;
  line: number;
  isBlack: boolean;
  timestamp: number;
}

export function SheetMusic() {
  const { subscribeActiveNotes } = usePiano();
  const [notes, setNotes] = useState<DisplayNote[]>([]);
  const activeNotesRef = useRef<Set<string>>(new Set());
  const noteIdCounter = useRef(0);

  useEffect(() => {
    return subscribeActiveNotes((currentNotes) => {
      const newSet = new Set(currentNotes);

      // Find newly pressed notes
      currentNotes.forEach((note) => {
        if (!activeNotesRef.current.has(note)) {
          const pos = NOTE_POSITIONS[note];
          if (pos) {
            noteIdCounter.current++;
            const x = 80 + (noteIdCounter.current % 8) * 25;
            const y = 140 - pos.line * 8;
            setNotes((prev) => [
              ...prev.slice(-12), // Keep last 12 notes
              {
                id: `${note}-${noteIdCounter.current}`,
                note,
                x,
                y,
                line: pos.line,
                isBlack: pos.isBlack,
                timestamp: Date.now(),
              },
            ]);
          }
        }
      });

      activeNotesRef.current = newSet;
    });
  }, [subscribeActiveNotes]);

  // Clear old notes after 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setNotes((prev) => prev.filter((n) => now - n.timestamp < 5000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const svgWidth = 320;
  const svgHeight = 200;
  const lineSpacing = 8;
  const staffTop = 40;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sheet Music</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative rounded-xl bg-white dark:bg-ivory-50 p-3 overflow-hidden">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-auto"
            style={{ minHeight: 140 }}
          >
            {/* Treble clef staff lines */}
            {TREBLE_LINES.map((line, i) => {
              const y = staffTop + 80 - line * lineSpacing;
              return (
                <line
                  key={`treble-${i}`}
                  x1="30"
                  y1={y}
                  x2={svgWidth - 10}
                  y2={y}
                  stroke="#ddd"
                  strokeWidth="1"
                />
              );
            })}

            {/* Bass clef staff lines */}
            {BASS_LINES.map((line, i) => {
              const y = staffTop + 80 - line * lineSpacing;
              return (
                <line
                  key={`bass-${i}`}
                  x1="30"
                  y1={y}
                  x2={svgWidth - 10}
                  y2={y}
                  stroke="#ddd"
                  strokeWidth="1"
                />
              );
            })}

            {/* Middle C ledger line */}
            <line
              x1="30"
              y1={staffTop + 80 - 6 * lineSpacing}
              x2={svgWidth - 10}
              y2={staffTop + 80 - 6 * lineSpacing}
              stroke="#bbb"
              strokeWidth="1"
              strokeDasharray="4,2"
            />

            {/* Treble clef symbol */}
            <text
              x="12"
              y={staffTop + 80 - 11 * lineSpacing + 12}
              fontSize="40"
              fill="#666"
              fontFamily="serif"
            >
              𝄞
            </text>

            {/* Bass clef symbol */}
            <text
              x="14"
              y={staffTop + 80 - 2 * lineSpacing + 6}
              fontSize="28"
              fill="#666"
              fontFamily="serif"
            >
              𝄢
            </text>

            {/* Active notes */}
            {notes.map((n) => (
              <g key={n.id}>
                {/* Ledger lines */}
                {n.line < -4 && (
                  <line
                    x1={n.x - 10}
                    y1={staffTop + 80 - n.line * lineSpacing}
                    x2={n.x + 10}
                    y2={staffTop + 80 - n.line * lineSpacing}
                    stroke="#333"
                    strokeWidth="1"
                  />
                )}
                {n.line > 16 && (
                  <line
                    x1={n.x - 10}
                    y1={staffTop + 80 - n.line * lineSpacing}
                    x2={n.x + 10}
                    y2={staffTop + 80 - n.line * lineSpacing}
                    stroke="#333"
                    strokeWidth="1"
                  />
                )}

                {/* Sharp symbol */}
                {n.isBlack && (
                  <text
                    x={n.x - 12}
                    y={staffTop + 80 - n.line * lineSpacing + 4}
                    fontSize="11"
                    fill="#333"
                    fontFamily="serif"
                  >
                    #
                  </text>
                )}

                {/* Note head */}
                <ellipse
                  cx={n.x}
                  cy={staffTop + 80 - n.line * lineSpacing}
                  rx="5.5"
                  ry="4"
                  fill="#333"
                  transform={`rotate(-12, ${n.x}, ${staffTop + 80 - n.line * lineSpacing})`}
                />

                {/* Note stem */}
                <line
                  x1={n.line % 2 === 0 ? n.x + 5 : n.x - 5}
                  y1={staffTop + 80 - n.line * lineSpacing}
                  x2={n.line % 2 === 0 ? n.x + 5 : n.x - 5}
                  y2={staffTop + 80 - n.line * lineSpacing - 28}
                  stroke="#333"
                  strokeWidth="1.2"
                />
              </g>
            ))}

            {/* Empty state */}
            {notes.length === 0 && (
              <text
                x={svgWidth / 2}
                y={svgHeight / 2}
                textAnchor="middle"
                fontSize="11"
                fill="#999"
                fontFamily="sans-serif"
              >
                Play notes to see them here
              </text>
            )}
          </svg>
        </div>
        <p className="mt-2 text-[11px] text-stage-400 dark:text-ivory-200/35 text-center">
          Notes appear on the staff as you play them
        </p>
      </CardContent>
    </Card>
  );
}
