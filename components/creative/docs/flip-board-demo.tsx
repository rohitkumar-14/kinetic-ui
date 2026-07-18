"use client";

import React, { useState, useEffect } from "react";
import { FlipBoard } from "@/components/creative/flip-board";

export interface FlipBoardDemoProps {
  variant?: "default" | "cyberpunk" | "minimal";
  text?: string;
}

export function FlipBoardDemo({
  variant = "default",
  text = "DEPARTURES"
}: FlipBoardDemoProps) {
  
  if (variant === "cyberpunk") {
    return (
      <div className="flex w-full min-h-[300px] flex-col items-center justify-center bg-zinc-950 p-4 rounded-xl border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
        <FlipBoard 
          key={text}
          text={text} 
          cols={text.length} 
          theme="dark" 
          className="bg-black/50 border-emerald-900/50"
          charClassName="text-emerald-400 font-mono shadow-[0_0_10px_rgba(52,211,153,0.3)] border-emerald-900/30"
        />
      </div>
    );
  }

  if (variant === "minimal") {
    return (
      <div className="flex w-full min-h-[300px] flex-col items-center justify-center bg-neutral-100 p-4 rounded-xl border border-neutral-200">
        <FlipBoard 
          key={text}
          text={text} 
          cols={text.length} 
          theme="light" 
          className="bg-white border-neutral-200 shadow-sm"
          charClassName="text-neutral-800 border-neutral-100"
        />
      </div>
    );
  }

  // Default
  return (
    <div className="flex w-full min-h-[300px] flex-col items-center justify-center bg-black p-4 rounded-xl border border-white/10">
      <FlipBoard key={text} text={text} cols={text.length} theme="dark" />
    </div>
  );
}
