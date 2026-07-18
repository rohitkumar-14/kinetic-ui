"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { cn } from "@/lib/utils";

interface LogoMarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  speed?: number;
  direction?: "left" | "right" | "up" | "down";
  pauseOnHover?: boolean;
}

export function LogoMarquee({
  children,
  className,
  speed = 1,
  direction = "left",
  pauseOnHover = true,
  ...props
}: LogoMarqueeProps) {
  const [contentWidth, setContentWidth] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  const isVertical = direction === "up" || direction === "down";

  useEffect(() => {
    if (contentRef.current) {
      setContentWidth(contentRef.current.scrollWidth);
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [children]);

  useEffect(() => {
    if (contentWidth === 0 && contentHeight === 0) return;

    const duration = 20 / speed;
    let from = "0%";
    let to = "-50%";

    if (direction === "right" || direction === "down") {
      from = "-50%";
      to = "0%";
    }

    const animationConfig = {
      [isVertical ? "y" : "x"]: [from, to],
      transition: {
        repeat: Infinity,
        ease: "linear",
        duration: duration,
      },
    };

    controls.start(animationConfig as any);
  }, [contentWidth, contentHeight, speed, direction, controls, isVertical]);

  return (
    <div
      className={cn(
        "relative overflow-hidden flex",
        isVertical ? "flex-col h-full w-full" : "w-full",
        className
      )}
      onMouseEnter={() => pauseOnHover && controls.stop()}
      onMouseLeave={() => {
        if (pauseOnHover) {
          const duration = 20 / speed;
          let from = "0%";
          let to = "-50%";
          if (direction === "right" || direction === "down") {
            from = "-50%";
            to = "0%";
          }
          controls.start({
            [isVertical ? "y" : "x"]: [from, to],
            transition: { repeat: Infinity, ease: "linear", duration },
          } as any);
        }
      }}
      style={{
        maskImage: isVertical
          ? "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)"
          : "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        WebkitMaskImage: isVertical
          ? "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)"
          : "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
      }}
      {...props}
    >
      <motion.div
        animate={controls}
        className={cn(
          "flex shrink-0",
          isVertical ? "flex-col" : "flex-row"
        )}
      >
        <div
          ref={contentRef}
          className={cn(
            "flex shrink-0 items-center justify-around",
            isVertical ? "flex-col gap-12 pb-12" : "gap-16 pr-16"
          )}
        >
          {children}
        </div>
        <div
          aria-hidden="true"
          className={cn(
            "flex shrink-0 items-center justify-around",
            isVertical ? "flex-col gap-12 pb-12" : "gap-16 pr-16"
          )}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}
