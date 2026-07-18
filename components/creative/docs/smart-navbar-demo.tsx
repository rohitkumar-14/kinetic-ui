'use client';

import React, { useRef } from 'react';
import { SmartNavbar } from '@/components/creative/smart-navbar';

export function SmartNavbarDemo({ threshold = 50, glass = true }: any) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[400px] rounded-xl overflow-y-auto border border-white/10 bg-zinc-950"
    >
      <SmartNavbar 
        container={containerRef} 
        threshold={threshold} 
        glass={glass}
        className="sticky top-0 left-0 right-0 z-50 px-6 py-4"
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500" />
          <span className="text-sm font-bold text-white">Brand</span>
        </div>
        <div className="flex items-center gap-6 text-xs text-zinc-400">
          <span className="hover:text-white transition-colors cursor-pointer hidden sm:block">Home</span>
          <span className="hover:text-white transition-colors cursor-pointer hidden sm:block">About</span>
          <span className="hover:text-white transition-colors cursor-pointer hidden sm:block">Work</span>
          <span className="hover:text-white transition-colors cursor-pointer hidden sm:block">Contact</span>
        </div>
      </SmartNavbar>

      <div className="pt-32 pb-64 px-8 flex flex-col items-center text-center gap-4">
        <div className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">Smart Navigation</div>
        <h3 className="text-2xl font-bold text-white tracking-tight">Scroll down slowly...</h3>
        <p className="text-sm text-zinc-400 max-w-md font-light leading-relaxed mb-12">
          Keep scrolling down to see the navbar hide. Then scroll back up even just a little bit to see it reveal instantly.
        </p>

        {/* Dummy scroll content */}
        <div className="w-full max-w-lg space-y-8">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-32 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <span className="text-zinc-600 font-bold">Content Block {i}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
