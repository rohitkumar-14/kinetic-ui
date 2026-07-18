"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { GripVertical } from "lucide-react";

export interface BeforeAfterSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  defaultValue?: number;
  handleColor?: string;
  imageClassName?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel,
  afterLabel,
  defaultValue = 50,
  handleColor = "#ffffff",
  className,
  imageClassName,
  ...props
}: BeforeAfterSliderProps) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Motion values for smooth drag and interpolation
  const progress = useMotionValue(defaultValue);
  const clipPath = useTransform(progress, (v) => `inset(0 ${100 - v}% 0 0)`);
  const leftPosition = useTransform(progress, (v) => `${v}%`);

  const handlePointerMove = (e: React.PointerEvent | PointerEvent) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const newProgress = Math.min(Math.max((x / width) * 100, 0), 100);
    progress.set(newProgress);
  };

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      if (isHovered) {
        handlePointerMove(e);
      }
    };
    
    if (isHovered) {
      window.addEventListener("pointermove", handleMove);
    }
    
    return () => {
      window.removeEventListener("pointermove", handleMove);
    };
  }, [isHovered, progress]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden rounded-xl cursor-ew-resize select-none touch-none",
        className
      )}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      onPointerDown={(e) => {
        setIsHovered(true);
        handlePointerMove(e);
      }}
      onPointerUp={() => setIsHovered(false)}
      {...props}
    >
      {/* Background Image (After) */}
      <img
        src={afterImage}
        alt={afterLabel || "After"}
        className={cn("w-full h-full object-cover block pointer-events-none", imageClassName)}
        draggable={false}
      />
      {afterLabel && (
        <span className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md text-white text-xs font-semibold px-2 py-1 rounded shadow-lg pointer-events-none z-10">
          {afterLabel}
        </span>
      )}

      {/* Foreground Image (Before) with Clip Path */}
      <motion.div
        className="absolute inset-0 z-20 overflow-hidden pointer-events-none"
        style={{ clipPath }}
      >
        <img
          src={beforeImage}
          alt={beforeLabel || "Before"}
          className={cn("absolute inset-0 w-full h-full object-cover block", imageClassName)}
          draggable={false}
        />
        {beforeLabel && (
          <span className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md text-white text-xs font-semibold px-2 py-1 rounded shadow-lg pointer-events-none">
            {beforeLabel}
          </span>
        )}
      </motion.div>

      {/* Draggable Handle */}
      <motion.div
        className="absolute top-0 bottom-0 w-1 flex items-center justify-center z-30 pointer-events-none"
        style={{ left: leftPosition, backgroundColor: handleColor }}
      >
        <div 
          className="w-8 h-8 rounded-full shadow-xl flex items-center justify-center -translate-x-1/2"
          style={{ backgroundColor: handleColor }}
        >
          <GripVertical className="w-4 h-4 text-black" />
        </div>
      </motion.div>
    </div>
  );
}
