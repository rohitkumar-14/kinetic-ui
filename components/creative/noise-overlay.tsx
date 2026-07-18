"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface NoiseOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  opacity?: number;
  baseFrequency?: number;
  numOctaves?: number;
  stitchTiles?: "stitch" | "noStitch";
  type?: "fractalNoise" | "turbulence";
  blendMode?: "normal" | "multiply" | "screen" | "overlay" | "darken" | "lighten" | "color-dodge" | "color-burn" | "hard-light" | "soft-light" | "difference" | "exclusion" | "hue" | "saturation" | "color" | "luminosity";
  blur?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
}

export function NoiseOverlay({
  opacity = 0.05,
  baseFrequency = 0.8,
  numOctaves = 3,
  stitchTiles = "stitch",
  type = "fractalNoise",
  blendMode = "overlay",
  blur = "none",
  className,
  ...props
}: NoiseOverlayProps) {
  
  const blurClasses = {
    none: "",
    sm: "backdrop-blur-sm",
    md: "backdrop-blur-md",
    lg: "backdrop-blur-lg",
    xl: "backdrop-blur-xl",
    "2xl": "backdrop-blur-2xl",
    "3xl": "backdrop-blur-3xl",
  };

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-50 h-full w-full",
        blurClasses[blur],
        className
      )}
      style={{ opacity }}
      {...props}
    >
      <svg
        className={`pointer-events-none absolute inset-0 h-full w-full opacity-100 mix-blend-${blendMode}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="noiseFilter">
          <feTurbulence
            type={type}
            baseFrequency={baseFrequency}
            numOctaves={numOctaves}
            stitchTiles={stitchTiles}
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}
