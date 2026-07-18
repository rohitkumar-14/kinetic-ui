"use client";

import React from "react";
import { InfiniteZoomCanvas } from "@/components/creative/infinite-zoom-canvas";

export function InfiniteZoomCanvasDemo({ showGrid = true }: { showGrid?: boolean }) {
  return (
    <div className="w-full h-[500px] flex items-center justify-center relative bg-[#0a0a0a] rounded-3xl overflow-hidden border border-white/10">
      <InfiniteZoomCanvas showGrid={showGrid} initialScale={1}>
        <div className="w-64 h-64 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-2xl">
          <p className="text-indigo-300 font-medium">Pan & Zoom Me</p>
        </div>
      </InfiniteZoomCanvas>
    </div>
  );
}
