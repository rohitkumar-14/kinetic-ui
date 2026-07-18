"use client";

import React, { useRef, useState, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export type TrailEffect = "pop" | "rotate" | "stretch" | "glitch" | "wave";

interface ImageTrailProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  images: string[];
  /** Minimum distance (px) cursor must travel before spawning next image. Default: 50 */
  distanceThreshold?: number;
  /** Time (ms) before the trail image fades out. Default: 800 */
  fadeDuration?: number;
  /** Classes applied to each trail image element */
  imageClass?: string;
  /** Animation effect for the trail images. Default: "pop" */
  effect?: TrailEffect;
  /** Maximum number of trail images visible at once. Default: 10 */
  maxTrails?: number;
  /** Width of trail images in px. Default: 128 */
  imageWidth?: number;
  /** Height of trail images in px. Default: 160 */
  imageHeight?: number;
}

interface TrailItem {
  id: string;
  x: number;
  y: number;
  src: string;
  angle: number;
  velocity: number;
}

// ── Animation variants per effect ──────────────────────────────────────────
function getTrailVariants(effect: TrailEffect) {
  switch (effect) {
    case "pop":
      return {
        initial: { opacity: 0, scale: 0.3, x: "-50%", y: "-50%" },
        animate: { opacity: 1, scale: 1, x: "-50%", y: "-50%" },
        exit: { opacity: 0, scale: 0.6, x: "-50%", y: "-50%" },
        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
      };
    case "rotate":
      return {
        initial: (item: TrailItem) => ({
          opacity: 0,
          scale: 0.4,
          rotate: item.angle * 0.5,
          x: "-50%",
          y: "-50%",
        }),
        animate: (item: TrailItem) => ({
          opacity: 1,
          scale: 1,
          rotate: (item.angle % 30) - 15,
          x: "-50%",
          y: "-50%",
        }),
        exit: (item: TrailItem) => ({
          opacity: 0,
          scale: 0.7,
          rotate: (item.angle % 30) - 15 + 10,
          x: "-50%",
          y: "-50%",
        }),
        transition: { duration: 0.4, ease: "easeOut" },
      };
    case "stretch":
      return {
        initial: (item: TrailItem) => ({
          opacity: 0,
          scaleX: 0.2,
          scaleY: 1.4,
          x: "-50%",
          y: "-50%",
        }),
        animate: { opacity: 1, scaleX: 1, scaleY: 1, x: "-50%", y: "-50%" },
        exit: { opacity: 0, scaleX: 0.3, scaleY: 1.2, x: "-50%", y: "-50%" },
        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
      };
    case "glitch":
      return {
        initial: {
          opacity: 0,
          x: "-50%",
          y: "-50%",
          clipPath: "inset(0 0 100% 0)",
        },
        animate: {
          opacity: 1,
          x: "-50%",
          y: "-50%",
          clipPath: "inset(0 0 0% 0)",
        },
        exit: {
          opacity: 0,
          x: "-50%",
          y: "-50%",
          clipPath: "inset(100% 0 0 0)",
        },
        transition: { duration: 0.3, ease: "easeOut" },
      };
    case "wave":
      return {
        initial: { opacity: 0, scale: 0.5, y: "-30%", x: "-50%" },
        animate: { opacity: 1, scale: 1, y: "-50%", x: "-50%" },
        exit: { opacity: 0, scale: 0.8, y: "-70%", x: "-50%" },
        transition: { type: "spring", stiffness: 300, damping: 20 },
      };
    default:
      return {
        initial: { opacity: 0, scale: 0.5, x: "-50%", y: "-50%" },
        animate: { opacity: 1, scale: 1, x: "-50%", y: "-50%" },
        exit: { opacity: 0, scale: 0.8, x: "-50%", y: "-50%" },
        transition: { duration: 0.3, ease: "easeOut" },
      };
  }
}

export function HoverImageTrails({
  children,
  images = [],
  distanceThreshold = 50,
  fadeDuration = 800,
  className,
  imageClass,
  effect = "pop",
  maxTrails = 10,
  imageWidth = 128,
  imageHeight = 160,
  ...props
}: ImageTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [trails, setTrails] = useState<TrailItem[]>([]);
  const lastPosition = useRef<{ x: number; y: number } | null>(null);
  const imageIndex = useRef(0);
  const trailCounter = useRef(0);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!containerRef.current || images.length === 0) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (lastPosition.current) {
        const dx = x - lastPosition.current.x;
        const dy = y - lastPosition.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < distanceThreshold) return;

        const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
        const velocity = Math.min(distance / distanceThreshold, 3);

        lastPosition.current = { x, y };

        const newId = `trail_${trailCounter.current++}`;
        const newTrail: TrailItem = {
          id: newId,
          x,
          y,
          src: images[imageIndex.current % images.length],
          angle,
          velocity,
        };

        imageIndex.current += 1;

        setTrails((prev) => {
          const updated = [...prev, newTrail];
          // Cap active trails
          if (updated.length > maxTrails) {
            return updated.slice(updated.length - maxTrails);
          }
          return updated;
        });

        // Auto-remove after duration
        setTimeout(() => {
          setTrails((prev) => prev.filter((t) => t.id !== newId));
        }, fadeDuration);
      } else {
        lastPosition.current = { x, y };
      }
    },
    [distanceThreshold, fadeDuration, images, maxTrails]
  );

  const handlePointerLeave = useCallback(() => {
    lastPosition.current = null;
  }, []);

  const variants = getTrailVariants(effect);

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn("relative w-full h-full overflow-hidden touch-none", className)}
      {...props}
    >
      {children}

      <div className="pointer-events-none absolute inset-0 z-50">
        <AnimatePresence>
          {trails.map((trail, i) => (
            <motion.img
              key={trail.id}
              src={trail.src}
              custom={trail}
              initial={
                typeof variants.initial === "function"
                  ? (variants.initial as Function)(trail)
                  : variants.initial
              }
              animate={
                typeof variants.animate === "function"
                  ? (variants.animate as Function)(trail)
                  : variants.animate
              }
              exit={
                typeof variants.exit === "function"
                  ? (variants.exit as Function)(trail)
                  : variants.exit
              }
              transition={variants.transition as any}
              className={cn(
                "absolute object-cover rounded-xl shadow-2xl",
                imageClass
              )}
              style={{
                left: trail.x,
                top: trail.y,
                width: imageWidth,
                height: imageHeight,
                zIndex: i,
              }}
              alt=""
              draggable={false}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
