"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface FilmGrainProps extends React.HTMLAttributes<HTMLDivElement> {
  opacity?: number;
  intensity?: number;
  blendMode?: React.CSSProperties["mixBlendMode"];
}

export function FilmGrain({
  opacity = 0.05,
  intensity = 0.5,
  blendMode = "overlay",
  className,
  ...props
}: FilmGrainProps) {
  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-[9999] w-full h-full",
        className
      )}
      style={{
        opacity,
        mixBlendMode: blendMode,
        ...props.style,
      }}
      {...props}
    >
      {/* We use an inline SVG to generate noise programmatically, avoiding heavy image loads */}
      <svg className="absolute inset-0 w-full h-full opacity-100">
        <filter id="noiseFilter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency={intensity} 
            numOctaves="3" 
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}
