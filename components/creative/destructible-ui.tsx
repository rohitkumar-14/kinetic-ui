"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface DestructibleUIProps {
  children: React.ReactNode;
  isDestroyed: boolean;
  className?: string;
  force?: number;
}

const SHARDS = [
  // Shard 1 (Top Left)
  {
    clipPath: "polygon(0% 0%, 60% 0%, 40% 60%, 0% 40%)",
    targetX: -100,
    targetY: 200,
    targetRotate: -45,
  },
  // Shard 2 (Top Right)
  {
    clipPath: "polygon(60% 0%, 100% 0%, 100% 60%, 40% 60%)",
    targetX: 120,
    targetY: 150,
    targetRotate: 60,
  },
  // Shard 3 (Bottom Left)
  {
    clipPath: "polygon(0% 40%, 40% 60%, 30% 100%, 0% 100%)",
    targetX: -80,
    targetY: 300,
    targetRotate: -90,
  },
  // Shard 4 (Bottom Center)
  {
    clipPath: "polygon(40% 60%, 100% 60%, 70% 100%, 30% 100%)",
    targetX: 40,
    targetY: 400,
    targetRotate: 20,
  },
  // Shard 5 (Bottom Right)
  {
    clipPath: "polygon(100% 60%, 100% 100%, 70% 100%)",
    targetX: 150,
    targetY: 250,
    targetRotate: 110,
  },
];

export function DestructibleUI({
  children,
  isDestroyed,
  className,
  force = 1,
}: DestructibleUIProps) {
  return (
    <div className={cn("relative inline-block", className)}>
      {/* 
        We keep the original children in the DOM but make them invisible when destroyed.
        This ensures the parent wrapper maintains the exact same layout dimensions!
      */}
      <div className={cn("transition-opacity duration-0", isDestroyed ? "opacity-0 pointer-events-none" : "opacity-100")}>
        {children}
      </div>

      {isDestroyed &&
        SHARDS.map((shard, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 z-50 pointer-events-none"
            style={{ clipPath: shard.clipPath }}
            initial={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
            animate={{
              opacity: [1, 1, 0], // Stay visible while falling, fade out at end
              x: shard.targetX * force,
              y: shard.targetY * force,
              rotate: shard.targetRotate * force,
              scale: 0.8,
            }}
            transition={{ 
              duration: 1.2 + Math.random() * 0.5, // Slight random stagger in fall speed
              ease: [0.32, 0.72, 0, 1], // Custom gravity-like ease
              times: [0, 0.7, 1]
            }}
          >
            {/* The shard contains an exact visual clone of the children */}
            {children}
          </motion.div>
        ))}
    </div>
  );
}
