"use client";

import React, { useState } from "react";
import { StaggeredMasonry } from "@/components/creative/staggered-masonry";

const IMAGES = [
  { src: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2070&auto=format&fit=crop", aspect: "aspect-square" },
  { src: "https://images.unsplash.com/photo-1682687982501-1e58f813fb31?q=80&w=2070&auto=format&fit=crop", aspect: "aspect-video" },
  { src: "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=2070&auto=format&fit=crop", aspect: "aspect-[3/4]" },
  { src: "https://images.unsplash.com/photo-1682695794816-7b9da18ed470?q=80&w=2070&auto=format&fit=crop", aspect: "aspect-square" },
  { src: "https://images.unsplash.com/photo-1682687218147-9806132dc697?q=80&w=2070&auto=format&fit=crop", aspect: "aspect-video" },
  { src: "https://images.unsplash.com/photo-1682695798522-6e208131916d?q=80&w=2070&auto=format&fit=crop", aspect: "aspect-[4/3]" },
  { src: "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?q=80&w=2070&auto=format&fit=crop", aspect: "aspect-square" },
  { src: "https://images.unsplash.com/photo-1682687981974-c5ef2111640c?q=80&w=2070&auto=format&fit=crop", aspect: "aspect-[3/4]" },
  { src: "https://images.unsplash.com/photo-1682695796494-36709d84d632?q=80&w=2070&auto=format&fit=crop", aspect: "aspect-video" }
];

export default function StaggeredMasonryDemo() {
  const [key, setKey] = useState(0);

  const items = IMAGES.map((img, i) => (
    <div key={i} className={`w-full ${img.aspect} relative group cursor-pointer`}>
      <img 
        src={img.src} 
        alt={`Masonry item ${i}`} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <span className="text-white font-medium text-sm border border-white/30 px-4 py-2 rounded-full backdrop-blur-md">
          View Project
        </span>
      </div>
    </div>
  ));

  return (
    <div className="w-full bg-background border border-border rounded-xl p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Staggered Reveal</h2>
          <p className="text-muted-foreground mt-1 text-sm">Scroll into view to trigger animation</p>
        </div>
        <button 
          onClick={() => setKey(prev => prev + 1)}
          className="px-4 py-2 text-sm bg-foreground text-background font-medium rounded-lg hover:bg-foreground/90 transition-colors w-fit"
        >
          Replay Animation
        </button>
      </div>
      
      {/* 
        We use a key to force re-render and re-trigger the useInView hook.
        In a real scenario, this would just happen once when scrolling down. 
      */}
      <StaggeredMasonry key={key} items={items} columns={3} />
    </div>
  );
}
