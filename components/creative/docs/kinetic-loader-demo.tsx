"use client";

import React, { useState } from "react";
import { KineticLoader, KineticLoaderVariant } from "@/components/creative/kinetic-loader";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { RefreshCcw, FlipVertical, ArrowUpDown, Waves, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

const VARIANTS: {
  id: KineticLoaderVariant;
  label: string;
  description: string;
  accent: string;
  text: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "flip",
    label: "3D Flip",
    description: "Characters rotate in 3D space on the X-axis.",
    accent: "#818cf8",
    text: "LOADING...",
    icon: <FlipVertical className="w-4 h-4" />
  },
  {
    id: "bounce",
    label: "Bounce",
    description: "A playful vertical stagger animation.",
    accent: "#f43f5e",
    text: "UPLOADING...",
    icon: <ArrowUpDown className="w-4 h-4" />
  },
  {
    id: "wave",
    label: "Wave",
    description: "A smooth, undulating wave with slight rotation.",
    accent: "#22d3ee",
    text: "PROCESSING...",
    icon: <Waves className="w-4 h-4" />
  },
  {
    id: "pulse",
    label: "Pulse",
    description: "Opacity and scale stagger for a glowing effect.",
    accent: "#10b981",
    text: "ANALYZING...",
    icon: <Activity className="w-4 h-4" />
  }
];

export interface KineticLoaderDemoProps {
  variant?: KineticLoaderVariant;
  text?: string;
  size?: "sm" | "md" | "lg";
}

export function KineticLoaderDemo({
  variant = "flip",
  text = "LOADING...",
  size = "md",
}: KineticLoaderDemoProps) {
  const [triggerCount, setTriggerCount] = useState(0);
  const activeConfig = VARIANTS.find((v) => v.id === variant) || VARIANTS[0];

  const handleRetrigger = () => {
    setTriggerCount(prev => prev + 1);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full rounded-2xl border border-white/10 bg-zinc-950 relative overflow-hidden group">
        
        <div className="relative w-full h-[350px] flex flex-col items-center justify-center p-8 text-center bg-grid-white/[0.02]">
          
          <div className="flex flex-col items-center gap-12">
            <div className="min-h-[80px] flex items-center justify-center">
              <KineticLoader 
                key={`${variant}-${text}-${triggerCount}`}
                text={text} 
                variant={variant}
                size={size}
                color={activeConfig.accent}
              />
            </div>

            <Button 
              variant="outline" 
              size="sm"
              onClick={handleRetrigger}
              className="gap-2 bg-zinc-900 border-white/10 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-full px-6"
            >
              <RefreshCcw className="w-3.5 h-3.5" />
              Retrigger
            </Button>
          </div>

        </div>

        {/* Bottom info bar */}
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
              <span
                className="font-semibold mr-1.5"
                style={{ color: activeConfig.accent }}
              >
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
