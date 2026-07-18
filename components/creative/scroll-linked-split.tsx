"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ScrollLinkedSplitProps extends React.HTMLAttributes<HTMLDivElement> {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  revealContent: React.ReactNode;
  splitRatio?: "50/50" | "40/60" | "60/40";
  direction?: "horizontal" | "vertical";
  offset?: number;
  scrollContainerRef?: React.RefObject<any>;
  stickyHeight?: string;
}

const ratioClasses = {
  "50/50": "grid-cols-2",
  "40/60": "grid-cols-[4fr_6fr]",
  "60/40": "grid-cols-[6fr_4fr]",
};

export function ScrollLinkedSplit({
  leftContent,
  rightContent,
  revealContent,
  splitRatio = "50/50",
  direction = "horizontal",
  offset = 100, // percentage to move out
  scrollContainerRef,
  stickyHeight = "100vh",
  className,
  ...props
}: ScrollLinkedSplitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    ...(scrollContainerRef ? { container: scrollContainerRef } : {}),
    offset: ["start start", "end end"]
  });

  // Calculate transforms based on direction
  const leftX = useTransform(scrollYProgress, [0, 1], ["0%", `-${offset}%`]);
  const rightX = useTransform(scrollYProgress, [0, 1], ["0%", `${offset}%`]);
  
  const topY = useTransform(scrollYProgress, [0, 1], ["0%", `-${offset}%`]);
  const bottomY = useTransform(scrollYProgress, [0, 1], ["0%", `${offset}%`]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-[150vh]", className)}
      {...props}
    >
      <div 
        className="sticky top-0 w-full overflow-hidden flex items-center justify-center"
        style={{ height: stickyHeight }}
      >
        {/* The content revealed underneath */}
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          {revealContent}
        </div>

        {/* The splitting panels */}
        {direction === "horizontal" ? (
          <div className={cn("absolute inset-0 z-10 grid w-full h-full", ratioClasses[splitRatio])}>
            <motion.div 
              className="h-full w-full bg-background border-r border-border shadow-xl origin-left"
              style={{ x: leftX }}
            >
              {leftContent}
            </motion.div>
            <motion.div 
              className="h-full w-full bg-background border-l border-border shadow-xl origin-right"
              style={{ x: rightX }}
            >
              {rightContent}
            </motion.div>
          </div>
        ) : (
          <div className="absolute inset-0 z-10 flex flex-col w-full h-full">
            <motion.div 
              className="h-1/2 w-full bg-background border-b border-border shadow-xl origin-top"
              style={{ y: topY }}
            >
              {leftContent}
            </motion.div>
            <motion.div 
              className="h-1/2 w-full bg-background border-t border-border shadow-xl origin-bottom"
              style={{ y: bottomY }}
            >
              {rightContent}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
