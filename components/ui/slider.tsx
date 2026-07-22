import React from "react";
import { cn } from "@/lib/utils";

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  valueLabel?: string;
}

export function Slider({ label, valueLabel, className, ...props }: SliderProps) {
  return (
    <div className="w-full min-w-0">
      {(label || valueLabel) && (
        <div className="mb-1.5 flex items-center justify-between gap-1 text-[11px]">
          <span className="truncate text-stage-500 dark:text-ivory-200/60">{label}</span>
          <span className="shrink-0 font-mono text-[11px] font-medium text-stage-700 dark:text-ivory-100">
            {valueLabel}
          </span>
        </div>
      )}
      <input
        type="range"
        className={cn(
          "h-1.5 w-full cursor-pointer appearance-none rounded-full bg-black/10 dark:bg-white/10 accent-brass-500",
          "[&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brass-500 [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150 [&::-webkit-slider-thumb]:hover:scale-125",
          "[&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-brass-500 [&::-moz-range-thumb]:shadow-md",
          className,
        )}
        {...props}
      />
    </div>
  );
}
