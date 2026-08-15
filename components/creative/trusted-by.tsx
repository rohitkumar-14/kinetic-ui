'use client';

import React from 'react';

const logos = [
  "Vercel",
  "Stripe",
  "Raycast",
  "Linear",
  "Supabase",
  "Tailwind",
  "Framer",
];

export function TrustedBy() {
  return (
    <section className="py-12 border-b border-border bg-black overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black to-transparent z-10" />
      
      <div className="container mx-auto px-6 mb-8 text-center">
        <p className="text-sm font-medium text-zinc-500 tracking-widest uppercase">Trusted by innovative teams at</p>
      </div>

      <div className="flex w-[300%] gap-8 animate-marquee-third-left hover:[animation-play-state:paused]">
        {/* We double the logos array to create an infinite scroll effect */}
        {[...logos, ...logos, ...logos].map((logo, i) => (
          <div 
            key={i} 
            className="flex items-center justify-center min-w-[120px] px-8 text-2xl font-bold tracking-tight text-zinc-600 opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 hover:text-white"
          >
            {logo}
          </div>
        ))}
      </div>
    </section>
  );
}
