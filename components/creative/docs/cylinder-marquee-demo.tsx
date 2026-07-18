"use client";

import React from "react";
import { CylinderMarquee } from "@/components/creative/cylinder-marquee";
import { Sparkles, Command, Cpu, Layout, Terminal, Box, Globe, Zap, Code } from "lucide-react";

export function CylinderMarqueeDemo() {
  const cards = [
    { icon: <Sparkles className="w-8 h-8 text-yellow-400" />, title: "Framer Motion", desc: "Animation library" },
    { icon: <Command className="w-8 h-8 text-indigo-400" />, title: "Tailwind CSS", desc: "Utility-first styling" },
    { icon: <Cpu className="w-8 h-8 text-rose-400" />, title: "React", desc: "Server Components" },
    { icon: <Layout className="w-8 h-8 text-emerald-400" />, title: "Layouts", desc: "Responsive design" },
    { icon: <Terminal className="w-8 h-8 text-zinc-400" />, title: "TypeScript", desc: "Type safety" },
    { icon: <Box className="w-8 h-8 text-blue-400" />, title: "3D CSS", desc: "Hardware accelerated" },
    { icon: <Globe className="w-8 h-8 text-cyan-400" />, title: "Next.js", desc: "App Router" },
    { icon: <Zap className="w-8 h-8 text-orange-400" />, title: "Performance", desc: "Lightning fast" },
    { icon: <Code className="w-8 h-8 text-purple-400" />, title: "Clean Code", desc: "Maintainable" },
  ];

  const items = cards.map((card, idx) => (
    <div 
      key={idx} 
      className="w-full h-full bg-zinc-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4 hover:bg-zinc-800/80 transition-colors cursor-pointer"
      style={{ boxShadow: "0 0 20px rgba(0,0,0,0.5) inset" }}
    >
      <div className="p-4 bg-black/50 rounded-full border border-white/5">
        {card.icon}
      </div>
      <div>
        <h3 className="text-white font-bold tracking-tight">{card.title}</h3>
        <p className="text-zinc-500 text-sm mt-1">{card.desc}</p>
      </div>
    </div>
  ));

  return (
    <div className="w-full h-[600px] bg-slate-950 rounded-xl border border-white/10 flex items-center justify-center overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-zinc-900/20 to-black pointer-events-none" />
      
      {/* 
        The CylinderMarquee needs some vertical padding to breathe, 
        and works best in a perspective container.
      */}
      <div className="w-full h-full flex items-center justify-center" style={{ perspective: "1200px" }}>
        <CylinderMarquee 
          items={items} 
          itemWidth={220}
          itemHeight={260}
          speed={25}
          direction="left"
        />
      </div>

      {/* Gradient fade on edges for aesthetic */}
      <div className="absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none" />
    </div>
  );
}
