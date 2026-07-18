"use client";

import React, { useState } from "react";
import { PixelTransition } from "@/components/creative/pixel-transition";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

const VARIANTS = [
  { 
    id: "landscape", 
    label: "Day to Night", 
    accent: "#3b82f6",
    config: { 
      img1: "/landscape_day_1782932459465.png", 
      img2: "/landscape_night_1782932469534.png", 
      gridSize: 30 
    }
  },
  { 
    id: "cyber", 
    label: "Cyberpunk Glitch", 
    accent: "#ec4899",
    config: { 
      img1: "/cyberpunk_city_1782932482341.png", 
      img2: "/neon_forest_1782932492306.png", 
      gridSize: 80 
    }
  },
  { 
    id: "chunky", 
    label: "Chunky 8-Bit", 
    accent: "#eab308",
    config: { 
      img1: "/landscape_day_1782932459465.png", 
      img2: "/cyberpunk_city_1782932482341.png", 
      gridSize: 10 
    }
  },
] as const;

type VariantId = (typeof VARIANTS)[number]["id"];

export interface PixelTransitionDemoProps {
  variant?: VariantId;
}

export function PixelTransitionDemo({
  variant = "landscape"
}: PixelTransitionDemoProps) {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full rounded-2xl border border-white/10 bg-black min-h-[600px] flex items-center justify-center relative overflow-hidden py-12">
        
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

        <div className="relative z-10 w-[80%] max-w-[600px] aspect-[4/3]">
          <AnimatePresence mode="wait">
            {VARIANTS.map((v) => variant === v.id && (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full absolute inset-0"
              >
                <div className="w-full h-full rounded-2xl shadow-2xl border border-white/10 overflow-hidden group">
                  <PixelTransition
                    firstImage={v.config.img1}
                    secondImage={v.config.img2}
                    gridSize={v.config.gridSize}
                    className="w-full h-full"
                  />
                  
                  {/* Hover Overlay Hint */}
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md border border-white/10 text-white/80 text-xs px-3 py-1.5 rounded-full pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                    Hover me
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
