"use client";

import React, { useState } from "react";
import { PaperTearReveal } from "@/components/creative/paper-tear-reveal";
import { Gift } from "lucide-react";

export function PaperTearRevealDemo() {
  const [resetKey, setResetKey] = useState(0);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-8 py-10">
      
      <div className="flex gap-4 mb-4">
        <PaperTearReveal key={resetKey} width={350} height={120} brushSize={30}>
          <div className="w-full h-full flex items-center justify-center gap-4 bg-emerald-950/40 border-2 border-emerald-500/50 border-dashed rounded-xl">
            <Gift className="text-emerald-400" size={32} />
            <div>
              <div className="text-xs text-emerald-500 font-bold uppercase tracking-widest mb-1">Promo Code</div>
              <div className="text-3xl font-black text-white font-mono tracking-wider">WINNER25</div>
            </div>
          </div>
        </PaperTearReveal>
      </div>

      <button 
        onClick={() => setResetKey(k => k + 1)}
        className="text-sm text-neutral-400 hover:text-white underline underline-offset-4 transition-colors"
      >
        Reset Card
      </button>
    </div>
  );
}
