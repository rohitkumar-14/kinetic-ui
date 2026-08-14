"use client";

import React from "react";
import { InfiniteMarquee } from "@/components/creative/infinite-marquee";

const LOGOS = [
  "Acme Corp", "Globex", "Soylent Corp", "Initech", "Umbrella Corp", 
  "Stark Industries", "Wayne Enterprises", "Cyberdyne Systems", "Massive Dynamic",
];

export default function InfiniteMarqueeDemo() {
  return (
    <div className="w-full flex flex-col items-center justify-center py-20 bg-background border border-border rounded-xl gap-8 overflow-hidden">
      
      {/* Top Marquee (Right to Left) */}
      <div className="w-full relative">
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
        <InfiniteMarquee speed="normal" direction="left" pauseOnHover>
          {LOGOS.map((logo, i) => (
            <div 
              key={i} 
              className="px-8 py-4 bg-secondary/50 backdrop-blur-sm rounded-xl border border-white/5 shadow-sm text-foreground/80 font-bold tracking-tight whitespace-nowrap"
            >
              {logo}
            </div>
          ))}
        </InfiniteMarquee>
      </div>

      {/* Bottom Marquee (Left to Right, Slower) */}
      <div className="w-full relative">
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
        <InfiniteMarquee speed="slow" direction="right" pauseOnHover>
          {LOGOS.map((logo, i) => (
            <div 
              key={i} 
              className="px-8 py-4 opacity-50 font-serif italic tracking-widest text-foreground whitespace-nowrap"
            >
              {logo.toUpperCase()}
            </div>
          ))}
        </InfiniteMarquee>
      </div>

    </div>
  );
}
