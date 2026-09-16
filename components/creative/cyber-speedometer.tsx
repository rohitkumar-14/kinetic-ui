"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

interface CyberSpeedometerProps {
  value: number; // 0 to 100
  label?: string;
  className?: string;
}

export function CyberSpeedometer({ value, label = "SYSTEM LOAD", className }: CyberSpeedometerProps) {
  const [displayValue, setDisplayValue] = useState(0);
  
  // Constrain value
  const safeValue = Math.max(0, Math.min(100, value));
  
  // Calculate SVG stroke parameters
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  // We want a gauge that goes from -225 deg to 45 deg (270 degrees total span)
  const arcSpan = 270;
  const strokeDashoffset = circumference - ((safeValue / 100) * (arcSpan / 360) * circumference);
  
  // Determine color based on value thresholds
  const isWarning = safeValue > 85;
  const glowColor = isWarning ? "#ef4444" : "#0ea5e9";
  const strokeColor = isWarning ? "rgba(239,68,68,1)" : "rgba(14,165,233,1)";

  // Animate the text numbers rolling up
  useEffect(() => {
    let startTimestamp: number;
    const duration = 1000;
    const startValue = displayValue;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function (easeOutExpo)
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      const current = Math.floor(startValue + (safeValue - startValue) * easeProgress);
      setDisplayValue(current);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeValue]);

  return (
    <div className={cn("relative flex items-center justify-center font-mono", className)}>
      <svg width={300} height={300} className="transform -rotate-90">
        <defs>
          <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background Track */}
        <circle
          cx="150"
          cy="150"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="20"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * ((360 - arcSpan) / 360)}
          strokeLinecap="round"
          className="transform origin-center rotate-[135deg]"
        />

        {/* Tick Marks */}
        <g className="transform origin-center rotate-[135deg]">
          {[...Array(28)].map((_, i) => {
            const angle = (i / 27) * arcSpan;
            const isRedZone = angle > (arcSpan * 0.85); // last 15% is red
            return (
              <line
                key={i}
                x1="150"
                y1="30"
                x2="150"
                y2={i % 3 === 0 ? "15" : "24"} // major vs minor ticks
                stroke={isRedZone ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.2)"}
                strokeWidth={i % 3 === 0 ? 3 : 1}
                transform={`rotate(${angle} 150 150)`}
              />
            );
          })}
        </g>

        {/* Animated Fill Track */}
        <motion.circle
          cx="150"
          cy="150"
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, type: "spring", bounce: 0, damping: 20 }}
          className="transform origin-center rotate-[135deg]"
          filter="url(#neon-glow)"
        />
      </svg>

      {/* Center Readout */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
        <span 
          className="text-6xl font-bold tracking-tighter"
          style={{ 
            color: strokeColor,
            textShadow: `0 0 20px ${glowColor}` 
          }}
        >
          {displayValue}
        </span>
        <span className="text-neutral-500 text-xs tracking-[0.2em] mt-1">{label}</span>
      </div>
    </div>
  );
}
