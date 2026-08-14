"use client";

import { WebGLRibbonBg } from "@/components/creative/webgl-ribbon-bg";
import { Button } from "@/components/ui/button";

export default function WebGLRibbonBgDemo() {
  return (
    <div className="relative w-full h-[600px] rounded-xl overflow-hidden flex items-center justify-center">
      <WebGLRibbonBg 
        color1="#4f46e5" 
        color2="#db2777" 
        color3="#06b6d4"
        speed={0.4}
        distortion={1.2}
      />
      
      <div className="z-10 flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4 drop-shadow-lg">
          Dynamic WebGL Ribbon
        </h1>
        <p className="text-zinc-200 text-lg md:text-xl font-light max-w-lg mb-8 drop-shadow">
          A high-performance GLSL shader background commonly used in premium enterprise landing pages.
        </p>
        <div className="flex gap-4">
          <Button variant="default" className="bg-white text-black hover:bg-zinc-200 rounded-full px-8">
            Get Started
          </Button>
          <Button variant="outline" className="rounded-full px-8 border-white/20 text-white hover:bg-white/10 backdrop-blur-md">
            View Documentation
          </Button>
        </div>
      </div>
    </div>
  );
}
