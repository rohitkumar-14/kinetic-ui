"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface GlitchTransitionProps {
  isActive: boolean;
  onAnimationComplete?: () => void;
  text?: string;
}

export function GlitchTransition({
  isActive,
  onAnimationComplete,
  text = "LOADING",
}: GlitchTransitionProps) {
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (isActive) setIsRendered(true);
  }, [isActive]);

  // We use rapid keyframes in framer-motion to simulate the glitch
  const sliceVariants = {
    initial: { opacity: 0 },
    enter: { 
      opacity: 1,
      transition: { duration: 0.1 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2, delay: 0.6 }
    }
  };

  const generateGlitchSteps = (offset: number) => {
    return [0, offset, -offset, offset * 2, -offset, 0];
  };

  const clipPaths = [
    "inset(20% 0 80% 0)",
    "inset(60% 0 10% 0)",
    "inset(40% 0 40% 0)",
    "inset(10% 0 60% 0)",
    "inset(80% 0 5% 0)",
  ];

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
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center pointer-events-none overflow-hidden"
            variants={sliceVariants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            {/* Base Layer */}
            <div className="absolute inset-0 bg-black" />
            
            <div className="relative text-white font-black text-6xl md:text-8xl tracking-tighter mix-blend-screen uppercase">
              
              {/* Red Channel (Left Offset) */}
              <motion.div 
                className="absolute inset-0 text-red-500"
                initial={{ x: 0, opacity: 0 }}
                animate={{ 
                  x: generateGlitchSteps(-10),
                  opacity: [0, 1, 1, 1, 0, 0]
                }}
                transition={{ duration: 0.6, times: [0, 0.1, 0.3, 0.5, 0.8, 1], ease: "anticipate" }}
                style={{ clipPath: "inset(10% 0 50% 0)" }}
              >
                {text}
              </motion.div>

              {/* Cyan Channel (Right Offset) */}
              <motion.div 
                className="absolute inset-0 text-cyan-500"
                initial={{ x: 0, opacity: 0 }}
                animate={{ 
                  x: generateGlitchSteps(10),
                  opacity: [0, 1, 1, 1, 0, 0]
                }}
                transition={{ duration: 0.6, times: [0, 0.2, 0.4, 0.6, 0.9, 1], ease: "anticipate" }}
                style={{ clipPath: "inset(50% 0 10% 0)" }}
              >
                {text}
              </motion.div>

              {/* Main White Text (Random Jitters) */}
              <motion.div
                initial={{ x: 0, opacity: 0, scale: 1 }}
                animate={{ 
                  x: [0, 5, -5, 2, -2, 0],
                  scale: [1, 1.05, 0.95, 1.1, 1],
                  opacity: [0, 1, 1, 1, 1, 0]
                }}
                transition={{ duration: 0.6, times: [0, 0.1, 0.3, 0.5, 0.7, 1] }}
                className="relative z-10"
              >
                {text}
              </motion.div>

              {/* Scanlines Overlay */}
              <div className="absolute inset-0 z-20 opacity-20 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjIiIGZpbGw9IiNmZmYiLz48L3N2Zz4=')] bg-repeat" />
            </div>

            {/* Random Horizontal Glitch Slices applied to the background */}
            {clipPaths.map((clip, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 bg-zinc-900/50 backdrop-blur-md"
                style={{ clipPath: clip }}
                initial={{ x: "-100%" }}
                animate={{ x: ["-100%", "0%", "100%"] }}
                transition={{ 
                  duration: 0.3, 
                  delay: i * 0.1,
                  ease: "linear"
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
