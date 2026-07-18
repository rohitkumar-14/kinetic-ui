"use client";

import React, { useState } from "react";
import { GlyphMatrix, GlyphTheme } from "@/components/creative/glyph-matrix";
import { cn } from "@/lib/utils";
import { Sliders, Eye, Sparkles, Terminal, ShieldAlert, Cpu } from "lucide-react";

export interface GlyphMatrixDemoProps {
  theme?: GlyphTheme;
  fontSize?: number;
  speed?: number;
  density?: number;
  interactive?: boolean;
  glow?: boolean;
}

export function GlyphMatrixDemo({
  theme = "matrix",
  fontSize = 14,
  speed = 1.2,
  density = 1.1,
  interactive = true,
  glow = true,
}: GlyphMatrixDemoProps) {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full rounded-2xl border border-white/10 bg-zinc-950 relative overflow-hidden group">
        <div className="relative w-full min-h-[500px] flex items-center justify-center bg-black">
          <div className="absolute inset-0 z-0">
            <GlyphMatrix
              theme={theme}
              fontSize={fontSize}
              speed={speed}
              density={density}
              interactive={interactive}
              glow={glow}
              className="w-full h-full"
            />
          </div>

          {/* Cyberpunk Hacker Terminal Overlay Mockup */}
          <div className="absolute top-6 left-6 right-6 p-4 rounded-xl border border-white/5 bg-zinc-950/60 backdrop-blur-md z-10 flex flex-col gap-3 font-mono">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <div className="flex items-center gap-2 text-xs">
                <Terminal className="w-3.5 h-3.5 text-zinc-400" />
                <span className="text-zinc-200 font-semibold uppercase tracking-wider">System Terminal</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500/80" />
                <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                <span className="w-2 h-2 rounded-full bg-green-500/80" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 text-xs text-zinc-400">
              <p className="flex items-center gap-1 text-[11px]">
                <Cpu className="w-3 h-3 text-zinc-500 animate-pulse" />
                <span>LOG: DECRYPTING GLYPH DATA STREAM...</span>
              </p>
              <p className="text-[11px] text-zinc-500">
                STATUS: HOVER OVER STREAM TO INITIATE MOUSE SCATTER
              </p>
              <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 mt-2">
                <span className="px-1.5 py-0.5 bg-white/5 rounded border border-white/5 font-bold uppercase">
                  Active Theme: {theme}
                </span>
                <span className="px-1.5 py-0.5 bg-white/5 rounded border border-white/5 font-bold">
                  DENSITY: {density.toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Warning Indicator */}
          <div className="absolute bottom-6 right-6 p-3 rounded-lg border border-red-500/10 bg-red-950/40 backdrop-blur-md z-10 flex items-center gap-2.5 font-mono text-[10px]">
            <ShieldAlert className="w-4 h-4 text-red-500 animate-pulse" />
            <div>
              <span className="text-red-400 font-bold block uppercase tracking-widest">FIREWALL WARNING</span>
              <span className="text-red-500/80">INTRUSION DETECTED IN DIGITAL STREAM</span>
            </div>
          </div>

          {/* Hover/Tap Hint */}
          <div className="absolute bottom-6 left-6 p-2 rounded bg-black/40 border border-white/5 text-[9px] font-mono text-zinc-500 pointer-events-none">
            MOVE CURSOR OR TOUCH TO INTERACT
          </div>
        </div>
      </div>
    </div>
  );
}
