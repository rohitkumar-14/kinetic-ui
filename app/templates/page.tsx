'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ExternalLink, Layers, Bot, ShoppingBag, Building2, Layout } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TEMPLATES = [
  {
    slug: 'agency',
    title: 'Creative Agency / Studio',
    category: 'Portfolio & Studio',
    description: 'A cinematic, dark-themed experience featuring sticky liquid navigation, infinite portal scroll reveal, and swipeable project deck.',
    icon: <Layers className="w-5 h-5 text-cyan-400" />,
    badge: 'Popular',
    accent: 'from-cyan-500/20 to-blue-500/10',
    borderColor: 'group-hover:border-cyan-500/40',
    tags: ['LiquidGlassNav', 'PortalScroll', 'SwipeableStack']
  },
  {
    slug: 'saas',
    title: 'Modern SaaS Platform',
    category: 'Product & Tech',
    description: 'High-converting software landing page equipped with interactive metrics, kinetic typography, and pricing matrix.',
    icon: <Layout className="w-5 h-5 text-indigo-400" />,
    badge: 'Pro',
    accent: 'from-indigo-500/20 to-purple-500/10',
    borderColor: 'group-hover:border-indigo-500/40',
    tags: ['HeroParticles', 'BentoGrid', 'Odometer']
  },
  {
    slug: 'chatbot',
    title: 'AI Chatbot & Assistant',
    category: 'AI / Generative',
    description: 'Spatial and responsive conversational AI dashboard with real-time waveform studio, streaming markdown, and tool inspector.',
    icon: <Bot className="w-5 h-5 text-emerald-400" />,
    badge: 'New',
    accent: 'from-emerald-500/20 to-teal-500/10',
    borderColor: 'group-hover:border-emerald-500/40',
    tags: ['SpatialUI', 'VoiceVisualizer', 'StreamWrapper']
  },
  {
    slug: 'drip',
    title: 'Streetwear & Drip E-Commerce',
    category: 'E-Commerce',
    description: 'Hyper-visual fashion showcase using 3D add-to-cart physics, magnetic image depth parallax, and scratch reveals.',
    icon: <ShoppingBag className="w-5 h-5 text-pink-400" />,
    badge: 'Trending',
    accent: 'from-pink-500/20 to-rose-500/10',
    borderColor: 'group-hover:border-pink-500/40',
    tags: ['3DAddToCart', 'DepthGallery', 'ScratchToReveal']
  },
  {
    slug: 'enterprise',
    title: 'Web3 & Enterprise Suite',
    category: 'B2B & Fintech',
    description: 'High-density, mission-critical interface with hardware-accelerated WebGL charts, multi-step islands, and data tables.',
    icon: <Building2 className="w-5 h-5 text-amber-400" />,
    badge: 'Enterprise',
    accent: 'from-amber-500/20 to-orange-500/10',
    borderColor: 'group-hover:border-amber-500/40',
    tags: ['WebGLChart', 'DataTable', 'DesktopWindow']
  }
];

export default function TemplatesShowcasePage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 relative bg-background text-foreground">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-indigo-500/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Full-Page Experiences</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-foreground">
            Production Templates
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg font-light leading-relaxed">
            Complete, end-to-end layouts orchestrated with Kinetic UI components, spring physics, and fluid typography. Built to clone, customize, and deploy.
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEMPLATES.map((tpl) => (
            <motion.div
              key={tpl.slug}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className={`group flex flex-col justify-between rounded-3xl border border-border bg-card/60 backdrop-blur-xl p-8 relative overflow-hidden transition-colors ${tpl.borderColor}`}
            >
              {/* Card Ambient Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${tpl.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-muted border border-border/80">
                    {tpl.icon}
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full bg-muted border border-border text-foreground">
                    {tpl.badge}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-mono text-muted-foreground">{tpl.category}</span>
                  <h3 className="text-xl font-bold text-foreground mt-1 group-hover:text-primary transition-colors">
                    {tpl.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground font-light mt-3 leading-relaxed">
                    {tpl.description}
                  </p>
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {tpl.tags.map((tag) => (
                    <span key={tag} className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground border border-border/40">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-8 relative z-10">
                <Link href={`/templates/${tpl.slug}`} className="block w-full">
                  <Button className="w-full rounded-2xl h-11 bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2 group-hover:scale-[1.02] transition-transform">
                    <span>Live Preview</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="p-10 rounded-3xl border border-border bg-gradient-to-r from-muted/50 via-muted/30 to-muted/50 backdrop-blur-md text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Want to build your own custom layout?
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto font-light">
            Use the Kinetic UI Component Playground to drag, drop, reorder, and export custom motion canvas pages in seconds.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/playground">
              <Button variant="outline" className="rounded-full h-11 px-8">
                Open Playground
              </Button>
            </Link>
            <Link href="/docs">
              <Button className="rounded-full h-11 px-8 bg-primary text-primary-foreground">
                Browse All Components
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
