"use client";

import React, { useState, useEffect } from "react";
import { Odometer, OdometerAnimation } from "@/components/creative/odometer";
import { Button } from "@/components/ui/button";
import { RefreshCcw, DollarSign, Users, Activity, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

const VARIANTS: {
  id: OdometerAnimation;
  label: string;
  description: string;
  accent: string;
  prefix?: string;
  suffix?: string;
  title: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "spring",
    label: "Standard Spring",
    description: "A balanced physics spring that feels natural and grounded.",
    accent: "#818cf8",
    prefix: "$",
    title: "Monthly Revenue",
    icon: <DollarSign className="w-4 h-4" />
  },
  {
    id: "bouncy",
    label: "High Bounce",
    description: "An exaggerated, highly elastic spring for playful interfaces.",
    accent: "#a855f7",
    suffix: "k",
    title: "Active Users",
    icon: <Users className="w-4 h-4" />
  },
  {
    id: "smooth",
    label: "Smooth Tween",
    description: "A traditional easing curve without spring physics. Best for strict metrics.",
    accent: "#22d3ee",
    suffix: "%",
    title: "Server Uptime",
    icon: <Activity className="w-4 h-4" />
  },
  {
    id: "quick",
    label: "Snappy Quick",
    description: "A very tight spring that snaps into place instantly.",
    accent: "#f43f5e",
    prefix: "⚡",
    title: "Energy Output",
    icon: <Zap className="w-4 h-4" />
  },
];

export interface OdometerDemoProps {
  variant?: OdometerAnimation;
  prefix?: string;
  suffix?: string;
}

export function OdometerDemo({
  variant = "spring",
  prefix = "",
  suffix = "",
}: OdometerDemoProps) {
  const [value, setValue] = useState(125000);
  const activeConfig = VARIANTS.find((v) => v.id === variant) || VARIANTS[0];

  // Auto-update values
  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prev) => {
        if (variant === "smooth") {
          return 99 + (Math.random() * 0.99); 
        }
        return prev + Math.floor(Math.random() * 5000) - 1000;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [variant]);

  // Handle manual randomize
  const handleRandomize = () => {
    if (variant === "smooth") {
      setValue(95 + (Math.random() * 4.99));
    } else {
      setValue(Math.floor(Math.random() * 900000) + 10000);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full rounded-2xl border border-white/10 bg-zinc-950 relative overflow-hidden group">
        
        <div className="relative w-full h-[350px] flex flex-col items-center justify-center p-8 text-center bg-grid-white/[0.02]">
          <div className="flex flex-col items-center gap-4">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={`${variant}-${prefix}-${suffix}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center gap-3"
              >
                <div 
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium tracking-widest uppercase"
                  style={{ color: activeConfig.accent }}
                >
                  {activeConfig.icon}
                  {activeConfig.title}
                </div>
                
                <Odometer 
                  value={variant === "smooth" ? Number(value.toFixed(2)) : Math.floor(value)} 
                  animation={variant}
                  prefix={prefix || activeConfig.prefix}
                  suffix={suffix || activeConfig.suffix}
                  className={cn(
                    "text-6xl md:text-8xl tracking-tighter drop-shadow-xl",
                    variant === "smooth" ? "text-cyan-400" :
                    variant === "quick" ? "text-rose-400" :
                    variant === "bouncy" ? "text-purple-400" :
                    "text-white"
                  )}
                />
              </motion.div>
            </AnimatePresence>

            <Button 
              variant="outline" 
              size="sm"
              onClick={handleRandomize}
              className="mt-8 gap-2 bg-zinc-900 border-white/10 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-full px-6"
            >
              <RefreshCcw className="w-3.5 h-3.5" />
              Trigger Update
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
