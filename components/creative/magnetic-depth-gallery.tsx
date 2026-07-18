"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useAnimationFrame, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export interface GalleryItem {
  id: string;
  url: string;
  alt: string;
}

export interface MagneticDepthGalleryProps {
  images: GalleryItem[];
  className?: string;
  itemClassName?: string;
}

export function MagneticDepthGallery({ images, className, itemClassName }: MagneticDepthGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Motion values for global mouse position relative to the container
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const isHovering = useMotionValue(0); // 0 or 1

  const springConfig = { damping: 20, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div 
      ref={containerRef}
      className={cn("grid grid-cols-2 md:grid-cols-3 gap-4 p-8 relative", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => isHovering.set(1)}
      onMouseLeave={() => isHovering.set(0)}
    >
      {images.map((img) => (
        <GalleryImage 
          key={img.id} 
          image={img} 
          mouseX={smoothMouseX} 
          mouseY={smoothMouseY} 
          isHovering={isHovering}
          className={itemClassName}
        />
      ))}
    </div>
  );
}

// Inner component for each image to handle its own distance calculations
function GalleryImage({ 
  image, 
  mouseX, 
  mouseY, 
  isHovering,
  className 
}: { 
  image: GalleryItem;
  mouseX: any;
  mouseY: any;
  isHovering: any;
  className?: string;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const scale = useMotionValue(1);
  const blur = useMotionValue(0);
  const opacity = useMotionValue(1);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  useAnimationFrame(() => {
    if (!itemRef.current) return;
    
    // If we aren't hovering the gallery, reset everything smoothly
    if (isHovering.get() === 0) {
      scale.set(1);
      blur.set(0);
      opacity.set(1);
      return;
    }

    const rect = itemRef.current.getBoundingClientRect();
    // To get coordinates relative to the parent container, we just need the center of the item relative to the viewport, 
    // BUT mouseX/Y are relative to the parent container. Wait, it's easier if everything is relative to the viewport!
    // Since mouseX/Y is currently relative to parent, let's just compute center relative to parent.
    const parentRect = itemRef.current.parentElement?.getBoundingClientRect();
    if (!parentRect) return;

    const itemCenterX = (rect.left - parentRect.left) + rect.width / 2;
    const itemCenterY = (rect.top - parentRect.top) + rect.height / 2;

    const distanceX = mouseX.get() - itemCenterX;
    const distanceY = mouseY.get() - itemCenterY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    // Max distance to consider for effect (e.g. 300px)
    const maxDistance = 300;
    
    // Normalize distance between 0 and 1
    const normalizedDistance = Math.min(Math.max(distance / maxDistance, 0), 1);

    // Closer items scale UP (max 1.1), further items scale DOWN (min 0.9)
    const targetScale = 1.15 - (normalizedDistance * 0.3);
    
    // Closer items are sharp (0px blur), further items blur (up to 8px)
    const targetBlur = normalizedDistance * 10;
    
    // Closer items are bright (1 opacity), further items dim (0.4 opacity)
    const targetOpacity = 1 - (normalizedDistance * 0.6);

    scale.set(targetScale);
    blur.set(targetBlur);
    opacity.set(targetOpacity);
  });

  return (
    <motion.div 
      ref={itemRef}
      className={cn("relative overflow-hidden rounded-xl bg-zinc-900 aspect-video", className)}
      style={{
        scale,
        opacity,
        filter
      }}
    >
      <img 
        src={image.url} 
        alt={image.alt}
        className="w-full h-full object-cover transition-transform duration-700"
      />
    </motion.div>
  );
}
