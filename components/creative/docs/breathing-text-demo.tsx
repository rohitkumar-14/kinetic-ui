"use client";

import React from "react";
import { BreathingText } from "@/components/creative/breathing-text";

export interface BreathingTextDemoProps {
  mode?: "auto" | "cursor";
  label?: string;
  minWeight?: number;
  maxWeight?: number;
}

export function BreathingTextDemo({
  mode = "auto",
  label = "Breathe In.",
  minWeight = 200,
  maxWeight = 900
}: BreathingTextDemoProps) {
  
  if (mode === "cursor") {
    return (
      <div className="flex w-full min-h-[400px] flex-col items-center justify-center bg-[#0a0a0a] p-8 rounded-xl overflow-hidden border border-white/5 relative group cursor-crosshair">
        <div className="absolute top-8 text-center text-sm font-medium text-zinc-500 uppercase tracking-widest pointer-events-none transition-opacity group-hover:opacity-0">
          Move your cursor around
        </div>
        
        <div className="font-sans w-full h-64 flex items-center justify-center">
          <BreathingText 
            key={`${label}-${minWeight}-${maxWeight}`}
            label={label}
            mode="cursor"
            minWeight={minWeight}
            maxWeight={maxWeight}
            className="text-6xl md:text-8xl lg:text-9xl tracking-tighter text-white"
          />
        </div>
      </div>
    );
  }

  // Auto mode
  return (
    <div className="flex w-full min-h-[400px] flex-col items-center justify-center bg-white p-8 rounded-xl overflow-hidden border">
      <div className="mb-12 text-center text-sm font-medium text-neutral-500 uppercase tracking-widest">
        Autonomous Breathing Mode
      </div>
      
      {/* We apply Inter specifically since it supports variable weights */}
      <div className="font-sans">
        <BreathingText 
          key={`${label}-${minWeight}-${maxWeight}`}
          label={label}
          mode="auto"
          minWeight={minWeight}
          maxWeight={maxWeight}
          className="text-6xl md:text-8xl lg:text-9xl tracking-tighter text-neutral-900"
        />
      </div>
    </div>
  );
}
