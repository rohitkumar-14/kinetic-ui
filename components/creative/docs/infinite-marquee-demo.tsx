"use client";

import React, { useState } from "react";
import { InfiniteMovingCards } from "@/components/creative/infinite-moving-cards";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

const VARIANTS = [
  { id: "single", label: "Single Row", accent: "#3b82f6" },
  { id: "double", label: "Staggered Rows", accent: "#10b981" },
  { id: "fast", label: "Hyper Speed", accent: "#f43f5e" },
] as const;

type VariantId = (typeof VARIANTS)[number]["id"];

const TESTIMONIALS = [
  {
    quote: "The attention to detail in these components is unmatched. It feels like magic.",
    name: "Alex Rivera",
    title: "Lead Engineer",
  },
  {
    quote: "We deployed our new landing page in hours instead of weeks. Absolute game changer.",
    name: "Sarah Jenkins",
    title: "Product Designer",
  },
  {
    quote: "I've tried every UI library out there. This is the only one that truly feels premium.",
    name: "Marcus Cole",
    title: "Founder",
  },
  {
    quote: "Smooth animations, perfect dark mode, and incredible accessibility. 10/10.",
    name: "Emily Chen",
    title: "Frontend Developer",
  },
  {
    quote: "It's not just a UI kit, it's a complete masterclass in motion design.",
    name: "David Kim",
    title: "Design Director",
  },
];

export interface InfiniteMarqueeDemoProps {
  variant?: VariantId;
}

export function InfiniteMarqueeDemo({
  variant = "single"
}: InfiniteMarqueeDemoProps) {
  const activeVariant = variant;
  const v = VARIANTS.find(variantConfig => variantConfig.id === activeVariant) || VARIANTS[0];

  return (
    <div className="w-full flex flex-col gap-6 mb-12">
      <div className="w-full rounded-2xl border border-white/10 bg-zinc-950 min-h-[500px] flex items-center justify-center relative overflow-hidden py-12">
        {/* Ambient Glow */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none transition-colors duration-500" 
          style={{
            background: `radial-gradient(circle at center, ${v.accent} 0%, transparent 60%)`
          }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeVariant}
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.3 }}
            className="w-full h-full flex flex-col justify-center relative z-10"
          >
            {activeVariant === "single" && (
              <InfiniteMovingCards
                items={TESTIMONIALS}
                direction="left"
                speed="normal"
              />
            )}

            {activeVariant === "double" && (
              <div className="flex flex-col gap-8 antialiased">
                <InfiniteMovingCards
                  items={TESTIMONIALS}
                  direction="right"
                  speed="slow"
                />
                <InfiniteMovingCards
                  items={TESTIMONIALS}
                  direction="left"
                  speed="slow"
                />
              </div>
            )}

            {activeVariant === "fast" && (
              <div className="flex flex-col gap-4 pb-4">
                <InfiniteMovingCards
                  items={TESTIMONIALS}
                  direction="left"
                  speed="fast"
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
