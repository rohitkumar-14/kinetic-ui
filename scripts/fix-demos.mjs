import fs from 'fs';
import path from 'path';

const demoDir = path.join(process.cwd(), 'components', 'creative', 'docs');

const demos = {
  'raymarching-clouds-demo.tsx': `"use client";

import React from "react";
import { RaymarchingClouds } from "@/components/creative/raymarching-clouds";

export function RaymarchingCloudsDemo({ speed = 1.0 }: { speed?: number }) {
  // Wait, RaymarchingClouds does not take speed prop in its implementation? 
  // Let's pass what we can or just render it. It takes color1 and color2.
  return (
    <div className="w-full h-[500px] flex items-center justify-center relative bg-black rounded-3xl overflow-hidden border border-white/10">
      <RaymarchingClouds color1="#4f46e5" color2="#db2777" className="absolute inset-0 z-0" />
      <div className="z-10 text-center pointer-events-none">
        <h2 className="text-4xl font-bold text-white tracking-tighter mix-blend-overlay">VOLUMETRIC</h2>
      </div>
    </div>
  );
}
`,

  'webcam-shader-portal-demo.tsx': `"use client";

import React from "react";
import { WebcamShaderPortal } from "@/components/creative/webcam-shader-portal";

export function WebcamShaderPortalDemo({ variant = "default" }: { variant?: 'default' | 'glitch' | 'matrix' }) {
  return (
    <div className="w-full h-[500px] flex items-center justify-center relative bg-black rounded-3xl overflow-hidden border border-white/10">
      <WebcamShaderPortal variant={variant} className="w-full h-full" />
    </div>
  );
}
`,

  'falling-elements-demo.tsx': `"use client";

import React from "react";
import { FallingElements } from "@/components/creative/falling-elements";

export function FallingElementsDemo({ gravity = 1 }: { gravity?: number }) {
  return (
    <div className="w-full h-[500px] flex items-center justify-center relative bg-zinc-950 rounded-3xl overflow-hidden border border-white/10">
      <FallingElements gravity={gravity} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 text-center">
         <p className="text-white/20 text-4xl font-black uppercase tracking-widest">Click to Drop</p>
      </div>
    </div>
  );
}
`,

  'multiplayer-cursor-ecosystem-demo.tsx': `"use client";

import React from "react";
import { MultiplayerCursorEcosystem } from "@/components/creative/multiplayer-cursor-ecosystem";
import { Button } from "@/components/ui/button";

export function MultiplayerCursorEcosystemDemo({ ghostMode = true }: { ghostMode?: boolean }) {
  return (
    <div className="w-full h-[500px] flex flex-col items-center justify-center relative bg-zinc-950 rounded-3xl overflow-hidden border border-white/10">
      <MultiplayerCursorEcosystem simulateCursors={ghostMode} activeUsers={3} />
      
      <div className="z-10 text-center max-w-sm flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-white tracking-tighter">Collaborative Cursors</h2>
        <p className="text-zinc-400 text-sm">Move your mouse around. Ghost users will follow along.</p>
        <Button variant="secondary" className="mx-auto cursor-pointer">Hover Me</Button>
      </div>
    </div>
  );
}
`,

  'infinite-zoom-canvas-demo.tsx': `"use client";

import React from "react";
import { InfiniteZoomCanvas } from "@/components/creative/infinite-zoom-canvas";

export function InfiniteZoomCanvasDemo({ showGrid = true }: { showGrid?: boolean }) {
  return (
    <div className="w-full h-[500px] flex items-center justify-center relative bg-[#0a0a0a] rounded-3xl overflow-hidden border border-white/10">
      <InfiniteZoomCanvas showGrid={showGrid} initialScale={1}>
        <div className="w-64 h-64 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-2xl">
          <p className="text-indigo-300 font-medium">Pan & Zoom Me</p>
        </div>
      </InfiniteZoomCanvas>
    </div>
  );
}
`
};

Object.keys(demos).forEach(filename => {
  const p = path.join(demoDir, filename);
  fs.writeFileSync(p, demos[filename]);
  console.log('Overwrote ' + filename);
});
