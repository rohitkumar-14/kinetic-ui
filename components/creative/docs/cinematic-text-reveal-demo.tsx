"use client";

import React from "react";
import { CinematicTextReveal } from "@/components/creative/cinematic-text-reveal";

export default function CinematicTextRevealDemo() {
  return (
    <div className="w-full flex items-center justify-center min-h-[500px] bg-zinc-950 border border-white/10 rounded-xl p-8 overflow-hidden">
      
      <div className="max-w-4xl text-center">
        <CinematicTextReveal 
          text="The future of interfaces is kinetic." 
          className="text-5xl md:text-7xl font-black text-white tracking-tighter"
        />
        <div className="mt-8 opacity-0 animate-[fade-in_1s_ease-out_1.5s_forwards]">
          <p className="text-zinc-400 text-xl">
            Scroll into view to trigger this incredibly satisfying, 3D physics-based character reveal sequence.
          </p>
        </div>
      </div>

    </div>
  );
}
