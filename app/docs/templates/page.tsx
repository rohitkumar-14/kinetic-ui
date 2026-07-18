'use client';

import React from 'react';
import { Sparkles, ArrowRight, Compass, ShieldCheck } from 'lucide-react';

export default function TemplatesPage() {
  const templates = [
    {
      title: "Aura Creative Studio",
      description: "A dark theme showcasing high-contrast bento layout grids, spotlight cards, and custom cursor followers.",
      badge: "Standard"
    },
    {
      title: "Chroma Product Showcase",
      description: "Minimalist landing page design displaying 3D floating products reacting to viewport scroll depth.",
      badge: "Standard"
    }
  ];

  return (
    <div className="space-y-12">
      <div>
        <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full uppercase tracking-wider">
          Starter Kits
        </span>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mt-4 mb-4 text-white">
          Creative Templates
        </h1>
        <p className="text-base text-zinc-400 font-light max-w-2xl leading-relaxed">
          Pre-orchestrated project setups built on top of Kinetic UI components to jumpstart your agency or portfolio websites in seconds.
        </p>
      </div>

      {/* Grid of templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((tpl, i) => (
          <div key={i} className="p-6 rounded-2xl border border-white/5 bg-zinc-950/40 hover:border-white/10 transition-all space-y-4 group">
            <div className="flex justify-between items-center">
              <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                tpl.badge === 'Premium' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-zinc-800 text-zinc-400'
              }`}>
                {tpl.badge}
              </span>
            </div>
            <h2 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
              {tpl.title}
            </h2>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              {tpl.description}
            </p>
            <button className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors pt-2">
              <span>Explore source</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
