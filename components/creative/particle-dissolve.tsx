"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ParticleDissolveProps {
  text?: string;
  className?: string;
}

export function ParticleDissolve({
  text = "DISSOLVE ME",
  className,
}: ParticleDissolveProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn("w-full h-[300px] bg-zinc-950 rounded-3xl border border-white/10 flex items-center justify-center relative overflow-hidden select-none cursor-pointer", className)}
    >
      <motion.h2
        animate={{ opacity: isHovered ? 0.2 : 1, scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.3 }}
        className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter"
      >
        {text}
      </motion.h2>

      {/* Particle Overlay Stream */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 1, x: 0, y: 0, scale: Math.random() * 0.8 + 0.4 }}
              animate={{
                opacity: 0,
                x: (Math.random() - 0.5) * 300,
                y: (Math.random() - 0.5) * 200,
              }}
              transition={{ duration: 0.8, repeat: Infinity, delay: Math.random() * 0.2 }}
              className="absolute w-2 h-2 rounded-full bg-indigo-400 shadow-lg shadow-indigo-500/50"
            />
          ))}
        </div>
      )}
    </div>
  );
}
