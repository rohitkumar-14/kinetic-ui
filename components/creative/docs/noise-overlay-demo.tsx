'use client';

import React, { useState } from 'react';
import { NoiseOverlay } from '@/components/creative/noise-overlay';
import { Maximize2, X } from 'lucide-react';

export function NoiseOverlayDemo({ opacity = 0.08, type = "fractalNoise", blendMode = "overlay", blur = "none" }: any) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <>
      {/* Inline Preview Mode */}
      <div className="relative w-full rounded-xl overflow-hidden min-h-[350px]">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500" />
        
        {/* Noise overlay restricted to this div */}
        <NoiseOverlay opacity={opacity} type={type} blendMode={blendMode} blur={blur} className="absolute inset-0 z-0" />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full min-h-[350px] p-8 text-center">
          <h3 className="text-3xl font-black text-white tracking-tight mb-2">Premium Texture</h3>
          <p className="text-white/70 text-sm max-w-sm font-light leading-relaxed">
            A subtle SVG noise overlay adds an organic, tactile film-grain feel to combat the sterile look of pure digital interfaces.
          </p>
          
          <button 
            onClick={() => setIsFullscreen(true)}
            className="mt-6 flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-sm font-medium border border-white/20 transition-colors"
          >
            <Maximize2 className="w-4 h-4" /> Try Fullscreen
          </button>
        </div>
      </div>

      {/* Fullscreen Mode */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[100]">
          {/* We need a background to see the noise on top of it, otherwise it just overlays the current page */}
          <div className="absolute inset-0 bg-zinc-950" />
          
          {/* Actual full-page noise overlay */}
          <NoiseOverlay opacity={opacity} type={type} blendMode={blendMode} blur={blur} />
          
          <div className="relative z-50 flex flex-col items-center justify-center h-full text-center p-8">
             <h3 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6">Global Noise Active</h3>
             
             <button 
              onClick={() => setIsFullscreen(false)}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black hover:bg-zinc-200 text-sm font-bold transition-transform hover:scale-105 active:scale-95"
            >
              <X className="w-4 h-4" /> Close Overlay
            </button>
          </div>
        </div>
      )}
    </>
  );
}
