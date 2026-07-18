"use client";

import React, { useState } from "react";
import { MeshGradient } from "@/components/creative/mesh-gradient";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

const VARIANTS = [
  { 
    id: "default", 
    label: "Midnight Vibes", 
    accent: "#8b5cf6",
    config: { color1: "#8b5cf6", color2: "#ec4899", color3: "#06b6d4", color4: "#f59e0b", speed: "normal" as const }
  },
  { 
    id: "ocean", 
    label: "Deep Ocean", 
    accent: "#0284c7",
    config: { color1: "#0284c7", color2: "#3b82f6", color3: "#06b6d4", color4: "#2dd4bf", speed: "slow" as const }
  },
  { 
    id: "cyber", 
    label: "Cyberpunk", 
    accent: "#eab308",
    config: { color1: "#eab308", color2: "#ef4444", color3: "#8b5cf6", color4: "#10b981", speed: "fast" as const }
  },
  { 
    id: "monochrome", 
    label: "Carbon", 
    accent: "#71717a",
    config: { color1: "#18181b", color2: "#3f3f46", color3: "#71717a", color4: "#27272a", speed: "slow" as const }
  },
] as const;

type VariantId = (typeof VARIANTS)[number]["id"];

export interface MeshGradientDemoProps {
  variant?: VariantId;
}

export function MeshGradientDemo({
  variant = "default"
}: MeshGradientDemoProps) {
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
            <MeshGradient 
              color1={v.config.color1}
              color2={v.config.color2}
              color3={v.config.color3}
              color4={v.config.color4}
              speed={v.config.speed}
            >
              {/* Foreground Content */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-6">
                <motion.h3 
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-md"
                >
                  Fluid Mesh
                </motion.h3>
                <motion.p 
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-white/80 mt-4 max-w-sm text-sm drop-shadow-sm font-light"
                >
                  Intersecting animated SVG blurs create an organic, endlessly shifting glassmorphism background.
                </motion.p>
              </div>
            </MeshGradient>
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}
