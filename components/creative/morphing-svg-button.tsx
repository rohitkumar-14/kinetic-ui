'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface MorphingSvgButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  className?: string;
}

export function MorphingSvgButton({
  label = "Transform Action",
  className,
  ...props
}: MorphingSvgButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'relative inline-flex items-center gap-3 rounded-2xl bg-zinc-950 px-7 py-3.5 text-sm font-bold text-white border border-zinc-800 shadow-xl transition-colors hover:border-indigo-500/50',
        className
      )}
      {...(props as any)}
    >
      {/* Morphing SVG Icon */}
      <svg className="w-5 h-5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <motion.path
          animate={{
            d: isHovered
              ? "M5 12h14M12 5l7 7-7 7" // Arrow Right
              : "M12 5v14M5 12h14",      // Plus Icon
          }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <span>{label}</span>
    </motion.button>
  );
}
