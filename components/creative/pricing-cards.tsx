'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticButton } from './magnetic-button';
import { Check, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PricingTier {
  name: string;
  price: string;
  period: string;
  desc: string;
  features: string[];
  cta: string;
  popular: boolean;
  color?: string;
}

export type PricingVariant = 'grid' | 'spotlight' | 'focus';

interface PricingCardsProps {
  tiers?: PricingTier[];
  variant?: PricingVariant;
  color?: string;
  speed?: number;
  scale?: number;
  className?: string;
}

const defaultTiers: PricingTier[] = [
  {
    name: 'Starter',
    price: '$0',
    period: 'forever',
    desc: 'Perfect for learning and personal hobby websites.',
    features: [
      'Access to 25+ core motion components',
      'Vanilla CSS & Tailwind integration',
      'Framer Motion spring setups',
      'Community discord support',
      'Lifetime updates'
    ],
    cta: 'Download Core',
    popular: false,
    color: 'border-white/5 bg-zinc-900/20'
  },
  {
    name: 'Creator Pro',
    price: '$49',
    period: 'one-time',
    desc: 'The ultimate toolbox for creative developers and agency freelancers.',
    features: [
      'ALL premium motion components',
      'Custom GLSL shaders & 3D canvases',
      'All 5 pre-built templates (worth $150)',
      'Unlimited commercial websites',
      'Priority email assistance'
    ],
    cta: 'Go Pro Lifetime',
    popular: true,
    color: 'border-indigo-500/30 bg-zinc-900/60 shadow-indigo-500/5'
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'consultation',
    desc: 'Designed for production teams and digital design agencies.',
    features: [
      'Full source code control access',
      'Custom component creation assistance',
      'Performance audit consultations',
      'Multi-seat developer licenses',
      'Dedicated Slack support channel'
    ],
    cta: 'Book Consultation',
    popular: false,
    color: 'border-white/5 bg-zinc-900/20'
  }
];

export function PricingCards({
  tiers = defaultTiers,
  variant = 'grid',
  color = '#6366f1',
  speed = 1,
  scale = 1,
  className
}: PricingCardsProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (variant !== 'spotlight') return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      if (container) container.removeEventListener('mousemove', handleMouseMove);
    };
  }, [variant]);

  return (
    <section className={cn("@container py-12 @md:py-20 bg-background text-foreground relative border-y border-border/50 overflow-hidden w-full", className)}>
      {/* Background radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] @md:w-[55vw] h-[100vw] @md:h-[55vw] rounded-full blur-[100px] @md:blur-[140px] pointer-events-none opacity-50"
        style={{
          background: color ? `radial-gradient(circle, ${color}1a 0%, transparent 70%)` : 'radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, transparent 70%)'
        }}
      />

      <div className="container mx-auto px-4 @md:px-6 mb-12 @md:mb-16 relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          <span
            className="font-semibold tracking-widest text-xs uppercase block mb-3"
            style={{ color: color || '#818cf8' }}
          >
            Simple Packages
          </span>
          <h2 className="text-3xl @md:text-5xl font-bold tracking-tight mb-4 text-foreground">
            Flexible Pricing for Everyone
          </h2>
          <p className="text-muted-foreground text-sm @md:text-base font-light">
            All components are open-source. Upgrade to access premium templates, custom WebGL/3D canvases, and custom shader packs.
          </p>
        </div>
      </div>

      <div
        ref={containerRef}
        className="container mx-auto px-4 @md:px-6 grid grid-cols-1 @2xl:grid-cols-3 gap-8 @md:gap-8 max-w-5xl z-10 relative group/container"
      >
        {variant === 'spotlight' && (
          <div
            className="absolute inset-0 pointer-events-none z-[-1] hidden @md:block"
            style={{
              background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, ${color}15, transparent 40%)`,
            }}
          />
        )}

        {tiers.map((tier, idx) => {
          const isHovered = hoveredIdx === idx;
          const isAnyHovered = hoveredIdx !== null;

          return (
            <motion.div
              key={idx}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={cn(
                "rounded-3xl border p-6 @md:p-8 flex flex-col justify-between relative transition-all duration-300 bg-card/40",
                tier.popular ? "border-border shadow-2xl mt-4 @2xl:mt-0" : "border-border/50",
                variant === 'focus' && isAnyHovered && !isHovered ? "@md:opacity-50 @md:blur-[2px] @md:scale-[0.98]" : "opacity-100 blur-0 scale-100"
              )}
              style={{
                transform: isHovered && scale !== 1 && variant !== 'focus' ? `scale(${1 + 0.02 * scale})` : undefined,
                borderColor: isHovered && color ? color : undefined,
                boxShadow: isHovered && color ? `0 0 25px ${color}10` : undefined,
                transitionDuration: `${300 / speed}ms`
              }}
            >
              {/* Rounded inner container for background effects to prevent them from breaking out */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                {/* Spotlight shimmer inside the card for the spotight variant */}
                {variant === 'spotlight' && (
                  <div
                    className="absolute inset-0 opacity-0 group-hover/container:opacity-100 transition-opacity duration-300 mix-blend-overlay hidden @md:block"
                    style={{
                      background: `radial-gradient(400px circle at ${mousePosition.x - (idx * (containerRef.current?.clientWidth || 1000) / 3)}px ${mousePosition.y}px, ${color}30, transparent 40%)`
                    }}
                  />
                )}
                {/* Spotlight shimmer for Pro tier default */}
                {tier.popular && (
                  <div
                    className="absolute inset-0 z-0"
                    style={{
                      background: color ? `linear-gradient(to bottom, ${color}08, transparent)` : 'linear-gradient(to bottom, rgba(99, 102, 241, 0.05), transparent)'
                    }}
                  />
                )}
              </div>

              {/* Badge for Popular Tier - Moved outside overflow hidden wrapper */}
              {tier.popular && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 text-black text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg flex items-center gap-1 z-20 whitespace-nowrap"
                  style={{
                    background: color ? color : 'linear-gradient(to right, #6366f1, #ec4899)',
                    color: color ? '#000000' : undefined
                  }}
                >
                  <Sparkles className="w-3 h-3 text-black" />
                  Most Popular
                </div>
              )}

              <div className="relative z-10">
                <span className="text-muted-foreground text-xs font-bold uppercase tracking-widest block mb-1">
                  {tier.name}
                </span>
                <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0 mb-6">
                  <span className="text-4xl @md:text-5xl font-extrabold tracking-tight text-foreground">
                    {tier.price}
                  </span>
                  <span className="text-muted-foreground text-xs font-light whitespace-nowrap">
                    / {tier.period}
                  </span>
                </div>
                <p className="text-muted-foreground text-xs font-light leading-relaxed mb-8 border-b border-border/50 pb-6">
                  {tier.desc}
                </p>

                <ul className="space-y-4 mb-8">
                  {tier.features.map((feat, i) => (
                    <li key={i} className="flex items-start text-xs font-light text-muted-foreground gap-2.5">
                      <Check
                        className="w-4 h-4 shrink-0 mt-0.5"
                        style={{ color: color || '#10b981' }}
                      />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 relative z-10">
                <MagneticButton
                  className={`w-full h-12 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all border ${tier.popular
                      ? 'bg-foreground text-background border-transparent hover:opacity-90'
                      : 'border-border/60 bg-transparent text-foreground hover:bg-muted/30'
                    }`}
                  style={{
                    borderColor: tier.popular && color ? color : undefined,
                    backgroundColor: tier.popular && color ? color : undefined,
                    color: tier.popular && color ? '#000000' : undefined
                  }}
                >
                  {tier.cta}
                </MagneticButton>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
