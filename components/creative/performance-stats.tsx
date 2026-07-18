'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BarChart2, ShieldCheck, Zap } from 'lucide-react';

interface StatDialProps {
  score: number;
  label: string;
  color: string;
}

function StatDial({ score, label, color }: StatDialProps) {
  // SVG Ring values
  const radius = 50;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Shadow/Glow effect */}
        <div 
          className="absolute inset-2 rounded-full blur-md opacity-25 pointer-events-none"
          style={{ backgroundColor: color }}
        />
        
        <svg className="w-full h-full transform -rotate-90">
          {/* Base track */}
          <circle
            className="text-zinc-900"
            strokeWidth={stroke}
            stroke="currentColor"
            fill="transparent"
            r={normalizedRadius}
            cx={64}
            cy={64}
          />
          {/* Active progress */}
          <motion.circle
            stroke={color}
            strokeWidth={stroke}
            fill="transparent"
            r={normalizedRadius}
            cx={64}
            cy={64}
            strokeDasharray={circumference + ' ' + circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </svg>
        <span className="absolute text-2xl font-bold font-mono text-white">
          {score}
        </span>
      </div>
      <span className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
        {label}
      </span>
    </div>
  );
}

export function PerformanceStats() {
  const bundleSizes = [
    { name: 'Kinetic UI (average)', size: 1.2, color: '#10b981', active: true },
    { name: 'Conventional Library A', size: 14.8, color: '#3f3f46', active: false },
    { name: 'Conventional Library B', size: 22.4, color: '#3f3f46', active: false },
  ];

  return (
    <section className="py-32 bg-black text-white relative overflow-hidden">
      {/* Glow backgrounds */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-emerald-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-6 mb-20">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-400 mb-6 backdrop-blur-md shadow-sm">
            <Zap className="w-3.5 h-3.5" />
            <span>Built For Performance</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Awwwards Vibe, SaaS Speeds
          </h2>
          <p className="text-zinc-400 text-sm md:text-base font-light">
            Award-winning design does not require slow load times. Kinetic UI components are treeshakable, use vanilla animations, and compile down to near-zero CSS footprint.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Column 1: Lighthouse Scores Grid */}
          <div className="grid grid-cols-2 gap-8 glass p-10 rounded-3xl border border-white/5 bg-zinc-950/40 relative">
            <div className="absolute top-4 left-6 flex items-center gap-2 text-xs text-zinc-500">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Google Lighthouse Audits</span>
            </div>
            
            <div className="col-span-2 h-6" /> {/* Spacer */}
            
            <StatDial score={99} label="Performance" color="#10b981" />
            <StatDial score={100} label="Accessibility" color="#10b981" />
            <StatDial score={100} label="Best Practices" color="#10b981" />
            <StatDial score={100} label="SEO" color="#10b981" />
          </div>

          {/* Column 2: Bundle Size Chart */}
          <div className="glass p-10 rounded-3xl border border-white/5 bg-zinc-950/40 flex flex-col justify-between h-full min-h-[360px] relative">
            <div className="absolute top-4 left-6 flex items-center gap-2 text-xs text-zinc-500">
              <BarChart2 className="w-4 h-4 text-indigo-400" />
              <span>Import Bundle footprint</span>
            </div>

            <div className="h-6" /> {/* Spacer */}

            <div>
              <h3 className="text-xl font-semibold mb-2">Zero-Weight Animation</h3>
              <p className="text-zinc-400 text-sm font-light leading-relaxed mb-8">
                Kinetic UI encapsulates complex math without bulky external assets. Standard components compile to an average of just 1.2KB.
              </p>
            </div>

            {/* Bar chart */}
            <div className="space-y-4">
              {bundleSizes.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className={item.active ? 'text-emerald-400' : 'text-zinc-400'}>
                      {item.name}
                    </span>
                    <span className="font-mono text-zinc-300">{item.size} KB</span>
                  </div>
                  <div className="w-full h-3 bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(item.size / 25) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: 'easeOut', delay: idx * 0.1 }}
                      style={{ backgroundColor: item.color }}
                      className="h-full rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
