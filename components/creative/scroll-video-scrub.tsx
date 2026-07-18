"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TextNode {
  content: React.ReactNode;
  /** Scroll progress value (0 to 1) when the text starts fading in */
  start: number;
  /** Scroll progress value (0 to 1) when the text has fully faded out */
  end: number;
}

export interface ScrollVideoScrubProps {
  videoUrl: string;
  className?: string;
  fallbackImage?: string;
  /** Array of text overlays tied to scroll progress timestamps */
  textNodes?: TextNode[];
}

export function ScrollVideoScrub({ videoUrl, className, fallbackImage, textNodes = [] }: ScrollVideoScrubProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [duration, setDuration] = useState(0);

  // We track the scroll progress over a massive container (e.g., 300vh)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // When metadata loads, we know exactly how long the video is
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setIsVideoLoaded(true);
    }
  };

  // Every time the scroll position changes, we update the video's current time
  // to perfectly match the scroll percentage!
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (videoRef.current && isVideoLoaded) {
      // Small math to ensure we don't try to seek past the very end, which sometimes causes a glitch
      const targetTime = latest * duration;
      // Use requestAnimationFrame for smoother performance when rapidly scrolling
      requestAnimationFrame(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = targetTime;
        }
      });
    }
  });

  // Optional: We can add a fade-in text overlay that triggers at certain scroll points
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 0, 0, 1]);
  const titleScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 0.9, 0.9, 1]);

  return (
    <div 
      ref={containerRef} 
      className={cn("relative h-[400vh] w-full bg-zinc-950", className)}
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-black">
        
        {/* The scrubbing video */}
        <video
          ref={videoRef}
          src={videoUrl}
          preload="auto"
          muted
          playsInline
          onLoadedMetadata={handleLoadedMetadata}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-1000",
            isVideoLoaded ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Fallback while loading */}
        {!isVideoLoaded && fallbackImage && (
          <img 
            src={fallbackImage} 
            alt="Loading video" 
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
        )}

        {/* Dynamic Text Overlays */}
        {textNodes.map((node, i) => (
          <TextNodeOverlay 
            key={i} 
            node={node} 
            scrollYProgress={scrollYProgress} 
          />
        ))}

        {/* Progress indicator at the bottom */}
        <div className="absolute bottom-10 left-10 right-10 h-1 bg-white/20 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-white origin-left"
            style={{ scaleX: scrollYProgress }}
          />
        </div>

      </div>
    </div>
  );
}

// Sub-component to safely call useTransform for each dynamic node
function TextNodeOverlay({ 
  node, 
  scrollYProgress 
}: { 
  node: TextNode; 
  scrollYProgress: any;
}) {
  // We want to fade in from start, stay fully visible for a bit, then fade out by end.
  // We'll calculate a small transition window (e.g., 5% of scroll).
  const transitionWindow = 0.05;
  const fadeInEnd = Math.min(node.start + transitionWindow, node.end);
  const fadeOutStart = Math.max(node.end - transitionWindow, node.start);

  const opacity = useTransform(
    scrollYProgress, 
    [node.start, fadeInEnd, fadeOutStart, node.end], 
    [0, 1, 1, 0]
  );
  
  const y = useTransform(
    scrollYProgress,
    [node.start, fadeInEnd, fadeOutStart, node.end],
    [30, 0, 0, -30]
  );

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{ opacity, y }}
    >
      <div className="bg-black/60 p-8 md:p-12 backdrop-blur-md rounded-3xl border border-white/10 text-center max-w-3xl">
        {node.content}
      </div>
    </motion.div>
  );
}
