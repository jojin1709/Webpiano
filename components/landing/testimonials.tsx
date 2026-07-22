"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "I practice ear training on the bus with nothing but my laptop keyboard. The chord detector alone has taught me more theory than a semester of lessons.",
    name: "Maya R.",
    role: "Self-taught pianist",
    stars: 5,
  },
  {
    quote:
      "The realistic sound quality caught me off guard — I genuinely forgot I wasn't sitting at an upright for a second.",
    name: "Daniel O.",
    role: "Music teacher",
    stars: 5,
  },
  {
    quote:
      "My kids fight over whose turn it is on the practice mode. Never thought I'd say that about a piano app.",
    name: "Priya K.",
    role: "Parent",
    stars: 5,
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <div className="mb-12 text-center">
        <p className="mb-2 text-sm font-medium text-brass-500">What people are playing</p>
        <h2 className="font-display text-3xl font-medium sm:text-4xl">Loved by hobbyists and teachers alike</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Card className="h-full transition-transform hover:-translate-y-1 hover:shadow-lg hover:shadow-brass-500/5">
              <CardContent className="pt-6">
                {/* Stars */}
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-brass-400 text-brass-400" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-stage-600 dark:text-ivory-200/70">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brass-400 to-brass-600 font-display text-sm font-semibold text-stage-950 shadow-sm shadow-brass-500/20">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-[11px] text-stage-400 dark:text-ivory-200/40">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
