"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface Interactive360ViewerProps {
  images: string[];
  sensitivity?: number; // How many pixels to drag to change one frame. Default 10.
  className?: string;
}

export function Interactive360Viewer({
  images,
  sensitivity = 15,
  className,
}: Interactive360ViewerProps) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const startFrameRef = useRef(0);

  // Preload all images to ensure 60fps scrubbing without flickering
  useEffect(() => {
    let loadedCount = 0;
    const total = images.length;
    
    if (total === 0) return;

    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        setLoadingProgress(Math.round((loadedCount / total) * 100));
        if (loadedCount === total) {
          setIsLoaded(true);
        }
      };
      img.onerror = () => {
        // Handle error gracefully so we don't block forever
        loadedCount++;
        if (loadedCount === total) setIsLoaded(true);
      };
    });
  }, [images]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!isLoaded) return;
    setIsDragging(true);
    startXRef.current = e.clientX;
    startFrameRef.current = currentFrame;
    // Capture pointer so it tracks even if mouse leaves the container slightly
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !isLoaded) return;

    const deltaX = e.clientX - startXRef.current;
    
    // Calculate how many frames to advance based on sensitivity
    const frameDelta = Math.floor(deltaX / sensitivity);
    
    // Calculate new frame with wrap-around modulo logic
    const totalFrames = images.length;
    let newFrame = (startFrameRef.current + frameDelta) % totalFrames;
    if (newFrame < 0) {
      newFrame += totalFrames;
    }

    setCurrentFrame(newFrame);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  if (!images || images.length === 0) return null;

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative w-full aspect-square md:aspect-video select-none touch-none",
        isDragging ? "cursor-grabbing" : "cursor-grab",
        className
      )}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900/50 backdrop-blur-md rounded-xl z-20">
          <Loader2 className="w-8 h-8 text-white animate-spin mb-4" />
          <p className="text-sm font-medium text-zinc-300">Loading 3D Model... {loadingProgress}%</p>
        </div>
      )}

      {/* Render the current image */}
      <img
        src={images[currentFrame]}
        alt={`360 view frame ${currentFrame}`}
        className="w-full h-full object-contain pointer-events-none"
        draggable={false}
      />
      
      {/* Interaction Hint Overlay */}
      {isLoaded && !isDragging && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md text-white text-xs font-medium px-4 py-2 rounded-full pointer-events-none animate-pulse">
          Drag to Rotate
        </div>
      )}
    </div>
  );
}
