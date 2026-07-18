"use client";

import React from "react";
import { MagnifyingGlass } from "@/components/creative/magnifying-glass";
import { LayoutGrid, FileCode2 } from "lucide-react";

export interface MagnifyingGlassDemoProps {
  lensSize?: number;
  smoothing?: number;
}

export function MagnifyingGlassDemo({
  lensSize = 250,
  smoothing = 0.1
}: MagnifyingGlassDemoProps) {
  return (
    <div className="w-full flex justify-center py-20">
      <MagnifyingGlass
        key={`${lensSize}-${smoothing}`}
        lensSize={lensSize}
        smoothing={smoothing}
        className="w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-white/10"
        mainContent={
          <div className="w-full bg-zinc-950 p-12 flex flex-col items-center justify-center text-center">
            <LayoutGrid className="w-16 h-16 text-indigo-500 mb-6" />
            <h2 className="text-5xl font-black text-white mb-4 tracking-tighter">Beautiful UI</h2>
            <p className="text-zinc-400 text-lg max-w-sm mb-8">
              This is what your users see. Clean, minimal, and highly polished interfaces. Hover to reveal the underlying structure.
            </p>
            <div className="flex gap-4">
              <div className="w-32 h-10 bg-indigo-500 rounded-full" />
              <div className="w-32 h-10 bg-zinc-800 rounded-full" />
            </div>
          </div>
        }
        lensContent={
          <div className="w-full h-full bg-emerald-950 p-12 flex flex-col items-center justify-center text-center font-mono relative">
            {/* Grid background for the code view */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98120_1px,transparent_1px),linear-gradient(to_bottom,#10b98120_1px,transparent_1px)] bg-[size:20px_20px]" />
            
            <div className="relative z-10 flex flex-col items-center">
              <FileCode2 className="w-16 h-16 text-emerald-400 mb-6" />
              <h2 className="text-5xl font-black text-emerald-400 mb-4 tracking-tighter">&lt;Code /&gt;</h2>
              <p className="text-emerald-500/70 text-sm max-w-sm mb-8 text-left">
                {`function Button() {
  return (
    <motion.button 
      className="bg-indigo-500"
      whileHover={{ scale: 1.05 }}
    />
  )
}`}
              </p>
              <div className="flex gap-4">
                <div className="w-32 h-10 border-2 border-emerald-500 border-dashed rounded-full flex items-center justify-center text-emerald-500 text-xs">Primary</div>
                <div className="w-32 h-10 border-2 border-emerald-500 border-dashed rounded-full flex items-center justify-center text-emerald-500 text-xs">Secondary</div>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}
