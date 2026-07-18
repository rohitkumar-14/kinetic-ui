"use client";

import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useTransform,
  wrap,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface VerticalTickerColumnProps {
  children: React.ReactNode;
  speed?: number; // pixels per frame roughly
  direction?: 1 | -1;
  className?: string;
  itemClassName?: string;
}

export function VerticalTickerColumn({
  children,
  speed = 1,
  direction = 1,
  className,
  itemClassName,
}: VerticalTickerColumnProps) {
  const baseY = useMotionValue(0);

  // Assuming 2 copies of children to allow infinite wrap
  // Wrap limit is -50% because we duplicate the children once (total 2 sets)
  useAnimationFrame((t, delta) => {
    let moveBy = direction * speed * (delta / 16);
    // Wrap between 0 and -50%
    const currentY = baseY.get();
    let nextY = currentY + moveBy;
    
    // Manual wrap since useTransform wrap is sometimes tricky with percentages
    if (direction === -1 && nextY <= -50) {
      nextY = 0;
    } else if (direction === 1 && nextY >= 0) {
      nextY = -50;
    }
    
    baseY.set(nextY);
  });

  const y = useTransform(baseY, (v) => `${v}%`);

  return (
    <div className={cn("overflow-hidden flex flex-col h-full relative", className)}>
      <motion.div 
        className="flex flex-col h-fit"
        style={{ y }}
      >
        {/* First Set */}
        <div className={cn("flex flex-col shrink-0", itemClassName)}>
          {children}
        </div>
        {/* Second Set (Duplicate for seamless loop) */}
        <div className={cn("flex flex-col shrink-0", itemClassName)}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}

// Ensure the component actually uses the % value correctly
// A better way is to use a CSS variable or just rely on CSS animations for standard vertical tickers
// Since the height isn't known upfront, CSS keyframes are actually safer for vertical.

export function CssVerticalTickerColumn({
  children,
  duration = 20,
  direction = "up",
  className,
  itemClassName,
}: {
  children: React.ReactNode;
  duration?: number;
  direction?: "up" | "down";
  className?: string;
  itemClassName?: string;
}) {
  return (
    <div className={cn("overflow-hidden flex flex-col h-full relative", className)}>
      <div 
        className={cn(
          "flex flex-col w-full h-fit animate-marquee-vertical",
          direction === "down" && "direction-reverse"
        )}
        style={{ animationDuration: `${duration}s` } as React.CSSProperties}
      >
        <div className={cn("flex flex-col shrink-0", itemClassName)}>
          {children}
        </div>
        <div className={cn("flex flex-col shrink-0", itemClassName)}>
          {children}
        </div>
      </div>
    </div>
  );
}

export function VerticalTickerWall({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("w-full h-full flex gap-4 overflow-hidden", className)}>
      {children}
    </div>
  );
}
