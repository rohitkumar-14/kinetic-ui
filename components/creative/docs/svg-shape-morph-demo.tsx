"use client";

import React from "react";
import { SvgShapeMorph } from "@/components/creative/svg-shape-morph";

export default function SvgShapeMorphDemo() {
  // We use paths with the exact same structure (M L L L Z M L L L Z)
  // so framer-motion can natively interpolate them without a library like Flubber.

  // A Pause Icon (Two vertical bars)
  const pausePath = "M 20 20 L 40 20 L 40 80 L 20 80 Z M 60 20 L 80 20 L 80 80 L 60 80 Z";
  
  // A Play Icon (A triangle, built by merging the two bars)
  const playPath = "M 20 20 L 50 35 L 50 65 L 20 80 Z M 50 35 L 80 50 L 80 50 L 50 65 Z";

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[400px] bg-zinc-950 border border-white/10 rounded-xl p-8 overflow-hidden">
      
      <div className="text-center z-10 mb-12">
        <h2 className="text-2xl font-bold text-white mb-2">SVG Shape Morphing</h2>
        <p className="text-zinc-400 max-w-sm mb-4">
          Click the icon to see a buttery-smooth vector shape morph between a Play and Pause state.
        </p>
      </div>

      <div className="w-32 h-32 text-rose-500 drop-shadow-[0_0_15px_rgba(244,63,94,0.5)]">
        <SvgShapeMorph 
          pathA={playPath} 
          pathB={pausePath} 
          duration={0.4} 
        />
      </div>

    </div>
  );
}
