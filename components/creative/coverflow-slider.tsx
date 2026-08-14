"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CoverflowSliderProps {
  images: string[];
  className?: string;
}

export function CoverflowSlider({ images, className }: CoverflowSliderProps) {
  const [activeIndex, setActiveIndex] = useState(Math.floor(images.length / 2));

  const handleNext = () => {
    setActiveIndex((prev) => Math.min(images.length - 1, prev + 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(0, prev - 1));
  };

  return (
    <div className={cn("relative w-full h-[60vh] flex items-center justify-center overflow-hidden bg-background [perspective:1000px]", className)}>
      <div className="relative w-full max-w-5xl h-full flex items-center justify-center [transform-style:preserve-3d]">
        <AnimatePresence initial={false}>
          {images.map((src, index) => {
            const isActive = index === activeIndex;
            const distance = index - activeIndex;
            const isVisible = Math.abs(distance) <= 3;

            if (!isVisible) return null;

            return (
              <motion.div
                key={index}
                onClick={() => setActiveIndex(index)}
                className="absolute top-1/2 left-1/2 w-64 sm:w-80 h-96 sm:h-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-2xl overflow-hidden cursor-pointer shadow-2xl"
                initial={false}
                animate={{
                  x: `calc(-50% + ${distance * 60}%)`,
                  y: "-50%",
                  scale: isActive ? 1 : 0.8 - Math.abs(distance) * 0.1,
                  rotateY: isActive ? 0 : distance > 0 ? -45 : 45,
                  zIndex: images.length - Math.abs(distance),
                  opacity: isActive ? 1 : 1 - Math.abs(distance) * 0.2,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  mass: 0.8,
                }}
              >
                <img
                  src={src}
                  alt={`Slide ${index}`}
                  className="w-full h-full object-cover rounded-2xl"
                />
                
                {/* Dark overlay for inactive slides */}
                {!isActive && (
                  <motion.div
                    className="absolute inset-0 bg-black/40 rounded-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50">
        <button
          onClick={handlePrev}
          disabled={activeIndex === 0}
          className="p-3 rounded-full bg-background/50 backdrop-blur-md border border-border/50 text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="px-4 py-2 rounded-full bg-background/50 backdrop-blur-md border border-border/50 text-foreground text-sm font-medium">
          {activeIndex + 1} / {images.length}
        </div>
        <button
          onClick={handleNext}
          disabled={activeIndex === images.length - 1}
          className="p-3 rounded-full bg-background/50 backdrop-blur-md border border-border/50 text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
