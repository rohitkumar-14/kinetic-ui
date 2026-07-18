"use client";

import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/creative/magnetic-button";
import { ArrowRight, Terminal } from "lucide-react";
import Link from "next/link";

export type GravityGridHeroVariant = "dots" | "lines";

interface GravityGridHeroProps {
  variant?: GravityGridHeroVariant;
  badgeText?: string;
  title?: string;
  description?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  className?: string;
}

export function GravityGridHero({
  variant = "dots",
  badgeText = "Creative Hero Section",
  title = "Gravity Grid",
  description = "A highly interactive hero section powered by raw canvas physics. Move your cursor to repel the grid in real-time.",
  primaryCtaText = "Start Building",
  primaryCtaHref = "#",
  secondaryCtaText = "View Source",
  secondaryCtaHref = "#",
  className,
}: GravityGridHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, radius: 150 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let grid: Point[] = [];
    let animationFrameId: number;

    const SPACING = variant === "dots" ? 25 : 30;

    class Point {
      x: number;
      y: number;
      originX: number;
      originY: number;
      vx: number;
      vy: number;
      friction: number;
      springFactor: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.originX = x;
        this.originY = y;
        this.vx = 0;
        this.vy = 0;
        this.friction = 0.85;
        this.springFactor = 0.05;
      }

      update(mouseX: number, mouseY: number, radius: number) {
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Repel from mouse
        if (distance < radius) {
          const force = (radius - distance) / radius;
          const angle = Math.atan2(dy, dx);
          
          this.vx += Math.cos(angle) * force * 5;
          this.vy += Math.sin(angle) * force * 5;
        }

        // Spring back to origin
        this.vx += (this.originX - this.x) * this.springFactor;
        this.vy += (this.originY - this.y) * this.springFactor;

        this.vx *= this.friction;
        this.vy *= this.friction;

        this.x += this.vx;
        this.y += this.vy;
      }
    }

    const initGrid = () => {
      grid = [];
      const cols = Math.floor(width / SPACING) + 2;
      const rows = Math.floor(height / SPACING) + 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          grid.push(new Point(i * SPACING, j * SPACING));
        }
      }
    };

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width;
      canvas.height = height;
      initGrid();
    };

    const drawLines = () => {
      ctx.beginPath();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;

      const cols = Math.floor(width / SPACING) + 2;
      const rows = Math.floor(height / SPACING) + 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const index = i * rows + j;
          const p = grid[index];

          if (i < cols - 1) {
            const rightP = grid[(i + 1) * rows + j];
            if (rightP) {
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(rightP.x, rightP.y);
            }
          }
          if (j < rows - 1) {
            const bottomP = grid[i * rows + (j + 1)];
            if (bottomP) {
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(bottomP.x, bottomP.y);
            }
          }
        }
      }
      ctx.stroke();
    };

    const drawDots = () => {
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      for (let i = 0; i < grid.length; i++) {
        const p = grid[i];
        
        // Calculate speed/velocity to increase dot size when moving fast
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const radius = Math.min(Math.max(1, speed * 0.5), 3);

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.1;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.1;

      for (let i = 0; i < grid.length; i++) {
        grid[i].update(mouseRef.current.x, mouseRef.current.y, mouseRef.current.radius);
      }

      if (variant === "lines") {
        drawLines();
      } else {
        drawDots();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      // Move target far away so repulsion stops cleanly
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    // Initialization
    resize();
    mouseRef.current.x = width / 2;
    mouseRef.current.y = height / 2;
    mouseRef.current.targetX = width / 2;
    mouseRef.current.targetY = height / 2;
    
    render();

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(container);

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    return () => {
      resizeObserver.disconnect();
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [variant]);

  return (
    <section
      ref={containerRef}
      className={cn(
        "@container relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-zinc-950 text-white",
        className
      )}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 h-full w-full opacity-60"
        style={{ filter: variant === "lines" ? "blur(1px)" : "blur(0px)" }}
      />
      
      {/* Heavy gradient mask to fade grid at the edges */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(9,9,11,1)_90%)] pointer-events-none" />

      <div className="z-10 flex flex-col items-center text-center px-4 max-w-4xl select-none pointer-events-none">
        
        <div className="pointer-events-auto inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-medium mb-8 backdrop-blur-md shadow-xl hover:bg-white/10 transition-colors">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{badgeText}</span>
        </div>

        <h1 className="text-5xl @md:text-7xl @2xl:text-8xl font-bold tracking-tighter leading-[1.1] mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
          {title}
        </h1>

        <p className="max-w-2xl text-lg @md:text-xl text-zinc-400 mb-10 font-light leading-relaxed">
          {description}
        </p>

        <div className="flex flex-wrap gap-4 items-center justify-center pointer-events-auto">
          <Link href={primaryCtaHref}>
            <MagneticButton className="h-12 px-8 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition-colors">
              {primaryCtaText} <ArrowRight className="ml-2 h-4 w-4" />
            </MagneticButton>
          </Link>
          <Link href={secondaryCtaHref}>
            <MagneticButton className="h-12 px-8 rounded-full border border-white/10 bg-transparent text-white font-medium hover:bg-white/5 transition-colors">
              <Terminal className="mr-2 h-4 w-4" /> {secondaryCtaText}
            </MagneticButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
