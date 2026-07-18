'use client';

// Requires: npx kinetic-ui add aurora-background liquid-button
import React from 'react';
import { AuroraBackground } from '@/components/creative/aurora-background';
import { LiquidButton } from '@/components/creative/liquid-button';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function Hero01() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: 'easeInOut',
        }}
        className="relative flex flex-col gap-8 items-center justify-center px-4"
      >
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>Kinetic UI Blocks 1.0 is here</span>
        </div>
        
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-7xl font-bold dark:text-white text-center tracking-tighter">
            Ship interfaces that feel{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              alive
            </span>
          </h1>
          <p className="font-light text-base md:text-xl dark:text-neutral-200 py-4 max-w-2xl mx-auto">
            Copy and paste the most premium, physics-driven components into your Next.js application. Zero configuration required.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
          <LiquidButton className="bg-indigo-600 text-white flex items-center gap-2">
            Get Started <ArrowRight className="w-4 h-4" />
          </LiquidButton>
          <button className="px-8 py-3.5 rounded-full font-semibold text-sm transition-all hover:bg-white/5 text-zinc-300 border border-transparent hover:border-white/10">
            View Documentation
          </button>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}
