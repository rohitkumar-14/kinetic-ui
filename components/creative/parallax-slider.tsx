"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ParallaxSliderProps {
  images: string[];
  className?: string;
}

export function ParallaxSlider({ images, className }: ParallaxSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollXProgress } = useScroll({
    container: containerRef,
  });

  return (
    <div className={cn("w-full relative overflow-hidden bg-background", className)}>
      <div 
        ref={containerRef}
        className="flex gap-4 sm:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-12 px-8 sm:px-16"
        style={{ scrollBehavior: 'smooth', msOverflowStyle: 'none', scrollbarWidth: 'none' }}
      >
        <style dangerouslySetInnerHTML={{__html: `
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}} />
        {images.map((src, i) => {
          return (
            <ParallaxCard 
              key={i} 
              src={src} 
              index={i} 
              total={images.length} 
              scrollXProgress={scrollXProgress} 
            />
          );
        })}
      </div>
    </div>
  );
}

function ParallaxCard({ 
  src, 
  index, 
  total,
  scrollXProgress 
}: { 
  src: string; 
  index: number; 
  total: number;
  scrollXProgress: any;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  
  const step = 1 / Math.max(1, (total - 1));
  const start = Math.max(0, (index - 1) * step);
  const center = index * step;
  const end = Math.min(1, (index + 1) * step);

  const x = useTransform(
    scrollXProgress,
    [start, center, end],
    ["-20%", "0%", "20%"]
  );

  return (
    <div 
      ref={itemRef}
      className="relative shrink-0 snap-center w-[80vw] sm:w-[60vw] md:w-[40vw] h-[50vh] sm:h-[60vh] rounded-3xl overflow-hidden group cursor-grab active:cursor-grabbing border border-border/50 bg-muted/20"
    >
      <motion.div
        className="absolute inset-0 w-[140%] h-full -left-[20%]"
        style={{ x }}
      >
        <img 
          src={src} 
          alt={`Slider image ${index + 1}`}
          className="w-full h-full object-cover object-center pointer-events-none"
        />
      </motion.div>
      <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-3xl" />
    </div>
  );
}
