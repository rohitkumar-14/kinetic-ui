"use client";

import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, useAnimation } from "framer-motion";

export interface ScratchToRevealProps {
  children: React.ReactNode;
  width: number;
  height: number;
  brushSize?: number;
  coverColor?: string;
  coverImage?: string;
  onReveal?: () => void;
  revealThreshold?: number; // 0 to 1, percentage of area scratched to trigger onReveal
  className?: string;
}

export function ScratchToReveal({
  children,
  width,
  height,
  brushSize = 40,
  coverColor = "#18181b", // zinc-900
  coverImage,
  onReveal,
  revealThreshold = 0.5,
  className,
}: ScratchToRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const lastPos = useRef<{x: number, y: number} | null>(null);
  const controls = useAnimation();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set real size
    canvas.width = width;
    canvas.height = height;

    // Fill cover
    if (coverImage) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = coverImage;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height);
      };
    } else {
      ctx.fillStyle = coverColor;
      ctx.fillRect(0, 0, width, height);
    }
  }, [width, height, coverColor, coverImage]);

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = brushSize;

    if (lastPos.current) {
      ctx.beginPath();
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
      ctx.fill();
    }

    lastPos.current = { x, y };

    checkReveal();
  };

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX, clientY;

    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (isRevealed) return;
    setIsScratching(true);
    const { x, y } = getCoordinates(e);
    scratch(x, y);
  };

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isScratching || isRevealed) return;
    const { x, y } = getCoordinates(e);
    scratch(x, y);
  };

  const handlePointerUp = () => {
    setIsScratching(false);
    lastPos.current = null;
  };

  // Check how much of the canvas is cleared
  const checkReveal = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    // Check alpha channel of every 4th pixel (RGBA) to save performance
    // Skip some pixels for speed
    const step = 4 * 10; 
    const totalPixelsToCheck = pixels.length / step;
    
    for (let i = 3; i < pixels.length; i += step) {
      if (pixels[i] === 0) {
        transparentPixels++;
      }
    }

    const percentage = transparentPixels / totalPixelsToCheck;

    if (percentage > revealThreshold && !isRevealed) {
      setIsRevealed(true);
      onReveal?.();
      
      // Auto-clear the rest smoothly and trigger child animation
      controls.start({
        scale: 1,
        transition: { type: "spring", stiffness: 300, damping: 15 }
      });

      const canvasElement = canvasRef.current;
      if (canvasElement) {
        canvasElement.style.transition = "all 0.5s ease-out";
        canvasElement.style.opacity = "0";
        canvasElement.style.transform = "scale(1.1)";
      }
    }
  };

  return (
    <div 
      className={cn("relative overflow-hidden cursor-crosshair select-none", className)}
      style={{ width, height }}
      onMouseDown={handlePointerDown}
      onMouseMove={handlePointerMove}
      onMouseUp={handlePointerUp}
      onMouseLeave={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
      onTouchCancel={handlePointerUp}
    >
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        animate={controls}
        initial={{ scale: 0.8 }}
      >
        {children}
      </motion.div>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 touch-none"
      />
    </div>
  );
}
