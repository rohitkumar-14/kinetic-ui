"use client";

import { ScratchToReveal } from "@/components/creative/scratch-to-reveal";
import { PartyPopper } from "lucide-react";

export interface ScratchToRevealDemoProps {
  brushSize?: number;
  revealThreshold?: number;
}

export function ScratchToRevealDemo({
  brushSize = 40,
  revealThreshold = 0.6
}: ScratchToRevealDemoProps) {
  return (
    <div className="w-full flex items-center justify-center min-h-[500px] bg-zinc-950 p-8 rounded-2xl border border-white/10">
      
      {/* The component needs explicit width and height */}
      <ScratchToReveal
        key={`${brushSize}-${revealThreshold}`} // Force remount if settings change
        width={300}
        height={400}
        brushSize={brushSize}
        revealThreshold={revealThreshold}
        coverImage="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
        className="rounded-2xl shadow-2xl overflow-hidden border border-white/20"
        onReveal={() => console.log("Revealed!")}
      >
        <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex flex-col items-center justify-center text-white p-6 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
            <PartyPopper className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">You Won!</h3>
          <p className="text-white/80 font-medium text-sm">
            Enjoy your exclusive lifetime access to the creative library.
          </p>
        </div>
      </ScratchToReveal>
      
    </div>
  );
}
