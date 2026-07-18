'use client';

import React from 'react';
import { AnimatedGradientText } from '@/components/creative/animated-gradient-text';

export function AnimatedGradientTextDemo({ animationSpeed = 8 }: any) {
  return (
    <div className="w-full rounded-xl overflow-hidden border border-white/10 bg-zinc-950 p-8 min-h-[400px] flex flex-col items-center justify-center gap-12">
      
      <div className="text-center">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
          Ship your ideas <br />
          <AnimatedGradientText 
            animationSpeed={animationSpeed}
            colors={["#ffaa40", "#9c40ff", "#ffaa40"]}
          >
            faster than ever.
          </AnimatedGradientText>
        </h2>
      </div>

      <div className="flex flex-col gap-4 text-center items-center">
        <p className="text-sm text-zinc-500 font-medium uppercase tracking-widest">Other Presets</p>
        
        <div className="text-3xl font-bold tracking-tight bg-zinc-900 border border-white/5 py-4 px-8 rounded-full shadow-xl">
          <AnimatedGradientText 
            text="Ocean Breeze"
            animationSpeed={animationSpeed}
            colors={["#00c6ff", "#0072ff", "#00c6ff"]}
          />
        </div>

        <div className="text-3xl font-bold tracking-tight bg-zinc-900 border border-white/5 py-4 px-8 rounded-full shadow-xl">
          <AnimatedGradientText 
            text="Cyberpunk"
            animationSpeed={animationSpeed}
            colors={["#f0f", "#0ff", "#f0f"]}
          />
        </div>
      </div>

    </div>
  );
}
