"use client";

import React from "react";
import { RaymarchingClouds } from "@/components/creative/raymarching-clouds";

export function RaymarchingCloudsDemo({ speed = 1.0 }: { speed?: number }) {
  // Wait, RaymarchingClouds does not take speed prop in its implementation? 
  // Let's pass what we can or just render it. It takes color1 and color2.
  return (
    <div className="w-full h-[500px] flex items-center justify-center relative bg-black rounded-3xl overflow-hidden border border-white/10">
      <RaymarchingClouds color1="#4f46e5" color2="#db2777" className="absolute inset-0 z-0" />
      <div className="z-10 text-center pointer-events-none">
        <h2 className="text-4xl font-bold text-white tracking-tighter mix-blend-overlay">VOLUMETRIC</h2>
      </div>
    </div>
  );
}
