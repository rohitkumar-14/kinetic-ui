"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface VariableFontWeightProps {
  text?: string;
  className?: string;
}

export function VariableFontWeight({
  text = "KINETIC MOTION",
  className,
}: VariableFontWeightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fontWeight, setFontWeight] = useState(400);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const dist = Math.abs(e.clientX - (rect.left + rect.width / 2));
    const norm = Math.max(0, 1 - dist / (rect.width / 2));
    setFontWeight(Math.round(100 + norm * 800)); // 100 to 900
  };

  const handleMouseLeave = () => setFontWeight(400);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("w-full min-h-[250px] bg-black rounded-3xl p-8 flex items-center justify-center border border-white/10 select-none cursor-pointer", className)}
    >
      <h2
        className="text-4xl md:text-7xl uppercase tracking-wider text-white transition-[font-weight] duration-150 text-center"
        style={{ fontWeight }}
      >
        {text}
      </h2>
    </div>
  );
}
