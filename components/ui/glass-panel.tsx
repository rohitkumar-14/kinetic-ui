import * as React from 'react';
import { cn } from '@/lib/utils';

export interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  intensity?: 'light' | 'medium' | 'heavy';
}

export function GlassPanel({ children, className, intensity = 'medium', ...props }: GlassPanelProps) {
  const intensityStyles = {
    light: "bg-white/5 dark:bg-black/10 backdrop-blur-md",
    medium: "bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-xl",
    heavy: "bg-white/20 dark:bg-white/10 backdrop-blur-2xl border-2 border-white/30 dark:border-white/20 shadow-2xl",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl",
        intensityStyles[intensity],
        className
      )}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 to-white/0 dark:from-white/10 dark:to-transparent opacity-50" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
