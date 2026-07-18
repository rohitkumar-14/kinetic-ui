"use client";

import { CircularText } from "@/components/creative/circular-text";

export interface CircularTextDemoProps {
  text?: string;
  radius?: number;
  baseVelocity?: number;
}

export function CircularTextDemo({
  text = "AWWWARDS WINNING DESIGN • ",
  radius = 200,
  baseVelocity = 0.5,
}: CircularTextDemoProps) {
  return (
    <div className="w-full relative h-[600px] rounded-2xl overflow-hidden border border-white/10 bg-zinc-950">
      <div className="absolute inset-0 overflow-y-auto no-scrollbar pointer-events-auto">
        <div className="h-[150vh] flex flex-col justify-center">
          
          <div className="absolute top-10 w-full text-center text-zinc-500 font-mono text-sm">
            Scroll to accelerate the spin &uarr; &darr;
          </div>
          
          <CircularText 
            key={`${text}-${radius}-${baseVelocity}`}
            text={text} 
            radius={radius} 
            baseVelocity={baseVelocity}
            className="sticky top-1/2 -translate-y-1/2"
          />

        </div>
      </div>
    </div>
  );
}
