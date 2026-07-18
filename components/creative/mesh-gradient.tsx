'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface MeshGradientProps extends React.HTMLAttributes<HTMLDivElement> {
  color1?: string;
  color2?: string;
  color3?: string;
  color4?: string;
  speed?: 'slow' | 'normal' | 'fast';
}

export function MeshGradient({
  className,
  color1 = '#8b5cf6', // violet-500
  color2 = '#ec4899', // pink-500
  color3 = '#06b6d4', // cyan-500
  color4 = '#f59e0b', // amber-500
  speed = 'normal',
  ...props
}: MeshGradientProps) {
  const durationMap = {
    slow: 20,
    normal: 12,
    fast: 6
  };
  
  const d = durationMap[speed];

  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden bg-background isolate",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 filter blur-[80px] opacity-70">
        <motion.div
          animate={{
            x: ['0%', '20%', '-20%', '0%'],
            y: ['0%', '-20%', '20%', '0%'],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{ duration: d, repeat: Infinity, ease: 'linear' }}
          className="absolute top-0 left-0 w-[50%] h-[50%] rounded-full mix-blend-screen"
          style={{ backgroundColor: color1 }}
        />
        <motion.div
          animate={{
            x: ['0%', '-30%', '10%', '0%'],
            y: ['0%', '20%', '-10%', '0%'],
            scale: [1, 0.9, 1.3, 1],
          }}
          transition={{ duration: d * 1.2, repeat: Infinity, ease: 'linear' }}
          className="absolute top-0 right-0 w-[60%] h-[50%] rounded-full mix-blend-screen"
          style={{ backgroundColor: color2 }}
        />
        <motion.div
          animate={{
            x: ['0%', '10%', '-20%', '0%'],
            y: ['0%', '-10%', '30%', '0%'],
            scale: [1, 1.4, 0.9, 1],
          }}
          transition={{ duration: d * 0.8, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-0 left-0 w-[50%] h-[60%] rounded-full mix-blend-screen"
          style={{ backgroundColor: color3 }}
        />
        <motion.div
          animate={{
            x: ['0%', '-20%', '30%', '0%'],
            y: ['0%', '20%', '-20%', '0%'],
            scale: [1, 0.8, 1.2, 1],
          }}
          transition={{ duration: d * 1.4, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-0 right-0 w-[50%] h-[50%] rounded-full mix-blend-screen"
          style={{ backgroundColor: color4 }}
        />
      </div>
      
      {/* Optional grain overlay to make it look more organic */}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>

      <div className="relative z-10 w-full h-full">
        {props.children}
      </div>
    </div>
  );
}
