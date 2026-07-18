"use client";

import React from "react";
import { MagneticDepthGallery } from "@/components/creative/magnetic-depth-gallery";

const SAMPLE_IMAGES = [
  { id: "1", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop", alt: "Abstract 1" },
  { id: "2", url: "https://images.unsplash.com/photo-1618005192384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop", alt: "Abstract 2" },
  { id: "3", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop", alt: "Abstract 3" },
  { id: "4", url: "https://images.unsplash.com/photo-1618005192384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop", alt: "Abstract 4" },
  { id: "5", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop", alt: "Abstract 5" },
  { id: "6", url: "https://images.unsplash.com/photo-1618005192384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop", alt: "Abstract 6" },
];

export function MagneticDepthGalleryDemo() {
  return (
    <div className="w-full bg-slate-950 rounded-xl overflow-hidden border border-white/10 flex flex-col items-center justify-center p-8 custom-scrollbar">
      <div className="w-full max-w-4xl">
        <div className="text-center space-y-2 mb-12">
          <h2 className="text-2xl font-bold text-white">Depth of Field Gallery</h2>
          <p className="text-zinc-400">Move your cursor over the grid.</p>
        </div>
        
        <MagneticDepthGallery 
          images={SAMPLE_IMAGES} 
          className="gap-6"
          itemClassName="rounded-2xl"
        />
      </div>
    </div>
  );
}
