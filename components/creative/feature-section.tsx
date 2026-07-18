'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Sparkles, Layers, Zap, Shield, Cpu, Activity } from 'lucide-react';

export type FeatureSectionVariant = 'grid' | 'bento' | 'minimal';

export interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string; // used for bento layouts (e.g., md:col-span-2)
}

interface FeatureSectionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: FeatureSectionVariant;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  features?: FeatureItem[];
  color?: string; // Primary accent color (default: indigo)
}

const defaultFeatures: FeatureItem[] = [
  {
    icon: <Zap className="w-5 h-5 text-yellow-400" />,
    title: "Lightning Fast",
    description: "Optimized for speed and minimal bundle size. Built with performance in mind.",
    className: "@2xl:col-span-2 @2xl:row-span-1" // Bento specific
  },
  {
    icon: <Shield className="w-5 h-5 text-emerald-400" />,
    title: "Secure by Default",
    description: "Best-in-class security practices integrated directly into the core architecture.",
    className: "@2xl:col-span-1 @2xl:row-span-2"
  },
  {
    icon: <Layers className="w-5 h-5 text-indigo-400" />,
    title: "Modular Design",
    description: "Use only what you need. Everything is built independently for maximum flexibility.",
    className: "@2xl:col-span-1 @2xl:row-span-1"
  },
  {
    icon: <Cpu className="w-5 h-5 text-cyan-400" />,
    title: "Type Safe",
    description: "100% written in TypeScript with strict type checking and excellent editor autocomplete.",
    className: "@2xl:col-span-1 @2xl:row-span-1"
  },
  {
    icon: <Activity className="w-5 h-5 text-rose-400" />,
    title: "Real-time Metrics",
    description: "Monitor application performance and user engagement directly from the dashboard.",
    className: "@2xl:col-span-1 @2xl:row-span-1"
  },
];

export function FeatureSection({ 
  className,
  variant = 'grid',
  color = '#6366f1', // default indigo
  title = "Supercharge Your Workflow",
  subtitle = "Everything you need to build faster and scale further, built directly into a seamless ecosystem.",
  features = defaultFeatures,
  ...props 
}: FeatureSectionProps) {
  
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };
  
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const renderGridItem = (feature: FeatureItem, idx: number) => (
    <motion.div
      key={idx}
      variants={itemVariants}
      className="group relative p-6 @md:p-8 bg-zinc-900/40 backdrop-blur-md rounded-3xl border border-white/10 hover:bg-zinc-900/60 hover:border-white/20 transition-all duration-500 overflow-hidden shadow-2xl"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
        style={{ background: `radial-gradient(400px circle at 100% 0%, ${color}33, transparent 70%)` }}
      />

      <div className="relative z-10 flex flex-col gap-4">
        <div 
          className="w-12 h-12 rounded-2xl bg-black/80 border border-white/10 flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:scale-110 group-hover:border-white/20 transition-all duration-500"
        >
          {feature.icon}
        </div>
        <div>
          <h3 className="text-lg @md:text-xl font-semibold text-white mb-2 group-hover:text-transparent bg-clip-text transition-all duration-300" style={{ backgroundImage: `linear-gradient(to right, #fff, ${color})` }}>
            {feature.title}
          </h3>
          <p className="text-zinc-400 leading-relaxed font-light text-sm @md:text-base">{feature.description}</p>
        </div>
      </div>
    </motion.div>
  );

  const renderBentoItem = (feature: FeatureItem, idx: number) => (
    <motion.div
      key={idx}
      variants={itemVariants}
      className={cn(
        "group relative p-6 @md:p-8 bg-zinc-900/40 backdrop-blur-md rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden flex flex-col justify-end shadow-2xl",
        feature.className
      )}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
        style={{ background: `radial-gradient(800px circle at 0% 100%, ${color}40, transparent 60%)` }}
      />

      <div className="relative z-10 flex flex-col gap-4 h-full">
        <div className="w-12 h-12 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:scale-110 group-hover:border-white/20 transition-all duration-500">
          {feature.icon}
        </div>
        <div className="mt-auto pt-8">
          <h3 className="text-lg @md:text-xl font-semibold text-white mb-2 group-hover:text-transparent bg-clip-text transition-all duration-300" style={{ backgroundImage: `linear-gradient(to right, #fff, ${color})` }}>{feature.title}</h3>
          <p className="text-zinc-400 leading-relaxed font-light text-sm @md:text-base">{feature.description}</p>
        </div>
      </div>
    </motion.div>
  );

  const renderMinimalItem = (feature: FeatureItem, idx: number) => (
    <motion.div 
      key={idx}
      variants={itemVariants}
      className="group flex gap-6 items-start"
    >
      <div className="w-12 h-12 shrink-0 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        {feature.icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-transparent bg-clip-text transition-all duration-300"
            style={{ backgroundImage: `linear-gradient(to right, #fff, ${color})` }}
        >
          {feature.title}
        </h3>
        <p className="text-zinc-400 leading-relaxed font-light">{feature.description}</p>
      </div>
    </motion.div>
  );

  return (
    <div className={cn("@container w-full py-12 @md:py-24", className)} {...props}>
      <div className="max-w-5xl mx-auto px-4 @md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16 space-y-4">
          <div className="flex justify-center mb-4">
            <div
              className="p-2 rounded-full border"
              style={{ backgroundColor: `${color}15`, borderColor: `${color}30`, color }}
            >
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <h2 className="text-3xl @md:text-5xl font-bold tracking-tight text-white">
            {title}
          </h2>
          <p className="text-zinc-400 text-sm @md:text-lg font-light leading-relaxed">
            {subtitle}
          </p>
        </div>

        <motion.div
          className={cn(
            "grid gap-6 @md:gap-8",
            variant === 'grid' && "grid-cols-1 @xl:grid-cols-2 @3xl:grid-cols-3",
            variant === 'bento' && "grid-cols-1 @2xl:grid-cols-3 @2xl:grid-rows-2 auto-rows-min",
            variant === 'minimal' && "grid-cols-1 @xl:grid-cols-2 gap-y-8 @md:gap-y-12"
          )}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, idx) => {
            if (variant === 'bento') return renderBentoItem(feature, idx);
            if (variant === 'minimal') return renderMinimalItem(feature, idx);
            return renderGridItem(feature, idx);
          })}
        </motion.div>
      </div>
    </div>
  );
}
