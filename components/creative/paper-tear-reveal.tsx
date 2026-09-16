"use client";

import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ScratchRevealProps {
  /** The content to reveal */
  children: React.ReactNode;
  /** Width of the scratch area */
  width?: number;
  /** Height of the scratch area */
  height?: number;
  /** How much area must be scratched to auto-reveal (0-1) */
  revealThreshold?: number;
  /** Radius of the scratch brush */
  brushSize?: number;
  className?: string;
}

export function PaperTearReveal({
  children,
  width = 300,
  height = 100,
  revealThreshold = 0.5,
  brushSize = 25,
  className,
}: ScratchRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Draw the gold foil cover
    const drawCover = () => {
      // Create a gradient to look like shiny gold foil
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#d4af37"); // Gold
      gradient.addColorStop(0.3, "#f3e5ab"); // Light gold
      gradient.addColorStop(0.5, "#aa801e"); // Dark gold
      gradient.addColorStop(0.8, "#d4af37"); 
      gradient.addColorStop(1, "#f3e5ab");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Add a scratch pattern/texture
      ctx.fillStyle = "rgba(0,0,0,0.1)";
      for (let i = 0; i < 200; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const w = Math.random() * 20;
        const h = Math.random() * 2;
        ctx.fillRect(x, y, w, h);
      }

      // Add text on top
      ctx.fillStyle = "rgba(0,0,0,0.6)";
      ctx.font = "bold 16px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("SCRATCH TO REVEAL", width / 2, height / 2);
    };

    drawCover();
  }, [width, height]);

  const checkRevealThreshold = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    
    let transparentPixels = 0;
    // Iterate over alpha values (every 4th byte)
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] < 128) {
        transparentPixels++;
      }
    }

    const totalPixels = width * height;
    if (transparentPixels / totalPixels > revealThreshold) {
      setIsRevealed(true);
      // Clear the rest
      ctx.clearRect(0, 0, width, height);
    }
  };

  const handleScratch = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isRevealed || !isScratching) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Use "destination-out" to erase the canvas
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, brushSize, 0, Math.PI * 2);
    ctx.fill();

    // Reset composite operation so we don't accidentally erase other things
    ctx.globalCompositeOperation = "source-over";

    // Throttle the pixel array check (it's expensive)
    if (Math.random() < 0.1) {
      checkRevealThreshold();
    }
  };

  return (
    <div 
      className={cn("relative rounded-xl overflow-hidden shadow-2xl inline-block", className)}
      style={{ width, height }}
    >
      {/* Underlying Content */}
      <div className="absolute inset-0 flex items-center justify-center bg-neutral-900 border border-white/20 select-none">
        {children}
      </div>

      {/* Scratchable Canvas Layer */}
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className={cn(
          "absolute inset-0 z-10 touch-none cursor-pointer transition-opacity duration-700",
          isRevealed ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
        onPointerDown={(e) => {
          setIsScratching(true);
          e.currentTarget.setPointerCapture(e.pointerId);
          handleScratch(e); // allow tap-to-scratch
        }}
        onPointerMove={handleScratch}
        onPointerUp={(e) => {
          setIsScratching(false);
          e.currentTarget.releasePointerCapture(e.pointerId);
          checkRevealThreshold();
        }}
        onPointerLeave={() => setIsScratching(false)}
      />
    </div>
  );
}
