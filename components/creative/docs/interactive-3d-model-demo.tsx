"use client";

import React from "react";
import { Interactive3DModel } from "@/components/creative/interactive-3d-model";

export function Interactive3DModelDemo({ environment = "city" }: { environment?: any }) {
  return (
    <div className="w-full h-[500px] bg-slate-950/50 rounded-xl overflow-hidden border border-white/10 relative">
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-transparent to-purple-500/10 z-0 pointer-events-none" />
      <div className="absolute inset-0 z-10">
        <Interactive3DModel 
          scale={1.2} 
          environment={environment}
          floatSpeed={3}
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
