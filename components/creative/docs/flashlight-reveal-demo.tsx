"use client";

import { FlashlightReveal } from "@/components/creative/flashlight-reveal";

export interface FlashlightRevealDemoProps {
  text?: string;
  cursorSize?: number;
}

export function FlashlightRevealDemo({
  text = "DISCOVER",
  cursorSize = 350
}: FlashlightRevealDemoProps) {
  return (
    <div className="w-full relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 p-8 flex flex-col items-center">
      
      <div className="text-center mb-8 relative z-10">
        <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Spotlight Mask</h2>
        <p className="text-zinc-500 font-mono text-sm mt-2">Move your cursor over the dark box</p>
      </div>
      
      <div className="w-full rounded-2xl overflow-hidden shadow-2xl border border-white/5 relative cursor-none">
        <FlashlightReveal 
          key={`${text}-${cursorSize}`}
          text={text} 
          cursorSize={cursorSize}
          className="h-[500px]"
        />
      </div>

    </div>
  );
}
