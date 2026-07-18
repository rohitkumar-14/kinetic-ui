"use client";

import React from "react";
import { ShaderImage } from "@/components/creative/shader-image";

export interface ShaderImageDemoProps {
  effect?: "liquid" | "noise";
  intensity?: number;
}

export function ShaderImageDemo({
  effect = "liquid",
  intensity = 0.8
}: ShaderImageDemoProps) {
  return (
    <div className="flex w-full min-h-[500px] flex-col items-center justify-center bg-black p-4 rounded-xl border border-white/5 relative overflow-hidden">
      <div className="absolute top-8 text-center z-10 pointer-events-none">
        <h3 className="text-xl font-medium text-white tracking-tight">Hover to reveal</h3>
        <p className="text-sm text-zinc-500 mt-1">
          {effect === 'liquid' ? 'Liquid Ripple Shader' : 'Digital Noise Dissolve Shader'}
        </p>
      </div>

      <div className="w-full max-w-sm aspect-[4/5] rounded-xl overflow-hidden shadow-2xl shadow-indigo-500/10 border border-white/10 mt-12">
        <ShaderImage 
          key={`${effect}-${intensity}`}
          image1="/landscape_day_1782932459465.png"
          image2="/landscape_night_1782932469534.png"
          effect={effect}
          intensity={intensity}
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
