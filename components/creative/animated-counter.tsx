"use client";

import React, { useEffect, useRef } from "react";
import { useInView, useSpring, useTransform, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AnimatedCounterProps {
  value: number;
  direction?: "up" | "down";
  duration?: number;
  delay?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  separator?: string;
  once?: boolean;
}

export function AnimatedCounter({
  value,
  direction = "up",
  duration = 2,
  delay = 0,
  className,
  prefix = "",
  suffix = "",
  decimals = 0,
  separator = ",",
  once = true,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, amount: 0.5 });
  
  const initialValue = direction === "up" ? 0 : value * 2;
  
  const spring = useSpring(initialValue, {
    damping: 60,
    stiffness: 100,
    mass: 1,
    duration: duration * 1000,
  });

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        spring.set(value);
      }, delay * 1000);
    } else if (!once) {
      spring.set(initialValue);
    }
  }, [isInView, spring, value, delay, once, initialValue]);

  const display = useTransform(spring, (current) => {
    let formattedNum = Number(current).toFixed(decimals);
    
    // Add thousands separator if requested
    if (separator) {
      const parts = formattedNum.split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
      formattedNum = parts.join(".");
    }
    
    return `${prefix}${formattedNum}${suffix}`;
  });

  return (
    <motion.span ref={ref} className={cn("inline-block tabular-nums", className)}>
      {display}
    </motion.span>
  );
}

// Helper component for creating standard stats sections
export interface StatsSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  stats: Array<{
    value: number;
    label: string;
    prefix?: string;
    suffix?: string;
    decimals?: number;
  }>;
}

export function StatsSection({ stats, className, ...props }: StatsSectionProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-8 sm:gap-10 md:gap-6 w-full py-8 md:py-12",
        className
      )}
      {...props}
    >
      {stats.map((stat, i) => (
        <div key={i} className="flex-1 min-w-[140px] flex flex-col items-center justify-center text-center space-y-1.5 md:space-y-2">
          <div className="text-4xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tighter shrink-0">
            <AnimatedCounter
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              decimals={stat.decimals}
              delay={i * 0.1} // Stagger effect
            />
          </div>
          <p className="text-sm md:text-base text-muted-foreground font-medium">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
