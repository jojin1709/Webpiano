"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export function Tabs({
  items,
  value,
  onChange,
}: {
  items: TabItem[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Piano sections"
      className="inline-flex items-center gap-0.5 rounded-xl bg-black/[0.04] dark:bg-white/[0.05] p-1"
    >
      {items.map((item) => {
        const active = item.id === value;
        return (
          <button
            key={item.id}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(item.id)}
            className={cn(
              "relative flex shrink-0 items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 whitespace-nowrap",
              active
                ? "bg-white dark:bg-stage-700 text-stage-950 dark:text-ivory-100 shadow-sm"
                : "text-stage-500 dark:text-ivory-200/50 hover:text-stage-800 dark:hover:text-ivory-100/80 hover:bg-black/[0.03] dark:hover:bg-white/[0.03]",
            )}
          >
            {item.icon}
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
