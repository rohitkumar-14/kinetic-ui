"use client";

import { ParticleText } from "@/components/creative/particle-text";

export interface ParticleTextDemoProps {
  text?: string;
  fontSize?: number;
  particleSize?: number;
  mouseRadius?: number;
  pushForce?: number;
  particleColor?: string;
}

export function ParticleTextDemo({
  text = "SHATTER",
  fontSize = 150,
  particleSize = 2,
  mouseRadius = 120,
  pushForce = 4,
  particleColor = "#818cf8",
}: ParticleTextDemoProps) {
  return (
    <div className="w-full flex items-center justify-center min-h-[500px] bg-zinc-950 p-8 rounded-2xl border border-white/10">
      <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-2xl border border-white/5">
        
        {/* Helper Text */}
        <div className="absolute top-6 left-0 w-full text-center text-zinc-500 font-mono text-sm z-10 pointer-events-none">
          Move your mouse over the text to shatter it
        </div>

        {/* The Particle Component */}
        <ParticleText 
          key={`${text}-${fontSize}-${particleSize}-${mouseRadius}-${pushForce}-${particleColor}`}
          text={text}
          fontSize={fontSize}
          particleSize={particleSize}
          mouseRadius={mouseRadius}
          pushForce={pushForce}
          particleColor={particleColor}
          className="w-full h-full bg-zinc-950"
        />

        {/* Optional Grid Background for depth */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: `40px 40px`
          }}
        />
      </div>
    </div>
  );
}
