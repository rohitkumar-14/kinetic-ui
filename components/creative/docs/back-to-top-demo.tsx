'use client';

import React, { useRef } from 'react';
import { BackToTop } from '@/components/creative/back-to-top';

export function BackToTopDemo({ showProgress = true, position = "bottom-right" }: any) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-white/10 bg-zinc-950">
      
      {/* Scrollable Container */}
      <div 
        ref={containerRef}
        className="w-full h-[500px] overflow-y-auto hidden-scrollbar scroll-smooth relative"
      >
        <div className="w-full min-h-[400px] flex flex-col items-center justify-center border-b border-white/5 p-8 text-center bg-gradient-to-b from-indigo-950/20 to-transparent">
          <h3 className="text-3xl font-black text-white mb-4">Start Scrolling</h3>
          <p className="text-zinc-400 max-w-md">Scroll down this container to reveal the back-to-top button.</p>
        </div>
        
        <div className="w-full min-h-[500px] flex flex-col items-center justify-center border-b border-white/5 p-8 text-center">
          <h3 className="text-3xl font-black text-white mb-4">Keep Going</h3>
          <p className="text-zinc-400 max-w-md">The button should appear now. Notice the SVG progress ring tracking your scroll position.</p>
        </div>
        
        <div className="w-full min-h-[600px] flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-transparent to-purple-950/20">
          <h3 className="text-3xl font-black text-white mb-4">Bottom Reached</h3>
          <p className="text-zinc-400 max-w-md">Click the button to smoothly scroll back to the top of this container.</p>
        </div>
      </div>

      {/* Back to Top Component tied to local container */}
      <BackToTop 
        scrollContainerRef={containerRef} 
        threshold={150} 
        showProgress={showProgress}
        position={position as any}
        className="absolute" // Override fixed to absolute for local preview
      />
    </div>
  );
}
