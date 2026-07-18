"use client";

import React, { useState, useRef } from "react";
import { Minimap } from "@/components/creative/minimap";
import { cn } from "@/lib/utils";

// Simulated board items scattered across a massive canvas
const BOARD_ITEMS = [
  { x: 100, y: 80, width: 240, height: 120, color: "#6366f1", label: "User Auth Flow", emoji: "🔐" },
  { x: 500, y: 200, width: 260, height: 140, color: "#ec4899", label: "Payment Gateway", emoji: "💳" },
  { x: 200, y: 400, width: 220, height: 100, color: "#22c55e", label: "API Layer", emoji: "⚡" },
  { x: 800, y: 100, width: 200, height: 130, color: "#f59e0b", label: "Dashboard UI", emoji: "📊" },
  { x: 700, y: 450, width: 250, height: 110, color: "#06b6d4", label: "Notifications", emoji: "🔔" },
  { x: 1100, y: 300, width: 230, height: 150, color: "#8b5cf6", label: "Analytics Engine", emoji: "📈" },
  { x: 1000, y: 600, width: 200, height: 120, color: "#ef4444", label: "Error Handling", emoji: "🛡️" },
  { x: 400, y: 650, width: 280, height: 100, color: "#14b8a6", label: "Cache Strategy", emoji: "🧊" },
  { x: 1300, y: 100, width: 240, height: 130, color: "#f97316", label: "CDN Config", emoji: "🌐" },
  { x: 1200, y: 550, width: 220, height: 110, color: "#a855f7", label: "ML Pipeline", emoji: "🤖" },
  { x: 100, y: 700, width: 200, height: 100, color: "#64748b", label: "Logging", emoji: "📝" },
  { x: 900, y: 750, width: 260, height: 120, color: "#0ea5e9", label: "WebSocket Hub", emoji: "🔌" },
];

const CANVAS_WIDTH = 1600;
const CANVAS_HEIGHT = 900;

export function MinimapDemo() {
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [isDraggingCanvas, setIsDraggingCanvas] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Get visible container size (we'll use fixed values for the demo)
  const containerWidth = 800;
  const containerHeight = 500;

  const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    // Only start drag if clicking directly on the canvas bg, not on a card
    if ((e.target as HTMLElement).closest("[data-card]")) return;
    setIsDraggingCanvas(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY, panX, panY };
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingCanvas) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;

    setPanX(clamp(dragStartRef.current.panX - dx, 0, CANVAS_WIDTH - containerWidth));
    setPanY(clamp(dragStartRef.current.panY - dy, 0, CANVAS_HEIGHT - containerHeight));
  };

  const handleCanvasMouseUp = () => {
    setIsDraggingCanvas(false);
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div className="text-center">
        <p className="text-zinc-400 text-sm font-mono">
          Drag the canvas <span className="text-white font-bold">or</span> drag inside the minimap to navigate.
        </p>
      </div>

      {/* Main Viewport */}
      <div
        ref={containerRef}
        className="relative w-full max-w-[800px] h-[500px] rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 shadow-2xl select-none"
        style={{ cursor: isDraggingCanvas ? "grabbing" : "grab" }}
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleCanvasMouseMove}
        onMouseUp={handleCanvasMouseUp}
        onMouseLeave={handleCanvasMouseUp}
      >
        {/* The massive virtual canvas */}
        <div
          className="absolute"
          style={{
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
            transform: `translate(${-panX}px, ${-panY}px)`,
            transition: isDraggingCanvas ? "none" : "transform 0.15s ease-out",
          }}
        >
          {/* Dot grid pattern */}
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />

          {/* Connection lines between some items */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {[
              [0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 6], [5, 9], [7, 2], [8, 5], [6, 11], [10, 7]
            ].map(([from, to], i) => {
              const a = BOARD_ITEMS[from];
              const b = BOARD_ITEMS[to];
              return (
                <line
                  key={i}
                  x1={a.x + a.width / 2}
                  y1={a.y + a.height / 2}
                  x2={b.x + b.width / 2}
                  y2={b.y + b.height / 2}
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth={2}
                  strokeDasharray="6 4"
                />
              );
            })}
          </svg>

          {/* Board cards */}
          {BOARD_ITEMS.map((item, i) => (
            <div
              key={i}
              data-card
              className="absolute rounded-xl border border-white/10 p-4 flex flex-col justify-between backdrop-blur-sm hover:border-white/25 transition-colors cursor-default"
              style={{
                left: item.x,
                top: item.y,
                width: item.width,
                height: item.height,
                backgroundColor: `${item.color}15`,
                boxShadow: `0 0 30px ${item.color}10`,
              }}
            >
              <div>
                <span className="text-2xl">{item.emoji}</span>
                <h4 className="text-white font-bold text-sm mt-2">{item.label}</h4>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: item.color }} />
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Active</span>
              </div>
            </div>
          ))}
        </div>

        {/* Minimap */}
        <Minimap
          canvasWidth={CANVAS_WIDTH}
          canvasHeight={CANVAS_HEIGHT}
          viewportX={panX}
          viewportY={panY}
          viewportWidth={containerWidth}
          viewportHeight={containerHeight}
          onViewportChange={(x, y) => {
            setPanX(x);
            setPanY(y);
          }}
          items={BOARD_ITEMS.map((item) => ({
            x: item.x,
            y: item.y,
            width: item.width,
            height: item.height,
            color: item.color + "99", // Semi-transparent
          }))}
          position="bottom-right"
          width={220}
          height={130}
        />
      </div>
    </div>
  );
}
