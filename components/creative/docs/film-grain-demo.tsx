'use client';

import React from 'react';
import { FilmGrain } from '@/components/creative/film-grain';

export function FilmGrainDemo({ opacity = 0.08, intensity = 0.65, blendMode = "overlay" }: any) {
  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-white/10 bg-zinc-950 p-8 min-h-[400px] flex items-center justify-center">
      
      {/* Background to show the effect clearly */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-zinc-900 to-black pointer-events-none" />
      
      {/* The Grain Component (scoped to parent relative div via position absolute instead of fixed for the demo) */}
      <FilmGrain 
        opacity={opacity} 
        intensity={intensity} 
        blendMode={blendMode} 
        className="absolute inset-0 z-10" 
      />

      <div className="relative z-20 text-center max-w-lg">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
          Analog Aesthetics
        </h2>
        <p className="text-lg text-zinc-300 font-medium">
          A performant SVG noise filter that adds tactile texture to digital experiences without heavy image assets.
        </p>
      </div>
    </div>
  );
}
