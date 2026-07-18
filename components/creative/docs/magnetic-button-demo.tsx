"use client";

import React, { useState } from "react";
import { MagneticButton, MagneticVariant } from "@/components/creative/magnetic-button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Magnet, Weight, Activity } from "lucide-react";

const VARIANTS: {
  id: MagneticVariant;
  label: string;
  description: string;
  accent: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "standard",
    label: "Standard Magnet",
    description: "A balanced spring physics configuration for a snappy pull.",
    accent: "#818cf8",
    icon: <Magnet className="w-4 h-4" />
  },
  {
    id: "heavy",
    label: "Heavy Mass",
    description: "High mass and damping. The button feels sluggish and heavy.",
    accent: "#f43f5e",
    icon: <Weight className="w-4 h-4" />
  },
  {
    id: "bouncy",
    label: "Highly Bouncy",
    description: "Low damping and high stiffness. The button wobbles enthusiastically.",
    accent: "#10b981",
    icon: <Activity className="w-4 h-4" />
  }
];

export interface MagneticButtonDemoProps {
  variant?: MagneticVariant;
  color?: string;
  withSound?: boolean;
}

export function MagneticButtonDemo({
  variant = "standard",
  color = "#818cf8",
  withSound = true,
}: MagneticButtonDemoProps) {
  const activeConfig = VARIANTS.find((v) => v.id === variant) || VARIANTS[0];

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full rounded-2xl border border-white/10 bg-zinc-950 relative overflow-hidden group">
        <div className="relative w-full h-[300px] flex items-center justify-center p-8 bg-grid-white/[0.02]">
          <MagneticButton 
            variant={variant}
            color={color}
            withSound={withSound}
            className="text-lg px-10 py-5"
          >
            Pull Me
          </MagneticButton>
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
