import { Piano } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-ivory-50 dark:bg-stage-950">
      <div className="flex h-12 w-12 animate-pulse items-center justify-center rounded-xl bg-brass-500 text-stage-950">
        <Piano className="h-6 w-6" />
      </div>
      <p className="text-sm text-stage-500 dark:text-ivory-200/50">Tuning the piano…</p>
    </div>
  );
}
