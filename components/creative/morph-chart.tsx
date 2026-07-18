"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ChartDataPoint {
  label: string;
  value: number;
}

interface MorphChartProps {
  data: ChartDataPoint[];
  className?: string;
  color?: string;
}

type ChartType = "bar" | "line" | "scatter";

export function MorphChart({ 
  data, 
  className,
  color = "#6366f1"
}: MorphChartProps) {
  const [chartType, setChartType] = useState<ChartType>("bar");

  // Find max value for scaling
  const maxValue = Math.max(...data.map(d => d.value));

  // Calculate coordinates for the SVG connecting line (used in 'line' view)
  // We need to map the values to a 0-100% SVG coordinate system.
  // We assume the chart area is a square/rectangle where Y goes down, so we invert Y.
  const generatePath = () => {
    if (data.length === 0) return "";
    
    return data.map((d, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - (d.value / maxValue) * 100;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(" ");
  };

  return (
    <div className={cn("w-full p-6 bg-slate-950 rounded-2xl border border-white/10 flex flex-col gap-6", className)}>
      
      {/* Header & Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white font-medium">Revenue Growth</h3>
          <p className="text-zinc-500 text-xs">Dynamic layout transitions</p>
        </div>
        
        <div className="flex bg-white/5 p-1 rounded-lg border border-white/10 relative">
          {["bar", "line", "scatter"].map((type) => (
            <button
              key={type}
              onClick={() => setChartType(type as ChartType)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-md relative z-10 transition-colors capitalize",
                chartType === type ? "text-white" : "text-zinc-400 hover:text-white"
              )}
            >
              {chartType === type && (
                <motion.div
                  layoutId="chartTab"
                  className="absolute inset-0 bg-white/10 rounded-md -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Area */}
      <div className="relative w-full h-64 mt-4">
        
        {/* Y-Axis Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          {[1, 0.75, 0.5, 0.25, 0].map((tick, i) => (
            <div key={i} className="flex items-center w-full">
              <span className="w-8 text-[10px] text-zinc-600">
                ${(maxValue * tick).toFixed(0)}
              </span>
              <div className="flex-1 border-b border-white/5 border-dashed" />
            </div>
          ))}
        </div>

        {/* Chart Visualization Area */}
        <div className="absolute inset-y-0 right-0 flex items-end justify-between" style={{ left: "2rem" }}>
          
          {/* SVG Line (Only visible in 'line' mode) */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" 
            preserveAspectRatio="none"
          >
            <AnimatePresence>
              {chartType === "line" && (
                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  d={generatePath()}
                  fill="none"
                  stroke={color}
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                  className="drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]"
                />
              )}
            </AnimatePresence>
          </svg>

          {/* Data Points (Bars / Nodes) */}
          {data.map((d, i) => {
            const heightPercent = (d.value / maxValue) * 100;
            
            // Calculate absolute positions for line/scatter mode
            const xPercent = (i / (data.length - 1)) * 100;
            const isPoint = chartType === "line" || chartType === "scatter";

            return (
              <div 
                key={d.label} 
                className="relative h-full flex flex-col justify-end items-center group"
                style={{ 
                  width: isPoint ? "0px" : `${100 / data.length - 10}%`,
                  left: isPoint ? `${xPercent}%` : "auto",
                  position: isPoint ? "absolute" : "relative"
                }}
              >
                {/* The Morphing Element */}
                <motion.div
                  layoutId={`node-${d.label}`}
                  className={cn(
                    "bg-indigo-500 relative transition-colors group-hover:bg-indigo-400",
                    isPoint ? "rounded-full ring-4 ring-slate-950 z-10" : "rounded-t-md opacity-90"
                  )}
                  initial={false}
                  animate={{
                    height: isPoint ? 12 : `${heightPercent}%`,
                    width: isPoint ? 12 : "100%",
                    marginBottom: isPoint ? `calc(${heightPercent}% - 6px)` : 0,
                  }}
                  transition={{ type: "spring", bounce: 0, duration: 0.6 }}
                  style={{ backgroundColor: color }}
                >
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap bg-white text-black text-xs font-bold px-2 py-1 rounded">
                    ${d.value}
                  </div>
                </motion.div>
                
                {/* X-Axis Label */}
                <div 
                  className="absolute top-full mt-2 text-[10px] font-medium text-zinc-500 whitespace-nowrap"
                  style={{ left: isPoint ? "50%" : "auto", transform: isPoint ? "translateX(-50%)" : "none" }}
                >
                  {d.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
