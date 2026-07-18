"use client";

import React from "react";
import { SVGLiquidDistortion } from "@/components/creative/svg-liquid-distortion";
import { Sparkles, ArrowRight } from "lucide-react";

export interface SVGLiquidDistortionDemoProps {
  target?: "text" | "button" | "image";
  intensity?: number;
  frequency?: number;
  speed?: number;
}

export function SVGLiquidDistortionDemo({
  target = "text",
  intensity = 30,
  frequency = 0.015,
  speed = 1.5
}: SVGLiquidDistortionDemoProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[400px] py-12 bg-zinc-950 rounded-3xl border border-white/10 shadow-inner">
      
      {target === "text" && (
        <div className="text-center">
          <p className="text-zinc-500 font-mono text-sm mb-4 uppercase tracking-widest">Hover the text</p>
          <SVGLiquidDistortion key={`text-${intensity}-${frequency}-${speed}`} intensity={intensity} frequency={frequency} speed={speed}>
            <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 cursor-default select-none tracking-tighter drop-shadow-lg">
              MELTDOWN
            </h1>
          </SVGLiquidDistortion>
        </div>
      )}

      {target === "button" && (
        <div className="text-center">
          <p className="text-zinc-500 font-mono text-sm mb-4 uppercase tracking-widest">Hover the button</p>
          <SVGLiquidDistortion key={`button-${intensity}-${frequency}-${speed}`} intensity={intensity} frequency={frequency} speed={speed}>
            <button className="flex items-center gap-3 px-8 py-4 bg-white text-black font-black text-lg rounded-full hover:scale-105 transition-transform active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
              <Sparkles className="w-5 h-5" />
              Liquid Button
              <ArrowRight className="w-5 h-5" />
            </button>
          </SVGLiquidDistortion>
        </div>
      )}

      {target === "image" && (
        <div className="text-center flex flex-col items-center">
          <p className="text-zinc-500 font-mono text-sm mb-4 uppercase tracking-widest">Hover the image</p>
          <SVGLiquidDistortion key={`image-${intensity}-${frequency}-${speed}`} intensity={intensity} frequency={frequency} speed={speed}>
            <div className="relative w-[300px] h-[300px] rounded-3xl overflow-hidden shadow-2xl border-4 border-zinc-800">
              <img 
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop" 
                alt="Liquid Abstract" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <span className="text-white font-bold text-xl">Water Ripples</span>
              </div>
            </div>
          </SVGLiquidDistortion>
        </div>
      )}

    </div>
  );
}
