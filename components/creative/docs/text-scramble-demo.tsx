"use client";

import React, { useState } from "react";
import { TextScramble, ScrambleVariant } from "@/components/creative/text-scramble";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { RefreshCcw, Terminal, Code, Cpu, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";

const VARIANTS: {
  id: ScrambleVariant;
  label: string;
  description: string;
  accent: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "cyber",
    label: "Cyberpunk",
    description: "Standard alphanumeric and symbol character set for a classic tech feel.",
    accent: "#818cf8",
    icon: <Terminal className="w-4 h-4" />
  },
  {
    id: "matrix",
    label: "Matrix Katakana",
    description: "Uses half-width Katakana characters inspired by sci-fi movies.",
    accent: "#10b981", // emerald
    icon: <Code className="w-4 h-4" />
  },
  {
    id: "blocks",
    label: "Data Blocks",
    description: "Dense block characters that look like raw binary data loading in.",
    accent: "#f43f5e",
    icon: <Cpu className="w-4 h-4" />
  },
  {
    id: "minimal",
    label: "Minimal",
    description: "Stripped back to just plus, minus, and slash characters.",
    accent: "#22d3ee",
    icon: <Minus className="w-4 h-4" />
  }
];

export interface TextScrambleDemoProps {
  variant?: ScrambleVariant;
  text?: string;
}

export function TextScrambleDemo({
  variant = "cyber",
  text = "SYSTEM INITIALIZED",
}: TextScrambleDemoProps) {
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
            <h3 className="text-4xl md:text-5xl font-mono font-bold text-white min-h-[60px]">
              <TextScramble 
                key={`${variant}-${text}-${triggerCount}`}
                text={text} 
                variant={variant}
                speed={40}
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
