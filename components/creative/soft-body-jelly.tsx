"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SoftBodyJellyProps {
  className?: string;
}

export function SoftBodyJelly({ className }: SoftBodyJellyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track relative drag position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Apply heavy spring physics to give it that "jelly" weight
  const springConfig = { damping: 10, stiffness: 100, mass: 2 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Convert the spring physics into path coordinates for an SVG bezier curve
  // A standard circle/blob in SVG using absolute coordinates
  // We'll morph the control points based on drag tension
  const path = useTransform([springX, springY], ([latestX, latestY]: any) => {
    // Max deformation cap
    const dx = Math.max(-50, Math.min(50, latestX * 0.5));
    const dy = Math.max(-50, Math.min(50, latestY * 0.5));

    // Base coordinates for a 100x100 blob
    // M 50,0 C 77,0 100,23 100,50 C 100,77 77,100 50,100 C 23,100 0,77 0,50 C 0,23 23,0 50,0
    
    // We deform the center points based on drag
    return `M 50,0 
            C ${77 + dx},0 ${100 + dx},23 ${100 + dx},50 
            C ${100 + dx},77 ${77 + dx},100 50,100 
            C ${23 + dx},100 ${0 + dx},77 ${0 + dx},50 
            C ${0 + dx},23 ${23 + dx},0 50,0 Z`;
  });

  return (
    <div 
      ref={containerRef}
      className={cn("relative flex items-center justify-center w-64 h-64", className)}
    >
      {/* Invisible drag target that maps to the spring values */}
      <motion.div
        drag
        dragConstraints={containerRef}
        dragElastic={0.4}
        style={{ x, y }}
        className="absolute w-32 h-32 z-20 cursor-grab active:cursor-grabbing"
      />

      {/* The physical rendered jelly */}
      <motion.svg
        viewBox="-20 -20 140 140"
        className="w-full h-full absolute inset-0 pointer-events-none drop-shadow-[0_0_30px_rgba(236,72,153,0.5)]"
      >
        <defs>
          <linearGradient id="jelly-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        
        {/* We use framer-motion's motion.path to natively animate the 'd' attribute string */}
        <motion.path
          d={path as any}
          fill="url(#jelly-grad)"
          className="transition-colors"
        />
      </motion.svg>
      
      <span className="relative z-10 font-bold text-white pointer-events-none drop-shadow-md">
        Drag Me
      </span>
    </div>
  );
}
