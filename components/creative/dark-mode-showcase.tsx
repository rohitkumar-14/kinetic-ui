'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, ArrowRight, Layout, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export function DarkModeShowcase() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsDark(prev => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 bg-black relative overflow-hidden border-t border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(128,128,128,0.05)_1px,transparent_1px)] bg-[length:24px_24px] pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-medium backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              First-class Dark Mode
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              Flawless themes, <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-600">
                out of the box.
              </span>
            </h2>
            <p className="text-lg text-zinc-400 font-light leading-relaxed max-w-lg">
              Every single Kinetic UI component is strictly built using Tailwind CSS variables. Meaning they adapt instantly to your app's theme without any extra configuration or flashy flashes of unstyled content.
            </p>

            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-zinc-300 font-medium">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <Layout className="w-4 h-4 text-indigo-400" />
                </div>
                Native next-themes support
              </li>
              <li className="flex items-center gap-3 text-zinc-300 font-medium">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-emerald-400" />
                </div>
                Zero extra CSS classes required
              </li>
            </ul>
          </div>

          {/* Interactive Preview Card */}
          <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <AnimatePresence initial={false}>
              <motion.div
                key={isDark ? 'dark' : 'light'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className={cn(
                  "absolute inset-0 flex flex-col items-center justify-center p-8 transition-colors duration-500",
                  isDark ? "bg-[#09090b] text-white" : "bg-white text-zinc-950"
                )}
              >
                {/* Mock UI elements to show off the theme */}
                <div className="w-full max-w-sm space-y-6">
                  
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn("w-10 h-10 rounded-full flex items-center justify-center border", isDark ? "bg-zinc-900 border-zinc-800" : "bg-zinc-100 border-zinc-200")}>
                        {isDark ? <Moon className="w-5 h-5 text-indigo-400" /> : <Sun className="w-5 h-5 text-amber-500" />}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{isDark ? "Dark Theme" : "Light Theme"}</h3>
                        <p className={cn("text-xs", isDark ? "text-zinc-500" : "text-zinc-500")}>Auto-switching</p>
                      </div>
                    </div>
                  </div>

                  {/* Mock Chart/Graph Area */}
                  <div className={cn("h-32 rounded-xl border p-4 flex items-end gap-2", isDark ? "bg-zinc-900 border-zinc-800" : "bg-zinc-50 border-zinc-200")}>
                    {[40, 70, 45, 90, 65, 85].map((height, i) => (
                      <div 
                        key={i} 
                        className={cn("flex-1 rounded-t-sm transition-all duration-700 ease-out", isDark ? "bg-indigo-500" : "bg-indigo-500")}
                        style={{ height: `${height}%`, opacity: 0.5 + (i * 0.1) }}
                      />
                    ))}
                  </div>

                  {/* Mock Action */}
                  <div className="flex gap-3">
                    <div className={cn("flex-1 h-10 rounded-lg flex items-center justify-center font-medium text-sm transition-colors", isDark ? "bg-white text-black" : "bg-zinc-900 text-white")}>
                      Primary
                    </div>
                    <div className={cn("flex-1 h-10 rounded-lg flex items-center justify-center font-medium text-sm border transition-colors", isDark ? "bg-transparent border-zinc-800 text-white" : "bg-transparent border-zinc-200 text-zinc-900")}>
                      Secondary
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* The toggler button (just visual to explain the auto-switch) */}
            <button 
              onClick={() => setIsDark(!isDark)}
              className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white shadow-xl flex items-center justify-center transition-transform hover:scale-110 z-20"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
