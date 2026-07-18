"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface CinematicPreloaderProps {
  isLoading: boolean;
  onComplete?: () => void;
  brandName?: string;
}

export function CinematicPreloader({ 
  isLoading, 
  onComplete,
  brandName = "KINETIC" 
}: CinematicPreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isCounterDone, setIsCounterDone] = useState(false);

  // Handle the fake loading progress
  useEffect(() => {
    if (!isLoading) {
      setProgress(0);
      setIsCounterDone(false);
      return;
    }

    const duration = 2000; // 2 seconds to load
    const intervalTime = 20; // run every 20ms
    const step = 100 / (duration / intervalTime);
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsCounterDone(true), 400); // Small pause at 100%
          return 100;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isLoading]);

  // When counter finishes and splitting animation starts, we wait then fire onComplete
  useEffect(() => {
    if (isCounterDone && onComplete) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 1500); // Wait for the split animation to finish before unmounting
      return () => clearTimeout(timeout);
    }
  }, [isCounterDone, onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
          
          {/* Top Half of the Split Screen */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-1/2 bg-zinc-950 border-b border-white/5 origin-top pointer-events-auto"
            initial={{ y: 0 }}
            animate={{ y: isCounterDone ? "-100%" : 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
          />

          {/* Bottom Half of the Split Screen */}
          <motion.div 
            className="absolute bottom-0 left-0 w-full h-1/2 bg-zinc-950 border-t border-white/5 origin-bottom pointer-events-auto"
            initial={{ y: 0 }}
            animate={{ y: isCounterDone ? "100%" : 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
          />

          {/* The Content (Counter and Brand) */}
          <motion.div 
            className="relative z-10 flex flex-col items-center justify-center pointer-events-none"
            animate={{ opacity: isCounterDone ? 0 : 1, scale: isCounterDone ? 0.9 : 1 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-4">
              {Math.floor(progress)}%
            </h1>
            <div className="h-[2px] w-[200px] bg-white/20 rounded-full overflow-hidden mb-8">
              <motion.div 
                className="h-full bg-white"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-zinc-500 font-mono tracking-widest text-sm uppercase">
              {brandName}
            </span>
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}
