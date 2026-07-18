"use client";

import React, { useMemo } from "react";
import { Interactive360Viewer } from "@/components/creative/interactive-360-viewer";

export function Interactive360ViewerDemo({ sensitivity = 15 }: { sensitivity?: number }) {
  // Generate 72 frames to simulate a 360-degree rotation sequence (Apple AirPods Max).
  const frames = useMemo(() => {
    return Array.from({ length: 72 }).map((_, i) => {
      const frameNumber = (i + 1).toString().padStart(4, "0");
      return `https://www.apple.com/105/media/us/airpods-max/2020/996b980b-3131-44f1-af6c-11dd23418b43/anim/turn/large/large_${frameNumber}.jpg`;
    });
  }, []);

  return (
    <div className="w-full bg-slate-950 rounded-xl overflow-hidden border border-white/10 flex flex-col items-center justify-center p-8 custom-scrollbar relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/30 to-black pointer-events-none" />
      
      <div className="z-10 text-center space-y-4 mb-8">
        <h2 className="text-2xl font-bold text-white tracking-tight">Interactive 360° Viewer</h2>
        <p className="text-zinc-400">Click and drag left or right to scrub through 72 high-res frames.</p>
      </div>

      <div className="w-full max-w-3xl border border-white/10 rounded-2xl overflow-hidden bg-black/50">
        <Interactive360Viewer 
          images={frames} 
          sensitivity={sensitivity}
        />
      </div>
    </div>
  );
}
