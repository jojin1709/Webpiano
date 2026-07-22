"use client";

import { useEffect, useState, useRef } from "react";
import { usePiano } from "@/lib/piano-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Note-to-position mapping for treble clef staff
// Lines: E4(8), G4(10), B4(12), D5(14), F5(16)
// Spaces: F4(9), A4(11), C5(13), E5(15)
const NOTE_POSITIONS: Record<string, number> = {
  // Below staff
  C4: 6,
  "C#4": 6,
  D4: 7,
  "D#4": 7,
  E4: 8,
  F4: 9,
  "F#4": 9,
  // On staff
  G4: 10,
  "G#4": 10,
  A4: 11,
  "A#4": 11,
  B4: 12,
  C5: 13,
  "C#5": 13,
  D5: 14,
  "D#5": 14,
  E5: 15,
  F5: 16,
  "F#5": 16,
  // Above staff
  G5: 17,
  "G#5": 17,
  A5: 18,
  "A#5": 18,
  B5: 19,
  C6: 20,
  // Lower octave
  B3: 5,
  A3: 4,
  "A#3": 4,
  G3: 3,
  "G#3": 3,
  F3: 2,
  "F#3": 2,
  E3: 1,
  D3: 0,
  "D#3": 0,
  C3: -1,
};

interface DisplayNote {
  id: string;
  note: string;
  line: number;
  isBlack: boolean;
  timestamp: number;
}

const STAFF_LINES = [8, 10, 12, 14, 16]; // E4, G4, B4, D5, F5

export function SheetMusic() {
  const { activeNotes } = usePiano();
  const [displayNotes, setDisplayNotes] = useState<DisplayNote[]>([]);
  const prevNotesRef = useRef<Set<string>>(new Set());
  const counterRef = useRef(0);

  // Track newly pressed notes
  useEffect(() => {
    const currentSet = new Set(activeNotes);

    // Find notes that are new (in current but not in previous)
    activeNotes.forEach((note) => {
      if (!prevNotesRef.current.has(note)) {
        const line = NOTE_POSITIONS[note];
        if (line !== undefined) {
          counterRef.current++;
          setDisplayNotes((prev) => [
            ...prev.slice(-15), // Keep last 15 notes
            {
              id: `${note}-${counterRef.current}`,
              note,
              line,
              isBlack: note.includes("#"),
              timestamp: Date.now(),
            },
          ]);
        }
      }
    });

    prevNotesRef.current = currentSet;
  }, [activeNotes]);

  // Clear old notes after 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setDisplayNotes((prev) => prev.filter((n) => now - n.timestamp < 4000));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const svgWidth = 300;
  const svgHeight = 160;
  const staffTop = 20;
  const lineSpacing = 8;
  const staffCenter = staffTop + 60;

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
            style={{ minHeight: 120 }}
          >
            {/* Treble clef staff lines */}
            {STAFF_LINES.map((line, i) => {
              const y = staffCenter - line * lineSpacing;
              return (
                <line
                  key={i}
                  x1="25"
                  y1={y}
                  x2={svgWidth - 5}
                  y2={y}
                  stroke="#ccc"
                  strokeWidth="1"
                />
              );
            })}

            {/* Middle C ledger line (C4 = line 6) */}
            <line
              x1="80"
              y1={staffCenter - 6 * lineSpacing}
              x2="140"
              y2={staffCenter - 6 * lineSpacing}
              stroke="#ccc"
              strokeWidth="1"
              strokeDasharray="3,2"
            />

            {/* Treble clef symbol */}
            <text
              x="8"
              y={staffCenter - 10 * lineSpacing + 14}
              fontSize="48"
              fill="#888"
              fontFamily="serif"
            >
              𝄞
            </text>

            {/* Active notes */}
            {displayNotes.map((n) => {
              const y = staffCenter - n.line * lineSpacing;
              const x = 80 + (displayNotes.indexOf(n) % 10) * 20;

              return (
                <g key={n.id}>
                  {/* Ledger line below staff */}
                  {n.line <= 5 && (
                    <line
                      x1={x - 8}
                      y1={y}
                      x2={x + 8}
                      y2={y}
                      stroke="#555"
                      strokeWidth="1"
                    />
                  )}

                  {/* Ledger line above staff */}
                  {n.line >= 17 && (
                    <line
                      x1={x - 8}
                      y1={y}
                      x2={x + 8}
                      y2={y}
                      stroke="#555"
                      strokeWidth="1"
                    />
                  )}

                  {/* Sharp symbol */}
                  {n.isBlack && (
                    <text
                      x={x - 11}
                      y={y + 4}
                      fontSize="12"
                      fill="#333"
                      fontFamily="serif"
                    >
                      ♯
                    </text>
                  )}

                  {/* Note head */}
                  <ellipse
                    cx={x}
                    cy={y}
                    rx="5"
                    ry="3.5"
                    fill="#333"
                    transform={`rotate(-12, ${x}, ${y})`}
                  />

                  {/* Note stem */}
                  <line
                    x1={n.line >= 12 ? x - 4.5 : x + 4.5}
                    y1={y}
                    x2={n.line >= 12 ? x - 4.5 : x + 4.5}
                    y2={n.line >= 12 ? y + 24 : y - 24}
                    stroke="#333"
                    strokeWidth="1.2"
                  />
                </g>
              );
            })}

            {/* Empty state text */}
            {displayNotes.length === 0 && (
              <text
                x={svgWidth / 2}
                y={staffCenter - 20}
                textAnchor="middle"
                fontSize="11"
                fill="#aaa"
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
