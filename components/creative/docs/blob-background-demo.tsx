'use client';

import React from 'react';
import { BlobBackground } from '@/components/creative/blob-background';

export function BlobBackgroundDemo({ blur = 60, blobOpacity = 0.5, animationSpeed = 20 }: any) {
  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-white/10 bg-zinc-950 min-h-[500px] flex items-center justify-center">
      
      {/* Background Component */}
      <BlobBackground 
        colors={["#ffaa40", "#9c40ff", "#00c6ff"]}
        blur={blur}
        blobOpacity={blobOpacity}
        animationSpeed={animationSpeed}
      />
      
      {/* Foreground Content */}
      <div className="relative z-10 text-center max-w-2xl px-6 py-12 bg-black/20 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
          Atmospheric Blobs
        </h2>
        <p className="text-lg text-zinc-300 font-medium max-w-lg mx-auto">
          Large, slow-moving gradient masses that provide dynamic depth to hero sections without overwhelming the foreground content.
        </p>
      </div>

    </div>
  );
}
