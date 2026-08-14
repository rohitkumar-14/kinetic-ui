"use client";

import React, { useRef } from "react";
import { GooeyCursor } from "@/components/creative/gooey-cursor";

export default function GooeyCursorDemo() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={containerRef}
      className="w-full h-[60vh] flex items-center justify-center bg-zinc-950 border border-border rounded-xl overflow-hidden relative cursor-none"
    >
      <div className="z-10 text-center pointer-events-none">
        <h2 className="text-3xl font-black text-white mb-4 mix-blend-difference">Gooey Cursor</h2>
        <p className="text-zinc-400 max-w-sm mix-blend-difference">
          Move your mouse around this box to see the SVG filter in action.
        </p>
      </div>

      <GooeyCursor containerRef={containerRef} />
    </div>
  );
}
