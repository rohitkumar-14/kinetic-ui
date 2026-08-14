"use client";

import React from "react";
import { IsometricGrid } from "@/components/creative/isometric-grid";

const IMAGES = Array.from({ length: 9 }).map((_, i) => `https://picsum.photos/seed/${i + 10}/600/600`);

export default function IsometricGridDemo() {
  const items = IMAGES.map((src, i) => (
    <img 
      key={i} 
      src={src} 
      alt={`Grid item ${i}`} 
      className="w-full h-full object-cover"
    />
  ));

  return (
    <div className="w-full bg-background border border-border rounded-xl relative overflow-hidden">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none">
        <h2 className="text-3xl font-black text-foreground drop-shadow-md">Isometric Grid</h2>
        <p className="text-muted-foreground mt-2">Move your mouse to tilt. Hover items to lift.</p>
      </div>
      <IsometricGrid items={items} columns={3} />
    </div>
  );
}
