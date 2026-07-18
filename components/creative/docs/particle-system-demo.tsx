"use client";

import React from "react";
import { ParticleSystem } from "@/components/creative/particle-system";

export function ParticleSystemDemo({ count = 2000 }: { count?: number }) {
  return (
    <div className="w-full relative rounded-xl overflow-hidden border border-white/10">
      <ParticleSystem count={count} className="w-full h-[500px]" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter drop-shadow-lg">
          Interact.
        </h1>
      </div>
    </div>
  );
}
