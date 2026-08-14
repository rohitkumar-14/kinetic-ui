"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SvgPathDrawProps {
  className?: string;
  path: string;
  strokeColor?: string;
  strokeWidth?: number;
  duration?: number;
}

export function SvgPathDraw({
  className,
  path,
  strokeColor = "currentColor",
  strokeWidth = 2,
  duration = 2.5,
}: SvgPathDrawProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Trigger animation once when it enters the viewport
  const isInView = useInView(containerRef, { once: true, margin: "-100px 0px" });

  const pathVariants: any = {
    hidden: { 
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration, ease: "easeInOut" },
        opacity: { duration: 0.2 },
      }
    }
  };

  return (
    <div ref={containerRef} className={cn("relative flex items-center justify-center w-full h-full", className)}>
      <motion.svg
        viewBox="0 0 800 300"
        fill="transparent"
        className="w-full h-full"
      >
        <motion.path
          d={path}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={pathVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        />
      </motion.svg>
    </div>
  );
}
