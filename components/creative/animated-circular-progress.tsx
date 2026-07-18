"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { cn } from "@/lib/utils";

export type CircularProgressTheme = "cyber" | "emerald" | "ember" | "sunset";

interface AnimatedCircularProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number; // 0 to 100
  size?: number; // width/height in px. Default: 160
  strokeWidth?: number; // circle thickness. Default: 12
  theme?: CircularProgressTheme;
  showValue?: boolean;
  label?: string;
  duration?: number; // animation duration in seconds. Default: 1.5
  delay?: number; // delay in seconds. Default: 0.2
}

const THEME_CONFIGS: Record<
  CircularProgressTheme,
  {
    gradientId: string;
    colors: [string, string];
    trackColor: string;
    glowColor: string;
    textColor: string;
  }
> = {
  cyber: {
    gradientId: "progress-cyber",
    colors: ["#a855f7", "#ec4899"], // purple-500 to pink-500
    trackColor: "rgba(168, 85, 247, 0.08)",
    glowColor: "rgba(236, 72, 153, 0.4)",
    textColor: "text-pink-400"
  },
  emerald: {
    gradientId: "progress-emerald",
    colors: ["#10b981", "#3b82f6"], // emerald-500 to blue-500
    trackColor: "rgba(16, 185, 129, 0.08)",
    glowColor: "rgba(16, 185, 129, 0.4)",
    textColor: "text-emerald-400"
  },
  ember: {
    gradientId: "progress-ember",
    colors: ["#f97316", "#ef4444"], // orange-500 to red-500
    trackColor: "rgba(249, 115, 22, 0.08)",
    glowColor: "rgba(239, 44, 68, 0.4)",
    textColor: "text-orange-400"
  },
  sunset: {
    gradientId: "progress-sunset",
    colors: ["#eab308", "#f43f5e"], // yellow-500 to rose-500
    trackColor: "rgba(234, 179, 8, 0.08)",
    glowColor: "rgba(244, 63, 94, 0.4)",
    textColor: "text-rose-400"
  }
};

export function AnimatedCircularProgress({
  value = 75,
  size = 160,
  strokeWidth = 12,
  theme = "cyber",
  showValue = true,
  label,
  duration = 1.5,
  delay = 0.2,
  className,
  ...props
}: AnimatedCircularProgressProps) {
  const [currentValue, setCurrentValue] = useState(0);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  const config = THEME_CONFIGS[theme];

  // Circle Math
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Animate the path and the number ticker when value changes
  useEffect(() => {
    // Keep value bounded between 0 and 100
    const targetValue = Math.min(Math.max(value, 0), 100);

    const controls = animate(count, targetValue, {
      duration: duration,
      delay: delay,
      ease: "easeOut",
      onUpdate: (latest) => {
        setCurrentValue(latest);
      }
    });

    return () => controls.stop();
  }, [value, duration, delay, count]);

  const strokeDashoffset = circumference - (currentValue / 100) * circumference;

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center select-none group transition-transform duration-300 hover:scale-[1.03]",
        className
      )}
      style={{ width: size, height: size }}
      {...props}
    >
      <svg
        className="w-full h-full -rotate-90 transform"
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Define Gradients & Drop Shadows */}
        <defs>
          <linearGradient
            id={config.gradientId}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor={config.colors[0]} />
            <stop offset="100%" stopColor={config.colors[1]} />
          </linearGradient>
          <filter id={`glow-${config.gradientId}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Track Circle (Background) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={config.trackColor}
          strokeWidth={strokeWidth}
          className="border-dashed"
          strokeDasharray="4 4"
        />

        {/* 2. Outer Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${config.gradientId})`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-75 ease-out"
          filter={`url(#glow-${config.gradientId})`}
          style={{
            strokeDashoffset: strokeDashoffset,
          }}
        />
      </svg>

      {/* 3. Center Info Panel */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        {showValue && (
          <div className="flex items-baseline font-mono font-black tracking-tighter">
            <motion.span className="text-3xl md:text-4xl text-white">
              {rounded}
            </motion.span>
            <span className={cn("text-lg font-bold ml-0.5", config.textColor)}>%</span>
          </div>
        )}
        {label && (
          <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mt-0.5 max-w-[80%] truncate">
            {label}
          </span>
        )}
      </div>

      {/* Ambient Outer Halo (Glow in the center) */}
      <div
        className="absolute inset-4 -z-10 rounded-full blur-[24px] opacity-10 transition-opacity duration-300 group-hover:opacity-20"
        style={{
          background: `radial-gradient(circle, ${config.colors[1]} 0%, transparent 70%)`
        }}
      />
    </div>
  );
}
