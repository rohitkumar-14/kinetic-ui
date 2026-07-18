"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring, PanInfo } from "framer-motion";
import { cn } from "@/lib/utils";

interface CarouselItem {
  id: string;
  imageUrl: string;
  title: string;
}

export interface CoverFlowCarouselProps {
  items: CarouselItem[];
  className?: string;
  itemWidth?: number;
}

export function CoverFlowCarousel({ 
  items, 
  className,
  itemWidth = 300 
}: CoverFlowCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1000);
  
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
    const handleResize = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const x = useMotionValue(0);
  // Smooth out the drag a bit
  const smoothX = useSpring(x, { stiffness: 300, damping: 30 });

  // Calculate boundaries for the drag constraint
  const dragConstraints = {
    left: -((items.length - 1) * itemWidth),
    right: 0,
  };

  return (
    <div 
      ref={containerRef}
      className={cn("relative w-full h-[500px] flex items-center overflow-hidden bg-zinc-950 perspective-[1000px]", className)}
    >
      <motion.div
        drag="x"
        dragConstraints={dragConstraints}
        style={{ x: smoothX }}
        className="flex items-center absolute left-1/2"
        // Offset by half the container and half the item width so the first item starts in the center
        initial={{ x: 0 }}
      >
        {items.map((item, index) => {
          return (
            <CoverFlowCard
              key={item.id}
              item={item}
              index={index}
              x={smoothX}
              itemWidth={itemWidth}
              containerWidth={containerWidth}
            />
          );
        })}
      </motion.div>
    </div>
  );
}

interface CoverFlowCardProps {
  item: CarouselItem;
  index: number;
  x: any; // MotionValue
  itemWidth: number;
  containerWidth: number;
}

function CoverFlowCard({ item, index, x, itemWidth, containerWidth }: CoverFlowCardProps) {
  // The absolute base position of this card in the flex row
  const position = index * itemWidth;

  // We want to calculate how far this card is from the center of the viewport.
  // The motion.div has `left: 50%`. So the origin (x=0) is at the center of the container.
  // This card's physical center in the world is `x.get() + position`.
  // Therefore, the distance from the center is exactly `x + position`.
  
  // We use useTransform to dynamically map that distance to 3D rotation and scale.
  // If distance is 0, it's dead center. If distance is positive, it's on the right. If negative, on the left.
  
  const distanceRange = [-itemWidth * 2, 0, itemWidth * 2];
  
  // Rotate away from the viewer on the sides
  const rotateY = useTransform(x, (latestX: any) => {
    const distance = latestX + position;
    // Map distance to rotation (e.g., -60deg to 60deg)
    if (distance < -itemWidth * 2) return 60;
    if (distance > itemWidth * 2) return -60;
    return (distance / (itemWidth * 2)) * -60; // Negative so right side rotates left
  });

  // Scale down on the sides
  const scale = useTransform(x, (latestX: any) => {
    const distance = Math.abs(latestX + position);
    if (distance > itemWidth * 2) return 0.75;
    return 1 - (distance / (itemWidth * 2)) * 0.25;
  });
  
  // Z-index trick: cards closer to center should be on top
  const zIndex = useTransform(x, (latestX: any) => {
    const distance = Math.abs(latestX + position);
    return 100 - Math.floor(distance);
  });

  // Darken cards on the sides
  const filter = useTransform(x, (latestX: any) => {
    const distance = Math.abs(latestX + position);
    const brightness = Math.max(0.3, 1 - (distance / (itemWidth * 2)));
    return `brightness(${brightness})`;
  });

  return (
    <motion.div
      style={{
        width: itemWidth,
        rotateY,
        scale,
        zIndex,
        filter,
        // Translate -50% to center it on its anchor point
        x: "-50%",
      }}
      className="absolute h-[400px] rounded-2xl overflow-hidden shadow-2xl flex-shrink-0 cursor-grab active:cursor-grabbing preserve-3d"
    >
      <img 
        src={item.imageUrl} 
        alt={item.title} 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      
      {/* Glare effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-black/60 pointer-events-none mix-blend-overlay" />
      
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
        <h3 className="text-2xl font-bold text-white shadow-sm">{item.title}</h3>
      </div>
    </motion.div>
  );
}
