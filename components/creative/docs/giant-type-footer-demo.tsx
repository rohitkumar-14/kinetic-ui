"use client";

import React from "react";
import { GiantTypeFooter } from "@/components/creative/giant-type-footer";

export function GiantTypeFooterDemo({ title = "FINAL BOSS" }: { title?: string }) {
  return (
    <div className="w-full bg-slate-950 rounded-xl border border-white/10 flex flex-col custom-scrollbar relative h-[600px] overflow-y-auto">
      
      {/* 
        This is the main page content. 
        It MUST have a solid background and a higher z-index than the footer 
        so that it physically covers the footer while scrolling.
      */}
      <main className="relative z-10 w-full min-h-[800px] bg-slate-950 flex flex-col items-center justify-center p-8 border-b border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="max-w-2xl text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
            Scroll Down to Reveal
          </h2>
          <p className="text-zinc-400 text-lg">
            Keep scrolling. Because the main content is layered above the footer, 
            it creates a parallax curtain effect where the page peels upwards to reveal the footer natively.
          </p>
          
          <div className="mt-12 flex flex-col items-center gap-2 animate-bounce">
            <span className="text-zinc-500 text-sm tracking-widest uppercase">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-zinc-500 to-transparent" />
          </div>
        </div>
      </main>

      {/* The Footer */}
      <GiantTypeFooter title={title} className="bg-black" />
      
    </div>
  );
}
