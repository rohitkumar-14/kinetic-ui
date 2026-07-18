"use client";

import React from "react";
import { VelocityMarquee } from "@/components/creative/velocity-marquee";
import { Sparkles, Command, Cpu, Layout, Terminal } from "lucide-react";

export function VelocityMarqueeDemo({ baseVelocity = 3 }: { baseVelocity?: number }) {
  return (
    <div className="w-full bg-slate-950 rounded-xl border border-white/10 flex flex-col items-center justify-center py-24 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/30 to-black pointer-events-none" />
      
      <div className="z-10 w-full space-y-8 flex flex-col">
        {/* Fast Marquee Right */}
        <VelocityMarquee baseVelocity={baseVelocity} className="py-4">
          <span className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mr-8 uppercase tracking-tighter">
            Build Faster
          </span>
          <span className="text-5xl md:text-7xl font-black text-white mr-8 uppercase tracking-tighter">
            Ship Better
          </span>
          <span className="text-5xl md:text-7xl font-black text-zinc-800 mr-8 uppercase tracking-tighter">
            Never Settle
          </span>
        </VelocityMarquee>

        {/* Slow Marquee Left */}
        <VelocityMarquee baseVelocity={-baseVelocity * 0.75} className="py-2">
          <div className="flex items-center gap-4 mx-4 px-6 py-3 bg-zinc-900 rounded-full border border-white/5">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="text-zinc-200 font-medium">Framer Motion</span>
          </div>
          <div className="flex items-center gap-4 mx-4 px-6 py-3 bg-zinc-900 rounded-full border border-white/5">
            <Command className="w-5 h-5 text-indigo-400" />
            <span className="text-zinc-200 font-medium">Tailwind CSS</span>
          </div>
          <div className="flex items-center gap-4 mx-4 px-6 py-3 bg-zinc-900 rounded-full border border-white/5">
            <Cpu className="w-5 h-5 text-rose-400" />
            <span className="text-zinc-200 font-medium">React Server Components</span>
          </div>
          <div className="flex items-center gap-4 mx-4 px-6 py-3 bg-zinc-900 rounded-full border border-white/5">
            <Layout className="w-5 h-5 text-emerald-400" />
            <span className="text-zinc-200 font-medium">Responsive</span>
          </div>
          <div className="flex items-center gap-4 mx-4 px-6 py-3 bg-zinc-900 rounded-full border border-white/5">
            <Terminal className="w-5 h-5 text-zinc-400" />
            <span className="text-zinc-200 font-medium">Type Safe</span>
          </div>
        </VelocityMarquee>
        
        <p className="text-center text-zinc-500 mt-8 max-w-sm mx-auto text-sm">
          Scroll up and down quickly to see the marquee accelerate.
        </p>
      </div>
    </div>
  );
}
