"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface ShutterTransitionProps {
  isActive: boolean;
  color?: string;
  direction?: "vertical" | "horizontal";
  onAnimationComplete?: () => void;
  children?: React.ReactNode;
}

export function ShutterTransition({
  isActive,
  color = "#18181b", // zinc-900
  direction = "vertical",
  onAnimationComplete,
  children,
}: ShutterTransitionProps) {
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (isActive) setIsRendered(true);
  }, [isActive]);

  const isVertical = direction === "vertical";

  // Framer Motion variants
  const panelVariants = {
    initial: (isFirst: boolean) => ({
      y: isVertical ? (isFirst ? "-100%" : "100%") : "0%",
      x: !isVertical ? (isFirst ? "-100%" : "100%") : "0%",
    }),
    enter: {
      y: "0%",
      x: "0%",
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] as const },
    },
    exit: (isFirst: boolean) => ({
      y: isVertical ? (isFirst ? "-100%" : "100%") : "0%",
      x: !isVertical ? (isFirst ? "-100%" : "100%") : "0%",
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] as const, delay: 0.2 },
    }),
  };

  return (
    <>
      <AnimatePresence 
        onExitComplete={() => {
          setIsRendered(false);
          onAnimationComplete?.();
        }}
      >
        {isActive && (
          <div className="fixed inset-0 z-[100] pointer-events-none flex" style={{ flexDirection: isVertical ? 'column' : 'row' }}>
            {/* Panel 1 */}
            <motion.div
              custom={true}
              variants={panelVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              className={isVertical ? "w-full h-1/2" : "w-1/2 h-full"}
              style={{ backgroundColor: color }}
            />
            {/* Panel 2 */}
            <motion.div
              custom={false}
              variants={panelVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              className={isVertical ? "w-full h-1/2" : "w-1/2 h-full"}
              style={{ backgroundColor: color }}
            />
            
            {/* Center Content */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center z-[101]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              {children}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
