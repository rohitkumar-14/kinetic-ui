"use client";

import React, { useState } from "react";
import { BlurText, BlurVariant } from "@/components/creative/blur-text";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { RefreshCcw, ArrowUpFromLine, ArrowDownToLine, Scaling, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const VARIANTS: {
  id: BlurVariant;
  label: string;
  description: string;
  accent: string;
  text: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "elevate",
    label: "Elevate",
    description: "Translates upwards from the Y-axis while unblurring.",
    accent: "#818cf8",
    text: "Focusing clarity",
    icon: <ArrowUpFromLine className="w-4 h-4" />
  },
  {
    id: "drop",
    label: "Drop Down",
    description: "Drops down from above while unblurring.",
    accent: "#f43f5e",
    text: "Descending vision",
    icon: <ArrowDownToLine className="w-4 h-4" />
  },
  {
    id: "scale",
    label: "Scale Down",
    description: "Scales down from 1.2x to its original size as the blur fades.",
    accent: "#10b981",
    text: "Sharpening focus",
    icon: <Scaling className="w-4 h-4" />
  },
  {
    id: "fade",
    label: "In-Place Fade",
    description: "A simple, elegant in-place blur and fade transition.",
    accent: "#22d3ee",
    text: "Materializing now",
    icon: <Eye className="w-4 h-4" />
  }
];

export interface BlurTextDemoProps {
  variant?: BlurVariant;
  animateBy?: "word" | "character";
  text?: string;
}

export function BlurTextDemo({
  variant = "elevate",
  animateBy = "word",
  text = "Focusing clarity",
}: BlurTextDemoProps) {
  const [triggerCount, setTriggerCount] = useState(0);
  const activeConfig = VARIANTS.find((v) => v.id === variant) || VARIANTS[0];

  const handleRetrigger = () => {
    setTriggerCount(prev => prev + 1);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full rounded-2xl border border-white/10 bg-zinc-950 relative overflow-hidden group">
        
        <div className="relative w-full h-[350px] flex flex-col items-center justify-center p-8 text-center bg-grid-white/[0.02]">
          
          <div className="flex flex-col items-center gap-8">
            <h3 className="text-4xl md:text-5xl font-black text-white min-h-[60px] tracking-tight">
              <BlurText 
                key={`${variant}-${text}-${animateBy}-${triggerCount}`}
                text={text} 
                variant={variant}
                animateBy={animateBy}
              />
            </h3>

            <Button 
              variant="outline" 
              size="sm"
              onClick={handleRetrigger}
              className="gap-2 bg-zinc-900 border-white/10 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-full px-6 mt-4"
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
