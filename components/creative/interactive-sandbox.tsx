"use client";

import React, { useState } from "react";
import { Play, Settings2, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InteractiveSandboxProps {
  className?: string;
}

export function InteractiveSandbox({ className }: InteractiveSandboxProps) {
  const [accent, setAccent] = useState("#818cf8");
  const [scale, setScale] = useState(1);
  const [borderRadius, setBorderRadius] = useState(16);

  return (
    <div className={cn("w-full bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden shadow-2xl font-mono text-xs flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-white/10", className)}>
      {/* Parameter Controls */}
      <div className="p-5 md:w-64 space-y-4 bg-zinc-900/50 shrink-0">
        <div className="flex items-center gap-2 text-white font-bold mb-2">
          <Settings2 className="w-4 h-4 text-indigo-400" /> Live Parameters
        </div>
        <div>
          <label className="text-[10px] text-zinc-500 uppercase tracking-widest block mb-1">Accent Color</label>
          <input
            type="color"
            value={accent}
            onChange={(e) => setAccent(e.target.value)}
            className="w-full h-8 rounded-lg bg-black border border-white/10 cursor-pointer"
          />
        </div>
        <div>
          <label className="text-[10px] text-zinc-500 uppercase tracking-widest block mb-1">Scale Multiplier ({scale}x)</label>
          <input
            type="range"
            min="0.8"
            max="1.3"
            step="0.05"
            value={scale}
            onChange={(e) => setScale(parseFloat(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />
        </div>
        <div>
          <label className="text-[10px] text-zinc-500 uppercase tracking-widest block mb-1">Border Radius ({borderRadius}px)</label>
          <input
            type="range"
            min="0"
            max="32"
            step="2"
            value={borderRadius}
            onChange={(e) => setBorderRadius(parseInt(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Render Canvas */}
      <div className="flex-1 p-8 flex flex-col items-center justify-center min-h-[300px] bg-black/60 relative">
        <div className="absolute top-3 left-4 flex items-center gap-1.5 text-zinc-500">
          <Code2 className="w-3.5 h-3.5" /> Output Sandbox
        </div>
        <div
          style={{
            backgroundColor: accent,
            transform: `scale(${scale})`,
            borderRadius: `${borderRadius}px`,
          }}
          className="p-6 text-white font-bold shadow-2xl transition-all duration-150 text-center uppercase tracking-wider"
        >
          Dynamic Preview
        </div>
      </div>
    </div>
  );
}
