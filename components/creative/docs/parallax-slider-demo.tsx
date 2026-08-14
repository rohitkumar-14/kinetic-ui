"use client";

import React from "react";
import { ParallaxSlider } from "@/components/creative/parallax-slider";

const DEMO_IMAGES = [
  "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1682687982501-1e58f813fb31?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1682695794816-7b9da18ed470?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1682687218147-9806132dc697?q=80&w=2070&auto=format&fit=crop",
];

export default function ParallaxSliderDemo() {
  return (
    <div className="w-full h-[80vh] flex flex-col items-center justify-center bg-background border border-border rounded-xl overflow-hidden">
      <ParallaxSlider images={DEMO_IMAGES} />
    </div>
  );
}
