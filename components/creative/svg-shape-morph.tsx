"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SvgShapeMorphProps {
  className?: string;
  pathA: string;
  pathB: string;
  fill?: string;
  duration?: number;
}

export function SvgShapeMorph({
  className,
  pathA,
  pathB,
  fill = "currentColor",
  duration = 0.5,
}: SvgShapeMorphProps) {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <div 
      className={cn("relative cursor-pointer hover:scale-105 transition-transform", className)}
      onClick={() => setIsToggled(!isToggled)}
    >
      <motion.svg
        viewBox="0 0 100 100"
        className="w-full h-full"
      >
        <motion.path
          animate={{ d: isToggled ? pathB : pathA }}
          transition={{ duration, ease: "easeInOut" }}
          fill={fill}
        />
      </motion.svg>
    </div>
  );
}
