'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface HeroShimmerMeshProps {
  className?: string;
  title?: string;
  description?: string;
}

export function HeroShimmerMesh({
  className,
  title = "Fluid Shimmer Mesh",
  description = "A real-time animated gradient canvas with cursor ripple distortion physics.",
}: HeroShimmerMeshProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      t += 0.015;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Multi-layer animated gradient mesh
      const g1 = ctx.createRadialGradient(
        w * 0.3 + Math.sin(t) * 100,
        h * 0.4 + Math.cos(t * 0.8) * 80,
        50,
        w * 0.3,
        h * 0.4,
        w * 0.6
      );
      g1.addColorStop(0, 'rgba(99, 102, 241, 0.4)');
      g1.addColorStop(1, 'transparent');

      const g2 = ctx.createRadialGradient(
        w * 0.7 + Math.cos(t * 1.2) * 120,
        h * 0.6 + Math.sin(t * 0.9) * 90,
        50,
        w * 0.7,
        h * 0.6,
        w * 0.6
      );
      g2.addColorStop(0, 'rgba(236, 72, 153, 0.35)');
      g2.addColorStop(1, 'transparent');

      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);

      // Cursor ripple glow
      if (mouseRef.current.x > 0) {
        const ripple = ctx.createRadialGradient(
          mouseRef.current.x,
          mouseRef.current.y,
          0,
          mouseRef.current.x,
          mouseRef.current.y,
          200
        );
        ripple.addColorStop(0, 'rgba(168, 85, 247, 0.5)');
        ripple.addColorStop(1, 'transparent');
        ctx.fillStyle = ripple;
        ctx.fillRect(0, 0, w, h);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className={cn('relative min-h-[480px] w-full overflow-hidden bg-black text-white flex flex-col items-center justify-center p-8 rounded-3xl border border-zinc-800', className)}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      <div className="relative z-10 max-w-xl text-center space-y-4">
        <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white">{title}</h2>
        <p className="text-zinc-400 text-sm font-light leading-relaxed">{description}</p>
      </div>
    </section>
  );
}
