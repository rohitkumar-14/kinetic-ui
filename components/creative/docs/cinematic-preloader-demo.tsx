"use client";

import React, { useState } from "react";
import { CinematicPreloader } from "@/components/creative/cinematic-preloader";

export function CinematicPreloaderDemo({ brandName = "KINETIC UI" }: { brandName?: string }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="w-full relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 py-24 flex flex-col items-center justify-center">
      
      <div className="text-center mb-8 relative z-10">
        <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Cinematic Preloader</h2>
        <p className="text-zinc-400 font-mono text-sm max-w-sm mt-4 leading-relaxed">
          Click the button below to trigger the global page preloader sequence. It will cover your entire screen.
        </p>
      </div>

      <button
        onClick={() => setIsLoading(true)}
        className="relative z-10 px-8 py-4 bg-white text-black font-black uppercase tracking-widest rounded-full hover:scale-105 transition-transform"
      >
        Trigger Preloader
      </button>

      {/* The component is mounted globally but controlled by state */}
      <CinematicPreloader 
        isLoading={isLoading} 
        onComplete={() => setIsLoading(false)}
        brandName={brandName}
      />
      
    </div>
  );
}
