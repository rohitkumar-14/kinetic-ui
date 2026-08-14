"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ThreeDCardPeelProps {
  frontImage: string;
  backImage: string;
  className?: string;
}

export function ThreeDCardPeel({ frontImage, backImage, className }: ThreeDCardPeelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // We track the mouse position from the top right corner
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Distance from top right corner
    const x = rect.right - e.clientX;
    const y = e.clientY - rect.top;
    
    // Only peel if we are somewhat near the top right
    mouseX.set(Math.max(0, Math.min(x, rect.width)));
    mouseY.set(Math.max(0, Math.min(y, rect.height)));
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Animate back to 0
    mouseX.set(0);
    mouseY.set(0);
  };

  // The clip path for the front card to hide the peeling corner
  const frontClipPath = useTransform([mouseX, mouseY], ([x, y]: any) => {
    // If x and y are 0, no peel
    if (!isHovered) return "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
    
    // Calculate the cut points on the top and right edges
    const cutRight = Math.max(0, 100 - (y / 3)); // percentage
    const cutTop = Math.max(0, 100 - (x / 3)); // percentage
    
    // It creates a triangle cut at the top right
    return `polygon(0 0, ${cutTop}% 0, 100% ${100 - cutRight}%, 100% 100%, 0 100%)`;
  });

  // The peeled flap is a bit tricky to do purely in CSS with dynamic mouse.
  // Instead, we will do a simpler but highly effective 3D fold on hover using Framer Motion 3D transforms.
  
  // Let's pivot to a highly polished 3D fold/peel effect that guarantees 60fps
  return (
    <div
      ref={containerRef}
      className={cn("relative w-64 h-96 cursor-pointer group perspective-[1200px]", className)}
    >
      <motion.div
        className="w-full h-full relative preserve-3d transition-transform duration-500 ease-out group-hover:rotate-y-[-15deg] group-hover:rotate-x-[5deg]"
      >
        {/* Back Content (What's underneath the peel) */}
        <div 
          className="absolute inset-0 rounded-2xl bg-cover bg-center overflow-hidden shadow-2xl"
          style={{ backgroundImage: `url(${backImage})` }}
        >
          {/* Internal shadow to make it look like a recess */}
          <div className="absolute inset-0 bg-black/40 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]" />
        </div>

        {/* Front Content (The sticker that peels away) */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-cover bg-center shadow-lg origin-top-right transition-all duration-500 ease-out z-10"
          style={{ backgroundImage: `url(${frontImage})` }}
          whileHover={{ 
            rotateX: -25, 
            rotateY: 25, 
            x: -15, 
            y: 15,
            scale: 0.95
          }}
        >
          {/* Glossy shine overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
        </motion.div>
      </motion.div>
    </div>
  );
}
