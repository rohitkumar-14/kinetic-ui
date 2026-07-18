"use client";

import React from "react";
import { ThinkingVisualizer } from "@/components/creative/thinking-visualizer";

export function ThinkingVisualizerDemo() {
  return (
    <div className="w-full min-h-[500px] flex items-center justify-center relative bg-black rounded-3xl overflow-hidden border border-white/10">
      <ThinkingVisualizer />
    </div>
  );
}
