"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextSplitRevealProps {
  text: string;
  revealContent: React.ReactNode;
  className?: string;
}

export function TextSplitReveal({ text, revealContent, className }: TextSplitRevealProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={cn("relative flex items-center justify-center w-full h-[300px] cursor-pointer group", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hidden Content (Revealed in the middle) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute z-10 w-full flex justify-center pointer-events-auto"
          >
            {revealContent}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Half Text */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)" }}
        animate={{ y: isHovered ? -80 : 0 }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      >
        <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-white">
          {text}
        </h2>
      </motion.div>

      {/* Bottom Half Text */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
        style={{ clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)" }}
        animate={{ y: isHovered ? 80 : 0 }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      >
        <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-white">
          {text}
        </h2>
      </motion.div>

      {/* Background Line (Optional stylistic element) */}
      <motion.div 
        className="absolute top-1/2 left-0 w-full h-[1px] bg-white/20 z-0 pointer-events-none"
        animate={{ scaleX: isHovered ? 0 : 1, opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      />
    </div>
  );
}
