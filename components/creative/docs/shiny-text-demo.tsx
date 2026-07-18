"use client";

import React, { useState } from "react";
import { ShinyText, ShinyVariant } from "@/components/creative/shiny-text";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, Zap, Snail, Activity } from "lucide-react";

const VARIANTS: {
  id: ShinyVariant;
  label: string;
  description: string;
  accent: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "standard",
    label: "Standard Shine",
    description: "A smooth, 3-second linear gradient shine that slides across the text.",
    accent: "#818cf8",
    icon: <Sparkles className="w-4 h-4" />
  },
  {
    id: "fast",
    label: "Fast Sweep",
    description: "A quicker 1.5-second linear gradient sweep for high energy UI.",
    accent: "#f43f5e",
    icon: <Zap className="w-4 h-4" />
  },
  {
    id: "slow",
    label: "Slow Reveal",
    description: "A deliberate 6-second sweep for ambient, subtle highlights.",
    accent: "#22d3ee",
    icon: <Snail className="w-4 h-4" />
  },
  {
    id: "pulse",
    label: "Glowing Pulse",
    description: "Instead of a sweep, the text globally pulses opacity and shadow.",
    accent: "#10b981",
    icon: <Activity className="w-4 h-4" />
  }
];

export interface ShinyTextDemoProps {
  variant?: ShinyVariant;
  text?: string;
}

export function ShinyTextDemo({
  variant = "standard",
  text = "Premium Features",
}: ShinyTextDemoProps) {
  const activeConfig = VARIANTS.find((v) => v.id === variant) || VARIANTS[0];

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full rounded-2xl border border-white/10 bg-zinc-950 relative overflow-hidden group">
        
        <div className="relative w-full h-[250px] flex items-center justify-center p-8 bg-grid-white/[0.02]">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight">
            <ShinyText 
              key={`${variant}-${text}`}
              text={text} 
              variant={variant}
            />
          </h2>
        </div>

        {/* Bottom info bar */}
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
              <span
                className="font-semibold mr-1.5"
                style={{ color: activeConfig.accent }}
              >
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
