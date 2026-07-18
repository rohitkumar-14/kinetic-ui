"use client";

import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface ParticleTextProps {
  text: string;
  fontSize?: number;
  fontFamily?: string;
  particleSize?: number;
  particleColor?: string;
  mouseRadius?: number;
  pushForce?: number;
  className?: string;
}

class Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
  ease: number;
  friction: number;
  dx: number;
  dy: number;
  distance: number;
  force: number;
  angle: number;

  constructor(x: number, y: number, size: number, color: string) {
    this.x = x + Math.random() * 20 - 10;
    this.y = y + Math.random() * 20 - 10;
    this.originX = x;
    this.originY = y;
    this.size = size;
    this.color = color;
    this.vx = 0;
    this.vy = 0;
    this.ease = 0.1;
    this.friction = 0.95;
    this.dx = 0;
    this.dy = 0;
    this.distance = 0;
    this.force = 0;
    this.angle = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  update(mouse: { x: number; y: number; radius: number; pushForce: number }) {
    // Mouse repulsion logic
    this.dx = mouse.x - this.x;
    this.dy = mouse.y - this.y;
    this.distance = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    this.force = -mouse.radius / this.distance;

    if (this.distance < mouse.radius) {
      this.angle = Math.atan2(this.dy, this.dx);
      this.vx += this.force * Math.cos(this.angle) * mouse.pushForce;
      this.vy += this.force * Math.sin(this.angle) * mouse.pushForce;
    }

    // Spring back to origin logic
    this.x += (this.originX - this.x) * this.ease;
    this.y += (this.originY - this.y) * this.ease;

    // Apply velocity and friction
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= this.friction;
    this.vy *= this.friction;
  }
}

export function ParticleText({
  text,
  fontSize = 120,
  fontFamily = "Inter, sans-serif",
  particleSize = 1.5,
  particleColor = "#ffffff",
  mouseRadius = 100,
  pushForce = 2,
  className,
}: ParticleTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const mouseRef = useRef({ x: -1000, y: -1000, radius: mouseRadius, pushForce });

  useEffect(() => {
    // Update mouse config if props change
    mouseRef.current.radius = mouseRadius;
    mouseRef.current.pushForce = pushForce;
  }, [mouseRadius, pushForce]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Resize canvas to match its display size exactly
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    setDimensions({ width: rect.width, height: rect.height });

    // 1. Draw Text to canvas
    ctx.fillStyle = "white"; // Temporarily draw text to read pixels
    ctx.font = `900 ${fontSize}px ${fontFamily}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    // 2. Read pixels
    const textCoordinates = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 3. Create Particles
    const particlesArray: Particle[] = [];
    const step = Math.max(3, Math.floor(particleSize * 2)); // Adjust step size based on particle size to prevent overlapping or too many particles

    for (let y = 0, y2 = textCoordinates.height; y < y2; y += step) {
      for (let x = 0, x2 = textCoordinates.width; x < x2; x += step) {
        const index = (y * 4 * textCoordinates.width) + (x * 4) + 3;
        const alpha = textCoordinates.data[index];
        if (alpha > 128) {
          particlesArray.push(new Particle(x, y, particleSize, particleColor));
        }
      }
    }
    particlesRef.current = particlesArray;

    // 4. Animate
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesRef.current.length; i++) {
        particlesRef.current[i].update(mouseRef.current);
        particlesRef.current[i].draw(ctx);
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [text, fontSize, fontFamily, particleSize, particleColor]);

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    
    let clientX, clientY;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    mouseRef.current.x = clientX - rect.left;
    mouseRef.current.y = clientY - rect.top;
  };

  const handleMouseLeave = () => {
    mouseRef.current.x = -1000;
    mouseRef.current.y = -1000;
  };

  return (
    <div className={cn("relative w-full h-[300px] bg-zinc-950", className)}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseLeave}
        onTouchCancel={handleMouseLeave}
      />
    </div>
  );
}
