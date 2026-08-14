"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SvgIsometricGridProps {
  className?: string;
  gridSize?: number;
  spacing?: number;
  dotRadius?: number;
}

export function SvgIsometricGrid({
  className,
  gridSize = 10,
  spacing = 30,
  dotRadius = 2,
}: SvgIsometricGridProps) {
  const [rippleOrigin, setRippleOrigin] = useState<{ x: number, y: number } | null>(null);
  const [rippleKey, setRippleKey] = useState(0);

  // Generate grid points
  const points = useMemo(() => {
    const pts = [];
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        // Isometric projection math (pseudo)
        const isoX = (x - y) * spacing;
        const isoY = ((x + y) * spacing) / 2;
        pts.push({ gridX: x, gridY: y, isoX, isoY });
      }
    }
    return pts;
  }, [gridSize, spacing]);

  const handleDotClick = (gridX: number, gridY: number) => {
    setRippleOrigin({ x: gridX, y: gridY });
    setRippleKey((prev) => prev + 1);
  };

  return (
    <div className={cn("relative w-full h-full flex items-center justify-center overflow-hidden", className)}>
      <motion.svg
        // The viewBox ensures the isometric diamond fits
        viewBox="-400 -100 800 400"
        className="w-full h-full"
      >
        {points.map((p, i) => {
          // Calculate distance from ripple origin
          let delay = 0;
          if (rippleOrigin) {
            const dx = p.gridX - rippleOrigin.x;
            const dy = p.gridY - rippleOrigin.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            delay = distance * 0.05; // speed of the ripple
          }

          return (
            <motion.circle
              key={`${p.gridX}-${p.gridY}-${rippleKey}`}
              cx={p.isoX}
              cy={p.isoY}
              r={dotRadius}
              fill="currentColor"
              className="text-zinc-500 hover:text-white cursor-pointer transition-colors"
              onClick={() => handleDotClick(p.gridX, p.gridY)}
              
              // Ripple animation
              initial={{ y: 0 }}
              animate={rippleOrigin ? { y: [0, -30, 0] } : { y: 0 }}
              transition={{
                duration: 0.6,
                delay: delay,
                ease: "easeInOut",
              }}
            />
          );
        })}

        {/* Draw connection lines to form the grid */}
        {points.map((p) => {
          // Find neighbors
          const rightNeighbor = points.find(n => n.gridX === p.gridX + 1 && n.gridY === p.gridY);
          const bottomNeighbor = points.find(n => n.gridX === p.gridX && n.gridY === p.gridY + 1);

          return (
            <React.Fragment key={`lines-${p.gridX}-${p.gridY}`}>
              {rightNeighbor && (
                <line
                  x1={p.isoX}
                  y1={p.isoY}
                  x2={rightNeighbor.isoX}
                  y2={rightNeighbor.isoY}
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth={1}
                  className="pointer-events-none"
                />
              )}
              {bottomNeighbor && (
                <line
                  x1={p.isoX}
                  y1={p.isoY}
                  x2={bottomNeighbor.isoX}
                  y2={bottomNeighbor.isoY}
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth={1}
                  className="pointer-events-none"
                />
              )}
            </React.Fragment>
          );
        })}
      </motion.svg>
    </div>
  );
}
