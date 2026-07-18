'use client';

import React, { useRef } from 'react';
import { ContextCursor, CursorProvider, useCursor } from '@/components/creative/context-cursor';
import { Play, Eye, Maximize2 } from 'lucide-react';

// Wrapper component to provide context within the demo
export function ContextCursorDemo() {
  return (
    <CursorProvider>
      <ContextCursorDemoContent />
    </CursorProvider>
  );
}

function ContextCursorDemoContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setCursor, resetCursor } = useCursor();

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[500px] rounded-xl overflow-hidden border border-white/10 bg-zinc-950 p-8 flex flex-col items-center justify-center gap-8 cursor-none"
    >
      {/* The Cursor Component bound to the local container */}
      <ContextCursor containerRef={containerRef} />
      
      <div className="text-center mb-8 pointer-events-none">
        <h3 className="text-2xl font-bold text-white mb-2">Hover Over Elements</h3>
        <p className="text-zinc-400">Watch the cursor dynamically change state</p>
      </div>

      <div className="flex flex-wrap gap-6 items-center justify-center">
        {/* Video Play Button */}
        <div 
          className="w-48 h-32 bg-zinc-900 border border-white/10 rounded-lg flex items-center justify-center hover:bg-zinc-800 transition-colors"
          onMouseEnter={() => setCursor({ variant: "solid", size: 80, text: "Play", icon: <Play className="w-4 h-4" /> })}
          onMouseLeave={resetCursor}
        >
          <span className="text-zinc-500 font-medium pointer-events-none">Video Thumbnail</span>
        </div>

        {/* View Image Button */}
        <div 
          className="w-48 h-32 bg-zinc-900 border border-white/10 rounded-lg flex items-center justify-center hover:bg-zinc-800 transition-colors"
          onMouseEnter={() => setCursor({ variant: "solid", color: "#6366f1", size: 70, text: "View", icon: <Eye className="w-4 h-4" /> })}
          onMouseLeave={resetCursor}
        >
          <span className="text-zinc-500 font-medium pointer-events-none">Gallery Image</span>
        </div>

        {/* Expand Outline */}
        <div 
          className="w-48 h-32 bg-zinc-900 border border-white/10 rounded-lg flex items-center justify-center hover:bg-zinc-800 transition-colors"
          onMouseEnter={() => setCursor({ variant: "outline", color: "#ec4899", size: 100, icon: <Maximize2 className="w-6 h-6 text-pink-500" /> })}
          onMouseLeave={resetCursor}
        >
          <span className="text-zinc-500 font-medium pointer-events-none">Expandable</span>
        </div>
      </div>
    </div>
  );
}
