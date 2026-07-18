"use client";

import React, { useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useAnimationFrame,
  wrap,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface MouseMarqueeProps {
  children: React.ReactNode;
  maxSpeed?: number;
  className?: string;
  itemClassName?: string;
  repeatCount?: number;
}

export function MouseMarquee({
  children,
  maxSpeed = 5,
  className,
  itemClassName,
  repeatCount = 4,
}: MouseMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const baseX = useMotionValue(0);
  
  // The raw speed calculated from mouse position (-1 to 1)
  const normalizedSpeed = useMotionValue(0);
  
  // Smooth out the speed changes
  const smoothSpeed = useSpring(normalizedSpeed, {
    damping: 50,
    stiffness: 400,
  });

  // Calculate X transform wrapped between 0% and -50% (assuming 2 full sets)
  // For safety with higher repeat counts, we wrap based on -100 / (repeatCount/2)
  const wrapLimit = -100 / (repeatCount / 2);
  const x = useTransform(baseX, (v) => `${wrap(0, wrapLimit, v)}%`);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      
      // Check if mouse is hovering over the container (optional, we'll track globally for now)
      // For global tracking, we measure distance from center of screen
      const windowCenterX = window.innerWidth / 2;
      const mouseX = e.clientX;
      
      // Normalize between -1 (far left) and 1 (far right)
      const normalized = (mouseX - windowCenterX) / windowCenterX;
      normalizedSpeed.set(normalized);
    };

    const handleMouseLeave = () => {
      // Gently return to 0 speed when mouse leaves window
      normalizedSpeed.set(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [normalizedSpeed]);

  useAnimationFrame((t, delta) => {
    // Current smoothed speed factor (-1 to 1)
    const currentSpeedFactor = smoothSpeed.get();
    
    // Convert to actual movement (delta normalized * maxSpeed)
    // If speed is 0, it stops.
    const moveBy = currentSpeedFactor * maxSpeed * (delta / 16); // Normalize delta to roughly 60fps
    
    baseX.set(baseX.get() - moveBy);
  });

  return (
    <div 
      ref={containerRef}
      className={cn("overflow-hidden whitespace-nowrap flex m-0 relative", className)}
    >
      <motion.div
        className="flex whitespace-nowrap"
        style={{ x }}
      >
        {Array.from({ length: repeatCount }).map((_, i) => (
          <div key={i} className={cn("flex shrink-0 items-center", itemClassName)}>
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
