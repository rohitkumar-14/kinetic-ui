"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { AnimatedCounter } from "./animated-counter";

export interface StatItem {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  icon?: React.ReactNode;
}

export interface StatsSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  stats: StatItem[];
  layout?: "grid" | "row";
}

export function StatsSection({ stats, layout = "row", className, ...props }: StatsSectionProps) {
  return (
    <div
      className={cn(
        "w-full py-12",
        layout === "grid" 
          ? "grid grid-cols-2 md:grid-cols-4 gap-8" 
          : "flex flex-wrap items-center justify-center gap-12 sm:gap-16",
        className
      )}
      {...props}
    >
      {stats.map((stat, i) => (
        <div 
          key={i} 
          className={cn(
            "flex flex-col items-center justify-center text-center space-y-2",
            layout === "row" && "flex-1 min-w-[150px]"
          )}
        >
          {stat.icon && (
            <div className="mb-2 text-indigo-400 bg-indigo-500/10 p-3 rounded-xl">
              {stat.icon}
            </div>
          )}
          
          <div className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter shrink-0 text-white">
            <AnimatedCounter
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              decimals={stat.decimals}
              delay={i * 0.15} // Stagger effect
            />
          </div>
          
          <p className="text-sm md:text-base text-zinc-400 font-medium tracking-wide uppercase">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
