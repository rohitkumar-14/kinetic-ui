"use client";

import React from "react";
import { DisplacementHover } from "@/components/creative/displacement-hover";

export default function DisplacementHoverDemo() {
  return (
    <div className="w-full flex items-center justify-center min-h-[500px] bg-zinc-950 border border-white/10 rounded-xl p-8">
      
      <div className="flex flex-col items-center gap-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Liquid Distortion Hover</h2>
          <p className="text-zinc-400 max-w-sm">
            Hover over the image to experience a WebGL-style fluid displacement transition using highly performant SVG filters.
          </p>
        </div>

        <DisplacementHover 
          image1="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop"
          image2="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1000&auto=format&fit=crop"
          className="w-[300px] h-[400px] rounded-2xl shadow-2xl"
          intensity={60}
        />
      </div>

    </div>
  );
}
