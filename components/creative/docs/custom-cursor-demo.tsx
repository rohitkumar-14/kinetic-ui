"use client";

import React, { useState } from "react";
import { CustomCursor, CursorStyle } from "@/components/creative/custom-cursor";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { MousePointer2, CircleDot, Magnet, Lightbulb, Eclipse } from "lucide-react";

const VARIANTS: {
  id: CursorStyle;
  label: string;
  accent: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "dot",
    label: "Trailing Dot",
    accent: "#818cf8",
    description: "A small solid dot with an outer ring that smoothly trails behind your cursor.",
    icon: <CircleDot className="h-4 w-4" />
  },
  {
    id: "ring",
    label: "Hollow Ring",
    accent: "#22d3ee",
    description: "A minimalist hollow ring without the center dot. Scales up over interactive elements.",
    icon: <Eclipse className="h-4 w-4" />
  },
  {
    id: "glow",
    label: "Neon Glow",
    accent: "#f43f5e",
    description: "Emits an ambient radial glow around the cursor, creating a neon light effect.",
    icon: <Lightbulb className="h-4 w-4" />
  },
  {
    id: "morph",
    label: "Shape Morph",
    accent: "#f59e0b",
    description: "Outer ring morphs into a rounded square when hovering over interactive targets.",
    icon: <MousePointer2 className="h-4 w-4" />
  },
  {
    id: "magnet",
    label: "Magnetic Snapping",
    accent: "#a855f7",
    description: "The cursor expands drastically and changes border style to indicate a clickable area.",
    icon: <Magnet className="h-4 w-4" />
  }
];

export interface CustomCursorDemoProps {
  variant?: CursorStyle;
  color?: string;
  speed?: number;
  scale?: number;
}

export function CustomCursorDemo({
  variant = "dot",
  color,
  speed = 1.2,
  scale = 1
}: CustomCursorDemoProps) {
  const activeConfig = VARIANTS.find((v) => v.id === variant) || VARIANTS[0];
  const finalColor = color || activeConfig.accent;

  return (
    <div className="w-full flex flex-col gap-6 cursor-none">
      <div className="w-full rounded-2xl border border-white/10 bg-zinc-950 relative overflow-hidden group">
        
        {/* Render the active cursor */}
        <CustomCursor 
          key={`${variant}-${finalColor}-${speed}-${scale}`}
          variant={variant} 
          color={finalColor} 
          speed={speed}
          scale={scale}
        />

        <div className="relative w-full h-[400px] flex flex-col items-center justify-center p-8 text-center bg-grid-white/[0.02]">
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2 cursor-none">
            Move your mouse
          </h3>
          <p className="text-zinc-400 max-w-md mb-8 cursor-none">
            The custom cursor overrides the native pointer. Try hovering over the interactive elements below.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium transition-colors cursor-none border border-white/10">
              Hover Me
            </button>
            <a href="#" onClick={(e) => e.preventDefault()} className="text-zinc-300 hover:text-white underline underline-offset-4 cursor-none">
              Interactive Link
            </a>
            <div role="button" className="w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center hover:bg-zinc-700 transition-colors cursor-none">
              <MousePointer2 className="h-5 w-5 text-zinc-400" />
            </div>
          </div>
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
              className="text-sm text-zinc-400 max-w-lg cursor-none"
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
