'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Sparkles, Zap, ShieldCheck } from 'lucide-react';

export interface StickySectionPinProps {
  className?: string;
}

export function StickySectionPin({ className }: StickySectionPinProps) {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: '01. Instant Shader Engine',
      description: 'Zero-configuration WebGL shaders rendered directly into your React DOM with zero math boilerplates.',
      icon: Sparkles,
      color: '#6366f1',
    },
    {
      title: '02. Real-Time Physics',
      description: 'Integrated 2D collision, bounce, and gravity mechanics powered by Matter.js.',
      icon: Zap,
      color: '#ec4899',
    },
    {
      title: '03. Enterprise Type Safety',
      description: 'Fully typed TypeScript props and Next.js 16 Server Component compatible setup out of the box.',
      icon: ShieldCheck,
      color: '#22c55e',
    },
  ];

  const current = steps[activeStep];
  const Icon = current.icon;

  return (
    <div className={cn('relative w-full max-w-4xl mx-auto rounded-3xl border border-zinc-800 bg-zinc-950 p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center', className)}>
      {/* Left Navigation Steps */}
      <div className="space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
          Feature Walkthrough
        </span>
        <h3 className="text-2xl font-black text-white">Sticky Walkthrough System</h3>

        <div className="space-y-2 pt-2">
          {steps.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={cn(
                'w-full text-left p-4 rounded-2xl border transition-all text-sm font-semibold flex items-center justify-between',
                activeStep === idx
                  ? 'bg-zinc-900 border-indigo-500/50 text-white shadow-lg'
                  : 'bg-transparent border-transparent text-zinc-400 hover:text-white hover:bg-zinc-900/50'
              )}
            >
              <span>{step.title}</span>
              {activeStep === idx && <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />}
            </button>
          ))}
        </div>
      </div>

      {/* Right Animated Display Card */}
      <div className="relative h-64 rounded-2xl border border-zinc-800 bg-black/60 p-6 flex flex-col justify-between overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="p-3 w-fit rounded-2xl bg-zinc-900 border border-zinc-800 text-white">
              <Icon className="w-6 h-6" style={{ color: current.color }} />
            </div>
            <h4 className="text-lg font-bold text-white">{current.title}</h4>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">{current.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
