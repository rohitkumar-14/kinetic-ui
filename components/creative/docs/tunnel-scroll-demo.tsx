"use client";

import React from "react";
import { TunnelScroll } from "@/components/creative/tunnel-scroll";
import { Sparkles, Zap, Shield, Rocket } from "lucide-react";

export function TunnelScrollDemo({ tunnelColor = "#10b981", spacing = 25 }: { tunnelColor?: string, spacing?: number }) {
  return (
    <div className="w-full h-[600px] rounded-3xl overflow-hidden border border-zinc-200 relative bg-zinc-950">
      
      {/* 
        The TunnelScroll wrapper automatically handles the scrollable container.
        Since we are inside a 600px iframe/demo container, the scrolling happens inside here.
      */}
      <TunnelScroll tunnelColor={tunnelColor} spacing={spacing}>
        
        {/* SECTION 1: HERO */}
        <div className="w-[800px] flex flex-col items-center justify-center p-12 bg-zinc-900/50 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl text-center">
          <div className="p-4 bg-emerald-500/20 rounded-full mb-6">
            <Sparkles className="w-12 h-12 text-emerald-400" />
          </div>
          <h1 className="text-6xl font-black text-white mb-4 tracking-tighter">
            ENTER THE <span className="text-emerald-400">TUNNEL</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-lg mb-8">
            Scroll down to fly forward through the 3D space. Standard HTML elements are projected as floating billboards.
          </p>
          <button className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 transition-colors text-white font-bold rounded-full text-lg shadow-[0_0_20px_rgba(16,185,129,0.5)]">
            Scroll To Continue
          </button>
        </div>

        {/* SECTION 2: FEATURES */}
        <div className="w-[1000px] flex flex-col items-center p-12 bg-zinc-900/50 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-12">Insane Performance</h2>
          <div className="grid grid-cols-3 gap-6 w-full">
            {[
              { icon: Zap, title: "Lightning Fast", desc: "Runs at a solid 60fps even with multiple sections." },
              { icon: Shield, title: "React Three Fiber", desc: "Built on top of the industry standard WebGL renderer." },
              { icon: Rocket, title: "Zero Config", desc: "Just wrap your existing components." },
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 bg-zinc-800/50 rounded-2xl border border-white/5 hover:border-emerald-500/50 transition-colors cursor-pointer group">
                <feature.icon className="w-10 h-10 text-emerald-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-zinc-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: PRICING */}
        <div className="w-[800px] flex gap-8 items-center justify-center p-12">
          {/* Basic Plan */}
          <div className="flex-1 bg-zinc-900/80 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-xl flex flex-col items-center">
            <h3 className="text-2xl font-bold text-white mb-2">Standard</h3>
            <p className="text-5xl font-black text-white mb-6">$0<span className="text-lg text-zinc-500 font-normal">/mo</span></p>
            <button className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-bold transition-colors">
              Get Started
            </button>
          </div>
          
          {/* Pro Plan */}
          <div className="flex-[1.2] bg-emerald-950/80 backdrop-blur-md p-10 rounded-3xl border-2 border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.2)] flex flex-col items-center transform scale-105">
            <div className="absolute -top-4 bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-bold tracking-wider">MOST POPULAR</div>
            <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
            <p className="text-5xl font-black text-white mb-6">$29<span className="text-lg text-emerald-500/70 font-normal">/mo</span></p>
            <button className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-bold transition-colors shadow-lg">
              Upgrade Now
            </button>
          </div>
        </div>

        {/* SECTION 4: CTA */}
        <div className="w-[800px] flex flex-col items-center justify-center p-16 bg-gradient-to-br from-emerald-900/80 to-zinc-900/80 backdrop-blur-md rounded-3xl border border-emerald-500/30 shadow-2xl text-center">
          <h2 className="text-5xl font-black text-white mb-6">Ready to launch?</h2>
          <p className="text-xl text-zinc-300 mb-8">
            You have reached the end of the tunnel.
          </p>
          <button className="px-10 py-5 bg-white hover:bg-zinc-200 transition-colors text-black font-black rounded-full text-xl shadow-xl flex items-center gap-3">
            <Rocket className="w-6 h-6" />
            Deploy Now
          </button>
        </div>

      </TunnelScroll>

      {/* Floating scroll indicator overlay (optional, just for demo UX) */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 pointer-events-none flex flex-col items-center gap-2">
        <span className="text-white/50 text-xs font-bold tracking-widest uppercase">Scroll Down</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    </div>
  );
}
