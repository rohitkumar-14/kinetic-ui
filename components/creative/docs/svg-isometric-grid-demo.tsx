"use client";

import React from "react";
import { SvgIsometricGrid } from "@/components/creative/svg-isometric-grid";

export default function SvgIsometricGridDemo() {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[500px] bg-zinc-950 border border-white/10 rounded-xl p-8 relative overflow-hidden">
      
      <div className="text-center z-10 pointer-events-none mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Isometric Grid Physics</h2>
        <p className="text-zinc-400 max-w-sm mb-4">
          Click anywhere on the dots in the grid below to trigger a rippling physics wave across the isometric plane.
        </p>
      </div>

      <div className="w-full h-80">
        <SvgIsometricGrid gridSize={12} spacing={35} />
      </div>

    </div>
  );
}
