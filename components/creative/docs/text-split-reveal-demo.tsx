"use client";

import { TextSplitReveal } from "@/components/creative/text-split-reveal";
import { ArrowRight } from "lucide-react";

export interface TextSplitRevealDemoProps {
  text?: string;
}

export function TextSplitRevealDemo({
  text = "DISCOVER",
}: TextSplitRevealDemoProps) {
  const hiddenContent = (
    <div className="flex flex-col items-center gap-4 bg-zinc-900 p-6 rounded-2xl border border-white/10 shadow-2xl">
      <p className="text-zinc-400 font-mono text-sm">You found the secret</p>
      <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform">
        View Project <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <div className="w-full h-[500px] flex items-center justify-center bg-zinc-950 rounded-2xl overflow-hidden border border-white/10 group">
      <TextSplitReveal 
        key={text}
        text={text} 
        revealContent={hiddenContent}
      />
    </div>
  );
}
