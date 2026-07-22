"use client";

import Link from "next/link";
import { Piano } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

const NAV = [
  { label: "Features", href: "#features" },
  { label: "Preview", href: "#preview" },
  { label: "Songs", href: "#songs" },
  { label: "FAQ", href: "#faq" },
];

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/[0.06] dark:border-white/[0.08] bg-ivory-50/70 dark:bg-stage-950/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brass-400 to-brass-600 text-stage-950 shadow-md shadow-brass-500/20 transition-transform group-hover:scale-105">
            <Piano className="h-4 w-4" />
          </div>
          <span className="font-display text-lg font-semibold tracking-tight">Web Piano</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-stage-500 dark:text-ivory-200/55 hover:text-stage-900 dark:hover:text-ivory-100 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/piano">
            <Button size="sm">Play Now</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
