"use client";

import React, { useState } from "react";
import { LiquidSweepTransition } from "@/components/creative/liquid-sweep-transition";
import { Button } from "@/components/ui/button";

export function LiquidSweepTransitionDemo({ color = "#4f46e5" }: { color?: string }) {
  const [isActive, setIsActive] = useState(false);

  const triggerTransition = () => {
    setIsActive(true);
    // Simulate a page load, then dismiss
    setTimeout(() => {
      setIsActive(false);
    }, 2000);
  };

  return (
    <div className="relative w-full h-[500px] bg-slate-950 rounded-xl overflow-hidden border border-white/10 flex flex-col items-center justify-center">
      <div className="z-10 text-center space-y-6">
        <h2 className="text-3xl font-bold text-white tracking-tight">Liquid Sweep</h2>
        <p className="text-zinc-400 max-w-sm mx-auto">
          A premium SVG wave transition that sweeps across the screen to reveal the next page.
        </p>
        <Button 
          onClick={triggerTransition}
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 py-6 text-lg"
        >
          Trigger Transition
        </Button>
      </div>

      {/* The component handles its own fixed portal overlay, but since we want to preview it IN the box, 
          we wrap it here. Note: In production, it uses 'fixed inset-0', but for demo purposes, 
          we can override it or just let it cover the whole browser! */}
      
      <LiquidSweepTransition isActive={isActive} color={color}>
        <div className="text-white text-4xl font-black tracking-widest uppercase">
          Loading...
        </div>
      </LiquidSweepTransition>
    </div>
  );
}
