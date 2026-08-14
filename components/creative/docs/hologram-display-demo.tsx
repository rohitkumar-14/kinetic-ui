"use client";

import React from "react";
import { HologramDisplay } from "@/components/creative/hologram-display";

export default function HologramDisplayDemo() {
  return (
    <div className="w-full flex items-center justify-center p-6 min-h-[700px] bg-background border border-border rounded-xl">
      <div className="w-full max-w-4xl">
        <HologramDisplay color="#06b6d4">
          
          {/* The UI inside the hologram */}
          <div className="w-full h-full bg-cyan-950/40 backdrop-blur-sm border border-cyan-500/50 rounded-2xl p-6 flex flex-col gap-6 text-cyan-50 shadow-[0_0_50px_rgba(6,182,212,0.2)]">
            <div className="flex justify-between items-center border-b border-cyan-500/30 pb-4">
              <h3 className="text-xl font-bold font-mono tracking-widest text-cyan-400">SYSTEM.CORE</h3>
              <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
            </div>
            
            <div className="flex-1 flex flex-col gap-4">
              <div className="w-full h-24 bg-cyan-900/30 rounded border border-cyan-500/20 flex items-center justify-center">
                <span className="font-mono text-cyan-500/50">DATA_STREAM_01</span>
              </div>
              <div className="w-full h-24 bg-cyan-900/30 rounded border border-cyan-500/20 flex items-center justify-center">
                <span className="font-mono text-cyan-500/50">DATA_STREAM_02</span>
              </div>
              
              <div className="mt-auto flex gap-4">
                <button className="flex-1 py-3 bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-500 text-cyan-400 font-mono text-sm rounded transition-colors">
                  INITIALIZE
                </button>
                <button className="flex-1 py-3 bg-transparent border border-cyan-500/30 hover:border-cyan-500 text-cyan-400/70 font-mono text-sm rounded transition-colors">
                  ABORT
                </button>
              </div>
            </div>
          </div>
          
        </HologramDisplay>
      </div>
    </div>
  );
}
