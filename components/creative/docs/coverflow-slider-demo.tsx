"use client";

import React from "react";
import { CoverflowSlider } from "@/components/creative/coverflow-slider";

const DEMO_IMAGES = [
  "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1682687982501-1e58f813fb31?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1682695794816-7b9da18ed470?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1682687218147-9806132dc697?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1682695798522-6e208131916d?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?q=80&w=2070&auto=format&fit=crop",
];

export default function CoverflowSliderDemo() {
  return (
    <div className="w-full bg-background border border-border rounded-xl overflow-hidden py-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground">Featured Collections</h2>
        <p className="text-muted-foreground mt-2">Swipe or click through the gallery</p>
      </div>
      <CoverflowSlider images={DEMO_IMAGES} />
    </div>
  );
}
