"use client";

import React, { useState } from "react";
import { CardStack, CardStackVariant } from "@/components/creative/card-stack";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownToLine, ArrowUpToLine, ArrowLeftToLine, Wind } from "lucide-react";

const DEMO_CARDS = [
  {
    id: 1,
    content: (
      <div className="flex h-56 w-56 flex-col justify-between rounded-3xl bg-zinc-900 p-6 shadow-xl border border-white/10">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-blue-500/20" />
          <div>
            <p className="text-sm font-medium text-white">Alice Johnson</p>
            <p className="text-xs text-zinc-400">Senior Designer</p>
          </div>
        </div>
        <p className="text-sm text-zinc-300">
          "The best UI library I have ever used. Period."
        </p>
      </div>
    ),
  },
  {
    id: 2,
    content: (
      <div className="flex h-56 w-56 flex-col justify-between rounded-3xl bg-zinc-900 p-6 shadow-xl border border-white/10">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-emerald-500/20" />
          <div>
            <p className="text-sm font-medium text-white">Bob Smith</p>
            <p className="text-xs text-zinc-400">Frontend Engineer</p>
          </div>
        </div>
        <p className="text-sm text-zinc-300">
          "Saved me literal weeks of development time. Insanely good."
        </p>
      </div>
    ),
  },
  {
    id: 3,
    content: (
      <div className="flex h-56 w-56 flex-col justify-between rounded-3xl bg-zinc-900 p-6 shadow-xl border border-white/10">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-rose-500/20" />
          <div>
            <p className="text-sm font-medium text-white">Carol White</p>
            <p className="text-xs text-zinc-400">Product Manager</p>
          </div>
        </div>
        <p className="text-sm text-zinc-300">
          "Our conversion rates doubled after switching to this."
        </p>
      </div>
    ),
  },
];

const VARIANTS: {
  id: CardStackVariant;
  label: string;
  description: string;
  accent: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "bottom",
    label: "Stack Down",
    description: "Cards cascade downwards along the Y-axis.",
    accent: "#818cf8",
    icon: <ArrowDownToLine className="w-4 h-4" />
  },
  {
    id: "top",
    label: "Stack Up",
    description: "Cards cascade upwards along the Y-axis.",
    accent: "#f43f5e",
    icon: <ArrowUpToLine className="w-4 h-4" />
  },
  {
    id: "left",
    label: "Stack Left",
    description: "Cards cascade leftwards along the X-axis.",
    accent: "#10b981",
    icon: <ArrowLeftToLine className="w-4 h-4" />
  },
  {
    id: "fan",
    label: "Messy Fan",
    description: "Cards are fanned out with alternating Z-rotations.",
    accent: "#f59e0b",
    icon: <Wind className="w-4 h-4" />
  }
];

export interface CardStackDemoProps {
  variant?: CardStackVariant;
  offset?: number;
}

export function CardStackDemo({
  variant = "bottom",
  offset = 12,
}: CardStackDemoProps) {
  const activeConfig = VARIANTS.find((v) => v.id === variant) || VARIANTS[0];

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full rounded-2xl border border-white/10 bg-zinc-950 relative overflow-hidden group">
        <div className="relative w-full h-[450px] flex items-center justify-center p-8 bg-grid-white/[0.02]">
          <CardStack 
            items={DEMO_CARDS} 
            variant={variant}
            offset={offset} 
            scaleFactor={0.06} 
          />
        </div>

        <div className="border-t border-white/5 px-6 md:px-10 py-4 flex items-center justify-between">
          <AnimatePresence mode="wait">
            <motion.p
              key={variant}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="text-sm text-zinc-400 max-w-lg"
            >
              <span className="font-semibold mr-1.5" style={{ color: activeConfig.accent }}>
                {activeConfig.label}:
              </span>
              {activeConfig.description}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
