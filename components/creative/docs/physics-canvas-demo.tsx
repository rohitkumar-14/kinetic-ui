"use client";

import React, { useEffect, useState } from "react";
import { PhysicsCanvas, PhysicsItem } from "@/components/creative/physics-canvas";

export function PhysicsCanvasDemo() {
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch since we rely on screen coordinates
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-[600px] w-full bg-[#f4f4f5] rounded-3xl animate-pulse" />;

  return (
    <div className="w-full h-[600px] rounded-3xl overflow-hidden border border-zinc-200 relative bg-[#f4f4f5] shadow-inner">
      <div className="absolute top-8 left-8 z-0 pointer-events-none">
        <h2 className="text-4xl font-black text-zinc-300 tracking-tighter uppercase">Team Whiteboard</h2>
        <p className="text-zinc-400 font-mono text-sm mt-2">Grab elements and throw them around.</p>
      </div>

      <PhysicsCanvas className="w-full h-full z-10" gravity={{ x: 0, y: 0 }}>
        {/* Sticky Note 1 */}
        <PhysicsItem 
          x={200} y={150} 
          width={180} height={180}
          restitution={0.6}
          className="bg-yellow-200 rounded-lg shadow-lg flex flex-col p-4 rotate-[-5deg]"
        >
          <div className="w-full h-4 bg-yellow-300/50 mb-2 rounded-sm" />
          <p className="font-mono text-xs text-yellow-900 leading-relaxed font-medium">
            Remember to check the deployment logs before pushing to production!
          </p>
          <div className="mt-auto flex justify-between">
            <span className="text-[10px] text-yellow-800 font-bold">@sarah</span>
          </div>
        </PhysicsItem>

        {/* Sticky Note 2 */}
        <PhysicsItem 
          x={400} y={250} 
          width={180} height={180}
          restitution={0.6}
          className="bg-blue-200 rounded-lg shadow-lg flex flex-col p-4 rotate-[3deg]"
        >
          <div className="w-full h-4 bg-blue-300/50 mb-2 rounded-sm" />
          <p className="font-mono text-xs text-blue-900 leading-relaxed font-medium">
            Update the hero section typography to use variable fonts.
          </p>
          <div className="mt-auto flex justify-between">
            <span className="text-[10px] text-blue-800 font-bold">@mike</span>
          </div>
        </PhysicsItem>

        {/* Circular Image */}
        <PhysicsItem 
          x={500} y={100} 
          width={120} height={120}
          shape="circle"
          restitution={0.9} // Bouncy!
          className="rounded-full overflow-hidden shadow-xl border-4 border-white"
        >
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" 
            alt="Avatar"
            className="w-full h-full object-cover pointer-events-none"
          />
        </PhysicsItem>

        {/* Heavy Block */}
        <PhysicsItem 
          x={150} y={400} 
          width={300} height={100}
          density={0.05} // Heavy!
          restitution={0.2}
          className="bg-zinc-900 rounded-xl shadow-2xl flex items-center justify-center border border-zinc-700"
        >
          <span className="text-white font-black tracking-widest uppercase text-xl pointer-events-none">
            HEAVY BLOCK
          </span>
        </PhysicsItem>
        
        {/* Playful Circle */}
        <PhysicsItem 
          x={650} y={350} 
          width={100} height={100}
          shape="circle"
          restitution={1.1} // Extremely Bouncy
          density={0.0001} // Light
          className="bg-emerald-400 rounded-full shadow-lg flex items-center justify-center border-4 border-emerald-300"
        >
          <span className="text-emerald-900 font-bold text-sm pointer-events-none">BOUNCE</span>
        </PhysicsItem>

      </PhysicsCanvas>
    </div>
  );
}
