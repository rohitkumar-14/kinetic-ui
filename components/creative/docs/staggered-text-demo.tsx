'use client';

import React from 'react';
import { StaggeredText } from '@/components/creative/staggered-text';

export function StaggeredTextDemo({ type = "word", animation = "slide-up", staggerDelay = 0.05 }: any) {
  return (
    <div className="w-full rounded-xl overflow-hidden border border-white/10 bg-zinc-950 p-8 min-h-[400px] flex items-center justify-center">
      <div className="max-w-2xl text-center">
        <StaggeredText 
          text="We craft digital experiences that leave a lasting impression."
          type={type}
          animation={animation}
          staggerDelay={staggerDelay}
          className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight justify-center"
        />
        
        <div className="mt-8">
          <StaggeredText 
            text="Every pixel matters. Every animation counts."
            type={type}
            animation="blur-in"
            staggerDelay={staggerDelay * 0.5}
            className="text-zinc-400 font-medium justify-center"
          />
        </div>
      </div>
    </div>
  );
}
