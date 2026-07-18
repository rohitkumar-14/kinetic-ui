"use client";

import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ScrollDrivenPathProps {
  className?: string;
  pathData?: string;
  viewBox?: string;
  color?: string;
  strokeWidth?: number;
  glow?: boolean;
  children?: React.ReactNode;
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
}

export function ScrollDrivenPath({
  className,
  pathData = "M 50 0 C 150 200, -50 400, 50 600 C 150 800, -50 1000, 50 1200", 
  viewBox = "0 0 100 1200",
  color = "#6366f1",
  strokeWidth = 4,
  glow = true,
  children,
  scrollContainerRef,
}: ScrollDrivenPathProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress within this specific container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollContainerRef,
    offset: ["start center", "end center"],
  });

  return (
    <div ref={containerRef} className={cn("relative w-full overflow-hidden", className)}>
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <svg 
          viewBox={viewBox} 
          fill="none" 
          className="w-full h-full max-w-lg mx-auto"
          preserveAspectRatio="xMidYMin meet"
        >
          {glow && (
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          )}
          
          {/* Faded Background Track */}
          <path 
            d={pathData} 
            stroke={color} 
            strokeWidth={strokeWidth} 
            strokeOpacity={0.15} 
            strokeLinecap="round" 
          />
          
          {/* Animated Drawing Path */}
          <motion.path
            d={pathData}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            style={{ pathLength: scrollYProgress }}
            filter={glow ? "url(#glow)" : undefined}
          />
        </svg>
      </div>
      
      {/* Overlay Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
