"use client";

import React from "react";
import { ZoomToFillTransition } from "@/components/creative/zoom-to-fill-transition";

export default function ZoomToFillTransitionDemo() {
  const thumbnail = (
    <div className="w-full h-full relative group">
      <img 
        src="https://images.unsplash.com/photo-1682687982501-1e58f813fb31?q=80&w=2070&auto=format&fit=crop" 
        alt="Thumbnail"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-white font-medium">Click to Expand</span>
      </div>
    </div>
  );

  const fullContent = (
    <div className="w-full h-full relative">
      <img 
        src="https://images.unsplash.com/photo-1682687982501-1e58f813fb31?q=80&w=2070&auto=format&fit=crop" 
        alt="Full image"
        className="w-full h-1/2 object-cover"
      />
      <div className="p-8 h-1/2 overflow-y-auto">
        <h2 className="text-4xl font-bold mb-4">Desert Expedition</h2>
        <p className="text-zinc-500 max-w-2xl">
          This is an example of a seamless zoom-to-fill transition. By utilizing Framer Motion's layoutId, 
          we can trick the eye into seeing a single element morph from a small thumbnail into a fully 
          fleshed out page layout. 
        </p>
        <p className="text-zinc-500 max-w-2xl mt-4">
          Notice how the image preserves its aspect ratio and crossfades its border radius seamlessly, 
          while the new text content is revealed underneath.
        </p>
      </div>
    </div>
  );

  return (
    <div className="w-full h-[60vh] flex items-center justify-center bg-zinc-50 border border-border rounded-xl p-8">
      <div className="flex flex-col items-center">
        <h3 className="text-xl font-medium mb-6">Gallery Entry</h3>
        <ZoomToFillTransition 
          thumbnailContent={thumbnail} 
          fullContent={fullContent} 
        />
      </div>
    </div>
  );
}
