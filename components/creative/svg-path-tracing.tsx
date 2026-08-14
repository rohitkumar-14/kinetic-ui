"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SvgPathTracingProps {
  className?: string;
  path: string;
  strokeColor?: string;
  strokeWidth?: number;
  viewBox?: string;
  duration?: number;
}

export function SvgPathTracing({
  className,
  path,
  strokeColor = "currentColor",
  strokeWidth = 2,
  viewBox = "0 0 100 100",
  duration = 4
}: SvgPathTracingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.5 });

  return (
    <div 
      ref={containerRef} 
      className={cn("relative w-full h-full min-h-[400px] flex items-center justify-center", className)}
    >
      <svg
        viewBox={viewBox}
        className="w-full h-full max-w-2xl text-foreground drop-shadow-md"
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          d={path}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{
            pathLength: { type: "spring", duration: duration, bounce: 0 },
            opacity: { duration: 0.5 }
          }}
        />
      </svg>
    </div>
  );
}
