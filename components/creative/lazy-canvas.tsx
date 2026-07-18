"use client";

import React, { useRef } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface LazyCanvasProps {
  children: React.ReactNode;
  className?: string;
  fallback?: React.ReactNode;
  /** Distance outside the viewport to start rendering (e.g., "100px") */
  margin?: string;
}

export function LazyCanvas({
  children,
  className,
  fallback = <div className="w-full h-full bg-muted/20 animate-pulse rounded-lg" />,
  margin = "200px",
}: LazyCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    once: false,
    margin: margin as any, 
  });

  return (
    <div ref={containerRef} className={cn("relative w-full h-full", className)}>
      {isInView ? children : fallback}
    </div>
  );
}
