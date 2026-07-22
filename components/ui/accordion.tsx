"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItemData {
  id: string;
  question: string;
  answer: React.ReactNode;
}

export function Accordion({ items }: { items: AccordionItemData[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="divide-y divide-black/[0.06] dark:divide-white/[0.06]">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id}>
            <button
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-brass-500"
            >
              <span className={cn(
                "font-medium transition-colors",
                isOpen ? "text-brass-500" : "text-stage-800 dark:text-ivory-100",
              )}>
                {item.question}
              </span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 text-brass-500 transition-transform duration-300",
                  isOpen && "rotate-180",
                )}
              />
            </button>
            <div
              className={cn(
                "grid overflow-hidden transition-all duration-300 ease-out",
                isOpen ? "grid-rows-[1fr] opacity-100 pb-5" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="min-h-0 overflow-hidden text-sm leading-relaxed text-stage-500 dark:text-ivory-200/55">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
