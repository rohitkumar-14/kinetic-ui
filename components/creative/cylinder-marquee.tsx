"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface CylinderMarqueeProps {
  items: React.ReactNode[];
  itemWidth?: number; // width in pixels
  itemHeight?: number; // height in pixels
  radius?: number; // If not provided, it's calculated automatically
  speed?: number; // seconds per full rotation
  direction?: "left" | "right";
  className?: string;
  itemClassName?: string;
}

export function CylinderMarquee({
  items,
  itemWidth = 300,
  itemHeight = 200,
  radius,
  speed = 20,
  direction = "left",
  className,
  itemClassName,
}: CylinderMarqueeProps) {
  const itemCount = items.length;
  const rotationAngle = 360 / itemCount;

  // Calculate the Z-translation required to form a perfect circle
  // r = (w / 2) / tan(π / n)
  const calculatedRadius = useMemo(() => {
    if (radius) return radius;
    // Add a little padding to the width for spacing
    const paddedWidth = itemWidth + 20; 
    return Math.round(paddedWidth / 2 / Math.tan(Math.PI / itemCount));
  }, [itemWidth, itemCount, radius]);

  return (
    <div 
      className={cn("relative flex items-center justify-center", className)}
      style={{ perspective: "1000px" }}
    >
      {/* Tilted container to view the cylinder from slightly above */}
      <div style={{ transform: "rotateX(-15deg)", transformStyle: "preserve-3d" }}>
        <motion.div
          className="relative flex items-center justify-center"
          style={{
            width: itemWidth,
            height: itemHeight,
            transformStyle: "preserve-3d",
          }}
          animate={{
            rotateY: direction === "left" ? [0, -360] : [0, 360],
          }}
          transition={{
            duration: speed,
            repeat: Infinity,
            ease: "linear",
          }}
        >
        {items.map((item, index) => {
          const rotateY = index * rotationAngle;
          
          return (
            <div
              key={index}
              className={cn(
                "absolute top-0 left-0 flex items-center justify-center",
                itemClassName
              )}
              style={{
                width: itemWidth,
                height: itemHeight,
                transform: `rotateY(${rotateY}deg) translateZ(${calculatedRadius}px)`,
                // We add a tiny bit of opacity fading if we want, but native 3D handles it beautifully
              }}
            >
              {item}
            </div>
          );
        })}
        </motion.div>
      </div>
    </div>
  );
}
