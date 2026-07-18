'use client';

import React from 'react';
import { GridPattern } from '@/components/creative/grid-pattern';

export function GridPatternDemo({ type = "lines", size = 40, fadeEdge = true }: any) {
  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-white/10 bg-zinc-950 min-h-[400px] flex items-center justify-center">
      
      {/* The Grid Component */}
      <GridPattern 
        type={type} 
        size={size} 
        color="rgba(255,255,255,0.07)" 
        fadeEdge={fadeEdge} 
      />
      
      {/* Foreground Content */}
      <div className="relative z-10 text-center max-w-lg px-6">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
          Architectural Scale
        </h2>
        <p className="text-lg text-zinc-400 font-medium">
          A purely CSS-driven background pattern utility. Perfect for developer tools and technical SaaS products.
        </p>
      </div>

    </div>
  );
}
