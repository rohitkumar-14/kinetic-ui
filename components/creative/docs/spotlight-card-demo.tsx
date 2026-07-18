"use client";

import React, { useState } from "react";
import { SpotlightCard, SpotlightVariant } from "@/components/creative/spotlight-card";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { CircleDot, Sparkles, Zap, Activity } from "lucide-react";

const VARIANTS: {
  id: SpotlightVariant;
  label: string;
  description: string;
  accent: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "soft",
    label: "Soft Glow",
    description: "A wide, subtle radial gradient that smoothly tracks the cursor.",
    accent: "#818cf8",
    icon: <Sparkles className="w-4 h-4" />
  },
  {
    id: "strong",
    label: "Strong Edge",
    description: "A tighter spotlight with a sharper falloff edge.",
    accent: "#f43f5e",
    icon: <Zap className="w-4 h-4" />
  },
  {
    id: "ring",
    label: "Hollow Ring",
    description: "A hollow ring gradient instead of a solid circle.",
    accent: "#10b981",
    icon: <CircleDot className="w-4 h-4" />
  },
  {
    id: "pulse",
    label: "Breathing Pulse",
    description: "The spotlight slowly oscillates in size while following the cursor.",
    accent: "#22d3ee",
    icon: <Activity className="w-4 h-4" />
  }
];

export interface SpotlightCardDemoProps {
  variant?: SpotlightVariant;
  color?: string;
}

export function SpotlightCardDemo({
  variant = "soft",
  color = "rgba(99, 102, 241, 0.15)",
}: SpotlightCardDemoProps) {
  const activeConfig = VARIANTS.find((v) => v.id === variant) || VARIANTS[0];

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full rounded-2xl border border-white/10 bg-zinc-950 relative overflow-hidden group">
        <div className="relative w-full h-[400px] flex items-center justify-center p-8 bg-grid-white/[0.02]">
          <SpotlightCard 
            variant={variant}
            color={color}
            className="w-full max-w-sm h-64 p-8 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center bg-white/5 border border-white/10" style={{ color: activeConfig.accent }}>
                {activeConfig.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Dynamic Lighting</h3>
              <p className="text-zinc-400 text-sm">
                Move your cursor over this card to reveal the underlying background lighting effect.
              </p>
            </div>
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
              <span className="text-xs font-mono text-zinc-500">variant="{variant}"</span>
            </div>
          </SpotlightCard>
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
