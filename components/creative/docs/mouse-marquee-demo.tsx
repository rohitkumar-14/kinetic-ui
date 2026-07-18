"use client";

import React from "react";
import { MouseMarquee } from "@/components/creative/mouse-marquee";
import { MousePointer2 } from "lucide-react";

export function MouseMarqueeDemo({ maxSpeed = 3 }: { maxSpeed?: number }) {
  // Using an array of images to make it visually interesting
  const images = [
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2564&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1618005192384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=2564&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2564&auto=format&fit=crop",
  ];

  return (
    <div className="w-full bg-slate-950 rounded-xl border border-white/10 flex flex-col items-center justify-center py-24 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/40 to-black pointer-events-none" />
      
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-zinc-400 bg-black/50 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md z-20">
        <MousePointer2 className="w-4 h-4" />
        <span className="text-sm font-medium">Move your cursor left & right</span>
      </div>

      <div className="z-10 w-full space-y-8 mt-8">
        <MouseMarquee maxSpeed={maxSpeed} repeatCount={4}>
          <div className="flex gap-4 pr-4">
            {images.map((src, idx) => (
              <div 
                key={idx} 
                className="w-64 h-80 rounded-2xl overflow-hidden border border-white/10 shrink-0 relative group"
              >
                <img 
                  src={src} 
                  alt="Abstract art" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            ))}
          </div>
        </MouseMarquee>
        
        {/* Counter-directional layer for depth */}
        <MouseMarquee maxSpeed={-maxSpeed * 0.5} repeatCount={4}>
          <div className="flex gap-4 pr-4">
            {images.map((src, idx) => (
              <div 
                key={idx} 
                className="w-48 h-32 rounded-xl overflow-hidden border border-white/5 shrink-0 opacity-50 grayscale"
              >
                <img 
                  src={src} 
                  alt="Abstract art" 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </MouseMarquee>
      </div>
    </div>
  );
}
