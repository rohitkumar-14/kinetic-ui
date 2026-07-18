"use client";

import React, { useState } from "react";
import { ShutterTransition } from "@/components/creative/shutter-transition";
import { Button } from "@/components/ui/button";
import { Command } from "lucide-react";

export function ShutterTransitionDemo({ 
  color = "#18181b",
  direction = "vertical" 
}: { 
  color?: string,
  direction?: "vertical" | "horizontal"
}) {
  const [isActive, setIsActive] = useState(false);

  const triggerTransition = () => {
    setIsActive(true);
    setTimeout(() => {
      setIsActive(false);
    }, 2000);
  };

  return (
    <div className="relative w-full h-[500px] bg-slate-950 rounded-xl overflow-hidden border border-white/10 flex flex-col items-center justify-center">
      <div className="z-10 text-center space-y-6">
        <h2 className="text-3xl font-bold text-white tracking-tight">Shutter Reveal</h2>
        <p className="text-zinc-400 max-w-sm mx-auto">
          An elegant physical shutter transition that splits the screen perfectly in half.
        </p>
        <Button 
          onClick={triggerTransition}
          className="bg-white hover:bg-zinc-200 text-black rounded-full px-8 py-6 text-lg"
        >
          Activate Shutter
        </Button>
      </div>

      <ShutterTransition isActive={isActive} color={color} direction={direction}>
        <div className="flex flex-col items-center gap-4">
          <Command className="w-12 h-12 text-white animate-spin-slow" />
          <div className="text-white text-2xl font-light tracking-widest uppercase">
            Loading System
          </div>
        </div>
      </ShutterTransition>
    </div>
  );
}
