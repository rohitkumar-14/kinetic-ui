"use client";

import React, { useState } from "react";
import { TiltCard, TiltVariant } from "@/components/creative/tilt-card";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Rotate3D, ArrowDownUp, RefreshCcw } from "lucide-react";

const VARIANTS: {
  id: TiltVariant;
  label: string;
  description: string;
  accent: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "standard",
    label: "Standard Tilt",
    description: "Tilts towards your cursor creating a 3D popping effect.",
    accent: "#818cf8",
    icon: <Rotate3D className="w-4 h-4" />
  },
  {
    id: "reverse",
    label: "Reverse Tilt",
    description: "Tilts away from your cursor for a concave feeling.",
    accent: "#f43f5e",
    icon: <RefreshCcw className="w-4 h-4" />
  },
  {
    id: "push",
    label: "Push Depth",
    description: "Pushes the card backwards on the Z-axis as you move away from the center.",
    accent: "#10b981",
    icon: <ArrowDownUp className="w-4 h-4" />
  }
];

export interface TiltCardDemoProps {
  variant?: TiltVariant;
  color?: string;
}

export function TiltCardDemo({
  variant = "standard",
  color = "#818cf8",
}: TiltCardDemoProps) {
  const activeConfig = VARIANTS.find((v) => v.id === variant) || VARIANTS[0];

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full rounded-2xl border border-white/10 bg-zinc-950 relative overflow-hidden group">
        <div className="relative w-full h-[400px] flex items-center justify-center p-8 bg-grid-white/[0.02]">
          <TiltCard 
            variant={variant}
            color={color}
            tiltIntensity={25}
            className="w-full max-w-sm h-64 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center bg-white/10" style={{ color: color }}>
                {activeConfig.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Interactive Depth</h3>
              <p className="text-zinc-400 text-sm">
                Framer Motion spring physics create an incredibly smooth 3D hovering experience.
              </p>
            </div>
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
              <span className="text-xs font-mono text-zinc-500">variant="{variant}"</span>
              <div className="w-6 h-6 rounded-full bg-white/5" />
            </div>
          </TiltCard>
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
              <span className="font-semibold mr-1.5" style={{ color: color }}>
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
