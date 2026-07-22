"use client";

import * as Tone from "tone";

/**
 * Singleton audio engine wrapping Tone.js.
 *
 * Uses a sampled Salamander grand piano (the same public sample set used in
 * Tone.js's own examples) for realistic tone, and falls back to a tuned
 * synth voice if samples fail to load (e.g. offline). Exposes a small API
 * surface (attack/release/volume/sustain) so UI components never touch
 * Tone.js directly.
 */

type ReadyListener = () => void;

class AudioEngine {
  private sampler: Tone.Sampler | null = null;
  private fallbackSynth: Tone.PolySynth<Tone.Synth> | null = null;
  private limiter: Tone.Limiter | null = null;
  private started = false;
  private ready = false;
  private sustain = false;
  private heldBySustain = new Set<string>();
  private activeVoices = new Map<string, number>();
  private readyListeners: ReadyListener[] = [];

  /** Must be called from a user gesture (click/keydown) to unlock the WebAudio context. */
  async start(): Promise<void> {
    if (this.started) return;
    this.started = true;
    await Tone.start();

    this.limiter = new Tone.Limiter(-3).toDestination();

    this.fallbackSynth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "sine" },
      envelope: { attack: 0.005, decay: 0.5, sustain: 0.1, release: 1.2 },
    }).connect(this.limiter);
    this.fallbackSynth.volume.value = -18;

    const sampleUrls: Record<string, string> = {
      A0: "A0.mp3",
      C1: "C1.mp3",
      "D#1": "Ds1.mp3",
      "F#1": "Fs1.mp3",
      A1: "A1.mp3",
      C2: "C2.mp3",
      "D#2": "Ds2.mp3",
      "F#2": "Fs2.mp3",
      A2: "A2.mp3",
      C3: "C3.mp3",
      "D#3": "Ds3.mp3",
      "F#3": "Fs3.mp3",
      A3: "A3.mp3",
      C4: "C4.mp3",
      "D#4": "Ds4.mp3",
      "F#4": "Fs4.mp3",
      A4: "A4.mp3",
      C5: "C5.mp3",
      "D#5": "Ds5.mp3",
      "F#5": "Fs5.mp3",
      A5: "A5.mp3",
      C6: "C6.mp3",
      "D#6": "Ds6.mp3",
      "F#6": "Fs6.mp3",
      A6: "A6.mp3",
      C7: "C7.mp3",
      "D#7": "Ds7.mp3",
      "F#7": "Fs7.mp3",
      A7: "A7.mp3",
      C8: "C8.mp3",
    };

    await new Promise<void>((resolve) => {
      this.sampler = new Tone.Sampler({
        urls: sampleUrls,
        baseUrl: "https://tonejs.github.io/audio/salamander/",
        release: 1,
        onload: () => {
          this.ready = true;
          this.readyListeners.forEach((cb) => cb());
          resolve();
        },
        onerror: () => {
          // Samples failed (offline, blocked CDN, etc.) — fall back silently.
          this.ready = true;
          this.readyListeners.forEach((cb) => cb());
          resolve();
        },
      }).connect(this.limiter!);

      // Safety timeout in case onload/onerror never fires.
      setTimeout(() => resolve(), 6000);
    });
  }

  onReady(cb: ReadyListener) {
    if (this.ready) cb();
    else this.readyListeners.push(cb);
  }

  isRunning() {
    return this.started;
  }

  private voice() {
    return this.sampler?.loaded ? this.sampler : this.fallbackSynth;
  }

  setSustain(on: boolean) {
    this.sustain = on;
    if (!on && this.heldBySustain.size > 0) {
      const v = this.voice();
      this.heldBySustain.forEach((note) => v?.triggerRelease(note));
      this.heldBySustain.clear();
    }
  }

  setVolume(db: number) {
    if (this.sampler) this.sampler.volume.value = db;
    if (this.fallbackSynth) this.fallbackSynth.volume.value = db;
  }

  /** velocity: 0..1 */
  noteOn(note: string, velocity = 0.85) {
    const v = this.voice();
    if (!v) return;
    v.triggerAttack(note, Tone.now(), velocity);
    this.activeVoices.set(note, (this.activeVoices.get(note) ?? 0) + 1);
  }

  noteOff(note: string) {
    if (this.sustain) {
      this.heldBySustain.add(note);
      return;
    }
    const v = this.voice();
    v?.triggerRelease(note, Tone.now());
    this.activeVoices.delete(note);
  }

  /** Play a single note for a fixed duration (used by song playback / metronome demo notes). */
  playNoteFor(note: string, seconds: number, velocity = 0.85, time?: number) {
    const v = this.voice();
    v?.triggerAttackRelease(note, seconds, time, velocity);
  }

  releaseAll() {
    const v = this.voice();
    this.activeVoices.forEach((_, note) => v?.triggerRelease(note));
    this.activeVoices.clear();
    this.heldBySustain.clear();
  }
}

export const audioEngine = new AudioEngine();
