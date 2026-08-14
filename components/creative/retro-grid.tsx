"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface RetroGridProps {
  className?: string;
  angle?: number;
  gridSize?: number;
}

export function RetroGrid({
  className,
  angle = 60,
  gridSize = 60,
}: RetroGridProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden [perspective:200px]",
        className
      )}
    >
      {/* Grid Plane */}
      <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
        <div
          className={cn(
            "animate-retro-grid absolute inset-[0] w-[300vw] ml-[-100vw] h-[300vh] origin-[100%_0_0]",
            "bg-[linear-gradient(to_right,rgba(0,0,0,0.1)_1px,transparent_0),linear-gradient(to_bottom,rgba(0,0,0,0.1)_1px,transparent_0)]",
            "dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_0)]"
          )}
          style={{
            "--grid-angle": `${angle}deg`,
            backgroundSize: `${gridSize}px ${gridSize}px`,
          } as React.CSSProperties}
        />
      </div>

      {/* Vignette Fades */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent to-90%" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent to-20%" />
      
      {/* Global CSS for the infinite panning animation */}
      <style>{`
        @keyframes retro-grid {
          0% { transform: translateY(-${gridSize}px); }
          100% { transform: translateY(0); }
        }
        .animate-retro-grid {
          animation: retro-grid 2s linear infinite;
        }
      `}</style>
    </div>
  );
}
