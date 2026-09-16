"use client";

import React, { useId } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SankeyNode {
  id: string;
  label: string;
  value: number; // helps determine box height relative to others
  color: string;
}

interface SankeyLink {
  source: string;
  target: string;
  value: number; // helps determine path thickness
}

interface AnimatedSankeyProps {
  className?: string;
}

// Hardcoded demo dataset representing a conversion funnel
const NODES = {
  left: [
    { id: "organic", label: "Organic Search", value: 100, color: "#10b981" },
    { id: "paid", label: "Paid Ads", value: 60, color: "#3b82f6" },
  ],
  middle: [
    { id: "landing", label: "Landing Page", value: 130, color: "#8b5cf6" },
    { id: "bounce", label: "Bounced", value: 30, color: "#ef4444" },
  ],
  right: [
    { id: "signup", label: "Signed Up", value: 90, color: "#f59e0b" },
    { id: "dropoff", label: "Drop-off", value: 40, color: "#6b7280" },
  ]
};

const LINKS = [
  { source: "organic", target: "landing", value: 80 },
  { source: "organic", target: "bounce", value: 20 },
  { source: "paid", target: "landing", value: 50 },
  { source: "paid", target: "bounce", value: 10 },
  { source: "landing", target: "signup", value: 90 },
  { source: "landing", target: "dropoff", value: 40 },
];

export function AnimatedSankey({ className }: AnimatedSankeyProps) {
  const gradientId = useId();
  
  // We'll hardcode the coordinates for simplicity of the visualizer.
  // In a robust charting library, d3-sankey computes these layouts.
  // Here we use absolute positioning percentages to layout columns.
  
  // Coordinates (x, y) mapping for the right side of source to left side of target
  // Format: [x1, y1] (source right) -> [x2, y2] (target left)
  // X is percentage 0-100, Y is percentage 0-100
  const PATHS = [
    // Organic -> Landing
    { path: "M 33 25 C 50 25, 50 20, 66 20", thickness: 24, sourceColor: "#10b981", targetColor: "#8b5cf6" },
    // Organic -> Bounce
    { path: "M 33 25 C 50 25, 50 75, 66 75", thickness: 6, sourceColor: "#10b981", targetColor: "#ef4444" },
    // Paid -> Landing
    { path: "M 33 75 C 50 75, 50 30, 66 30", thickness: 15, sourceColor: "#3b82f6", targetColor: "#8b5cf6" },
    // Paid -> Bounce
    { path: "M 33 75 C 50 75, 50 85, 66 85", thickness: 3, sourceColor: "#3b82f6", targetColor: "#ef4444" },
    // Landing -> Signup
    { path: "M 66 25 C 83 25, 83 25, 100 25", thickness: 27, sourceColor: "#8b5cf6", targetColor: "#f59e0b" },
    // Landing -> Dropoff
    { path: "M 66 25 C 83 25, 83 75, 100 75", thickness: 12, sourceColor: "#8b5cf6", targetColor: "#6b7280" },
  ];

  return (
    <div className={cn("relative w-full h-[400px] bg-neutral-950 rounded-xl overflow-hidden font-sans border border-white/10 p-8", className)}>
      
      {/* SVG Canvas for Ribbons */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {PATHS.map((p, i) => (
          <g key={i}>
            {/* Linear Gradient for this specific path */}
            <linearGradient id={`grad-${gradientId}-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={p.sourceColor} stopOpacity="0.2" />
              <stop offset="100%" stopColor={p.targetColor} stopOpacity="0.2" />
            </linearGradient>

            {/* Base Ribbon */}
            <path
              d={p.path}
              fill="none"
              stroke={`url(#grad-${gradientId}-${i})`}
              strokeWidth={p.thickness}
              vectorEffect="non-scaling-stroke"
            />
            
            {/* Animated Pulses (particles traveling along the path) */}
            <motion.path
              d={p.path}
              fill="none"
              stroke={p.targetColor}
              strokeWidth={p.thickness * 0.4}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 0, pathOffset: 0 }}
              animate={{ pathLength: [0, 0.2, 0], pathOffset: [0, 0.8, 1], opacity: [0, 1, 0] }}
              transition={{ 
                duration: 2 + Math.random() * 2, // staggered random speeds
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 2
              }}
              filter="url(#glow)"
            />
          </g>
        ))}
      </svg>

      {/* HTML Nodes overlay */}
      <div className="relative w-full h-full flex justify-between">
        
        {/* Left Column */}
        <div className="flex flex-col justify-around h-full w-[120px]">
          <NodeBox node={NODES.left[0]} />
          <NodeBox node={NODES.left[1]} />
        </div>

        {/* Middle Column */}
        <div className="flex flex-col justify-around h-full w-[120px]">
          <NodeBox node={NODES.middle[0]} />
          <NodeBox node={NODES.middle[1]} />
        </div>

        {/* Right Column */}
        <div className="flex flex-col justify-around h-full w-[120px]">
          <NodeBox node={NODES.right[0]} />
          <NodeBox node={NODES.right[1]} />
        </div>

      </div>
    </div>
  );
}

function NodeBox({ node }: { node: SankeyNode }) {
  return (
    <div 
      className="relative z-10 w-full p-3 rounded-lg border shadow-lg backdrop-blur-md flex flex-col items-center justify-center cursor-pointer transition-transform hover:scale-105"
      style={{ 
        backgroundColor: `${node.color}15`, // 15 is hex alpha
        borderColor: `${node.color}40`,
      }}
    >
      <div className="w-full flex items-center gap-2 mb-1">
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: node.color }} />
        <span className="text-xs font-semibold text-white truncate">{node.label}</span>
      </div>
      <span className="text-xl font-bold font-mono text-neutral-300">{node.value}k</span>
    </div>
  );
}
