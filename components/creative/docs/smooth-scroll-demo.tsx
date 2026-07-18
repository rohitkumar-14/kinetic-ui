'use client';

import React, { useRef } from 'react';
import { SmoothScroll } from '@/components/creative/smooth-scroll';

export function SmoothScrollDemo({ duration = 1.2, smoothTouch = false, touchMultiplier = 2 }: any) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[450px] overflow-y-auto rounded-xl border border-white/10 bg-zinc-950"
    >
      <SmoothScroll 
        containerRef={containerRef}
        duration={duration} 
        smoothTouch={smoothTouch} 
        touchMultiplier={touchMultiplier}
      >
        <div className="flex flex-col items-center p-8 gap-12 text-center min-h-[1200px]">
          
          <div className="mt-12 flex flex-col items-center">
            <div className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">Smooth Scroll Provider</div>
            <h3 className="text-3xl font-black text-white tracking-tight mb-2 mt-4">Feel The Physics</h3>
            <p className="text-white/70 text-sm max-w-sm font-light leading-relaxed">
              Scroll down this container. Notice the buttery smooth inertia, spring physics, and perfect stopping powered by Lenis.
            </p>
            
            <div className="mt-8 grid grid-cols-3 gap-4 text-center w-full max-w-md">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="text-lg font-bold text-white">{duration}s</div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Duration</div>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="text-lg font-bold text-white">{touchMultiplier}x</div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Touch Mult</div>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="text-lg font-bold text-white">{smoothTouch ? 'Yes' : 'No'}</div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Smooth Touch</div>
              </div>
            </div>
          </div>

          <div className="w-px h-32 bg-gradient-to-b from-white/20 to-transparent my-12" />

          {/* Dummy content blocks to create scroll height */}
          <div className="w-full max-w-lg space-y-8 pb-32">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="group relative h-48 rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center">
                <div className="absolute inset-0 bg-white/5 transition-colors group-hover:bg-white/10" />
                <span className="text-4xl font-bold text-white/20">Scroll Block {i}</span>
              </div>
            ))}
          </div>

        </div>
      </SmoothScroll>
    </div>
  );
}
