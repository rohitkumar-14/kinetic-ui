"use client";

import React, { useState } from "react";
import { GlowButton, GlowVariant } from "@/components/creative/glow-button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, CircleDashed, Activity } from "lucide-react";

const VARIANTS: {
  id: GlowVariant;
  label: string;
  description: string;
  accent: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "center",
    label: "Center Glow",
    description: "A smooth radial gradient follows the cursor behind the button text.",
    accent: "#8b5cf6",
    icon: <Sparkles className="w-4 h-4" />
  },
  {
    id: "edge",
    label: "Edge Glow",
    description: "The gradient is masked to only reveal the 1px button border.",
    accent: "#10b981",
    icon: <CircleDashed className="w-4 h-4" />
  },
  {
    id: "pulse",
    label: "Pulsing Glow",
    description: "The glowing radius continuously pulses while following the cursor.",
    accent: "#f43f5e",
    icon: <Activity className="w-4 h-4" />
  }
];

export interface GlowButtonDemoProps {
  variant?: GlowVariant;
  glowColor?: string;
  withSound?: boolean;
}

export function GlowButtonDemo({
  variant = "center",
  glowColor = "#8b5cf6",
  withSound = true,
}: GlowButtonDemoProps) {
  const activeConfig = VARIANTS.find((v) => v.id === variant) || VARIANTS[0];

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full rounded-2xl border border-white/10 bg-zinc-950 relative overflow-hidden group">
        <div className="relative w-full h-[300px] flex items-center justify-center p-8 bg-grid-white/[0.02]">
          <GlowButton 
            variant={variant}
            glowColor={glowColor}
            withSound={withSound}
            className="text-lg px-10 py-5"
          >
            Hover Me
          </GlowButton>
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
              <span className="font-semibold mr-1.5" style={{ color: glowColor }}>
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
