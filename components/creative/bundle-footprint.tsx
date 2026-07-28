'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2 } from 'lucide-react';

export interface BundleFootprintProps {
  color?: string;
  speed?: number;
}

export function BundleFootprint({ 
  color = "#10b981",
  speed = 1
}: BundleFootprintProps) {
  const bundleSizes = [
    { name: 'Kinetic UI (average)', size: 1.2, active: true },
    { name: 'Conventional Library A', size: 14.8, active: false },
    { name: 'Conventional Library B', size: 22.4, active: false },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto glass p-10 rounded-3xl border border-white/5 bg-zinc-950/40 flex flex-col justify-between h-full relative overflow-hidden">
      <div className="absolute top-4 left-6 flex items-center gap-2 text-xs text-zinc-500">
        <BarChart2 className="w-4 h-4" style={{ color }} />
        <span>Import Bundle footprint</span>
      </div>

      <div className="mt-8 mb-8">
        <h3 className="text-xl font-semibold mb-2 text-white">Zero-Weight Animation</h3>
        <p className="text-zinc-400 text-sm font-light leading-relaxed">
          Kinetic UI encapsulates complex math without bulky external assets. Standard components compile to an average of just 1.2KB.
        </p>
      </div>

      {/* Bar chart */}
      <div className="space-y-4">
        {bundleSizes.map((item, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className={item.active ? 'text-white' : 'text-zinc-400'} style={item.active ? { color } : {}}>
                {item.name}
              </span>
              <span className="font-mono text-zinc-300">{item.size} KB</span>
            </div>
            <div className="w-full h-3 bg-zinc-900 rounded-full overflow-hidden border border-white/5 relative">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(item.size / 25) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 / speed, ease: 'easeOut', delay: (idx * 0.1) / speed }}
                style={{ backgroundColor: item.active ? color : '#3f3f46' }}
                className="absolute left-0 top-0 h-full rounded-full"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
