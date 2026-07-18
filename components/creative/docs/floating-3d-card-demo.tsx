"use client";

import React, { useState } from "react";
import { Floating3DCard, Floating3DVariant } from "@/components/creative/floating-3d-card";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Sparkles, Gem, Shield, Flame, Orbit } from "lucide-react";

const VARIANTS: {
  id: Floating3DVariant;
  label: string;
  accent: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  badge: string;
}[] = [
  {
    id: "crystal",
    label: "Crystal Wireframe",
    accent: "#818cf8",
    icon: <Gem className="w-4 h-4" />,
    title: "Crystal Architecture",
    description: "A wireframe icosahedron with a semi-transparent glass inner core. Reacts smoothly to your cursor with metallic reflections.",
    badge: "Wireframe",
  },
  {
    id: "nebula",
    label: "Nebula Distort",
    accent: "#a855f7",
    icon: <Sparkles className="w-4 h-4" />,
    title: "Nebula Surface",
    description: "A distorted organic sphere that morphs and breathes with animated noise. Perfect for AI/ML product showcases.",
    badge: "Organic",
  },
  {
    id: "prism",
    label: "Glass Prism",
    accent: "#22d3ee",
    icon: <Shield className="w-4 h-4" />,
    title: "Refractive Prism",
    description: "A glass octahedron with physical refraction and an orbital ring. Creates stunning light dispersion effects.",
    badge: "Refraction",
  },
  {
    id: "plasma",
    label: "Plasma Core",
    accent: "#f43f5e",
    icon: <Flame className="w-4 h-4" />,
    title: "Plasma Energy",
    description: "A pulsating blob with emissive glow that feels alive. Ideal for gaming or entertainment-oriented interfaces.",
    badge: "Emissive",
  },
  {
    id: "ring",
    label: "Torus Knot",
    accent: "#f59e0b",
    icon: <Orbit className="w-4 h-4" />,
    title: "Golden Torus Knot",
    description: "A mathematically generated torus knot with a high-gloss metallic finish. Striking for luxury or fintech products.",
    badge: "Metallic",
  },
];

export interface Floating3DCardDemoProps {
  variant?: Floating3DVariant;
}

export function Floating3DCardDemo({
  variant = "crystal"
}: Floating3DCardDemoProps) {
  const activeConfig = VARIANTS.find((v) => v.id === variant) || VARIANTS[0];

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="@container w-full rounded-2xl border border-white/10 bg-black min-h-[560px] flex items-center justify-center relative overflow-hidden p-4 @sm:p-6 @md:p-12">
        {/* Background ambient glow */}
        <div
          className="absolute inset-0 transition-all duration-1000 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 40%, ${activeConfig.accent}10 0%, transparent 70%)`,
          }}
        />

        {/* Dot pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:20px_20px] pointer-events-none" />

        <AnimatePresence mode="wait">
          <motion.div
            key={variant}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-sm flex justify-center"
          >
            <Floating3DCard
              variant={variant}
              color={activeConfig.accent}
            >
              {/* Badge */}
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: `${activeConfig.accent}15`,
                    color: activeConfig.accent,
                  }}
                >
                  {activeConfig.icon}
                  {activeConfig.badge}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold tracking-tight text-white mb-2">
                {activeConfig.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-zinc-400 font-light leading-relaxed mb-6">
                {activeConfig.description}
              </p>

              {/* CTA Button */}
              <button
                className="w-full h-11 rounded-xl flex items-center justify-center gap-2 text-sm font-medium transition-all duration-200 active:scale-[0.98]"
                style={{
                  backgroundColor: activeConfig.accent,
                  color: "#000",
                }}
              >
                Explore Component
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </Floating3DCard>
          </motion.div>
        </AnimatePresence>

        {/* Corner decoration */}
        <div className="hidden @sm:flex absolute top-4 right-4 items-center gap-2 opacity-30">
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: activeConfig.accent }}
          />
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
            WebGL / R3F
          </span>
        </div>
      </div>
    </div>
  );
}
