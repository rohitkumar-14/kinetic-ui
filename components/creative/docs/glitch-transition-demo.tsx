"use client";

import React, { useState } from "react";
import { GlitchTransition } from "@/components/creative/glitch-transition";
import { Button } from "@/components/ui/button";

export function GlitchTransitionDemo({ text = "SYSTEM ERROR" }: { text?: string }) {
  const [isActive, setIsActive] = useState(false);

  const triggerTransition = () => {
    setIsActive(true);
    setTimeout(() => {
      setIsActive(false);
    }, 1500); // Glitch is fast!
  };

  return (
    <div className="relative w-full h-[500px] bg-slate-950 rounded-xl overflow-hidden border border-white/10 flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 to-black">
      <div className="z-10 text-center space-y-6">
        <h2 className="text-3xl font-bold text-white tracking-tight">Cyberpunk Glitch</h2>
        <p className="text-zinc-400 max-w-sm mx-auto">
          A high-intensity, chromatic aberration transition perfect for gaming or tech-focused portfolios.
        </p>
        <Button 
          onClick={triggerTransition}
          className="bg-red-600 hover:bg-red-700 text-white rounded-none border border-red-500 px-8 py-6 text-lg font-mono tracking-widest uppercase"
        >
          Initialize
        </Button>
      </div>

      <GlitchTransition isActive={isActive} text={text} />
    </div>
  );
}
