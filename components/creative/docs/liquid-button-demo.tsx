"use client";

import React, { useState } from "react";
import { LiquidButton, LiquidVariant } from "@/components/creative/liquid-button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Droplets, ArrowUpFromLine, ArrowRightFromLine } from "lucide-react";

const VARIANTS: {
  id: LiquidVariant;
  label: string;
  description: string;
  accent: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "gooey",
    label: "Gooey Center",
    description: "The liquid expands from the center with a strong gooey SVG filter.",
    accent: "#6366f1", // indigo
    icon: <Droplets className="w-4 h-4" />
  },
  {
    id: "fill",
    label: "Bottom Fill",
    description: "The liquid rises from the bottom of the button.",
    accent: "#06b6d4", // cyan
    icon: <ArrowUpFromLine className="w-4 h-4" />
  },
  {
    id: "swipe",
    label: "Side Swipe",
    description: "The liquid sweeps in from the left side.",
    accent: "#f59e0b", // amber
    icon: <ArrowRightFromLine className="w-4 h-4" />
  }
];

export interface LiquidButtonDemoProps {
  variant?: LiquidVariant;
  color?: string;
  withSound?: boolean;
}

export function LiquidButtonDemo({
  variant = "gooey",
  color = "#6366f1",
  withSound = true,
}: LiquidButtonDemoProps) {
  const activeConfig = VARIANTS.find((v) => v.id === variant) || VARIANTS[0];

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full rounded-2xl border border-white/10 bg-zinc-950 relative overflow-hidden group">
        <div className="relative w-full h-[300px] flex items-center justify-center p-8 bg-grid-white/[0.02]">
          <LiquidButton 
            variant={variant}
            color={color}
            withSound={withSound}
            className="text-lg px-10 py-5 text-black hover:text-white transition-colors duration-300"
          >
            Liquid Hover
          </LiquidButton>
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
