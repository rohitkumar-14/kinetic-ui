"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { cn } from "@/lib/utils";

interface VideoRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  videoSrc: string;
  posterSrc?: string;
  text?: string;
  variant?: "hover-zoom" | "cursor-mask" | "split-door";
}

export function VideoReveal({
  className,
  videoSrc,
  posterSrc,
  text = "Hover to Reveal",
  variant = "hover-zoom",
  ...props
}: VideoRevealProps) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // For cursor-mask variant
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth out the mouse movement for the mask
  const smoothX = useSpring(mouseX, { stiffness: 300, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 300, damping: 25 });
  const maskSize = useSpring(0, { stiffness: 300, damping: 25 });

  const clipPath = useMotionTemplate`circle(${maskSize}px at ${smoothX}px ${smoothY}px)`;

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (variant === "cursor-mask") maskSize.set(200);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (variant === "cursor-mask") maskSize.set(0);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (variant === "cursor-mask" && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full aspect-[16/9] overflow-hidden rounded-2xl bg-zinc-950 group cursor-crosshair border border-white/5",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      {...props}
    >
      {/* ─── Static Foreground Text (Visible when video is hidden) ─── */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none mix-blend-difference">
        <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">
          {text}
        </h3>
      </div>

      {/* ─── Variant: Hover Zoom ─── */}
      {variant === "hover-zoom" && (
        <motion.div
          className="absolute inset-0 origin-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: isHovered ? 1 : 0.85,
            opacity: isHovered ? 1 : 0,
            filter: isHovered ? "blur(0px)" : "blur(10px)",
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            src={videoSrc}
            poster={posterSrc}
            muted
            loop
            playsInline
          />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
      )}

      {/* ─── Variant: Cursor Mask ─── */}
      {variant === "cursor-mask" && (
        <motion.div
          className="absolute inset-0 z-0"
          style={{ clipPath }}
        >
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            src={videoSrc}
            poster={posterSrc}
            muted
            loop
            playsInline
          />
          <div className="absolute inset-0 bg-black/10" />
        </motion.div>
      )}

      {/* ─── Variant: Split Door ─── */}
      {variant === "split-door" && (
        <>
          <div className="absolute inset-0 z-0">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              src={videoSrc}
              poster={posterSrc}
              muted
              loop
              playsInline
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
          
          {/* Top Door */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1/2 bg-zinc-900 border-b border-white/5 z-10 pointer-events-none"
            initial={{ y: 0 }}
            animate={{ y: isHovered ? "-100%" : 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* Bottom Door */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-zinc-900 border-t border-white/5 z-10 pointer-events-none"
            initial={{ y: 0 }}
            animate={{ y: isHovered ? "100%" : 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
        </>
      )}
    </div>
  );
}
