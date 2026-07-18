"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface BlobBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  colors?: string[];
  blur?: number;
  animationSpeed?: number;
  blobOpacity?: number;
}

export function BlobBackground({
  colors = ["#ffaa40", "#9c40ff", "#00c6ff"],
  blur = 60,
  animationSpeed = 20,
  blobOpacity = 0.5,
  className,
  ...props
}: BlobBackgroundProps) {
  return (
    <div
      className={cn("absolute inset-0 overflow-hidden pointer-events-none z-0", className)}
      {...props}
    >
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ filter: `blur(${blur}px)` }}
      >
        {/* Blob 1 */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full mix-blend-screen"
          style={{ backgroundColor: colors[0], opacity: blobOpacity }}
          animate={{
            x: ["0%", "30%", "-20%", "0%"],
            y: ["0%", "-40%", "20%", "0%"],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: animationSpeed,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Blob 2 */}
        <motion.div
          className="absolute top-1/3 right-1/4 w-[35vw] h-[35vw] rounded-full mix-blend-screen"
          style={{ backgroundColor: colors[1], opacity: blobOpacity }}
          animate={{
            x: ["0%", "-30%", "20%", "0%"],
            y: ["0%", "30%", "-10%", "0%"],
            scale: [1, 0.9, 1.2, 1],
          }}
          transition={{
            duration: animationSpeed * 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Blob 3 */}
        {colors[2] && (
          <motion.div
            className="absolute bottom-1/4 left-1/3 w-[45vw] h-[45vw] rounded-full mix-blend-screen"
            style={{ backgroundColor: colors[2], opacity: blobOpacity }}
            animate={{
              x: ["0%", "20%", "-30%", "0%"],
              y: ["0%", "10%", "-40%", "0%"],
              scale: [1, 1.1, 0.8, 1],
            }}
            transition={{
              duration: animationSpeed * 0.9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </div>
    </div>
  );
}
