"use client";

import React, { useRef } from "react";
import { ScrollDrivenPath } from "@/components/creative/scroll-driven-path";

export function ScrollDrivenPathDemo({ color = "#a855f7", glow = true }: { color?: string, glow?: boolean }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={scrollContainerRef}
      className="w-full h-[600px] overflow-y-auto rounded-xl border border-white/10 bg-slate-950 relative custom-scrollbar"
    >
      {/* Intro Buffer */}
      <div className="h-[400px] flex items-center justify-center w-full bg-slate-900/50">
        <p className="text-zinc-500 animate-pulse tracking-widest uppercase">Scroll Down</p>
      </div>

      <ScrollDrivenPath 
        className="py-32"
        color={color}
        glow={glow}
        viewBox="0 0 100 1200"
        pathData="M 50 0 C 120 200, -20 400, 50 600 C 120 800, -20 1000, 50 1200"
        scrollContainerRef={scrollContainerRef}
      >
        <div className="h-[1200px] w-full flex flex-col justify-between max-w-xl mx-auto px-6">
          <div className="bg-black/50 backdrop-blur-md p-6 rounded-2xl border border-white/10 ml-auto w-[60%] mt-20">
            <h3 className="text-xl font-bold text-white mb-2">Step 1: Ideation</h3>
            <p className="text-zinc-400 text-sm">Draw the connections dynamically as users scroll through your narrative.</p>
          </div>
          
          <div className="bg-black/50 backdrop-blur-md p-6 rounded-2xl border border-white/10 mr-auto w-[60%]">
            <h3 className="text-xl font-bold text-white mb-2">Step 2: Execution</h3>
            <p className="text-zinc-400 text-sm">Framer motion handles the interpolation perfectly via pathLength mapping.</p>
          </div>
          
          <div className="bg-black/50 backdrop-blur-md p-6 rounded-2xl border border-white/10 ml-auto w-[60%] mb-20">
            <h3 className="text-xl font-bold text-white mb-2">Step 3: Launch</h3>
            <p className="text-zinc-400 text-sm">A mesmerizing path that guides the eye exactly where you want it.</p>
          </div>
        </div>
      </ScrollDrivenPath>

      {/* Outro Buffer */}
      <div className="h-[400px] flex items-center justify-center w-full bg-slate-900/50">
        <p className="text-zinc-500 tracking-widest uppercase">End of Path</p>
      </div>
    </div>
  );
}
