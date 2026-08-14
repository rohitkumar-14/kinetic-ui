"use client";

import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { MoveHorizontal } from "lucide-react";

export interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  className?: string;
}

export function BeforeAfterSlider({ beforeImage, afterImage, className }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  return (
    <div 
      ref={containerRef}
      className={cn("relative w-full h-[500px] overflow-hidden select-none cursor-ew-resize rounded-xl bg-muted group", className)}
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onTouchEnd={() => setIsDragging(false)}
      onMouseDown={(e) => {
        setIsDragging(true);
        handleMove(e.clientX);
      }}
      onTouchStart={(e) => {
        setIsDragging(true);
        handleMove(e.touches[0].clientX);
      }}
    >
      {/* Background Image (After) */}
      <img 
        src={afterImage} 
        alt="After" 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none" 
      />
      
      {/* Foreground Image (Before) Clipped */}
      <img 
        src={beforeImage} 
        alt="Before" 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      />
      
      {/* Slider Handle Line */}
      <div 
        className="absolute top-0 bottom-0 w-0.5 bg-white flex items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.5)] transition-opacity duration-300"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        {/* Slider Handle Knob */}
        <div className="w-10 h-10 rounded-full bg-white text-black shadow-xl flex items-center justify-center pointer-events-none transform transition-transform group-hover:scale-110">
           <MoveHorizontal className="w-5 h-5" />
        </div>
      </div>
      
      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full font-medium pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100">
        BEFORE
      </div>
      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full font-medium pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100">
        AFTER
      </div>
    </div>
  );
}
