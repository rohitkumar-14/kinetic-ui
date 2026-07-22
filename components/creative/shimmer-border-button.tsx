'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface ShimmerBorderButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  shimmerColor?: string;
}

export function ShimmerBorderButton({
  children,
  className,
  shimmerColor = '#818cf8',
  ...props
}: ShimmerBorderButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.25;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.25;
    setPos({ x, y });
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      className={cn(
        'relative inline-flex items-center justify-center overflow-hidden rounded-full p-[1px] focus:outline-none',
        className
      )}
      {...(props as any)}
    >
      {/* Rotating Shimmer Gradient */}
      <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#818cf8_50%,#000000_100%)]" />
      
      <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-zinc-950 px-8 py-3.5 text-sm font-bold text-white backdrop-blur-3xl transition-colors hover:bg-zinc-900">
        {children}
      </span>
    </motion.button>
  );
}
