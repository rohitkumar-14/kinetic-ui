'use client';

import React, { useRef } from 'react';
import { ScrollLinkedSplit } from '@/components/creative/scroll-linked-split';

export function ScrollLinkedSplitDemo({ direction = "horizontal" }: any) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[500px] overflow-y-auto rounded-xl border border-white/10 bg-zinc-950"
      key={direction}
    >
      <div className="w-full text-center py-20 flex flex-col items-center justify-center">
        <div className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">Cinematic Reveal</div>
        <h3 className="text-3xl font-bold text-white tracking-tight mt-2">Scroll Down</h3>
        <p className="text-sm text-zinc-400 mt-2">Scroll to see the layout split apart.</p>
        <div className="w-px h-16 bg-gradient-to-b from-white/20 to-transparent mt-8" />
      </div>

      <ScrollLinkedSplit
        scrollContainerRef={containerRef}
        direction={direction}
        splitRatio="50/50"
        className="h-[800px]" // Extra height to allow scrolling past it
        stickyHeight="500px" // Height of our preview window
        leftContent={
          <div className="w-full h-full bg-gradient-to-br from-indigo-950 to-indigo-900 border-r border-white/10 flex flex-col items-center justify-center">
            <h4 className="text-4xl font-black text-indigo-300">LEFT</h4>
            <p className="text-indigo-400/50 mt-2 text-sm">Or Top</p>
          </div>
        }
        rightContent={
          <div className="w-full h-full bg-gradient-to-bl from-purple-950 to-purple-900 border-l border-white/10 flex flex-col items-center justify-center">
            <h4 className="text-4xl font-black text-purple-300">RIGHT</h4>
            <p className="text-purple-400/50 mt-2 text-sm">Or Bottom</p>
          </div>
        }
        revealContent={
          <div className="w-full h-full flex flex-col items-center justify-center bg-black">
            <h2 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
              REVEALED
            </h2>
            <p className="text-white/60 mt-4 max-w-sm text-center">
              This content was hidden underneath the split panels. The panels move apart precisely linked to your scroll position.
            </p>
          </div>
        }
      />

      <div className="w-full text-center py-32 flex flex-col items-center justify-center text-zinc-500 text-sm">
        End of scroll demo
      </div>
    </div>
  );
}
