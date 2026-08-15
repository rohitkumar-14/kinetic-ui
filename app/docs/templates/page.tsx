'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, ExternalLink, Layers, Bot, ShoppingBag, Building2, Layout } from 'lucide-react';
import { DocsPager } from '@/components/docs-pager';

export default function TemplatesPage() {
  const templates = [
    {
      slug: "agency",
      title: "Creative Agency & Studio",
      description: "A dark theme showcasing sticky liquid navigation, portal scroll depth reveals, and swipeable card stacks.",
      badge: "Popular",
      icon: <Layers className="w-4 h-4 text-cyan-400" />
    },
    {
      slug: "saas",
      title: "Modern SaaS Platform",
      description: "High-converting software landing page with interactive particle hero, bento grids, and animated counters.",
      badge: "Pro",
      icon: <Layout className="w-4 h-4 text-indigo-400" />
    },
    {
      slug: "chatbot",
      title: "AI Chatbot & Assistant",
      description: "Spatial conversational dashboard with waveform audio visualizer, streaming markdown, and tool inspector.",
      badge: "New",
      icon: <Bot className="w-4 h-4 text-emerald-400" />
    },
    {
      slug: "drip",
      title: "Streetwear & Fashion Drip",
      description: "Hyper-visual e-commerce experience with 3D add-to-cart physics and magnetic image depth parallax.",
      badge: "Trending",
      icon: <ShoppingBag className="w-4 h-4 text-pink-400" />
    },
    {
      slug: "enterprise",
      title: "Enterprise B2B Suite",
      description: "Data-dense dashboard layout equipped with WebGL financial charts, data tables, and multi-step islands.",
      badge: "Enterprise",
      icon: <Building2 className="w-4 h-4 text-amber-400" />
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
        {templates.map((tpl) => (
          <div key={tpl.slug} className="p-6 rounded-2xl border border-white/5 bg-zinc-950/40 hover:border-white/10 transition-all space-y-4 group flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  {tpl.icon}
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {tpl.badge}
                </span>
              </div>
              <h2 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                {tpl.title}
              </h2>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                {tpl.description}
              </p>
            </div>

            <Link href={`/templates/${tpl.slug}`} className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors pt-2 font-medium">
              <span>View live template</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        ))}
      </div>

      <DocsPager />
    </div>
  );
}
