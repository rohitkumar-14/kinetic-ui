"use client";

import React from "react";
import { BoidsCanvas } from "@/components/creative/boids-canvas";

export function BoidsCanvasDemo() {
  return (
    <div className="w-full h-[500px] relative rounded-xl border border-white/10 overflow-hidden">
      <BoidsCanvas count={150} color="#818cf8" />
      
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
        <h2 className="text-4xl md:text-6xl font-black text-white mix-blend-difference tracking-tighter">
          FLOCKING
        </h2>
        <p className="text-white/50 text-sm mt-2 mix-blend-difference">
          Move your cursor to scatter the swarm.
        </p>
      </div>
    </div>
  );
}
