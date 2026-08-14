"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export interface IsometricGridProps {
  items: React.ReactNode[];
  className?: string;
  columns?: number;
}

export function IsometricGrid({ items, className, columns = 3 }: IsometricGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Motion values for the actual rotation
  const rotateX = useSpring(0, { stiffness: 80, damping: 20 });
  const rotateZ = useSpring(0, { stiffness: 80, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    // Base isometric angles
    const baseX = 60;
    const baseZ = -45;
    
    // Offset based on mouse (-10 to 10 degrees)
    const offsetX = (y - 0.5) * 20; 
    const offsetZ = (0.5 - x) * 20; 
    
    rotateX.set(baseX + offsetX);
    rotateZ.set(baseZ + offsetZ);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateZ.set(0);
  };

  return (
    <div 
      ref={containerRef}
      className={cn("w-full h-[80vh] flex items-center justify-center overflow-hidden bg-background", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="grid gap-4 [transform-style:preserve-3d]"
        style={{
          rotateX,
          rotateZ,
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`
        }}
      >
        {items.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ z: 40 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-32 h-32 sm:w-48 sm:h-48 rounded-xl bg-card border border-border shadow-[0_0_15px_rgba(0,0,0,0.1)] relative overflow-hidden group hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none group-hover:opacity-0 transition-opacity" />
            {item}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
