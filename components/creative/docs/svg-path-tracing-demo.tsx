"use client";

import React from "react";
import { SvgPathTracing } from "@/components/creative/svg-path-tracing";

// A complex geometric spiral path
const SPIRAL_PATH = "M 50 50 m -40 0 a 40 40 0 1 0 80 0 a 40 40 0 1 0 -80 0 m 10 0 a 30 30 0 1 0 60 0 a 30 30 0 1 0 -60 0 m 10 0 a 20 20 0 1 0 40 0 a 20 20 0 1 0 -40 0 m 10 0 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0";

export default function SvgPathTracingDemo() {
  return (
    <div className="w-full bg-background border border-border rounded-xl relative">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 z-10 text-center">
        <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest">SVG Path Tracing</p>
      </div>
      <SvgPathTracing 
        path={SPIRAL_PATH} 
        viewBox="0 0 100 100" 
        strokeWidth={1}
      />
    </div>
  );
}
