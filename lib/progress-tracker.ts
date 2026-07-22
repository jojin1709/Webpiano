const STORAGE_KEY = "web-piano-progress";

interface SongProgress {
  completed: boolean;
  bestAccuracy: number;
  timesPlayed: number;
  lastPlayed: number;
}

type ProgressMap = Record<string, SongProgress>;

function loadProgress(): ProgressMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveProgress(progress: ProgressMap) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // localStorage full or unavailable
  }
}

export function getSongProgress(songId: string): SongProgress | null {
  const progress = loadProgress();
  return progress[songId] || null;
}

export function markSongPlayed(songId: string, accuracy: number) {
  const progress = loadProgress();
  const existing = progress[songId];

  progress[songId] = {
    completed: accuracy >= 80 || (existing?.completed ?? false),
    bestAccuracy: Math.max(accuracy, existing?.bestAccuracy ?? 0),
    timesPlayed: (existing?.timesPlayed ?? 0) + 1,
    lastPlayed: Date.now(),
  };

  saveProgress(progress);
}
