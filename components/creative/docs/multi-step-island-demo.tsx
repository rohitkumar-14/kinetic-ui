"use client";

import React from "react";
import { MultiStepIsland } from "@/components/creative/multi-step-island";

export default function MultiStepIslandDemo() {
  return (
    <div className="w-full flex items-center justify-center min-h-[500px] bg-zinc-950 border border-white/10 rounded-xl p-8 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="flex flex-col items-center gap-12 z-10 w-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Dynamic Multi-Step Island</h2>
          <p className="text-zinc-400 max-w-sm">
            Click the pill button. Notice how the component seamlessly FLIP-animates its physical layout to become the modal container, bypassing traditional popup dialogs.
          </p>
        </div>

        {/* The island is absolute within itself when open, so it won't break layout */}
        <MultiStepIsland />
      </div>

    </div>
  );
}
