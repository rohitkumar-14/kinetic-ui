'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { MagneticButton } from '@/components/creative/magnetic-button';
import { TextReveal } from '@/components/creative/text-reveal';

const tiers = [
  {
    name: 'Starter',
    price: { monthly: 'Free', yearly: 'Free' },
    description: 'Perfect for trying out the creative components on personal projects.',
    features: [
      'Access to core DOM components',
      'Basic text reveals',
      'Community support',
      'Standard licensing',
    ],
    cta: 'Start for free',
    popular: false,
  },
  {
    name: 'Pro',
    price: { monthly: '$29', yearly: '$24' },
    description: 'For creative developers building Awwwards-winning experiences.',
    features: [
      'Access to all premium components',
      'Advanced WebGL / Three.js effects',
      'Complex scroll timelines',
      'Priority email support',
      'Commercial licensing',
    ],
    cta: 'Upgrade to Pro',
    popular: true,
  },
  {
    name: 'Team',
    price: { monthly: '$99', yearly: '$79' },
    description: 'For agencies and studios building for high-end clients.',
    features: [
      'Everything in Pro',
      'Up to 10 developer seats',
      'Shared component workspaces',
      'Dedicated Slack channel',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(true);

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 relative flex flex-col items-center">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-indigo-500/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="text-center max-w-3xl mb-16 relative z-10">
        <h1 className="text-5xl md:text-7xl font-medium tracking-tighter mb-6">
          <TextReveal text="Invest in Motion." />
        </h1>
        <p className="text-xl text-muted-foreground font-light mb-10">
          Unlock the full power of Kinetic UI. Build faster, animate smoother, and deliver premium experiences.
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4">
          <span className={`text-sm font-medium ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>Monthly</span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className="w-14 h-8 rounded-full bg-muted border border-border relative transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <motion.div
              className="w-6 h-6 rounded-full bg-foreground absolute top-[3px]"
              animate={{ left: isYearly ? 'calc(100% - 28px)' : '4px' }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </button>
          <span className={`text-sm font-medium flex items-center gap-2 ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
            Yearly <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full uppercase tracking-wider">Save 20%</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full relative z-10">
        {tiers.map((tier, i) => (
          <div 
            key={i}
            className={`relative flex flex-col p-8 rounded-3xl backdrop-blur-sm transition-transform duration-500 hover:-translate-y-2 ${
              tier.popular 
                ? 'bg-foreground text-background shadow-2xl shadow-indigo-500/10' 
                : 'bg-muted/30 border border-border/50 text-foreground'
            }`}
          >
            {tier.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-indigo-500 text-white text-xs font-medium uppercase tracking-wider py-1 px-3 rounded-full">
                <Sparkles className="h-3 w-3" /> Most Popular
              </div>
            )}
            
            <h3 className="text-2xl font-medium mb-2">{tier.name}</h3>
            <p className={`text-sm mb-6 ${tier.popular ? 'text-background/70' : 'text-muted-foreground'}`}>
              {tier.description}
            </p>
            
            <div className="mb-8 flex items-baseline gap-1">
              <span className="text-5xl font-medium tracking-tight">
                {isYearly ? tier.price.yearly : tier.price.monthly}
              </span>
              {tier.price.monthly !== 'Free' && (
                <span className={`text-sm ${tier.popular ? 'text-background/70' : 'text-muted-foreground'}`}>/month</span>
              )}
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              {tier.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm">
                  <Check className={`h-5 w-5 shrink-0 ${tier.popular ? 'text-indigo-400' : 'text-indigo-500'}`} />
                  <span className={tier.popular ? 'text-background/90' : 'text-muted-foreground'}>{feature}</span>
                </li>
              ))}
            </ul>

            <MagneticButton 
              className={`h-14 w-full text-base rounded-full border ${
                tier.popular 
                  ? 'bg-background text-foreground hover:bg-muted' 
                  : 'bg-foreground text-background hover:bg-foreground/90'
              }`}
            >
              {tier.cta}
            </MagneticButton>
          </div>
        ))}
      </div>
    </div>
  );
}
