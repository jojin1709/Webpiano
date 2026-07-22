"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePiano } from "@/lib/piano-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Simple note-to-position mapping for treble clef (simplified)
const NOTE_POSITIONS: Record<string, { line: number; isBlack: boolean }> = {
  C4: { line: 0, isBlack: false },
  "C#4": { line: 0, isBlack: true },
  D4: { line: 1, isBlack: false },
  "D#4": { line: 1, isBlack: true },
  E4: { line: 2, isBlack: false },
  F4: { line: 3, isBlack: false },
  "F#4": { line: 3, isBlack: true },
  G4: { line: 4, isBlack: false },
  "G#4": { line: 4, isBlack: true },
  A4: { line: 5, isBlack: false },
  "A#4": { line: 5, isBlack: true },
  B4: { line: 6, isBlack: false },
  C5: { line: 7, isBlack: false },
  "C#5": { line: 7, isBlack: true },
  D5: { line: 8, isBlack: false },
  "D#5": { line: 8, isBlack: true },
  E5: { line: 9, isBlack: false },
  F5: { line: 10, isBlack: false },
  "F#5": { line: 10, isBlack: true },
  G5: { line: 11, isBlack: false },
};

const STAFF_LINES = [2, 4, 6, 8, 10]; // Treble clef lines: E4, G4, B4, D5, F5

export function SheetMusic() {
  const { activeNotes } = usePiano();
  const [displayNotes, setDisplayNotes] = useState<string[]>([]);

  useEffect(() => {
    if (activeNotes.length > 0) {
      setDisplayNotes([...activeNotes]);
      const timer = setTimeout(() => setDisplayNotes([]), 2000);
      return () => clearTimeout(timer);
    }
  }, [activeNotes]);

  const staffHeight = 120;
  const lineSpacing = 10;
  const topOffset = 20;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sheet Music</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative rounded-xl bg-white dark:bg-ivory-50 p-4 overflow-hidden">
          {/* Staff lines */}
          <svg
            viewBox={`0 0 300 ${staffHeight}`}
            className="w-full h-auto"
            style={{ minHeight: 100 }}
          >
            {/* Draw staff lines */}
            {STAFF_LINES.map((line, i) => (
              <line
                key={i}
                x1="10"
                y1={topOffset + (5 - i) * lineSpacing * 2}
                x2="290"
                y2={topOffset + (5 - i) * lineSpacing * 2}
                stroke="#ccc"
                strokeWidth="1"
              />
            ))}

            {/* Treble clef symbol (simplified) */}
            <text
              x="15"
              y={topOffset + lineSpacing * 4}
              fontSize="36"
              fill="#333"
              fontFamily="serif"
            >
              𝄞
            </text>

            {/* Active notes */}
            {displayNotes.map((note) => {
              const pos = NOTE_POSITIONS[note];
              if (!pos) return null;

              const y = topOffset + (11 - pos.line) * lineSpacing;
              const x = 150 + Math.random() * 60 - 30;

              return (
                <motion.g
                  key={`${note}-${Date.now()}`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Ledger lines if needed */}
                  {pos.line <= 1 && (
                    <line
                      x1={x - 12}
                      y1={topOffset + 6 * lineSpacing}
                      x2={x + 12}
                      y2={topOffset + 6 * lineSpacing}
                      stroke="#333"
                      strokeWidth="1"
                    />
                  )}
                  {pos.line >= 10 && (
                    <line
                      x1={x - 12}
                      y1={topOffset + lineSpacing}
                      x2={x + 12}
                      y2={topOffset + lineSpacing}
                      stroke="#333"
                      strokeWidth="1"
                    />
                  )}

                  {/* Note head */}
                  <ellipse
                    cx={x}
                    cy={y}
                    rx="7"
                    ry="5"
                    fill={pos.isBlack ? "#333" : "#333"}
                    transform={`rotate(-15, ${x}, ${y})`}
                  />

                  {/* Note stem */}
                  <line
                    x1={pos.line % 2 === 0 ? x + 6 : x - 6}
                    y1={y}
                    x2={pos.line % 2 === 0 ? x + 6 : x - 6}
                    y2={y - 30}
                    stroke="#333"
                    strokeWidth="1.5"
                  />

                  {/* Sharp symbol for black keys */}
                  {pos.isBlack && (
                    <text
                      x={x - 14}
                      y={y + 4}
                      fontSize="12"
                      fill="#333"
                      fontFamily="serif"
                    >
                      #
                    </text>
                  )}
                </motion.g>
              );
            })}

            {/* No notes placeholder */}
            {displayNotes.length === 0 && (
              <text
                x="150"
                y={topOffset + lineSpacing * 4}
                textAnchor="middle"
                fontSize="12"
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
