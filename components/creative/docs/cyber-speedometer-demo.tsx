"use client";

import React, { useState, useEffect } from "react";
import { CyberSpeedometer } from "@/components/creative/cyber-speedometer";

export function CyberSpeedometerDemo() {
  const [val, setVal] = useState(42);

  // Randomly fluctuate the value to simulate live server load
  useEffect(() => {
    const interval = setInterval(() => {
      setVal((prev) => {
        // Random jump between -15 and +15
        const jump = Math.floor(Math.random() * 30) - 15;
        // Occasional spike
        if (Math.random() > 0.9) return 95; 
        
        return Math.max(0, Math.min(100, prev + jump));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center py-12 bg-neutral-950 rounded-xl border border-white/10 shadow-2xl">
      <CyberSpeedometer value={val} label="CPU USAGE %" />
      
      <div className="mt-8 flex gap-4">
        <button 
          onClick={() => setVal(0)}
          className="px-4 py-2 text-xs font-mono uppercase bg-neutral-900 border border-white/10 hover:bg-neutral-800 text-white rounded transition-colors"
        >
          Min Load
        </button>
        <button 
          onClick={() => setVal(98)}
          className="px-4 py-2 text-xs font-mono uppercase bg-red-900/30 border border-red-500/50 hover:bg-red-900/50 text-red-400 rounded transition-colors"
        >
          Stress Test
        </button>
      </div>
    </div>
  );
}
