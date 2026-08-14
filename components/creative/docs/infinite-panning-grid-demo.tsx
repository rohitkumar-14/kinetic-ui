"use client";

import React from "react";
import { InfinitePanningGrid } from "@/components/creative/infinite-panning-grid";

const IMAGES = [
  "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1682687982501-1e58f813fb31?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1682695794816-7b9da18ed470?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1682687218147-9806132dc697?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1682695798522-6e208131916d?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1682687981974-c5ef2111640c?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1682695796494-36709d84d632?q=80&w=2070&auto=format&fit=crop"
];

export default function InfinitePanningGridDemo() {
  const items = IMAGES.map((src, i) => (
    <img 
      key={i} 
      src={src} 
      alt={`Grid item ${i}`} 
      className="w-full h-full object-cover"
    />
  ));

  return (
    <div className="w-full border border-border rounded-xl relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center pointer-events-none bg-background/80 backdrop-blur-md p-8 rounded-2xl border border-border">
        <h2 className="text-3xl font-black text-foreground">Infinite Panning</h2>
        <p className="text-muted-foreground mt-2">Move your mouse to explore the grid</p>
      </div>
      <InfinitePanningGrid items={items} speed={0.8} />
    </div>
  );
}
