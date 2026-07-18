"use client";

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface FluidCanvasProps {
  className?: string;
  colors?: string[];
  speed?: number;
}

export function FluidCanvas({ 
  className,
  colors = ['#4f46e5', '#ec4899', '#06b6d4'],
  speed = 1
}: FluidCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;
    let animationId: number;
    let time = 0;

    let mouse = { x: width / 2, y: height / 2, vx: 0, vy: 0 };
    let lastMouse = { x: width / 2, y: height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      lastMouse.x = mouse.x;
      lastMouse.y = mouse.y;
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.vx = mouse.x - lastMouse.x;
      mouse.vy = mouse.y - lastMouse.y;
    };

    window.addEventListener('mousemove', handleMouseMove);
    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const drawFluid = () => {
      time += 0.005 * speed;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "screen";

      // Draw interacting fluid orbs
      colors.forEach((color, i) => {
        const xOffset = Math.sin(time + i * 1.5) * (width * 0.3);
        const yOffset = Math.cos(time + i * 2.1) * (height * 0.3);
        
        // Mouse influence
        const dx = mouse.x - (width/2 + xOffset);
        const dy = mouse.y - (height/2 + yOffset);
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        // Pull towards mouse slightly
        let finalX = width/2 + xOffset;
        let finalY = height/2 + yOffset;
        
        if (dist < 300) {
          finalX += (dx / dist) * 50;
          finalY += (dy / dist) * 50;
        }

        const radius = (width * 0.4) + Math.sin(time * 2 + i) * 50;
        
        const gradient = ctx.createRadialGradient(
          finalX, finalY, 0,
          finalX, finalY, radius
        );
        
        gradient.addColorStop(0, `${color}88`);
        gradient.addColorStop(0.5, `${color}44`);
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(finalX, finalY, radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // Add a grain overlay
      ctx.globalCompositeOperation = "overlay";
      ctx.fillStyle = "rgba(255,255,255,0.02)";
      ctx.fillRect(0, 0, width, height);

      animationId = requestAnimationFrame(drawFluid);
    };

    drawFluid();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [colors, speed]);

  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-slate-950", className)}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full blur-[60px] scale-110"
      />
    </div>
  );
}
