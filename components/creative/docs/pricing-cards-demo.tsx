"use client";

import React, { useState } from "react";
import { PricingCards, PricingVariant } from "@/components/creative/pricing-cards";
import { cn } from "@/lib/utils";
import { LayoutGrid, MousePointer2, Focus } from "lucide-react";

export function PricingCardsDemo() {
  const [activeVariant, setActiveVariant] = useState<PricingVariant>("grid");

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-wrap gap-2 z-10 justify-center">
        <button
          onClick={() => setActiveVariant("grid")}
          className={cn(
            "px-4 py-2 text-xs font-semibold rounded-xl border transition-all duration-200",
            activeVariant === "grid"
              ? "bg-white text-black border-white/20 shadow-lg shadow-white/5"
              : "bg-white/5 text-zinc-400 border-white/5 hover:bg-white/10 hover:text-white"
          )}
        >
          <span className="flex items-center gap-2">
            <LayoutGrid className="w-4 h-4" />
            Standard Grid
          </span>
        </button>
        
        <button
          onClick={() => setActiveVariant("spotlight")}
          className={cn(
            "px-4 py-2 text-xs font-semibold rounded-xl border transition-all duration-200",
            activeVariant === "spotlight"
              ? "bg-white text-black border-white/20 shadow-lg shadow-white/5"
              : "bg-white/5 text-zinc-400 border-white/5 hover:bg-white/10 hover:text-white"
          )}
        >
          <span className="flex items-center gap-2">
            <MousePointer2 className="w-4 h-4" />
            Spotlight Hover
          </span>
        </button>

        <button
          onClick={() => setActiveVariant("focus")}
          className={cn(
            "px-4 py-2 text-xs font-semibold rounded-xl border transition-all duration-200",
            activeVariant === "focus"
              ? "bg-white text-black border-white/20 shadow-lg shadow-white/5"
              : "bg-white/5 text-zinc-400 border-white/5 hover:bg-white/10 hover:text-white"
          )}
        >
          <span className="flex items-center gap-2">
            <Focus className="w-4 h-4" />
            Dim unfocused
          </span>
        </button>
      </div>

      <div className="w-full rounded-2xl border border-white/10 bg-zinc-950 relative overflow-hidden">
        {/* We use a negative margin trick here because PricingCards natively comes with py-20, and we want to fit it in the demo container nicely */}
        <div className="relative w-full overflow-hidden -my-10 scale-[0.95]">
          <PricingCards 
            variant={activeVariant}
            color="#ec4899" // Pink accent to stand out
          />
        </div>
      </div>
    </div>
  );
}
