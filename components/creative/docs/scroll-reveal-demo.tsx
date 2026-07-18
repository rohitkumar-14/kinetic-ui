'use client';

import React, { useState, useRef } from 'react';
import { ScrollReveal } from '@/components/creative/scroll-reveal';

export function ScrollRevealDemo({ duration = 0.6, animation = "fade", once = true }: any) {
  const [refreshKey, setRefreshKey] = useState(0);
  const wasAtTop = useRef(true);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const isAtTop = e.currentTarget.scrollTop === 0;
    
    // If we just reached the top, increment the key to refresh animations
    if (isAtTop && !wasAtTop.current) {
      setRefreshKey(prev => prev + 1);
    }
    
    wasAtTop.current = isAtTop;
  };

  return (
    <div 
      className="w-full h-[400px] overflow-y-auto rounded-xl border border-white/10 bg-zinc-950 p-8" 
      onScroll={handleScroll}
    >
      
      <div className="flex flex-col items-center justify-center min-h-[300px] text-center mb-12 border-b border-white/5 pb-12">
        <h3 className="text-2xl font-bold text-white mb-2">Scroll Down</h3>
        <p className="text-sm text-zinc-400">Content below will reveal as it enters the viewport.</p>
        <p className="text-xs text-indigo-400 mt-4">Scroll back to the top to reset the animation!</p>
        <div className="w-px h-16 bg-gradient-to-b from-white/20 to-transparent mt-8" />
      </div>

      <div className="space-y-6 max-w-md mx-auto pb-[300px]" key={`${animation}-${duration}-${once}-${refreshKey}`}>
        {/* We map multiple items to show the effect continuously */}
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <ScrollReveal 
            key={i}
            animation={animation} 
            duration={duration} 
            delay={(i % 3) * 0.1} 
            once={once}
          >
            <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <h4 className="font-bold text-white mb-1">Scroll Card {i}</h4>
              <p className="text-sm text-zinc-400 font-light">
                {once 
                  ? "This card animated once and will stay here." 
                  : "Scroll this card out of view and back to see it re-animate!"}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>

    </div>
  );
}
