"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export type DirectionalHoverEffect = "slide" | "fade" | "scale" | "flip" | "blur";

interface DirectionalHoverProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  overlayContent: React.ReactNode;
  className?: string;
  overlayClassName?: string;
  /** The animation style for the overlay entrance. Default: "slide" */
  effect?: DirectionalHoverEffect;
  /** Transition duration in seconds. Default: 0.3 */
  duration?: number;
  /** Whether the base content should dim/scale on hover. Default: true */
  dimOnHover?: boolean;
  /** Accent color for default overlay background (hex). Applied when no overlayClassName bg is set. */
  color?: string;
}

type Direction = "top" | "right" | "bottom" | "left";

function getDirection(
  ev: React.MouseEvent<HTMLDivElement>,
  el: HTMLDivElement
): Direction {
  const { width, height, left, top } = el.getBoundingClientRect();
  const x = ev.clientX - left - width / 2;
  const y = ev.clientY - top - height / 2;
  let degree = (Math.atan2(y, x) * 180) / Math.PI;
  degree = (degree + 360) % 360;

  if (degree >= 45 && degree < 135) return "bottom";
  if (degree >= 135 && degree < 225) return "left";
  if (degree >= 225 && degree < 315) return "top";
  return "right";
}

// ─── Slide effect: overlay slides in/out from mouse entry edge ────────────────
function getSlideVariants() {
  return {
    initial: (dir: Direction) => {
      const map: Record<Direction, object> = {
        top: { y: "-100%", x: 0 },
        bottom: { y: "100%", x: 0 },
        left: { x: "-100%", y: 0 },
        right: { x: "100%", y: 0 },
      };
      return map[dir] || map.top;
    },
    animate: { y: 0, x: 0 },
    exit: (dir: Direction) => {
      const map: Record<Direction, object> = {
        top: { y: "-100%", x: 0 },
        bottom: { y: "100%", x: 0 },
        left: { x: "-100%", y: 0 },
        right: { x: "100%", y: 0 },
      };
      return map[dir] || map.top;
    },
  };
}

// ─── Fade effect: simple opacity crossfade ────────────────────────────────────
function getFadeVariants() {
  return {
    initial: () => ({ opacity: 0 }),
    animate: { opacity: 1 },
    exit: () => ({ opacity: 0 }),
  };
}

// ─── Scale effect: overlay grows from the entry direction ─────────────────────
function getScaleVariants() {
  return {
    initial: (dir: Direction) => {
      const originMap: Record<Direction, object> = {
        top: { scaleY: 0, originY: 0, opacity: 0 },
        bottom: { scaleY: 0, originY: 1, opacity: 0 },
        left: { scaleX: 0, originX: 0, opacity: 0 },
        right: { scaleX: 0, originX: 1, opacity: 0 },
      };
      return originMap[dir] || originMap.top;
    },
    animate: { scaleX: 1, scaleY: 1, opacity: 1 },
    exit: (dir: Direction) => {
      const originMap: Record<Direction, object> = {
        top: { scaleY: 0, originY: 0, opacity: 0 },
        bottom: { scaleY: 0, originY: 1, opacity: 0 },
        left: { scaleX: 0, originX: 0, opacity: 0 },
        right: { scaleX: 0, originX: 1, opacity: 0 },
      };
      return originMap[dir] || originMap.top;
    },
  };
}

// ─── Flip effect: 3D card flip from entry direction ───────────────────────────
function getFlipVariants() {
  return {
    initial: (dir: Direction) => {
      const map: Record<Direction, object> = {
        top: { rotateX: 90, opacity: 0 },
        bottom: { rotateX: -90, opacity: 0 },
        left: { rotateY: -90, opacity: 0 },
        right: { rotateY: 90, opacity: 0 },
      };
      return map[dir] || map.top;
    },
    animate: { rotateX: 0, rotateY: 0, opacity: 1 },
    exit: (dir: Direction) => {
      const map: Record<Direction, object> = {
        top: { rotateX: 90, opacity: 0 },
        bottom: { rotateX: -90, opacity: 0 },
        left: { rotateY: -90, opacity: 0 },
        right: { rotateY: 90, opacity: 0 },
      };
      return map[dir] || map.top;
    },
  };
}

// ─── Blur effect: slide with blur ─────────────────────────────────────────────
function getBlurVariants() {
  return {
    initial: (dir: Direction) => {
      const slideMap: Record<Direction, object> = {
        top: { y: "-40%", x: 0 },
        bottom: { y: "40%", x: 0 },
        left: { x: "-40%", y: 0 },
        right: { x: "40%", y: 0 },
      };
      return { ...(slideMap[dir] || slideMap.top), opacity: 0, filter: "blur(12px)" };
    },
    animate: { y: 0, x: 0, opacity: 1, filter: "blur(0px)" },
    exit: (dir: Direction) => {
      const slideMap: Record<Direction, object> = {
        top: { y: "-40%", x: 0 },
        bottom: { y: "40%", x: 0 },
        left: { x: "-40%", y: 0 },
        right: { x: "40%", y: 0 },
      };
      return { ...(slideMap[dir] || slideMap.top), opacity: 0, filter: "blur(12px)" };
    },
  };
}

const effectVariantsMap: Record<DirectionalHoverEffect, any> = {
  slide: getSlideVariants,
  fade: getFadeVariants,
  scale: getScaleVariants,
  flip: getFlipVariants,
  blur: getBlurVariants,
};

const transitionMap: Record<DirectionalHoverEffect, object> = {
  slide: { type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.35 },
  fade: { duration: 0.3, ease: "easeInOut" },
  scale: { type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.35 },
  flip: { type: "spring", stiffness: 300, damping: 30 },
  blur: { duration: 0.4, ease: "easeOut" },
};

export function DirectionalHover({
  children,
  overlayContent,
  className,
  overlayClassName,
  effect = "slide",
  duration,
  dimOnHover = true,
  color,
  ...props
}: DirectionalHoverProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState<Direction>("top");
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(
    (ev: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      setDirection(getDirection(ev, ref.current));
      setIsHovered(true);
    },
    []
  );

  const handleMouseLeave = useCallback(
    (ev: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      setDirection(getDirection(ev, ref.current));
      setIsHovered(false);
    },
    []
  );

  const variants = effectVariantsMap[effect]();
  const transition = {
    ...transitionMap[effect],
    ...(duration !== undefined ? { duration } : {}),
  };

  const overlayBg = color
    ? { backgroundColor: `${color}e6` }
    : undefined;

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn("relative overflow-hidden group", className)}
      style={{ perspective: effect === "flip" ? 800 : undefined }}
      {...props}
    >
      {/* Base Content with optional dim/scale */}
      <motion.div
        className="h-full w-full"
        animate={
          dimOnHover && isHovered
            ? { scale: 1.05, filter: "brightness(0.5)" }
            : { scale: 1, filter: "brightness(1)" }
        }
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {children}
      </motion.div>

      {/* Hover Overlay */}
      <AnimatePresence custom={direction}>
        {isHovered && (
          <motion.div
            custom={direction}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            className={cn(
              "absolute inset-0 z-10 flex items-center justify-center",
              !overlayClassName && !color && "bg-indigo-500/90 backdrop-blur-sm",
              overlayClassName
            )}
            style={overlayBg}
          >
            {overlayContent}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
