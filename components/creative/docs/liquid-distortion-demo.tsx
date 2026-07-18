"use client";

import { LiquidDistortion } from "@/components/creative/liquid-distortion";

export interface LiquidDistortionDemoProps {
  rippleAmount?: number;
  splitAmount?: number;
  speed?: number;
}

export function LiquidDistortionDemo({
  rippleAmount,
  splitAmount,
  speed
}: LiquidDistortionDemoProps) {
  return (
    <div className="w-full flex items-center justify-center py-12 px-4">
      <LiquidDistortion 
        imageUrl="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
        alt="Abstract Art"
        className="w-[400px] h-[500px]"
        rippleAmount={rippleAmount}
        splitAmount={splitAmount}
        speed={speed}
      />
    </div>
  );
}
