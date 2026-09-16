"use client";

import React from "react";
import { InteractivePipeline } from "@/components/creative/interactive-pipeline";

export function InteractivePipelineDemo() {
  return (
    <div className="w-full bg-neutral-950 rounded-xl border border-white/10 overflow-hidden relative">
      {/* 
        We add a fixed height and internal scrolling to the demo container 
        so it doesn't force the user to scroll the whole page to see the effect.
        In a real app, this would likely be tracked against the window scroll.
      */}
      <div className="w-full h-[500px] overflow-y-auto custom-scrollbar">
        <div className="w-full flex flex-col items-center py-20 px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Scroll Down</h2>
            <p className="text-neutral-400">The pipeline tracks your scroll progress.</p>
          </div>
          
          <InteractivePipeline />
          
          <div className="h-[30vh]" /> {/* padding at bottom to allow full scrolling */}
        </div>
      </div>
    </div>
  );
}
