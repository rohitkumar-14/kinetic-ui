"use client";

import React from "react";
import { DraggableCanvas } from "@/components/creative/draggable-canvas";

export function DraggableCanvasDemo() {
  const nodes = [
    { id: 1, title: "Design System", x: 1200, y: 1100 },
    { id: 2, title: "User Flow", x: 1600, y: 1300 },
    { id: 3, title: "Architecture", x: 1300, y: 1500 },
    { id: 4, title: "Database", x: 1700, y: 1000 },
    { id: 5, title: "API Routes", x: 1000, y: 1350 },
  ];

  return (
    <div className="h-[500px] w-full overflow-hidden rounded-2xl border border-white/10">
      <DraggableCanvas canvasSize={3000} initialX={-900} initialY={-800}>
        {nodes.map((node) => (
          <div
            key={node.id}
            className="absolute flex h-32 w-48 flex-col items-center justify-center rounded-xl border border-white/10 bg-zinc-900/80 backdrop-blur-md shadow-2xl transition-colors hover:bg-zinc-800/80"
            style={{ left: node.x, top: node.y }}
          >
            <span className="text-sm font-semibold text-white">{node.title}</span>
            <span className="text-xs text-zinc-400 mt-2">Node {node.id}</span>
          </div>
        ))}
        
        {/* Draw a fake SVG line between nodes just for visual flair */}
        <svg className="absolute inset-0 h-full w-full pointer-events-none">
          <path 
            d={`M 1300 1150 Q 1450 1250 1600 1350`} 
            stroke="rgba(255,255,255,0.2)" 
            strokeWidth="2" 
            fill="none" 
            strokeDasharray="5,5" 
          />
          <path 
            d={`M 1400 1550 Q 1550 1450 1700 1050`} 
            stroke="rgba(255,255,255,0.2)" 
            strokeWidth="2" 
            fill="none" 
            strokeDasharray="5,5" 
          />
        </svg>
      </DraggableCanvas>
    </div>
  );
}
