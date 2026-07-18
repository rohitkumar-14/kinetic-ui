"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface MinimapProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The total width of the virtual canvas (in px) */
  canvasWidth: number;
  /** The total height of the virtual canvas (in px) */
  canvasHeight: number;
  /** The current scroll/pan offset X of the main viewport */
  viewportX: number;
  /** The current scroll/pan offset Y of the main viewport */
  viewportY: number;
  /** The visible width of the main viewport (container width) */
  viewportWidth: number;
  /** The visible height of the main viewport (container height) */
  viewportHeight: number;
  /** Callback when the user drags the viewport box inside the minimap */
  onViewportChange?: (x: number, y: number) => void;
  /** Width of the minimap widget in px */
  width?: number;
  /** Height of the minimap widget in px */
  height?: number;
  /** Items to render as dots/rectangles on the minimap */
  items?: { x: number; y: number; width: number; height: number; color?: string }[];
  /** Position of the minimap on screen */
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
}

export function Minimap({
  canvasWidth,
  canvasHeight,
  viewportX,
  viewportY,
  viewportWidth,
  viewportHeight,
  onViewportChange,
  width = 200,
  height = 150,
  items = [],
  position = "bottom-right",
  className,
  ...props
}: MinimapProps) {
  const minimapRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Scale factors: how many canvas pixels map to 1 minimap pixel
  const scaleX = width / canvasWidth;
  const scaleY = height / canvasHeight;

  // Viewport rectangle dimensions on the minimap
  const vpW = viewportWidth * scaleX;
  const vpH = viewportHeight * scaleY;
  const vpX = viewportX * scaleX;
  const vpY = viewportY * scaleY;

  // Convert a minimap click/drag position to canvas coordinates
  const minimapToCanvas = useCallback(
    (clientX: number, clientY: number) => {
      if (!minimapRef.current) return;
      const rect = minimapRef.current.getBoundingClientRect();
      const mx = clientX - rect.left;
      const my = clientY - rect.top;

      // Center the viewport on the click point
      const canvasX = mx / scaleX - viewportWidth / 2;
      const canvasY = my / scaleY - viewportHeight / 2;

      // Clamp to canvas bounds
      const clampedX = Math.max(0, Math.min(canvasWidth - viewportWidth, canvasX));
      const clampedY = Math.max(0, Math.min(canvasHeight - viewportHeight, canvasY));

      onViewportChange?.(clampedX, clampedY);
    },
    [scaleX, scaleY, viewportWidth, viewportHeight, canvasWidth, canvasHeight, onViewportChange]
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    minimapToCanvas(e.clientX, e.clientY);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      minimapToCanvas(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, minimapToCanvas]);

  const positionClasses = {
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
  };

  return (
    <div
      ref={minimapRef}
      onMouseDown={handleMouseDown}
      className={cn(
        "absolute z-50 rounded-xl overflow-hidden border border-white/15 bg-zinc-950/80 backdrop-blur-xl shadow-2xl cursor-crosshair select-none",
        positionClasses[position],
        isDragging && "ring-2 ring-indigo-500/50",
        className
      )}
      style={{ width, height }}
      {...props}
    >
      {/* Grid lines for visual reference */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
        viewBox={`0 0 ${width} ${height}`}
      >
        {/* Vertical grid lines */}
        {Array.from({ length: 5 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={(width / 5) * (i + 1)}
            y1={0}
            x2={(width / 5) * (i + 1)}
            y2={height}
            stroke="white"
            strokeWidth={0.5}
          />
        ))}
        {/* Horizontal grid lines */}
        {Array.from({ length: 4 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1={0}
            y1={(height / 4) * (i + 1)}
            x2={width}
            y2={(height / 4) * (i + 1)}
            stroke="white"
            strokeWidth={0.5}
          />
        ))}
      </svg>

      {/* Render items as colored rectangles */}
      {items.map((item, i) => (
        <div
          key={i}
          className="absolute rounded-sm pointer-events-none"
          style={{
            left: item.x * scaleX,
            top: item.y * scaleY,
            width: Math.max(item.width * scaleX, 3),
            height: Math.max(item.height * scaleY, 3),
            backgroundColor: item.color || "rgba(99, 102, 241, 0.6)",
          }}
        />
      ))}

      {/* Viewport indicator */}
      <div
        className="absolute rounded-md border-2 border-white/60 bg-white/5 transition-[left,top] duration-75 ease-out"
        style={{
          left: vpX,
          top: vpY,
          width: Math.max(vpW, 8),
          height: Math.max(vpH, 6),
        }}
      />

      {/* Minimap label */}
      <div className="absolute top-1.5 left-2 text-[9px] font-mono font-bold text-white/30 uppercase tracking-widest pointer-events-none">
        Minimap
      </div>
    </div>
  );
}
