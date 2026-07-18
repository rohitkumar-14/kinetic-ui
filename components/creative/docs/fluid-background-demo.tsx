"use client";

import React, { useState } from "react";
import { FluidBackground } from "@/components/creative/fluid-background";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

const VARIANTS = [
  { 
    id: "ocean", 
    label: "Deep Ocean", 
    accent: "#3b82f6",
    config: { color1: "#1d4ed8", color2: "#2dd4bf", color3: "#020617", speed: 0.8 }
  },
  { 
    id: "magma", 
    label: "Magma Core", 
    accent: "#ef4444",
    config: { color1: "#ea580c", color2: "#e11d48", color3: "#450a0a", speed: 1.2 }
  },
  { 
    id: "aurora", 
    label: "Aurora Borealis", 
    accent: "#10b981",
    config: { color1: "#10b981", color2: "#8b5cf6", color3: "#022c22", speed: 0.6 }
  },
  { 
    id: "monochrome", 
    label: "Monochrome Smoke", 
    accent: "#a1a1aa",
    config: { color1: "#52525b", color2: "#a1a1aa", color3: "#09090b", speed: 1.0 }
  },
] as const;

type VariantId = (typeof VARIANTS)[number]["id"];

export interface FluidBackgroundDemoProps {
  variant?: VariantId;
}

export function FluidBackgroundDemo({
  variant = "ocean"
}: FluidBackgroundDemoProps) {
  const activeVariant = variant;
  const v = VARIANTS.find(variantConfig => variantConfig.id === activeVariant) || VARIANTS[0];

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full rounded-2xl border border-white/10 bg-black h-[500px] flex items-center justify-center relative overflow-hidden group">
        
        <AnimatePresence mode="wait">
          <motion.div
            key={v.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <FluidBackground 
              color1={v.config.color1} 
              color2={v.config.color2} 
              color3={v.config.color3}
              speed={v.config.speed}
            />
          </motion.div>
        </AnimatePresence>

        {/* Foreground Content to demonstrate usage */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 mix-blend-difference">
          <motion.h3 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            key={`title-${activeVariant}`}
            className="text-4xl md:text-5xl font-black text-white tracking-tight"
          >
            Move your cursor
          </motion.h3>
          <motion.p 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            key={`desc-${activeVariant}`}
            className="text-zinc-300 mt-4 max-w-sm text-sm"
          >
            The WebGL shader responds organically to mouse proximity, creating mesmerizing fluid dynamics.
          </motion.p>
        </div>
      </div>
    </div>
  );
}
