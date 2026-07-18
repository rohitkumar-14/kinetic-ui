"use client";

import React, { useState } from "react";
import { VideoReveal } from "@/components/creative/video-reveal";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

const VARIANTS = [
  { id: "hover-zoom", label: "Hover Zoom", accent: "#6366f1" }, // Indigo
  { id: "cursor-mask", label: "Cursor Mask", accent: "#ec4899" }, // Pink
  { id: "split-door", label: "Split Door", accent: "#f59e0b" }, // Amber
] as const;

type VariantId = (typeof VARIANTS)[number]["id"];

export function VideoRevealDemo() {
  const [activeVariant, setActiveVariant] = useState<VariantId>("hover-zoom");

  return (
    <div className="w-full flex flex-col gap-6">
      {/* ── Variant Tab Bar ── */}
      <div className="flex flex-wrap gap-2">
        {VARIANTS.map((v) => (
          <button
            key={v.id}
            onClick={() => setActiveVariant(v.id)}
            className={cn(
              "px-4 py-2 text-xs font-semibold rounded-xl border transition-all duration-200",
              activeVariant === v.id
                ? "bg-white text-black border-white/20 shadow-lg shadow-white/5"
                : "bg-white/5 text-zinc-400 border-white/5 hover:bg-white/10 hover:text-white"
            )}
          >
            <span className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: v.accent }}
              />
              {v.label}
            </span>
          </button>
        ))}
      </div>

      <div className="w-full rounded-2xl border border-white/10 bg-zinc-950 p-6 sm:p-12 min-h-[400px] flex items-center justify-center relative overflow-hidden">
        {/* Ambient Glow */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none transition-colors duration-500" 
          style={{
            background: `radial-gradient(circle at center, ${VARIANTS.find(v => v.id === activeVariant)?.accent} 0%, transparent 70%)`
          }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeVariant}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-3xl relative z-10"
          >
            <VideoReveal 
              text="Showreel 2026"
              videoSrc="https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-sky-in-a-sunset-26070-large.mp4"
              variant={activeVariant}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
