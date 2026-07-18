"use client";

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface BoidsCanvasProps {
  className?: string;
  count?: number;
  color?: string;
}

export function BoidsCanvas({ className, count = 100, color = "#6366f1" }: BoidsCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    class Boid {
      x: number;
      y: number;
      vx: number;
      vy: number;
      speed: number = 2;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = Math.random() * 2 - 1;
        this.vy = Math.random() * 2 - 1;
      }

      update(boids: Boid[], mouse: {x: number, y: number, radius: number}) {
        let separation = { x: 0, y: 0 };
        let alignment = { x: 0, y: 0 };
        let cohesion = { x: 0, y: 0 };
        let total = 0;

        // Boids Algorithm
        for (let other of boids) {
          let d = Math.hypot(this.x - other.x, this.y - other.y);
          if (other !== this && d < 50) {
            separation.x += this.x - other.x;
            separation.y += this.y - other.y;
            alignment.x += other.vx;
            alignment.y += other.vy;
            cohesion.x += other.x;
            cohesion.y += other.y;
            total++;
          }
        }

        if (total > 0) {
          separation.x /= total;
          separation.y /= total;
          alignment.x /= total;
          alignment.y /= total;
          cohesion.x = cohesion.x / total - this.x;
          cohesion.y = cohesion.y / total - this.y;

          this.vx += (separation.x * 0.05) + (alignment.x * 0.05) + (cohesion.x * 0.01);
          this.vy += (separation.y * 0.05) + (alignment.y * 0.05) + (cohesion.y * 0.01);
        }

        // Mouse Avoidance
        let dx = this.x - mouse.x;
        let dy = this.y - mouse.y;
        let dist = Math.hypot(dx, dy);
        if (dist < mouse.radius) {
          this.vx += (dx / dist) * 0.5;
          this.vy += (dy / dist) * 0.5;
        }

        // Normalize speed
        let mag = Math.hypot(this.vx, this.vy);
        if (mag > this.speed) {
          this.vx = (this.vx / mag) * this.speed;
          this.vy = (this.vy / mag) * this.speed;
        }

        this.x += this.vx;
        this.y += this.vy;

        // Wrap edges
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw(ctx: CanvasRenderingContext2D) {
        const angle = Math.atan2(this.vy, this.vx);
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(angle);
        
        ctx.beginPath();
        ctx.moveTo(4, 0);
        ctx.lineTo(-4, 3);
        ctx.lineTo(-2, 0);
        ctx.lineTo(-4, -3);
        ctx.closePath();
        
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();
      }
    }

    const boids = Array.from({ length: count }, () => new Boid());
    const mouse = { x: -1000, y: -1000, radius: 100 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      for (let boid of boids) {
        boid.update(boids, mouse);
        boid.draw(ctx);
      }
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [count, color]);

  return (
    <canvas 
      ref={canvasRef} 
      className={cn("w-full h-full block bg-black", className)} 
    />
  );
}
