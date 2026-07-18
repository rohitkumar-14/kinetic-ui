"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ThinkingVisualizerProps {
  className?: string;
  size?: number;
  text?: string;
}

export function ThinkingVisualizer({ className, size = 60, text = "Analyzing..." }: ThinkingVisualizerProps) {
  // Creating a 3x3 grid of dots that pulse and connect
  const dots = Array.from({ length: 9 });

  return (
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
      <div 
        className="relative grid grid-cols-3 gap-2"
        style={{ width: size, height: size }}
      >
        {/* Connection lines (SVG overlay) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
          <motion.path
            d={`M ${size/6} ${size/6} L ${size/2} ${size/2} L ${size*5/6} ${size/6} L ${size*5/6} ${size/2} L ${size/2} ${size*5/6} L ${size/6} ${size/2} Z`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-indigo-400"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 1, 0],
              opacity: [0, 1, 1, 0]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        </svg>

        {/* Nodes */}
        {dots.map((_, i) => {
          // Calculate delay based on grid position for a wave effect
          const row = Math.floor(i / 3);
          const col = i % 3;
          const delay = (row + col) * 0.15;

          return (
            <div key={i} className="flex items-center justify-center relative">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-indigo-500 absolute"
                animate={{
                  scale: [1, 2.5, 1],
                  opacity: [0.3, 1, 0.3],
                  boxShadow: [
                    "0 0 0px rgba(99,102,241,0)",
                    "0 0 10px rgba(99,102,241,0.8)",
                    "0 0 0px rgba(99,102,241,0)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: delay,
                  ease: "easeInOut"
                }}
              />
              {/* Core static dot */}
              <div className="w-1 h-1 rounded-full bg-white z-10" />
            </div>
          );
        })}
      </div>
      
      {text && (
        <motion.span 
          className="text-xs font-medium text-zinc-500 tracking-widest uppercase font-mono"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {text}
        </motion.span>
      )}
    </div>
  );
}
