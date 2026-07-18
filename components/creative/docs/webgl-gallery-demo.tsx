"use client";

import React from "react";
import { WebGLGallery } from "@/components/creative/webgl-gallery";

const DEMO_IMAGES = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1200&q=80",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1200&q=80",
];

export interface WebGLGalleryDemoProps {
  intensity?: number;
  showControls?: boolean;
  showCounter?: boolean;
}

export function WebGLGalleryDemo({
  intensity = 1.2,
  showControls = true,
  showCounter = true
}: WebGLGalleryDemoProps) {
  return (
    <div className="w-full space-y-8">
      {/* Main Gallery */}
      <div className="w-full max-w-4xl mx-auto">
        <WebGLGallery
          key={`${intensity}-${showControls}-${showCounter}`}
          images={DEMO_IMAGES}
          intensity={intensity}
          showControls={showControls}
          showCounter={showCounter}
          aspectRatio="16/9"
          className="shadow-2xl border border-white/10"
        />
      </div>

      {/* Description */}
      <div className="text-center text-zinc-500 text-sm font-mono space-y-1">
        <p>Click the arrows or dots to trigger the shader transition.</p>
        <p className="text-zinc-600 text-xs">Chromatic aberration · Liquid noise · Wave displacement · Dissolve mask</p>
      </div>
    </div>
  );
}
