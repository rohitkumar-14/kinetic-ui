"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ActivityHeatmapProps {
  className?: string;
  rows?: number;
  cols?: number;
}

export function ActivityHeatmap({ className, rows = 7, cols = 30 }: ActivityHeatmapProps) {
  const [hoveredCell, setHoveredCell] = useState<{ r: number; c: number } | null>(null);
  const [rippleOrigin, setRippleOrigin] = useState<{ r: number; c: number; time: number } | null>(null);

  // Generate random data for the heatmap
  const gridData = useMemo(() => {
    const data = [];
    for (let r = 0; r < rows; r++) {
      const row = [];
      for (let c = 0; c < cols; c++) {
        // Generate random activity level (0-4)
        // Weight heavily towards 0 for realism
        const rand = Math.random();
        let level = 0;
        if (rand > 0.95) level = 4;
        else if (rand > 0.85) level = 3;
        else if (rand > 0.70) level = 2;
        else if (rand > 0.50) level = 1;
        
        row.push(level);
      }
      data.push(row);
    }
    return data;
  }, [rows, cols]);

  const getColor = (level: number) => {
    switch (level) {
      case 4: return "bg-emerald-400";
      case 3: return "bg-emerald-500/80";
      case 2: return "bg-emerald-600/60";
      case 1: return "bg-emerald-800/40";
      default: return "bg-white/5";
    }
  };

  const handleCellClick = (r: number, c: number) => {
    setRippleOrigin({ r, c, time: Date.now() });
  };

  return (
    <div className={cn("relative p-6 bg-neutral-950 rounded-xl border border-white/10 font-sans inline-block", className)}>
      <div className="flex items-end gap-2 mb-4">
        <h3 className="text-sm font-semibold text-neutral-200">Activity Matrix</h3>
        <span className="text-xs text-neutral-500 mb-0.5">Live events</span>
      </div>

      <div 
        className="flex flex-col gap-1.5"
        onMouseLeave={() => setHoveredCell(null)}
      >
        {gridData.map((row, rIndex) => (
          <div key={rIndex} className="flex gap-1.5">
            {row.map((level, cIndex) => {
              
              // Calculate distance from ripple origin
              let rippleDelay = 0;
              let isRippling = false;
              if (rippleOrigin) {
                const dist = Math.sqrt(Math.pow(rIndex - rippleOrigin.r, 2) + Math.pow(cIndex - rippleOrigin.c, 2));
                // Ripple travels outwards
                rippleDelay = dist * 0.05;
                // Only ripple if it happened recently (< 1s)
                isRippling = Date.now() - rippleOrigin.time < 1000;
              }

              // Hover spotlight logic
              let isHovered = false;
              let isNeighbor = false;
              if (hoveredCell) {
                const dist = Math.sqrt(Math.pow(rIndex - hoveredCell.r, 2) + Math.pow(cIndex - hoveredCell.c, 2));
                if (dist === 0) isHovered = true;
                else if (dist < 2.5) isNeighbor = true; // radius of influence
              }

              return (
                <div key={cIndex} className="relative group">
                  <motion.button
                    onMouseEnter={() => setHoveredCell({ r: rIndex, c: cIndex })}
                    onClick={() => handleCellClick(rIndex, cIndex)}
                    initial={false}
                    animate={
                      isRippling
                        ? {
                            scale: [1, 1.4, 1],
                            opacity: [1, 0.5, 1],
                            backgroundColor: ["#34d399", "#10b981", ""], // flash green
                            transition: { delay: rippleDelay, duration: 0.5 }
                          }
                        : {
                            scale: isHovered ? 1.2 : isNeighbor ? 1.1 : 1,
                            zIndex: isHovered ? 10 : isNeighbor ? 5 : 1,
                          }
                    }
                    className={cn(
                      "w-4 h-4 rounded-sm transition-colors duration-300",
                      getColor(level),
                      isHovered ? "ring-2 ring-white/40 ring-offset-1 ring-offset-neutral-950 shadow-[0_0_10px_rgba(52,211,153,0.5)]" : ""
                    )}
                  />

                  {/* Micro Tooltip */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: -5, scale: 0.8 }}
                        animate={{ opacity: 1, y: -10, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-neutral-800 text-white text-[10px] font-mono rounded border border-white/10 pointer-events-none z-50 whitespace-nowrap shadow-xl"
                      >
                        {level * 12 + Math.floor(Math.random() * 5)} events
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-4 text-xs text-neutral-500">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-sm bg-white/5" />
          <div className="w-3 h-3 rounded-sm bg-emerald-800/40" />
          <div className="w-3 h-3 rounded-sm bg-emerald-600/60" />
          <div className="w-3 h-3 rounded-sm bg-emerald-500/80" />
          <div className="w-3 h-3 rounded-sm bg-emerald-400" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
