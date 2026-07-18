"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface LiquidSweepTransitionProps {
  isActive: boolean;
  color?: string;
  onAnimationComplete?: () => void;
  children?: React.ReactNode;
}

export function LiquidSweepTransition({
  isActive,
  color = "#6366f1",
  onAnimationComplete,
  children,
}: LiquidSweepTransitionProps) {
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (isActive) setIsRendered(true);
  }, [isActive]);

  const anim = {
    initial: {
      top: "-300px",
    },
    enter: {
      top: "-300px",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
      transitionEnd: { top: "100vh" },
    },
    exit: {
      top: "-300px",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
  };

  // We will use a simpler but gorgeous approach: A massive SVG wave that translates across the screen.
  // This is often smoother than path morphing on lower-end devices.
  return (
    <>
      <AnimatePresence 
        onExitComplete={() => {
          setIsRendered(false);
          onAnimationComplete?.();
        }}
      >
        {isActive && (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col pointer-events-none"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Top Wave */}
            <svg 
              className="w-full h-[150px] rotate-180 -scale-x-100" 
              viewBox="0 0 100 100" 
              preserveAspectRatio="none"
            >
              <path d="M0,0 L100,0 L100,100 C50,0 50,100 0,100 Z" fill={color} />
            </svg>
            
            {/* Solid Body */}
            <div className="flex-1 w-full" style={{ backgroundColor: color }}>
              <div className="h-full w-full flex items-center justify-center opacity-0 animate-in fade-in duration-500 delay-300">
                {children}
              </div>
            </div>
            
            {/* Bottom Wave */}
            <svg 
              className="w-full h-[150px]" 
              viewBox="0 0 100 100" 
              preserveAspectRatio="none"
            >
              <path d="M0,0 L100,0 L100,100 C50,0 50,100 0,100 Z" fill={color} />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
