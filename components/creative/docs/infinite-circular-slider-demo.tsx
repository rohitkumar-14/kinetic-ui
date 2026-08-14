"use client";

import React from "react";
import { InfiniteCircularSlider } from "@/components/creative/infinite-circular-slider";

const DEMO_IMAGES = [
  "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1682687982501-1e58f813fb31?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1682695794816-7b9da18ed470?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1682687218147-9806132dc697?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1682695798522-6e208131916d?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1682687981974-c5ef2111640c?q=80&w=2070&auto=format&fit=crop",
];

export default function InfiniteCircularSliderDemo() {
  return (
    <div className="w-full bg-background border border-border rounded-xl overflow-hidden py-12">
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-3xl font-black text-foreground tracking-tight">Infinite 3D Loop</h2>
        <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
          A continuous 3D cylindrical carousel of imagery powered by Framer Motion.
        </p>
      </div>
      
      {/* 
        A mask to fade out the top and bottom if needed, but the slider handles itself. 
        We use a negative margin to pull the slider up closer to the text.
      */}
      <div className="-mt-12">
        <InfiniteCircularSlider images={DEMO_IMAGES} />
      </div>
    </div>
  );
}
