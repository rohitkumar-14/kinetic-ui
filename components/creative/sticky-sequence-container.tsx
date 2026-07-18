"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface StickySequenceProps {
  frameUrls: string[];
  scrollDistance?: string;
  stickyHeight?: string;
  className?: string;
  children?: React.ReactNode;
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
}

export function StickySequenceContainer({
  frameUrls,
  scrollDistance = "300vh",
  stickyHeight = "100vh",
  className,
  children,
  scrollContainerRef,
}: StickySequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(0);

  // Load all images for perfect scrubbing without network flashing
  useEffect(() => {
    let loadedCount = 0;
    const imgArray: HTMLImageElement[] = [];

    frameUrls.forEach((url, index) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedCount++;
        setLoaded(loadedCount);
        if (index === 0) {
          // Draw the first frame immediately once loaded
          drawFrame(0, img);
        }
      };
      imgArray.push(img);
    });
    setImages(imgArray);
  }, [frameUrls]);

  // We map the scroll progress of the entire container (scrollDistance)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollContainerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useTransform(scrollYProgress, [0, 1], [0, 1], { clamp: true });

  const drawFrame = (frameIndex: number, specificImg?: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = specificImg || images[frameIndex];
    if (!img) return;

    // Handle high-DPI scaling
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    // Only resize canvas buffer if the display size changed
    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    }

    // Draw image covering the canvas (object-fit: cover equivalent)
    const imgRatio = img.width / img.height;
    const canvasRatio = rect.width / rect.height;
    let drawWidth = rect.width;
    let drawHeight = rect.height;
    let offsetX = 0;
    let offsetY = 0;

    if (imgRatio > canvasRatio) {
      drawWidth = rect.height * imgRatio;
      offsetX = (rect.width - drawWidth) / 2;
    } else {
      drawHeight = rect.width / imgRatio;
      offsetY = (rect.height - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useEffect(() => {
    if (images.length === 0) return;

    const unsubscribe = smoothProgress.on("change", (latest) => {
      const targetFrameIndex = Math.min(
        Math.floor(latest * frameUrls.length),
        frameUrls.length - 1
      );
      
      requestAnimationFrame(() => {
        drawFrame(targetFrameIndex);
      });
    });

    return () => unsubscribe();
  }, [smoothProgress, images, frameUrls.length]);

  return (
    <div 
      ref={containerRef} 
      className={cn("relative w-full", className)}
      style={{ height: scrollDistance }}
    >
      <div 
        className="sticky top-0 w-full overflow-hidden flex items-center justify-center bg-zinc-900"
        style={{ height: stickyHeight }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover opacity-80"
          style={{ touchAction: "none" }}
        />
        {/* Loading Indicator */}
        {loaded < frameUrls.length && (
          <div className="absolute top-4 right-4 text-xs font-mono text-zinc-500 bg-black/50 px-2 py-1 rounded">
            Buffer: {Math.round((loaded / frameUrls.length) * 100)}%
          </div>
        )}
        {/* Overlay Content */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
          {children}
        </div>
      </div>
    </div>
  );
}
