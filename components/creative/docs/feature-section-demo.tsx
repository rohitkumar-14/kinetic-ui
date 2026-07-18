"use client";

import React, { useState } from "react";
import { FeatureSection, FeatureSectionVariant } from "@/components/creative/feature-section";
import { cn } from "@/lib/utils";
import { LayoutGrid, Grip, AlignLeft } from "lucide-react";

export function FeatureSectionDemo() {
  const [activeVariant, setActiveVariant] = useState<FeatureSectionVariant>("grid");

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
            Grid
          </span>
        </button>
        
        <button
          onClick={() => setActiveVariant("bento")}
          className={cn(
            "px-4 py-2 text-xs font-semibold rounded-xl border transition-all duration-200",
            activeVariant === "bento"
              ? "bg-white text-black border-white/20 shadow-lg shadow-white/5"
              : "bg-white/5 text-zinc-400 border-white/5 hover:bg-white/10 hover:text-white"
          )}
        >
          <span className="flex items-center gap-2">
            <Grip className="w-4 h-4" />
            Bento
          </span>
        </button>

        <button
          onClick={() => setActiveVariant("minimal")}
          className={cn(
            "px-4 py-2 text-xs font-semibold rounded-xl border transition-all duration-200",
            activeVariant === "minimal"
              ? "bg-white text-black border-white/20 shadow-lg shadow-white/5"
              : "bg-white/5 text-zinc-400 border-white/5 hover:bg-white/10 hover:text-white"
          )}
        >
          <span className="flex items-center gap-2">
            <AlignLeft className="w-4 h-4" />
            Minimal
          </span>
        </button>
      </div>

      <div className="w-full rounded-2xl border border-white/10 bg-zinc-950 relative overflow-hidden">
        <div className="relative w-full h-[600px] overflow-y-auto">
          <FeatureSection 
            variant={activeVariant}
            color="#3b82f6" // Custom blue accent for demo
          />
        </div>
      </div>
    </div>
  );
}
