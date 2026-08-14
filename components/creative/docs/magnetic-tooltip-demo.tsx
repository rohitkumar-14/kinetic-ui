"use client";

import React from "react";
import { MagneticTooltip } from "@/components/creative/magnetic-tooltip";
import { Sparkles } from "lucide-react";

export default function MagneticTooltipDemo() {
  return (
    <div className="w-full flex items-center justify-center min-h-[400px] bg-zinc-950 border border-white/10 rounded-xl p-8 overflow-hidden">
      
      <div className="flex gap-8">
        <MagneticTooltip content="I snap to your cursor!">
          <button className="px-8 py-4 bg-zinc-900 border border-zinc-800 rounded-xl text-white font-medium hover:bg-zinc-800 transition-colors">
            Hover Me
          </button>
        </MagneticTooltip>

        <MagneticTooltip 
          content={
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span>Physics are fun!</span>
            </div>
          }
          tooltipClassName="bg-blue-600 border-blue-500 shadow-[0_0_30px_rgba(37,99,235,0.4)]"
        >
          <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold cursor-crosshair shadow-lg">
            Area
          </div>
        </MagneticTooltip>
      </div>

    </div>
  );
}
