'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface InteractiveGridNoiseProps {
  className?: string;
  gridColor?: string;
}

export function InteractiveGridNoise({
  className,
  gridColor = 'rgba(99, 102, 241, 0.25)',
}: InteractiveGridNoiseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const step = 32;

      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let x = 0; x <= canvas.width; x += step) {
        ctx.beginPath();
        for (let y = 0; y <= canvas.height; y += step) {
          const dx = x - mx;
          const dy = y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const force = Math.max(0, (150 - dist) / 150);

          const px = x + (dx / (dist || 1)) * force * 15;
          const py = y + (dy / (dist || 1)) * force * 15;

          if (y === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [gridColor]);

  return (
    <div className={cn('relative min-h-[400px] w-full overflow-hidden bg-black rounded-3xl border border-zinc-800 flex items-center justify-center p-6 text-white', className)}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      <div className="relative z-10 text-center pointer-events-none">
        <h3 className="text-3xl font-black">Reactive Grid Mesh</h3>
        <p className="text-xs text-zinc-400 font-light mt-1">Move your cursor to warp space-time grid coordinates</p>
      </div>
    </div>
  );
}
