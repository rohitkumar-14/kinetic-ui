"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface InfiniteCircularSliderProps {
  images: string[];
  className?: string;
}

export function InfiniteCircularSlider({ images, className }: InfiniteCircularSliderProps) {
  // To create a perfect 3D cylinder, we calculate the angle between each image
  // and the translateZ distance needed to push them out from the center.
  const angle = 360 / images.length;
  // Radius calculation: using tangent. For a fixed width of 200px (12.5rem).
  const itemWidth = 240; 
  const radius = Math.round((itemWidth / 2) / Math.tan(Math.PI / images.length));

  return (
    <div className={cn("relative w-full h-[70vh] flex items-center justify-center overflow-hidden bg-background [perspective:1200px]", className)}>
      <motion.div
        className="relative w-full h-full flex items-center justify-center [transform-style:preserve-3d]"
        animate={{ rotateY: 360 }}
        transition={{
          repeat: Infinity,
          duration: 30,
          ease: "linear",
        }}
      >
        {images.map((src, index) => {
          return (
            <div
              key={index}
              className="absolute w-[240px] h-[320px] rounded-2xl overflow-hidden shadow-2xl border border-border/20 [backface-visibility:hidden]"
              style={{
                transform: `rotateY(${index * angle}deg) translateZ(${radius + 50}px)`,
              }}
            >
              <img
                src={src}
                alt={`Slide ${index}`}
                className="w-full h-full object-cover rounded-2xl pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
