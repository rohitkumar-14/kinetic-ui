"use client";

import React from "react";
import { SvgFlashlightMask } from "@/components/creative/svg-flashlight-mask";

export default function SvgFlashlightMaskDemo() {
  return (
    <div className="w-full h-[500px] border border-white/10 rounded-xl overflow-hidden cursor-crosshair">
      <SvgFlashlightMask
        maskSize={400}
        // The Dark Base Layer
        children={
          <div className="w-full h-full bg-zinc-950 flex flex-col items-center justify-center p-8">
            <h1 className="text-4xl md:text-6xl font-black text-zinc-800 tracking-tighter text-center">
              HOVER TO REVEAL
            </h1>
            <p className="text-zinc-800 mt-4 font-mono font-bold max-w-sm text-center">
              The magic is hidden in the dark.
            </p>
          </div>
        }
        // The Vibrant Reveal Layer
        revealChildren={
          <div className="w-full h-full bg-white flex flex-col items-center justify-center p-8">
            <h1 className="text-4xl md:text-6xl font-black text-black tracking-tighter text-center">
              SVG FLASHLIGHT
            </h1>
            <p className="text-zinc-500 mt-4 font-mono font-bold max-w-sm text-center">
              CSS Masking powered by Framer Motion.
            </p>
            {/* Colorful abstract background */}
            <div className="absolute inset-0 w-full h-full -z-10 bg-[radial-gradient(circle_at_50%_50%,_rgba(236,72,153,0.2),_rgba(59,130,246,0.2)_50%,_transparent_100%)]" />
          </div>
        }
      />
    </div>
  );
}
