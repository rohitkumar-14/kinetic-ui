"use client";

import React, { useState } from "react";
import { SpotlightCursor, SpotlightEffect } from "@/components/creative/spotlight-cursor";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutGrid, Layers, Hexagon, Circle, Shield } from "lucide-react";

const VARIANTS: {
  id: SpotlightEffect;
  label: string;
  accent: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "glow",
    label: "Soft Glow",
    accent: "#818cf8",
    description: "A classic soft radial gradient that acts as a subtle flashlight.",
    icon: <Circle className="h-4 w-4" />
  },
  {
    id: "reveal",
    label: "Dark Reveal",
    accent: "#f43f5e",
    description: "The container is darkened, and the cursor acts as a peephole revealing the content.",
    icon: <Shield className="h-4 w-4" />
  },
  {
    id: "border",
    label: "Magic Border",
    accent: "#22d3ee",
    description: "Combines a soft glow with a hard mask, creating a magical magnifying glass effect.",
    icon: <Hexagon className="h-4 w-4" />
  },
  {
    id: "gradient",
    label: "Multi Gradient",
    accent: "#f59e0b",
    description: "A complex multi-stop gradient for a richer, more vibrant spotlight.",
    icon: <Layers className="h-4 w-4" />
  },
  {
    id: "halo",
    label: "Ring Halo",
    accent: "#a855f7",
    description: "A hollow ring effect that tracks the cursor like an ethereal halo.",
    icon: <LayoutGrid className="h-4 w-4" />
  }
];

export interface SpotlightCursorDemoProps {
  effect?: SpotlightEffect;
  color?: string;
  spotlightSize?: number;
}

export function SpotlightCursorDemo({
  effect = "glow",
  color,
  spotlightSize
}: SpotlightCursorDemoProps) {
  const activeConfig = VARIANTS.find((v) => v.id === effect) || VARIANTS[0];
  const finalColor = color || activeConfig.accent;
  const finalSize = spotlightSize || (effect === 'border' ? 600 : 400);

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full rounded-2xl border border-white/10 bg-zinc-950 relative overflow-hidden">
        
        <SpotlightCursor 
          effect={effect} 
          color={finalColor}
          spotlightSize={finalSize}
          className="w-full h-[450px] flex items-center justify-center bg-black/50"
        >
          {/* Background pattern for depth */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />

          {/* Grid content */}
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 p-8 md:p-12 w-full h-full pointer-events-none">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div 
                key={i} 
                className="rounded-2xl border border-white/10 bg-zinc-900/40 backdrop-blur-sm p-6 flex flex-col items-center justify-center gap-3 transition-colors duration-500"
              >
                <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center" />
                <div className="space-y-2 w-full flex flex-col items-center">
                  <div className="h-2 w-16 bg-white/10 rounded-full" />
                  <div className="h-1.5 w-24 bg-white/5 rounded-full" />
                </div>
              </div>
            ))}
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-white/50 text-center mix-blend-overlay">
              Hover to reveal
            </h3>
          </div>
        </SpotlightCursor>

        {/* Bottom info bar */}
        <div className="border-t border-white/5 px-6 md:px-10 py-4 flex items-center justify-between">
          <AnimatePresence mode="wait">
            <motion.p
              key={effect}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="text-sm text-zinc-400 max-w-lg"
            >
              <span
                className="font-semibold mr-1.5"
                style={{ color: finalColor }}
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
