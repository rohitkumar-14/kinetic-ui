'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export function GlobalLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldShow, setShouldShow] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Only show the splash screen on the landing page
    if (pathname === '/') {
      setShouldShow(true);
      // Guarantee it disappears after a fixed time
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);
      
      return () => clearTimeout(timer);
    } else {
      setShouldShow(false);
      setIsLoading(false);
    }
  }, [pathname]);

  if (!shouldShow) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="global-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-zinc-950 text-white"
        >
          {/* Logo / Brand Spinner */}
          <div className="relative flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 rounded-full border-t-2 border-indigo-500 border-r-2 border-r-transparent w-16 h-16"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-2 rounded-full border-b-2 border-purple-500 border-l-2 border-l-transparent w-12 h-12"
            />
            {/* Inner Core */}
            <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-8 text-xs tracking-[0.2em] font-medium text-zinc-400 uppercase"
          >
            Initializing System
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
