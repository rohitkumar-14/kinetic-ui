"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";

export interface SmoothScrollProps {
  children: React.ReactNode;
  duration?: number;
  easing?: (t: number) => number;
  smoothTouch?: boolean;
  touchMultiplier?: number;
  containerRef?: React.RefObject<any>;
}

export function SmoothScroll({
  children,
  duration = 1.2,
  easing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothTouch = false,
  touchMultiplier = 2,
  containerRef,
}: SmoothScrollProps) {
  const reqIdRef = useRef<number>(0);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      ...(containerRef?.current ? { wrapper: containerRef.current } : {}),
      duration,
      easing,
      smoothWheel: true,
      syncTouch: smoothTouch,
      touchMultiplier,
    });
    lenisRef.current = lenis;

    const animate = (time: number) => {
      lenis.raf(time);
      reqIdRef.current = requestAnimationFrame(animate);
    };

    reqIdRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(reqIdRef.current);
      lenis.destroy();
    };
  }, [duration, easing, smoothTouch, touchMultiplier]);

  return <>{children}</>;
}
