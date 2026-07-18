"use client";

import React, { useRef, useState, useEffect } from "react";
import { CustomCursor } from "@/components/creative/custom-cursor";
import { ArrowRight } from "lucide-react";

export function MagneticCursorDemo({ 
  color = "#a855f7", 
  variant = "dot",
  speed = 1,
  scale = 0.8
}: { 
  color?: string, 
  variant?: "dot" | "ring" | "glow" | "morph" | "magnet",
  speed?: number,
  scale?: number
}) {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full min-h-[500px] bg-slate-950 rounded-xl border border-white/10 relative overflow-hidden flex flex-col items-center justify-center p-8 custom-scrollbar"
    >
      {/* We mount the cursor specifically inside this demo for testing.
          In a real app, it would be mounted globally in layout.tsx */}
      {mounted && <CustomCursor color={color} variant={variant} speed={speed} scale={scale} />}

      <div className="max-w-2xl w-full space-y-12 z-10">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-white">Contextual Cursor Ecosystem</h2>
          <p className="text-zinc-400">Hover over the elements below to see the cursor adapt.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Play Video Example */}
          <div 
            className="group relative aspect-video bg-black rounded-lg overflow-hidden border border-white/10 cursor-none"
            data-cursor="play"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/40 to-purple-900/40 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-zinc-600 font-medium tracking-widest uppercase">Video Container</span>
            </div>
          </div>

          {/* View Image Example */}
          <div 
            className="group relative aspect-video bg-black rounded-lg overflow-hidden border border-white/10 cursor-none"
            data-cursor="view"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_100%)] opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-zinc-600 font-medium tracking-widest uppercase">Image Gallery</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          {/* Custom Text Example */}
          <button 
            className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white rounded-full border border-white/10 transition-colors cursor-none"
            data-cursor-text="Launch"
          >
            Deploy Project
          </button>

          {/* Link Example */}
          <a 
            href="#"
            className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors cursor-none p-4"
            data-cursor="link"
          >
            Read Documentation <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
