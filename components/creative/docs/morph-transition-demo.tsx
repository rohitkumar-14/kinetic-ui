"use client";

import React, { useState } from "react";
import { MorphTransition } from "@/components/creative/morph-transition";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

const VARIANTS = [
  { id: "cards", label: "Cards Grid", accent: "#3b82f6" }, // Blue
  { id: "list", label: "Compact List", accent: "#10b981" }, // Emerald
  { id: "bento", label: "Bento Box", accent: "#f43f5e" }, // Rose
] as const;

type VariantId = (typeof VARIANTS)[number]["id"];

const DEMO_ITEMS = [
  { 
    id: "1", 
    title: "Design System", 
    subtitle: "Premium UI", 
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    description: "Explore seamless state transitions with Framer Motion layoutId. The element smoothly animates between its grid position and the focus view without losing visual continuity."
  },
  { 
    id: "2", 
    title: "Fluid Animation", 
    subtitle: "Motion Design", 
    image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop",
    description: "No more jarring page loads or clunky modal popups. Keep your users deeply engaged with buttery smooth morphing UI that respects spatial context."
  },
  { 
    id: "3", 
    title: "Spring Physics", 
    subtitle: "Natural Feel", 
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2674&auto=format&fit=crop",
    description: "Powered by highly optimized spring physics under the hood, ensuring an organic, weighty, and decidedly premium feel across all interactions."
  }
];

export function MorphTransitionDemo({ variant = "cards" }: { variant?: VariantId }) {
  const activeVariant = variant;

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full rounded-2xl border border-white/10 bg-zinc-950 p-6 sm:p-12 min-h-[500px] flex items-center justify-center relative overflow-hidden">
        {/* Ambient Glow */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none transition-colors duration-500" 
          style={{
            background: `radial-gradient(circle at center top, ${VARIANTS.find(v => v.id === activeVariant)?.accent} 0%, transparent 60%)`
          }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeVariant}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full relative z-10"
          >
            <MorphTransition items={DEMO_ITEMS} variant={activeVariant} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
