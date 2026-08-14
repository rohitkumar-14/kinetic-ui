"use client";

import React from "react";
import { AppleStyleScrollytelling } from "@/components/creative/apple-style-scrollytelling";

export function AppleStyleScrollytellingDemo() {
  return (
    <div className="w-full relative rounded-xl overflow-hidden border border-border">
      <AppleStyleScrollytelling totalSections={4} className="bg-[#000000]">
        
        {/* The shared 3D or visual hero element */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="scrolly-hero relative w-64 h-64 md:w-96 md:h-96 rounded-3xl flex items-center justify-center transform perspective-[1000px] rotateX-[10deg] rotateY-[-10deg]">
            {/* Glowing orb behind */}
            <div className="absolute inset-0 bg-indigo-500/30 blur-[100px] rounded-full" />
            
            {/* Glassy centerpiece */}
            <div className="relative w-full h-full bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-[0_0_80px_rgba(99,102,241,0.2)] flex items-center justify-center overflow-hidden">
               {/* Inner chip reflection */}
               <div className="w-1/2 h-1/2 rounded-2xl bg-gradient-to-tr from-white/5 to-white/20 border border-white/20 shadow-inner flex items-center justify-center">
                 <div className="w-12 h-12 rounded-full bg-white/10 blur-md absolute top-4 left-4" />
                 <span className="text-white/40 font-mono text-sm tracking-widest">A17</span>
               </div>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="absolute inset-0 w-full h-full font-sans tracking-tight">
          {/* Section 1 */}
          <div className="scrolly-section absolute inset-0 flex flex-col items-center justify-end pb-40">
            <div className="scrolly-text text-center px-6">
              <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">Pro Performance.</h1>
              <p className="text-xl text-zinc-400 font-medium">Scroll to unwrap the future.</p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="scrolly-section absolute inset-0 flex flex-col items-center justify-end pb-40">
            <div className="scrolly-text text-center px-6 opacity-0">
              <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">All new architecture.</h2>
              <p className="text-xl text-zinc-400 max-w-lg mx-auto leading-relaxed">Redesigned from the ground up to deliver unprecedented speed and efficiency.</p>
            </div>
          </div>

          {/* Section 3 */}
          <div className="scrolly-section absolute inset-0 flex flex-col items-center justify-end pb-40">
            <div className="scrolly-text text-center px-6 opacity-0">
              <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">Mind-blowing graphics.</h2>
              <p className="text-xl text-zinc-400 max-w-lg mx-auto leading-relaxed">Immersive gaming and rendering that pushes the boundaries of reality.</p>
            </div>
          </div>

          {/* Section 4 */}
          <div className="scrolly-section absolute inset-0 flex flex-col items-center justify-end pb-40">
            <div className="scrolly-text text-center px-6 opacity-0">
              <h2 className="text-5xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent drop-shadow-lg">Available today.</h2>
              <button className="px-10 py-4 bg-white text-black font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                Buy Now
              </button>
            </div>
          </div>
        </div>

      </AppleStyleScrollytelling>
    </div>
  );
}
