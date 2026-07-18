"use client";

import React from "react";
import { LiquidFluidShader } from "@/components/creative/liquid-fluid-shader";

export function LiquidFluidShaderDemo({ intensity = 1 }: { intensity?: number }) {
  return (
    <div className="w-full max-w-2xl mx-auto h-[400px]">
      <LiquidFluidShader 
        imageUrl="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
        intensity={intensity}
      />
    </div>
  );
}
