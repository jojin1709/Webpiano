"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePiano } from "@/lib/piano-context";

export function MetronomeVisual() {
  const { metronomeOn, tempo } = usePiano();
  const [beat, setBeat] = useState(0);
  const [flash, setFlash] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startMetronome = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    const ms = (60 / tempo) * 1000;
    let count = 0;
    intervalRef.current = setInterval(() => {
      count = (count + 1) % 4;
      setBeat(count);
      setFlash(true);
      setTimeout(() => setFlash(false), 100);
    }, ms);
  }, [tempo]);

  useEffect(() => {
    if (metronomeOn) {
      startMetronome();
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setBeat(0);
      setFlash(false);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [metronomeOn, tempo, startMetronome]);

  if (!metronomeOn) return null;

  return (
    <div className="flex items-center justify-center gap-3 py-3">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className={`h-4 w-4 rounded-full transition-colors duration-75 ${
            beat === i
              ? "bg-brass-500 shadow-[0_0_12px_rgba(200,155,93,0.6)]"
              : "bg-stage-300/30 dark:bg-white/10"
          }`}
          animate={beat === i ? { scale: [1, 1.3, 1] } : { scale: 1 }}
          transition={{ duration: 0.15 }}
        />
      ))}
      {/* Flash overlay */}
      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ opacity: 0.15 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-brass-500 pointer-events-none z-50"
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Count-in component for recording
export function CountIn({ active, onReady }: { active: boolean; onReady: () => void }) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const { tempo } = usePiano();

  useEffect(() => {
    if (!active) {
      setVisible(false);
      setCount(0);
      return;
    }

    setVisible(true);
    let current = 0;
    const ms = (60 / tempo) * 1000;

    const interval = setInterval(() => {
      current++;
      if (current <= 4) {
        setCount(current);
      } else {
        clearInterval(interval);
        setVisible(false);
        onReady();
      }
    }, ms);

    return () => clearInterval(interval);
  }, [active, tempo, onReady]);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <div className="text-center">
        <motion.div
          key={count}
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="font-display text-8xl font-bold text-brass-500"
        >
          {count <= 4 ? count : "GO!"}
        </motion.div>
        <p className="mt-4 text-sm text-ivory-200/60">Get ready...</p>
      </div>
    </motion.div>
  );
}
