"use client";

import React, { useState } from "react";
import { HoverImageTrails, TrailEffect } from "@/components/creative/hover-image-trails";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { MousePointer2 } from "lucide-react";

// ── Image sets per variant ──────────────────────────────────────────────────
const NATURE_IMAGES = [
  "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1470071131384-001b85755536?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=600&auto=format&fit=crop",
];

const URBAN_IMAGES = [
  "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=600&auto=format&fit=crop",
];

const ABSTRACT_IMAGES = [
  "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1567095761054-7a02e69e5b2b?q=80&w=600&auto=format&fit=crop",
];

// ── Variant definitions ──────────────────────────────────────────────────────
const VARIANTS: {
  id: TrailEffect;
  label: string;
  accent: string;
  description: string;
  title: string;
  subtitle: string;
  images: string[];
  imageClass: string;
  imageWidth: number;
  imageHeight: number;
  threshold: number;
  fadeDuration: number;
}[] = [
  {
    id: "pop",
    label: "Pop",
    accent: "#818cf8",
    description: "Classic scale-in burst — images pop up at full size and gracefully fade out.",
    title: "Portfolio Gallery",
    subtitle: "Move your cursor to reveal images",
    images: NATURE_IMAGES,
    imageClass: "border-2 border-white/10",
    imageWidth: 140,
    imageHeight: 180,
    threshold: 55,
    fadeDuration: 900,
  },
  {
    id: "rotate",
    label: "Scattered",
    accent: "#22d3ee",
    description: "Images scatter with random rotation based on cursor direction — organic and playful.",
    title: "Creative Studio",
    subtitle: "Images scatter along your path",
    images: ABSTRACT_IMAGES,
    imageClass: "border-2 border-white/10",
    imageWidth: 120,
    imageHeight: 150,
    threshold: 45,
    fadeDuration: 1000,
  },
  {
    id: "stretch",
    label: "Stretch",
    accent: "#f59e0b",
    description: "Images squeeze in horizontally and stretch vertically, then settle into shape.",
    title: "Motion Design",
    subtitle: "Watch the elastic entrance",
    images: URBAN_IMAGES,
    imageClass: "border-2 border-white/10",
    imageWidth: 130,
    imageHeight: 170,
    threshold: 60,
    fadeDuration: 850,
  },
  {
    id: "glitch",
    label: "Glitch Reveal",
    accent: "#f43f5e",
    description: "A clip-path wipe reveals each image like a digital glitch — bold and edgy.",
    title: "Digital Art",
    subtitle: "Glitchy reveal on hover",
    images: ABSTRACT_IMAGES,
    imageClass: "border-2 border-white/10",
    imageWidth: 140,
    imageHeight: 180,
    threshold: 50,
    fadeDuration: 800,
  },
  {
    id: "wave",
    label: "Wave Float",
    accent: "#a855f7",
    description: "Spring-based physics make images float upward like bubbles rising through water.",
    title: "Explore Nature",
    subtitle: "Images float along your trail",
    images: NATURE_IMAGES,
    imageClass: "border-2 border-white/10 rounded-2xl",
    imageWidth: 120,
    imageHeight: 155,
    threshold: 50,
    fadeDuration: 1100,
  },
];

export interface HoverImageTrailsDemoProps {
  effect?: TrailEffect;
  distanceThreshold?: number;
  fadeDuration?: number;
}

export function HoverImageTrailsDemo({
  effect = "pop",
  distanceThreshold,
  fadeDuration
}: HoverImageTrailsDemoProps) {
  const activeConfig = VARIANTS.find((v) => v.id === effect) || VARIANTS[0];

  const threshold = distanceThreshold || activeConfig.threshold;
  const duration = fadeDuration || activeConfig.fadeDuration;

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full rounded-2xl border border-white/10 bg-zinc-950 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${effect}-${threshold}-${duration}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HoverImageTrails
              images={activeConfig.images}
              effect={effect}
              distanceThreshold={threshold}
              fadeDuration={duration}
              imageClass={activeConfig.imageClass}
              imageWidth={activeConfig.imageWidth}
              imageHeight={activeConfig.imageHeight}
              className="w-full h-[480px] flex flex-col items-center justify-center"
            >
              {/* Center content */}
              <div className="z-10 text-center pointer-events-none select-none">
                <motion.h3
                  key={`t-${effect}`}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3 drop-shadow-lg"
                >
                  {activeConfig.title}
                </motion.h3>
                <motion.p
                  key={`s-${effect}`}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="text-zinc-400 font-light drop-shadow-md flex items-center justify-center gap-2"
                >
                  <MousePointer2 className="h-4 w-4" />
                  {activeConfig.subtitle}
                </motion.p>
              </div>
            </HoverImageTrails>
          </motion.div>
        </AnimatePresence>

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
                style={{ color: activeConfig.accent }}
              >
                {activeConfig.label}:
              </span>
              {activeConfig.description}
            </motion.p>
          </AnimatePresence>
          <div className="hidden md:flex items-center gap-2 opacity-30">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              Pointer Trail
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
