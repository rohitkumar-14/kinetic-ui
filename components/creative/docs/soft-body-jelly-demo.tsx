"use client";

import React from "react";
import { SoftBodyJelly } from "@/components/creative/soft-body-jelly";

export default function SoftBodyJellyDemo() {
  return (
    <div className="w-full flex items-center justify-center min-h-[500px] bg-zinc-950 border border-white/10 rounded-xl p-8">
      
      <div className="flex flex-col items-center gap-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Interactive Soft Body Jelly</h2>
          <p className="text-zinc-400 max-w-sm">
            Drag the blob around. Notice how the SVG path physically deforms and stretches under tension, then snaps back with zero-dependency spring physics.
          </p>
        </div>

        <SoftBodyJelly />
      </div>

    </div>
  );
}
