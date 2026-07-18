"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ParallaxImageTrackProps {
  images: string[];
  className?: string;
  speed?: number;
}

export function ParallaxImageTrack({ images, className, speed = 1 }: ParallaxImageTrackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -400 * speed]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, 400 * speed]);
  
  // Split images into two rows
  const half = Math.ceil(images.length / 2);
  const row1 = images.slice(0, half);
  const row2 = images.slice(half);

  return (
    <div ref={containerRef} className={cn("relative w-full overflow-hidden flex flex-col gap-4 md:gap-8 py-20", className)}>
      <motion.div style={{ x: x1 }} className="flex gap-4 md:gap-8 whitespace-nowrap min-w-max ml-[10vw]">
        {row1.map((src, i) => (
          <div key={i} className="relative w-[60vw] md:w-[30vw] h-[40vh] md:h-[50vh] rounded-2xl overflow-hidden shrink-0 group">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
            <img 
              src={src} 
              alt="Gallery item" 
              className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out" 
            />
          </div>
        ))}
      </motion.div>
      <motion.div style={{ x: x2 }} className="flex gap-4 md:gap-8 whitespace-nowrap min-w-max ml-[-30vw]">
        {row2.map((src, i) => (
          <div key={i} className="relative w-[60vw] md:w-[30vw] h-[40vh] md:h-[50vh] rounded-2xl overflow-hidden shrink-0 group">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
            <img 
              src={src} 
              alt="Gallery item" 
              className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out" 
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
