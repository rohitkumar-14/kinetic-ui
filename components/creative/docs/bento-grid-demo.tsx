"use client";

import React from "react";
import { BentoGrid, BentoCard, BentoVariant } from "@/components/creative/bento-grid";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Maximize, Sun, Rocket, Target, Zap } from "lucide-react";

const VARIANTS: {
  id: BentoVariant;
  label: string;
  description: string;
  accent: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "standard",
    label: "Standard Float",
    description: "Cards slide up slightly when hovered.",
    accent: "#818cf8",
    icon: <ArrowUpRight className="w-4 h-4" />
  },
  {
    id: "scale",
    label: "Scale Up",
    description: "Cards physically scale up on hover without translating Y.",
    accent: "#10b981",
    icon: <Maximize className="w-4 h-4" />
  },
  {
    id: "glow",
    label: "Outer Glow",
    description: "Cards remain stationary but emit a vibrant drop-shadow glow.",
    accent: "#f59e0b",
    icon: <Sun className="w-4 h-4" />
  }
];

export function BentoGridDemo({ 
  variant = "standard", 
  color = "#818cf8",
  speed = 1
}: { 
  variant?: BentoVariant;
  color?: string;
  speed?: number;
}) {
  const activeConfig = VARIANTS.find((v) => v.id === variant) || VARIANTS[0];

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full rounded-2xl border border-white/10 bg-zinc-950 relative overflow-hidden group">
        <div className="relative w-full p-8 bg-grid-white/[0.02]">
          
          <BentoGrid variant={variant} color={color} speed={speed}>
            <BentoCard
              title="Fast Performance"
              description="Built on top of cutting-edge technologies to ensure lighting fast speeds."
              icon={<Zap className="w-5 h-5" />}
              className="@md:col-span-2"
              header={
                <div className="w-full h-full bg-zinc-900/50 flex items-center justify-center">
                  <div className="w-24 h-8 bg-white/5 rounded-full animate-pulse" />
                </div>
              }
            />
            <BentoCard
              title="High Accuracy"
              description="Precision engineering for your most critical workflows."
              icon={<Target className="w-5 h-5" />}
            />
            <BentoCard
              title="Scale Instantly"
              description="Deploy to the edge in seconds."
              icon={<Rocket className="w-5 h-5" />}
              className="@md:col-span-3"
            />
          </BentoGrid>

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
