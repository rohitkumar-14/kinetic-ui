"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface FluidCursorTrailProps {
  className?: string;
  particleColors?: string[];
}

export function FluidCursorTrail({
  className,
  particleColors = ["#3b82f6", "#8b5cf6", "#ec4899", "#10b981"],
}: FluidCursorTrailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let animationFrameId: number;

    const resize = () => {
      // Use parent container size if possible, otherwise window
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    class Particle {
      x: number;
      y: number;
      size: number;
      color: string;
      speedX: number;
      speedY: number;
      life: number;
      maxLife: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 40 + 20; // 20-60px
        this.color = particleColors[Math.floor(Math.random() * particleColors.length)];
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.maxLife = Math.random() * 40 + 40; // 40-80 frames
        this.life = this.maxLife;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;
        // Shrink slightly
        if (this.size > 0.2) this.size -= 0.1;
      }

      draw() {
        if (!ctx) return;
        const alpha = Math.max(0, this.life / this.maxLife);
        
        ctx.save();
        ctx.globalAlpha = alpha * 0.5; // Max opacity 0.5 for smoky look
        ctx.globalCompositeOperation = "screen";
        
        // Draw soft glowing circle
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size
        );
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      
      // Spawn 2-3 particles per mouse move event
      for (let i = 0; i < 3; i++) {
        particles.push(new Particle(mouseX, mouseY));
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        if (particles[i].life <= 0 || particles[i].size <= 0) {
          particles.splice(i, 1);
          i--;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleColors]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none absolute inset-0 z-50", className)}
    />
  );
}
