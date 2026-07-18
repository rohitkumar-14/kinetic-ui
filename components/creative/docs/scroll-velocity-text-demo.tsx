"use client";

import { ScrollVelocityText } from "@/components/creative/scroll-velocity-text";

export function ScrollVelocityTextDemo({ 
  text = "FAST SCROLL VELOCITY", 
  defaultVelocity = 50 
}: { 
  text?: string; 
  defaultVelocity?: number;
}) {
  return (
    <div className="w-full relative bg-zinc-950 rounded-2xl border border-white/10 overflow-hidden h-[600px]">
      <div className="absolute inset-0 overflow-y-auto no-scrollbar pointer-events-auto">
        
        <div className="h-[150vh] flex flex-col justify-center gap-4 relative">
          
          <div className="absolute top-10 w-full text-center text-zinc-500 font-mono text-sm">
            Scroll down fast to accelerate and skew &uarr; &darr;
          </div>
          
          {/* Top Row: Moves Right (negative velocity), Solid Text */}
          <ScrollVelocityText 
            text={text} 
            defaultVelocity={-defaultVelocity} 
            className="text-white"
          />

          {/* Bottom Row: Moves Left (positive velocity), Outlined Text */}
          <ScrollVelocityText 
            text={text} 
            defaultVelocity={defaultVelocity} 
            className="text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.5)] opacity-80"
          />

        </div>

      </div>
    </div>
  );
}
