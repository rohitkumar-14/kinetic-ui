"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SvgFlashlightMaskProps {
  className?: string;
  children: React.ReactNode;
  revealChildren: React.ReactNode;
  maskSize?: number;
}

export function SvgFlashlightMask({
  className,
  children,
  revealChildren,
  maskSize = 300,
}: SvgFlashlightMaskProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth the mouse position
  const springX = useSpring(mouseX, { stiffness: 200, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn("relative w-full h-full overflow-hidden", className)}
    >
      {/* 1. Base Layer (The dark/hidden layer) */}
      <div className="absolute inset-0 w-full h-full z-0">
        {children}
      </div>

      {/* 2. Reveal Layer (What the flashlight shows) 
          We clip it using the SVG mask */}
      <motion.div 
        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
        style={{
          WebkitMaskImage: `radial-gradient(${maskSize / 2}px circle at var(--x) var(--y), black 10%, transparent 80%)`,
          maskImage: `radial-gradient(${maskSize / 2}px circle at var(--x) var(--y), black 10%, transparent 80%)`,
          // @ts-ignore - passing custom CSS variables for the mask
          "--x": useMotionTemplate`${springX}px`,
          "--y": useMotionTemplate`${springY}px`,
        }}
      >
        {revealChildren}
      </motion.div>
    </div>
  );
}

// A helper for framer-motion to interpolate strings
import { useMotionTemplate } from "framer-motion";
