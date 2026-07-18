"use client";

import React, { useState } from "react";
import { FallingElements } from "@/components/creative/falling-elements";
import { Button } from "@/components/ui/button";

export function FallingElementsDemo({ gravity = 1 }: { gravity?: number }) {
  const [key, setKey] = useState(0);
  
  return (
    <div className="w-full h-[500px] flex flex-col items-center justify-center relative bg-zinc-950 rounded-3xl overflow-hidden border border-white/10 cursor-pointer" onClick={() => setKey(k => k + 1)}>
      <FallingElements key={key} gravity={gravity} className="absolute inset-0 z-0">
        <div className="bg-indigo-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg border border-indigo-400">Next.js</div>
        <div className="bg-sky-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg border border-sky-400">React</div>
        <div className="bg-black text-white font-bold py-3 px-6 rounded-xl shadow-lg border border-zinc-800 flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-white animate-pulse" />
          Framer Motion
        </div>
        <div className="bg-amber-400 text-zinc-900 font-bold py-3 px-6 rounded-xl shadow-lg border border-amber-300">Matter.js</div>
        <div className="bg-emerald-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg border border-emerald-400">Tailwind CSS</div>
        <div className="bg-rose-500 text-white font-bold py-6 px-10 rounded-2xl shadow-xl border border-rose-400 text-2xl">Physics</div>
      </FallingElements>
      
      <div className="absolute top-8 left-1/2 -translate-x-1/2 pointer-events-none z-10 text-center bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
         <p className="text-zinc-300 text-sm font-mono tracking-widest">Click anywhere to drop</p>
      </div>
    </div>
  );
}
