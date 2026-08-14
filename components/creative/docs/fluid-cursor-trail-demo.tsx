"use client";

import React from "react";
import { FluidCursorTrail } from "@/components/creative/fluid-cursor-trail";

export default function FluidCursorTrailDemo() {
  return (
    <div className="w-full relative min-h-[500px] flex items-center justify-center bg-zinc-950 border border-white/10 rounded-xl overflow-hidden">
      
      {/* We place the fluid trail as a background layer so it tracks mouse across this whole box */}
      <FluidCursorTrail className="absolute inset-0 pointer-events-none z-10" />

      <div className="z-20 text-center pointer-events-none">
        <h2 className="text-4xl font-black text-white mb-2 tracking-tighter">Fluid Cursor</h2>
        <p className="text-zinc-400">
          Move your mouse around to generate a beautiful, performant HTML5 canvas smoke trail.
        </p>
      </div>

    </div>
  );
}
