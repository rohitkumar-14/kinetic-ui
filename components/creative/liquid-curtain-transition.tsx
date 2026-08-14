"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface LiquidCurtainTransitionProps {
  children: React.ReactNode;
  isTriggered: boolean;
  onAnimationComplete?: () => void;
  fill?: string;
}

// We define SVG paths for a 100x100 viewBox (we preserve aspect ratio to none so it stretches)
// Initial: flat line at top
const initialPath = "M 0 0 L 100 0 L 100 0 Q 50 0 0 0 Z";
// Mid point: sweeping down with a huge wave
const midPath = "M 0 0 L 100 0 L 100 60 Q 50 120 0 60 Z";
// Final: filled square
const finalPath = "M 0 0 L 100 0 L 100 100 Q 50 100 0 100 Z";

// To reveal the next page, we reverse the wave from the bottom
const revealMidPath = "M 0 100 L 100 100 L 100 40 Q 50 -20 0 40 Z";
const revealFinalPath = "M 0 100 L 100 100 L 100 100 Q 50 100 0 100 Z"; // actually wait, to clear the screen we want the path to shrink to 0 at the bottom.
// If it fills the screen, it's:
// "M 0 0 L 100 0 L 100 100 L 0 100 Z"
// To clear downwards:
// from "M 0 0 L 100 0 L 100 100 L 0 100 Z" -> "M 0 100 L 100 100 L 100 100 L 0 100 Z"
// So the animated path to leave the screen downwards:
const leaveMidPath = "M 0 100 L 100 100 L 100 100 Q 50 40 0 100 Z"; 
const leaveFinalPath = "M 0 100 L 100 100 L 100 100 Q 50 100 0 100 Z";

// Actually, to make it simple: the curtain drops down (covers screen).
// Then the curtain continues dropping down (leaves screen).
const curtainEnter = {
  initial: { d: initialPath },
  animate: { 
    d: finalPath,
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
  }
};

const curtainExit = {
  initial: { d: "M 0 0 L 100 0 L 100 100 L 0 100 Z" }, // Full rect
  animate: { 
    d: "M 0 100 L 100 100 L 100 100 Q 50 50 0 100 Z", // Wave at bottom
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
  }
};
// To make the exit fully clear, the path ends at:
// "M 0 100 L 100 100 L 100 100 L 0 100 Z"

export function LiquidCurtainTransition({ 
  children, 
  isTriggered, 
  onAnimationComplete,
  fill = "#000000" 
}: LiquidCurtainTransitionProps) {
  const [phase, setPhase] = useState<"idle" | "enter" | "exit">("idle");

  useEffect(() => {
    if (isTriggered && phase === "idle") {
      setPhase("enter");
    }
  }, [isTriggered, phase]);

  const handleEnterComplete = () => {
    if (phase === "enter") {
      setPhase("exit");
    }
  };

  const handleExitComplete = () => {
    if (phase === "exit") {
      setPhase("idle");
      onAnimationComplete?.();
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        {children}
      </div>

      {/* The Liquid SVG Overlay */}
      <AnimatePresence>
        {phase === "enter" && (
          <motion.svg
            className="absolute inset-0 w-full h-full z-50 pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            onAnimationComplete={handleEnterComplete}
          >
            <motion.path
              fill={fill}
              variants={{
                hidden: { d: "M 0 0 L 100 0 L 100 0 Q 50 0 0 0 Z" },
                visible: { d: [
                  "M 0 0 L 100 0 L 100 0 Q 50 0 0 0 Z",
                  "M 0 0 L 100 0 L 100 60 Q 50 120 0 60 Z",
                  "M 0 0 L 100 0 L 100 100 L 0 100 Z" // Final is a pure rect so no gap
                ]}
              }}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            />
          </motion.svg>
        )}

        {phase === "exit" && (
          <motion.svg
            className="absolute inset-0 w-full h-full z-50 pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            onAnimationComplete={handleExitComplete}
          >
            <motion.path
              fill={fill}
              variants={{
                hidden: { d: "M 0 0 L 100 0 L 100 100 L 0 100 Z" },
                visible: { d: [
                  "M 0 0 L 100 0 L 100 100 L 0 100 Z",
                  "M 0 100 L 100 100 L 100 40 Q 50 0 0 40 Z", 
                  "M 0 100 L 100 100 L 100 100 Q 50 100 0 100 Z"
                ]}
              }}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            />
          </motion.svg>
        )}
      </AnimatePresence>
    </div>
  );
}
