"use client";

import React from "react";
import { InfiniteFractalZoom } from "@/components/creative/infinite-fractal-zoom";

export function InfiniteFractalZoomDemo() {
  return (
    <div className="w-full relative rounded-xl overflow-hidden border border-white/10">
      {/* 
        For documentation presentation, we constrain the height and allow internal scrolling.
        In a real application, InfiniteFractalZoom would be placed directly on the page body.
      */}
      <div className="h-[600px] overflow-y-auto custom-scrollbar">
        <InfiniteFractalZoom />
      </div>
    </div>
  );
}
