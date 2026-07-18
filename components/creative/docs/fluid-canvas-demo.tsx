"use client";

import React from "react";
import { FluidCanvas } from "@/components/creative/fluid-canvas";

export function FluidCanvasDemo() {
  return (
    <div className="w-full h-[500px] relative rounded-xl border border-white/10 overflow-hidden">
      <FluidCanvas colors={["#3b82f6", "#8b5cf6", "#ec4899"]} speed={1.5} />
      
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
        <div className="p-8 bg-black/20 backdrop-blur-md rounded-2xl border border-white/10 text-center">
          <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight">
            Fluid Dynamics
          </h2>
          <p className="text-white/70 text-sm mt-3 max-w-sm mx-auto">
            Interactive, generative canvas gradients that react to your cursor position in real-time.
          </p>
        </div>
      </div>
    </div>
  );
}
