"use client";

import { InteractiveFluid } from "@/components/creative/interactive-fluid";

export interface InteractiveFluidDemoProps {
  color1?: string;
  color2?: string;
}

export function InteractiveFluidDemo({
  color1 = "#1e1b4b",
  color2 = "#38bdf8"
}: InteractiveFluidDemoProps) {
  return (
    <div className="relative w-full h-[500px] rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center">
      <InteractiveFluid key={`${color1}-${color2}`} color1={color1} color2={color2} />
      
      <div className="relative z-10 pointer-events-none text-center">
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mix-blend-difference">
          Move Your Cursor
        </h2>
        <p className="mt-4 text-zinc-300 font-medium text-lg mix-blend-difference">
          Interact with the fluid background
        </p>
      </div>
    </div>
  );
}
