'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export interface HeroGlobe3DProps {
  className?: string;
  badgeText?: string;
  title?: string;
  description?: string;
  globeColor?: string;
  glowColor?: string;
}

export function HeroGlobe3D({
  className,
  badgeText = "3D WebGL Globe & Spatial Mesh",
  title = "Global Connected Infrastructure",
  description = "A real-time interactive 3D particle sphere with spatial rotation physics and luminous node highlights.",
  globeColor = "#6366f1",
  glowColor = "rgba(99, 102, 241, 0.4)",
}: HeroGlobe3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotationRef = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const previousMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const numPoints = 350;
    const radius = Math.min(width, height) * 0.32;
    const points: Array<{ x: number; y: number; z: number; baseR: number }> = [];

    // Fibonacci sphere distribution for uniform 3D surface points
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      points.push({ x: x * radius, y: y * radius, z: z * radius, baseR: radius });
    }

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Auto-rotation around Y axis
      if (!isDragging.current) {
        rotationRef.current.y += 0.005;
      }

      const rx = rotationRef.current.x;
      const ry = rotationRef.current.y;

      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);

      const center = { x: width / 2, y: height / 2 };

      // Render glowing atmosphere background
      const grad = ctx.createRadialGradient(
        center.x,
        center.y,
        radius * 0.2,
        center.x,
        center.y,
        radius * 1.4
      );
      grad.addColorStop(0, glowColor);
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(center.x, center.y, radius * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // Transform and project points
      const projected = points.map((p) => {
        // Rotate around Y
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.x * sinY + p.z * cosY;

        // Rotate around X
        let y2 = p.y * cosX - z1 * sinX;
        let z2 = p.y * sinX + z1 * cosX;

        const alpha = Math.max(0.1, (z2 + radius) / (2 * radius));
        const px = center.x + x1;
        const py = center.y + y2;

        return { px, py, z: z2, alpha };
      });

      // Draw connecting mesh lines between close front-facing points
      ctx.lineWidth = 0.5;
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        if (p1.z < -20) continue;

        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];
          if (p2.z < -20) continue;

          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const distSq = dx * dx + dy * dy;

          if (distSq < 3200) {
            const lineAlpha = (1 - distSq / 3200) * 0.25 * p1.alpha;
            ctx.strokeStyle = `rgba(99, 102, 241, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.stroke();
          }
        }
      }

      // Render 3D node points
      projected.forEach((p) => {
        const pRadius = (p.z + radius) / (2 * radius) * 2.5 + 0.8;
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = globeColor;
        ctx.beginPath();
        ctx.arc(p.px, p.py, pRadius, 0, Math.PI * 2);
        ctx.fill();

        // Highlight brighter outer nodes
        if (p.alpha > 0.75) {
          ctx.shadowColor = globeColor;
          ctx.shadowBlur = 8;
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(p.px, p.py, pRadius * 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      previousMouse.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - previousMouse.current.x;
      const dy = e.clientY - previousMouse.current.y;

      rotationRef.current.y += dx * 0.005;
      rotationRef.current.x += dy * 0.005;

      previousMouse.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging.current = false;
    };

    const targetCanvas = canvas;
    targetCanvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      targetCanvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [globeColor, glowColor]);

  return (
    <section className={cn('relative min-h-[500px] w-full overflow-hidden bg-black text-white flex flex-col items-center justify-center p-6 rounded-3xl border border-zinc-800', className)}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
      />
      <div className="relative z-10 max-w-xl text-center space-y-4 pointer-events-none">
        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 rounded-full border border-indigo-500/20">
          {badgeText}
        </span>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
          {title}
        </h2>
        <p className="text-zinc-400 text-sm font-light leading-relaxed">
          {description}
        </p>
      </div>
    </section>
  );
}
