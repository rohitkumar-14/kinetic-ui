"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface PixelDissolveTransitionProps {
  children: React.ReactNode;
  isTriggered: boolean;
  onAnimationComplete?: () => void;
  gridSize?: number; // e.g. 10x10 grid
  pixelColor?: string;
}

export function PixelDissolveTransition({
  children,
  isTriggered,
  onAnimationComplete,
  gridSize = 10,
  pixelColor = "#000000"
}: PixelDissolveTransitionProps) {
  const [phase, setPhase] = useState<"idle" | "enter" | "exit">("idle");

  useEffect(() => {
    if (isTriggered && phase === "idle") {
      setPhase("enter");
    }
  }, [isTriggered, phase]);

  const totalPixels = gridSize * gridSize;

  // Pre-calculate random delays for each pixel to create the scattered dissolve effect
  const pixelDelays = useMemo(() => {
    const delays = [];
    for (let i = 0; i < totalPixels; i++) {
      delays.push(Math.random() * 0.5); // Random delay between 0 and 0.5s
    }
    return delays;
  }, [totalPixels]);

  // Find the max delay to know when the entire enter/exit animation completes
  const maxDelay = Math.max(...pixelDelays);
  const animationDuration = 0.3; // duration of individual pixel animation
  const totalAnimationTime = (maxDelay + animationDuration) * 1000;

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (phase === "enter") {
      timeout = setTimeout(() => {
        setPhase("exit");
      }, totalAnimationTime + 100);
    } else if (phase === "exit") {
      timeout = setTimeout(() => {
        setPhase("idle");
        onAnimationComplete?.();
      }, totalAnimationTime + 100);
    }

    return () => clearTimeout(timeout);
  }, [phase, totalAnimationTime, onAnimationComplete]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        {children}
      </div>

      {/* The Pixel Overlay Grid */}
      <AnimatePresence>
        {phase !== "idle" && (
          <div 
            className="absolute inset-0 z-50 pointer-events-none grid"
            style={{ 
              gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
              gridTemplateRows: `repeat(${gridSize}, 1fr)`
            }}
          >
            {Array.from({ length: totalPixels }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: phase === "enter" ? 1 : 0, 
                  scale: phase === "enter" ? 1.05 : 0 // 1.05 to prevent grid gaps
                }}
                transition={{
                  duration: animationDuration,
                  delay: pixelDelays[i],
                  ease: "easeInOut"
                }}
                style={{ backgroundColor: pixelColor }}
                className="w-full h-full origin-center"
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
