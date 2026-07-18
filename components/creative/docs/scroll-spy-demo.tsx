'use client';

import React, { useRef } from 'react';
import { ScrollSpy } from '@/components/creative/scroll-spy';

export function ScrollSpyDemo({ alignment = "right", showLabels = true }: any) {
  const containerRef = useRef<HTMLDivElement>(null);

  const sections = [
    { id: 'section-1', label: 'Introduction' },
    { id: 'section-2', label: 'Features' },
    { id: 'section-3', label: 'Pricing' },
    { id: 'section-4', label: 'Contact' },
  ];

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-white/10 bg-zinc-950">
      
      {/* Scroll Spy Overlay */}
      <ScrollSpy 
        sections={sections} 
        scrollContainerRef={containerRef} 
        alignment={alignment}
        showLabels={showLabels}
        className="absolute" // Use absolute instead of fixed for the local preview container
      />

      {/* Scrollable Container */}
      <div 
        ref={containerRef}
        className="w-full h-[500px] overflow-y-auto hidden-scrollbar scroll-smooth relative"
      >
        <div id="section-1" className="w-full min-h-[400px] flex flex-col items-center justify-center border-b border-white/5 p-8 text-center bg-gradient-to-b from-indigo-950/20 to-transparent">
          <h3 className="text-3xl font-black text-white mb-4">Section 1: Introduction</h3>
          <p className="text-zinc-400 max-w-md">Scroll down to see the indicator on the side update automatically based on your scroll position.</p>
        </div>
        
        <div id="section-2" className="w-full min-h-[500px] flex flex-col items-center justify-center border-b border-white/5 p-8 text-center">
          <h3 className="text-3xl font-black text-white mb-4">Section 2: Features</h3>
          <p className="text-zinc-400 max-w-md">The scroll spy component tracks which section is currently active in the viewport.</p>
        </div>
        
        <div id="section-3" className="w-full min-h-[600px] flex flex-col items-center justify-center border-b border-white/5 p-8 text-center bg-gradient-to-b from-transparent to-purple-950/20">
          <h3 className="text-3xl font-black text-white mb-4">Section 3: Pricing</h3>
          <p className="text-zinc-400 max-w-md">You can also click on the dots on the side to smoothly scroll to this specific section.</p>
        </div>
        
        <div id="section-4" className="w-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center bg-zinc-900">
          <h3 className="text-3xl font-black text-white mb-4">Section 4: Contact</h3>
          <p className="text-zinc-400 max-w-md">End of the scrollable content area.</p>
        </div>
      </div>
    </div>
  );
}
