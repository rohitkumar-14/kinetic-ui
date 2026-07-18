"use client";

import React, { useState } from "react";
import { KineticTypography, KineticVariant } from "@/components/creative/kinetic-typography";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Magnet, Waves, ArrowUpRight, Cloud, Terminal } from "lucide-react";

const VARIANTS: {
  id: KineticVariant;
  label: string;
  description: string;
  accent: string;
  text: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "elastic",
    label: "3D Elastic",
    description: "Letters map to your cursor position, creating a 3D magnetic distortion spline.",
    accent: "#818cf8",
    text: "Kinetic",
    icon: <Magnet className="w-4 h-4" />
  },
  {
    id: "wave",
    label: "Sine Wave",
    description: "A continuous, staggered sine wave animation oscillating through the text.",
    accent: "#22d3ee",
    text: "Ocean Flow",
    icon: <Waves className="w-4 h-4" />
  },
  {
    id: "jump",
    label: "Hover Jump",
    description: "Individual letters spring upwards and change color when you hover over them.",
    accent: "#a855f7",
    text: "Interact",
    icon: <ArrowUpRight className="w-4 h-4" />
  },
  {
    id: "float",
    label: "Random Float",
    description: "Letters drift organically with randomized delays, distances, and rotations.",
    accent: "#f43f5e",
    text: "Dreamscape",
    icon: <Cloud className="w-4 h-4" />
  },
  {
    id: "decode",
    label: "Hacker Decode",
    description: "Scrambles letters through random characters before settling. Re-triggers on hover.",
    accent: "#10b981", // emerald-500
    text: "System.Init",
    icon: <Terminal className="w-4 h-4" />
  }
];

export interface KineticTypographyDemoProps {
  variant?: KineticVariant;
  text?: string;
}

export function KineticTypographyDemo({
  variant = "elastic",
  text = "Kinetic",
}: KineticTypographyDemoProps) {
  const activeConfig = VARIANTS.find((v) => v.id === variant) || VARIANTS[0];

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full rounded-2xl border border-white/10 bg-zinc-950 relative overflow-hidden group">
        
        <div className="relative w-full h-[350px] flex items-center justify-center p-8 bg-grid-white/[0.02]">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={variant}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <KineticTypography 
                key={`${variant}-${text}`}
                text={text} 
                variant={variant}
                intensity={60} 
                className="text-white drop-shadow-2xl" 
              />
            </motion.div>
          </AnimatePresence>

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
