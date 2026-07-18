"use client";

import React, { useState } from "react";
import { AuroraBackground } from "@/components/creative/aurora-background";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

const VARIANTS = [
  { 
    id: "default", 
    label: "Default (Blue/Violet)", 
    accent: "#3b82f6",
    colors: [
      "#3b82f6", // blue-500
      "#818cf8", // indigo-300
      "#93c5fd", // blue-300
      "#ddd6fe", // violet-200
      "#60a5fa", // blue-400
    ] as [string, string, string, string, string]
  },
  { 
    id: "sunset", 
    label: "Sunset Glow", 
    accent: "#f97316",
    colors: [
      "#f97316", // orange-500
      "#fca5a5", // red-300
      "#fbbf24", // amber-400
      "#fef08a", // yellow-200
      "#fb923c", // orange-400
    ] as [string, string, string, string, string]
  },
  { 
    id: "emerald", 
    label: "Emerald Dream", 
    accent: "#10b981",
    colors: [
      "#10b981", // emerald-500
      "#6ee7b7", // emerald-300
      "#34d399", // emerald-400
      "#a7f3d0", // emerald-200
      "#059669", // emerald-600
    ] as [string, string, string, string, string]
  },
  { 
    id: "candy", 
    label: "Cotton Candy", 
    accent: "#ec4899",
    colors: [
      "#ec4899", // pink-500
      "#c084fc", // purple-400
      "#f472b6", // pink-400
      "#e879f9", // fuchsia-400
      "#db2777", // pink-600
    ] as [string, string, string, string, string]
  },
] as const;

type VariantId = (typeof VARIANTS)[number]["id"];

export interface AuroraBackgroundDemoProps {
  variant?: VariantId;
}

export function AuroraBackgroundDemo({
  variant = "default"
}: AuroraBackgroundDemoProps) {
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
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <AuroraBackground colors={v.colors}>
              {/* Foreground Content */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-6">
                <motion.h3 
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-5xl font-black text-black dark:text-white tracking-tight drop-shadow-sm"
                >
                  Pure CSS Aurora
                </motion.h3>
                <motion.p 
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-zinc-700 dark:text-zinc-300 mt-4 max-w-sm text-sm"
                >
                  Experience incredibly smooth, 60fps organic animations without a single line of JavaScript calculation.
                </motion.p>
              </div>
            </AuroraBackground>
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}
