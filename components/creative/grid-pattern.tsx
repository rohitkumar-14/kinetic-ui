"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface GridPatternProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "dots" | "lines";
  size?: number;
  color?: string;
  fadeEdge?: boolean;
}

export function GridPattern({
  type = "lines",
  size = 40,
  color = "rgba(255,255,255,0.05)",
  fadeEdge = true,
  className,
  ...props
}: GridPatternProps) {
  
  const getPattern = () => {
    if (type === "dots") {
      return {
        backgroundImage: `radial-gradient(${color} 1.5px, transparent 1.5px)`,
        backgroundSize: `${size}px ${size}px`,
      };
    }
    
    // Lines
    return {
      backgroundImage: `
        linear-gradient(to right, ${color} 1px, transparent 1px),
        linear-gradient(to bottom, ${color} 1px, transparent 1px)
      `,
      backgroundSize: `${size}px ${size}px`,
    };
  };

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 w-full h-full z-0",
        className
      )}
      style={{
        ...getPattern(),
        maskImage: fadeEdge 
          ? "radial-gradient(ellipse at center, black, transparent 80%)"
          : "none",
        WebkitMaskImage: fadeEdge 
          ? "radial-gradient(ellipse at center, black, transparent 80%)"
          : "none",
        ...props.style,
      }}
      {...props}
    />
  );
}
