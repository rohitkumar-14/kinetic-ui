"use client";

import React, { useState } from "react";
import { SvgPathDraw } from "@/components/creative/svg-path-draw";
import { RefreshCw } from "lucide-react";

export default function SvgPathDrawDemo() {
  const [key, setKey] = useState(0);

  // A stylized signature-like path
  const signaturePath = "M 100 200 C 150 100, 200 100, 250 200 C 300 300, 350 300, 400 200 C 420 150, 450 150, 470 200 C 500 250, 550 250, 600 200 C 650 150, 700 150, 750 200";

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[400px] bg-zinc-950 border border-white/10 rounded-xl p-8 relative overflow-hidden">
      
      <div className="text-center z-10">
        <h2 className="text-2xl font-bold text-white mb-2">SVG Path Tracing</h2>
        <p className="text-zinc-400 max-w-sm mb-4">
          A buttery-smooth path drawing animation that triggers on scroll.
        </p>
        
        <button 
          onClick={() => setKey(prev => prev + 1)}
          className="flex items-center gap-2 mx-auto px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm font-medium"
        >
          <RefreshCw className="w-4 h-4" /> Replay Animation
        </button>
      </div>

      <div key={key} className="w-full max-w-3xl h-64 -mt-12 opacity-80 pointer-events-none">
        <SvgPathDraw 
          path={signaturePath} 
          strokeColor="#3b82f6" 
          strokeWidth={4} 
          duration={3} 
        />
      </div>

    </div>
  );
}
