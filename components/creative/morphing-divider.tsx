"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MorphingDividerProps {
  className?: string;
  fill?: string;
}

// A collection of paths that represent organic wave shapes
const PATHS = [
  "M0,50 C150,150 350,-50 500,50 C650,150 850,-50 1000,50 L1000,100 L0,100 Z",
  "M0,50 C150,-50 350,150 500,50 C650,-50 850,150 1000,50 L1000,100 L0,100 Z",
  "M0,50 C200,100 300,0 500,50 C700,100 800,0 1000,50 L1000,100 L0,100 Z",
  "M0,50 C200,0 300,100 500,50 C700,0 800,100 1000,50 L1000,100 L0,100 Z",
];

export function MorphingDivider({ className, fill = "currentColor" }: MorphingDividerProps) {
  const [pathIndex, setPathIndex] = useState(0);

  // Cycle through paths indefinitely
  useEffect(() => {
    const interval = setInterval(() => {
      setPathIndex((prev) => (prev + 1) % PATHS.length);
    }, 2000); // Change path every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn("w-full overflow-hidden leading-0", className)}>
      <svg
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        className="w-full h-16 sm:h-24 md:h-32 block"
      >
        <motion.path
          animate={{ d: PATHS[pathIndex] }}
          transition={{
            duration: 2,
            ease: "easeInOut",
          }}
          fill={fill}
        />
      </svg>
    </div>
  );
}
