"use client";

import React, { useRef, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ScratchCardRevealProps {
  code?: string;
  className?: string;
}

export function ScratchCardReveal({
  code = "KINETIC-50-OFF",
  className,
}: ScratchCardRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Fill cover layer
    ctx.fillStyle = "#27272a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#71717a";
    ctx.font = "bold 14px monospace";
    ctx.textAlign = "center";
    ctx.fillText("SCRATCH HERE TO REVEAL", canvas.width / 2, canvas.height / 2 + 5);

    let isScratching = false;

    const scratch = (x: number, y: number) => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fill();
    };

    const handleMove = (e: MouseEvent) => {
      if (!isScratching) return;
      const rect = canvas.getBoundingClientRect();
      scratch(e.clientX - rect.left, e.clientY - rect.top);
    };

    canvas.addEventListener("mousedown", () => (isScratching = true));
    window.addEventListener("mouseup", () => (isScratching = false));
    canvas.addEventListener("mousemove", handleMove);

    return () => {
      canvas.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <div className={cn("relative w-80 h-48 rounded-3xl bg-indigo-600 border border-white/20 p-6 flex flex-col items-center justify-center shadow-2xl overflow-hidden select-none", className)}>
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-5 h-5 text-amber-300" />
        <span className="text-white font-black text-lg tracking-wider">SECRET REWARD</span>
      </div>
      <div className="px-4 py-2 bg-black/40 rounded-xl border border-white/20 font-mono font-bold text-white text-xl tracking-widest">
        {code}
      </div>

      {/* Scratch Canvas Overlay */}
      <canvas ref={canvasRef} width={320} height={192} className="absolute inset-0 w-full h-full cursor-pointer" />
    </div>
  );
}
