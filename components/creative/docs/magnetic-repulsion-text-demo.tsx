"use client";

import React from "react";
import { MagneticRepulsionText } from "@/components/creative/magnetic-repulsion-text";

export default function MagneticRepulsionTextDemo() {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[400px] bg-zinc-950 border border-white/10 rounded-xl p-8 overflow-hidden">
      
      <div className="text-center mb-12 pointer-events-none">
        <h2 className="text-2xl font-bold text-white mb-2">Interactive Typography</h2>
        <p className="text-zinc-400">
          Move your cursor over the text below. The letters have collision physics and will run away from your mouse!
        </p>
      </div>

      <div className="max-w-3xl text-center">
        <MagneticRepulsionText 
          text="Don't touch me! I'm highly sensitive to cursors." 
          className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500"
          threshold={120}
        />
      </div>

    </div>
  );
}
