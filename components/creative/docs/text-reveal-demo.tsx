"use client";

import React, { useState } from "react";
import { TextReveal, TextRevealVariant } from "@/components/creative/text-reveal";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { RefreshCcw, ArrowUpFromLine, ArrowDownToLine, Scaling, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const VARIANTS: {
  id: TextRevealVariant;
  label: string;
  description: string;
  accent: string;
  text: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "slide-up",
    label: "Slide Up",
    description: "Words slide up from below with a slight rotation.",
    accent: "#818cf8",
    text: "Building the future of web interfaces.",
    icon: <ArrowUpFromLine className="w-4 h-4" />
  },
  {
    id: "slide-down",
    label: "Slide Down",
    description: "Words slide down from above with a slight reverse rotation.",
    accent: "#f43f5e",
    text: "Crafting digital experiences with precision.",
    icon: <ArrowDownToLine className="w-4 h-4" />
  },
  {
    id: "scale",
    label: "Scale Pop",
    description: "Words scale up with a bouncy back-out easing curve.",
    accent: "#10b981",
    text: "Make your typography truly stand out.",
    icon: <Scaling className="w-4 h-4" />
  },
  {
    id: "fade",
    label: "Simple Fade",
    description: "A clean, elegant stagger fade with a tiny vertical offset.",
    accent: "#22d3ee",
    text: "Sometimes less is exactly what you need.",
    icon: <Eye className="w-4 h-4" />
  }
];

export interface TextRevealDemoProps {
  variant?: TextRevealVariant;
  text?: string;
}

export function TextRevealDemo({
  variant = "slide-up",
  text = "Building the future of web interfaces.",
}: TextRevealDemoProps) {
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
            <h3 className="text-4xl md:text-5xl font-black text-white min-h-[120px] max-w-xl leading-tight">
              <TextReveal 
                key={`${variant}-${text}-${triggerCount}`}
                text={text} 
                variant={variant}
                speed={1.5}
              />
            </h3>

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
