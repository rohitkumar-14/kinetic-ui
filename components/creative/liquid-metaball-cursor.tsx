"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface LiquidMetaballCursorProps {
  color?: string;
  className?: string;
}

export function LiquidMetaballCursor({
  color = "#818cf8",
  className,
}: LiquidMetaballCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    let pos = { x: canvas.width / 2, y: canvas.height / 2 };

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    canvas.parentElement?.addEventListener("mousemove", handleMove);

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pos.x += (mouse.x - pos.x) * 0.1;
      pos.y += (mouse.y - pos.y) * 0.1;

      ctx.save();
      ctx.filter = "blur(12px)";
      ctx.fillStyle = color;

      // Metaball 1 (Main)
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 24, 0, Math.PI * 2);
      ctx.fill();

      // Metaball 2 (Trailer)
      ctx.beginPath();
      ctx.arc(pos.x + (mouse.x - pos.x) * 0.5, pos.y + (mouse.y - pos.y) * 0.5, 16, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      canvas.parentElement?.removeEventListener("mousemove", handleMove);
    };
  }, [color]);

  return (
    <div className={cn("relative w-full h-[350px] bg-black rounded-3xl overflow-hidden flex items-center justify-center border border-white/10", className)}>
      <canvas ref={canvasRef} width={600} height={350} className="absolute inset-0 w-full h-full pointer-events-none" />
      <span className="text-zinc-500 font-mono text-xs z-10 pointer-events-none uppercase tracking-widest">
        Move Cursor Inside Container
      </span>
    </div>
  );
}
