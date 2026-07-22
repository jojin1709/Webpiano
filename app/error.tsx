"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-ivory-50 px-6 text-center dark:bg-stage-950">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ember/15 text-ember">
        <AlertTriangle className="h-7 w-7" />
      </div>
      <h1 className="font-display text-3xl font-medium">Something went out of tune</h1>
      <p className="max-w-md text-stage-600 dark:text-ivory-200/60">
        An unexpected error stopped the instrument from loading. You can try again, or head back
        to the homepage.
      </p>
      <Button onClick={reset} size="lg">
        <RotateCcw className="h-4 w-4" /> Try again
      </Button>
    </div>
  );
}
