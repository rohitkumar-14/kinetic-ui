"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ConferenceTicketProps {
  name?: string;
  ticketNumber?: string;
  date?: string;
  type?: string;
  className?: string;
}

export function ConferenceTicket({
  name = "JANE DOE",
  ticketNumber = "#004092",
  date = "NOV 24, 2026",
  type = "VIP PASS",
  className,
}: ConferenceTicketProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [0, 1], [15, -15]);
  const rotateY = useTransform(springX, [0, 1], [-15, 15]);

  // Map mouse position to gradient coordinates for holographic effect
  const glareX = useTransform(springX, [0, 1], [0, 100]);
  const glareY = useTransform(springY, [0, 1], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width);
    y.set(mouseY / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <div className="perspective-[1500px] w-full max-w-sm mx-auto flex items-center justify-center p-8">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "relative w-[320px] h-[540px] rounded-2xl bg-zinc-950 border border-white/10 shadow-2xl overflow-hidden cursor-pointer",
          className
        )}
      >
        {/* Ticket Cutouts using CSS masks */}
        <div 
          className="absolute inset-0 z-0 bg-zinc-900"
          style={{
            maskImage: "radial-gradient(circle at 0px 350px, transparent 15px, black 16px), radial-gradient(circle at 100% 350px, transparent 15px, black 16px)",
            WebkitMaskImage: "radial-gradient(circle at -2px 350px, transparent 15px, black 16px), radial-gradient(circle at 322px 350px, transparent 15px, black 16px)",
          }}
        />

        {/* Dash Line */}
        <div className="absolute top-[350px] left-6 right-6 border-t-2 border-dashed border-white/20 z-10" />

        {/* Content */}
        <div className="absolute inset-0 z-10 flex flex-col pointer-events-none p-8">
          <div className="flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-12">
              <div className="flex gap-2 items-center">
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-black" />
                </div>
                <span className="font-bold tracking-widest text-sm text-white">KINETIC UI</span>
              </div>
              <span className="font-mono text-xs text-zinc-500 border border-zinc-800 px-2 py-1 rounded">{ticketNumber}</span>
            </div>

            <div className="mt-auto pb-4">
              <p className="text-zinc-500 font-mono text-sm tracking-widest mb-1">GUEST</p>
              <h2 className="text-3xl font-black text-white tracking-tighter uppercase">{name}</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4 mt-2">
              <div>
                <p className="text-zinc-500 font-mono text-[10px] tracking-widest mb-1">DATE</p>
                <p className="font-medium text-sm text-zinc-300">{date}</p>
              </div>
              <div>
                <p className="text-zinc-500 font-mono text-[10px] tracking-widest mb-1">TYPE</p>
                <p className="font-medium text-sm text-amber-400">{type}</p>
              </div>
            </div>
          </div>

          <div className="h-[150px] pt-12 flex flex-col items-center justify-end">
             {/* Fake Barcode */}
             <div className="w-full h-12 flex gap-1 bg-white p-2 rounded items-center opacity-80 mix-blend-screen">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div key={i} className="bg-black h-full" style={{ width: `${(Math.sin(i * 137) * 0.5 + 0.5) * 4 + 1}px` }} />
                ))}
             </div>
             <p className="mt-2 text-[10px] font-mono tracking-[0.3em] text-zinc-500">
               {ticketNumber.replace('#', '')} {Math.abs(ticketNumber.split('').reduce((a, b) => a + b.charCodeAt(0), 0) * 1234 % 10000).toString().padStart(4, '0')}
             </p>
          </div>
        </div>

        {/* Holographic Foil Layer */}
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none mix-blend-color-dodge opacity-60"
          style={{
            backgroundImage: useTransform(
              [glareX, glareY],
              ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(255,100,200,0.8) 0%, rgba(100,200,255,0.4) 30%, rgba(255,255,100,0.2) 60%, transparent 80%)`
            )
          }}
        />
        
        {/* Specular Highlight */}
        <motion.div
          className="absolute inset-0 z-30 pointer-events-none mix-blend-overlay opacity-50"
          style={{
            backgroundImage: useTransform(
              [glareX, glareY],
              ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.8) 0%, transparent 50%)`
            )
          }}
        />

        {/* Grain overlay for texture */}
        <div 
          className="absolute inset-0 z-40 opacity-20 mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}
        />
      </motion.div>
    </div>
  );
}
