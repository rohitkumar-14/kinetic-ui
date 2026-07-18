"use client";

import React, { useState } from "react";
import { 
  FadeIn, 
  SlideUp, 
  ScaleIn, 
  BlurIn, 
  RotateIn,
  StaggerContainer, 
  StaggerItem 
} from "@/components/creative/motion-primitives";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RefreshCcw, Box, ArrowUp, Scaling, Droplets, RotateCw, List } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type PrimitiveVariant = "fade" | "slide" | "scale" | "blur" | "rotate" | "stagger";

const VARIANTS: {
  id: PrimitiveVariant;
  label: string;
  description: string;
  accent: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "fade",
    label: "Fade In",
    description: "Simple opacity transition from 0 to 1.",
    accent: "#818cf8",
    icon: <Box className="w-4 h-4" />
  },
  {
    id: "slide",
    label: "Slide Up",
    description: "Translates upwards along the Y-axis while fading in.",
    accent: "#a855f7",
    icon: <ArrowUp className="w-4 h-4" />
  },
  {
    id: "scale",
    label: "Scale In",
    description: "Bounces from a smaller scale up to 1 using a backOut ease.",
    accent: "#10b981",
    icon: <Scaling className="w-4 h-4" />
  },
  {
    id: "blur",
    label: "Blur In",
    description: "Transitions from a heavy CSS blur filter down to 0px.",
    accent: "#22d3ee",
    icon: <Droplets className="w-4 h-4" />
  },
  {
    id: "rotate",
    label: "Rotate In",
    description: "Combines a slight rotation with scale and fade.",
    accent: "#f59e0b",
    icon: <RotateCw className="w-4 h-4" />
  },
  {
    id: "stagger",
    label: "Stagger List",
    description: "Parent container orchestrates child components to animate sequentially.",
    accent: "#f43f5e",
    icon: <List className="w-4 h-4" />
  },
];

export interface MotionPrimitivesDemoProps {
  variant?: PrimitiveVariant;
}

export function MotionPrimitivesDemo({
  variant = "fade",
}: MotionPrimitivesDemoProps) {
  const [triggerKey, setTriggerKey] = useState(0);
  const activeConfig = VARIANTS.find((v) => v.id === variant) || VARIANTS[0];

  const handleRetrigger = () => setTriggerKey(prev => prev + 1);

  const renderContent = () => {
    const boxContent = (
      <div className="w-40 h-40 rounded-2xl border border-white/20 bg-white/5 flex flex-col items-center justify-center shadow-2xl backdrop-blur-sm">
        {activeConfig.icon}
        <span className="mt-2 text-sm font-medium">{activeConfig.label}</span>
      </div>
    );

    switch (variant) {
      case "fade":
        return <FadeIn key={triggerKey} duration={0.8}>{boxContent}</FadeIn>;
      case "slide":
        return <SlideUp key={triggerKey} yOffset={60} duration={0.8}>{boxContent}</SlideUp>;
      case "scale":
        return <ScaleIn key={triggerKey} initialScale={0.5} duration={0.8}>{boxContent}</ScaleIn>;
      case "blur":
        return <BlurIn key={triggerKey} initialBlur="20px" duration={1}>{boxContent}</BlurIn>;
      case "rotate":
        return <RotateIn key={triggerKey} initialRotation={-30} duration={0.8}>{boxContent}</RotateIn>;
      case "stagger":
        return (
          <StaggerContainer key={triggerKey} staggerChildren={0.15} className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <StaggerItem key={i}>
                <div className="w-24 h-24 rounded-xl border border-white/20 bg-white/5 flex items-center justify-center font-mono">
                  {i}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        );
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full rounded-2xl border border-white/10 bg-zinc-950 relative overflow-hidden group">
        
        <div className="relative w-full h-[350px] flex flex-col items-center justify-center p-8 text-center bg-grid-white/[0.02]">
          
          <div className="flex flex-col items-center gap-8 text-white min-h-[160px]">
            {renderContent()}
          </div>

          <Button 
            variant="outline" 
            size="sm"
            onClick={handleRetrigger}
            className="absolute bottom-8 gap-2 bg-zinc-900 border-white/10 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-full px-6"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            Replay Animation
          </Button>
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
