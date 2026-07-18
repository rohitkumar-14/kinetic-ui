"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface HorizontalScrollHijackProps {
  children: React.ReactNode;
  className?: string;
  scrollHeight?: string; 
}

export function HorizontalScrollHijack({ 
  children, 
  className,
  scrollHeight = "400vh"
}: HorizontalScrollHijackProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "calc(-100% + 100vw)"]);

  return (
    <section ref={targetRef} className={cn("relative w-full", className)} style={{ height: scrollHeight }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex h-full items-center min-w-max">
          {children}
        </motion.div>
      </div>
    </section>
  );
}
