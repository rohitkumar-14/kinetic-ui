'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Activity, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function FPSMonitor({ onClose }: { onClose: () => void }) {
  const [fps, setFps] = useState(60);
  const [history, setHistory] = useState<number[]>(Array(30).fill(60));
  
  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const frameCountRef = useRef(0);

  useEffect(() => {
    const tick = (time: number) => {
      frameCountRef.current += 1;
      const elapsed = time - lastTimeRef.current;
      
      if (elapsed >= 1000) {
        const currentFps = Math.round((frameCountRef.current * 1000) / elapsed);
        setFps(currentFps);
        setHistory(prev => {
          const next = [...prev.slice(1), currentFps];
          return next;
        });
        frameCountRef.current = 0;
        lastTimeRef.current = time;
      }
      requestRef.current = requestAnimationFrame(tick);
    };

    requestRef.current = requestAnimationFrame(tick);
    
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const getStatusColor = (val: number) => {
    if (val >= 55) return 'text-emerald-400';
    if (val >= 30) return 'text-amber-400';
    return 'text-rose-400';
  };

  const maxVal = 60;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      className="fixed bottom-6 left-6 z-50 bg-black/80 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-2xl flex flex-col gap-3 min-w-[200px]"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-zinc-400" />
          <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">Performance</span>
        </div>
        <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-end justify-between items-center">
        <span className={`text-3xl font-black tabular-nums ${getStatusColor(fps)}`}>
          {fps}<span className="text-sm font-medium text-zinc-500 ml-1">FPS</span>
        </span>
      </div>

      <div className="h-10 flex items-end gap-1 mt-2">
        {history.map((val, i) => {
          const heightPct = Math.min(100, Math.max(5, (val / maxVal) * 100));
          return (
            <div 
              key={i}
              className="w-full bg-white/10 rounded-t-sm transition-all duration-300"
              style={{ height: `${heightPct}%` }}
            >
              <div 
                className="w-full h-full rounded-t-sm opacity-50"
                style={{ 
                  backgroundColor: val >= 55 ? '#34d399' : val >= 30 ? '#fbbf24' : '#fb7185'
                }}
              />
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
