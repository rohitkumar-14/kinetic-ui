"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { cn } from "@/lib/utils";

export interface FlashlightRevealProps {
  text: string;
  className?: string;
  cursorSize?: number;
}

export function FlashlightReveal({ text, className, cursorSize = 300 }: FlashlightRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  
  // Smooth out the flashlight movement
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    let clientX, clientY;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    mouseX.set(clientX - rect.left);
    mouseY.set(clientY - rect.top);
  };

  const handleMouseLeave = () => {
    // Move the flashlight far away when not hovering
    mouseX.set(-1000);
    mouseY.set(-1000);
  };

  return (
    <div 
      ref={containerRef}
      className={cn("relative w-full h-[600px] bg-zinc-950 overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseLeave}
      onTouchCancel={handleMouseLeave}
    >
      {/* 
        LAYER 1 (Bottom): The Colorful Reveal 
        This is what we see when the flashlight shines on it.
      */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-zinc-900">
        {/* Colorful Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-20" />
        {/* Colorful Text */}
        <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 z-10 text-center px-4">
          {text}
        </h1>
        {/* Subtle grid for extra depth */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none opacity-30 mix-blend-overlay"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: `40px 40px`
          }}
        />
      </div>

      {/* 
        LAYER 2 (Top): The Pitch Black Overlay 
        This layer covers everything. We punch a hole in it using CSS masking.
      */}
      <motion.div 
        className="absolute inset-0 w-full h-full flex items-center justify-center bg-zinc-950 z-20 pointer-events-none"
        style={{
          // Mask out a radial gradient hole where the mouse is
          WebkitMaskImage: useMotionTemplate`radial-gradient(circle ${cursorSize / 2}px at ${springX}px ${springY}px, transparent 0%, black 100%)`,
          maskImage: useMotionTemplate`radial-gradient(circle ${cursorSize / 2}px at ${springX}px ${springY}px, transparent 0%, black 100%)`
        }}
      >
        {/* Standard subtle text that you see before shining the light */}
        <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-zinc-800 z-10 text-center px-4">
          {text}
        </h1>
      </motion.div>
    </div>
  );
}
