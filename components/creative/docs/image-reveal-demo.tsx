'use client';

import React from 'react';
import { ImageReveal } from '@/components/creative/image-reveal';

export function ImageRevealDemo({ direction = "left", duration = 1.2 }: any) {
  return (
    <div className="w-full rounded-xl overflow-hidden border border-white/10 bg-zinc-950 p-8 min-h-[500px] flex flex-col items-center justify-center gap-8">
      
      <div className="text-center max-w-lg mb-4">
        <h3 className="text-2xl font-bold text-white mb-2">Cinematic Reveal</h3>
        <p className="text-zinc-400 font-medium">Scroll down or toggle the controls to trigger the clip-path animation.</p>
      </div>

      <div className="w-full max-w-3xl aspect-[21/9] rounded-xl overflow-hidden shadow-2xl bg-zinc-900 border border-white/5">
        <ImageReveal 
          // Using a unique key to force re-render when controls change
          key={`${direction}-${duration}`}
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=3164&auto=format&fit=crop"
          alt="Abstract 3D Shape"
          direction={direction}
          duration={duration}
        />
      </div>

    </div>
  );
}
