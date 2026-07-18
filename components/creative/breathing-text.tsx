"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export interface BreathingTextProps {
  /** The text to display */
  label: string;
  /** The interaction mode */
  mode?: "auto" | "cursor";
  /** Minimum font weight */
  minWeight?: number;
  /** Maximum font weight */
  maxWeight?: number;
  /** Optional class name */
  className?: string;
}

export function BreathingText({
  label,
  mode = "auto",
  minWeight = 100,
  maxWeight = 900,
  className,
}: BreathingTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Motion value for the weight axis
  const weight = useMotionValue(minWeight);
  // Motion value for the slant axis (optional if font supports it)
  const slant = useMotionValue(0);

  // Smooth springs for cursor tracking
  const springWeight = useSpring(weight, { stiffness: 150, damping: 20 });
  const springSlant = useSpring(slant, { stiffness: 150, damping: 20 });

  // Map the motion values to the raw CSS font-variation-settings string
  const activeWeight = mode === "auto" ? weight : springWeight;
  const fontVariationSettings = useTransform(
    activeWeight,
    (w) => `"wght" ${w}`
  );

  useEffect(() => {
    if (mode === "auto") {
      // Create a breathing loop
      const controls = animate(weight, [minWeight, maxWeight, minWeight], {
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
      });
      return () => controls.stop();
    }
  }, [mode, minWeight, maxWeight, weight]);

  useEffect(() => {
    if (mode === "cursor") {
      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        
        // Calculate mouse position relative to the center of the text container
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        
        // Normalize distance (0 to 1) based on a max radius of say, 500px
        const maxRadius = 500;
        const distance = Math.min(Math.sqrt(distanceX ** 2 + distanceY ** 2), maxRadius);
        const normalized = 1 - distance / maxRadius; // 1 when exact center, 0 when far away

        // Map normalized distance to weight (closer = heavier)
        const targetWeight = minWeight + (maxWeight - minWeight) * normalized;
        weight.set(targetWeight);
      };

      const handleMouseLeave = () => {
        weight.set(minWeight);
      };

      window.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [mode, minWeight, maxWeight, weight]);

  return (
    <div ref={containerRef} className={cn("relative flex justify-center", className)}>
      <motion.h1
        className="text-center transition-colors"
        style={{
          fontVariationSettings,
          // Fallback transition for colors if any
        }}
      >
        {label}
      </motion.h1>
    </div>
  );
}
