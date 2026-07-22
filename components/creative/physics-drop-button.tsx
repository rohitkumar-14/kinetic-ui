'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface PhysicsDropButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export function PhysicsDropButton({
  children,
  className,
  ...props
}: PhysicsDropButtonProps) {
  const [tilt, setTilt] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const norm = (x / rect.width - 0.5) * 30; // Tilt angle (-15 to 15 deg)
    setTilt(norm);
  };

  return (
    <motion.button
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt(0)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-zinc-950 px-8 py-3.5 text-sm font-bold text-white border border-zinc-800 shadow-xl select-none',
        className
      )}
      {...(props as any)}
    >
      {/* Liquid Sloshing Layer */}
      <motion.div
        animate={{ rotate: tilt }}
        transition={{ type: 'spring', stiffness: 120, damping: 12 }}
        className="absolute -bottom-8 -left-4 -right-4 h-16 rounded-t-[50%] bg-gradient-to-r from-indigo-600 to-purple-600 opacity-60 pointer-events-none"
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
