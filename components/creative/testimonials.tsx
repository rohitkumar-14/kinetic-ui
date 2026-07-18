'use client';

import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialItem {
  name: string;
  role: string;
  avatar: string;
  company: string;
  content: string;
  rating: number;
}

const reviews1: TestimonialItem[] = [
  {
    name: 'Sarah Connor',
    role: 'Creative Director',
    company: 'Linear Systems',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    content: 'Kinetic UI helped us deliver an Awwwards-winning site in half the time. The spring damping is so polished.',
    rating: 5
  },
  {
    name: 'Alex Rivera',
    role: 'Lead Interactive Developer',
    company: 'VibeData',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    content: 'The custom GLSL shaders and R3F canvas integrations compile to almost nothing. Our page speed stayed at 99.',
    rating: 5
  },
  {
    name: 'Emily Chen',
    role: 'Co-Founder',
    company: 'Framer Agency',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    content: 'A complete cheat code for startups. We copy-paste premium components directly and customize them in Tailwind.',
    rating: 5
  }
];

const reviews2: TestimonialItem[] = [
  {
    name: 'David K.',
    role: 'Design Engineer',
    company: 'Stripe Studio',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    content: 'The attention to micro-interactions is phenomenal. The magnetic CTAs feel organic, not robotic.',
    rating: 5
  },
  {
    name: 'Jessica Vance',
    role: 'Creative Technologist',
    company: 'Independent',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    content: 'The scroll storytelling layout alone saved me weeks of coding. The documentation is incredibly clear.',
    rating: 5
  },
  {
    name: 'Michael Torres',
    role: 'Senior Developer',
    company: 'Nebula SaaS',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    content: 'Perfect Lighthouse scores out of the box. Highly recommend the Pro template starters.',
    rating: 5
  }
];

import { cn } from '@/lib/utils';

export function Testimonials({ color, speed = 1, scale = 1, className }: { color?: string; speed?: number; scale?: number; className?: string }) {
  const renderCard = (rev: TestimonialItem, idx: number) => (
    <div 
      key={idx} 
      className="w-[260px] @md:w-[380px] shrink-0 p-7 @md:p-8 rounded-2xl border border-border bg-card/40 backdrop-blur-md flex flex-col justify-between whitespace-normal transition-all duration-300"
      style={{
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        borderColor: color ? `${color}30` : undefined,
      }}
    >
      <div>
        <div 
          className="flex gap-0.5 mb-3 @md:mb-4"
          style={{ color: color || '#818cf8' }} // Indigo-400 fallback
        >
          {Array(rev.rating).fill(0).map((_, i) => (
            <Star key={i} className="w-3 h-3 @md:w-3.5 @md:h-3.5 fill-current" />
          ))}
        </div>
        <p className="text-muted-foreground text-xs @md:text-sm font-light leading-relaxed mb-4 @md:mb-6">
          &ldquo;{rev.content}&rdquo;
        </p>
      </div>

      <div className="flex items-center gap-3 border-t border-border/50 pt-4">
        {/* Fallback avatar shape with initial if image fails, to ensure clean aesthetics */}
        <div 
          className="w-8 h-8 @md:w-10 @md:h-10 rounded-full flex items-center justify-center text-[10px] @md:text-xs font-semibold uppercase select-none border"
          style={{
            backgroundColor: color ? `${color}20` : 'rgba(99, 102, 241, 0.2)',
            borderColor: color ? `${color}40` : 'rgba(99, 102, 241, 0.3)',
            color: color || '#818cf8'
          }}
        >
          {rev.name.charAt(0)}
        </div>
        <div>
          <h4 className="text-xs @md:text-sm font-semibold text-foreground">{rev.name}</h4>
          <span className="text-[9px] @md:text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
            {rev.role} &middot; {rev.company}
          </span>
        </div>
      </div>
    </div>
  );

  const durationLeft = 30 / speed;
  const durationRight = 30 / speed;

  return (
    <section className={cn("@container py-12 px-5 @md:py-20 bg-background text-foreground relative overflow-hidden border-y border-border/50", className)}>
      <div className="container mx-auto px-4 @md:px-6 mb-12 @md:mb-16">
        <div className="text-center max-w-2xl mx-auto">
          <span 
            className="font-semibold tracking-widest text-xs uppercase block mb-3"
            style={{ color: color || '#818cf8' }}
          >
            Community Reviews
          </span>
          <h2 className="text-3xl @md:text-5xl font-bold tracking-tight mb-4 text-foreground">
            Loved By Designers &amp; Engineers
          </h2>
          <p className="text-muted-foreground text-sm @md:text-base font-light">
            Here is what builders from Stripe, Linear, and Framer agency studios say about Kinetic UI.
          </p>
        </div>
      </div>

      {/* Infinite scrolling testimonial wall */}
      <div className="flex flex-col gap-6 relative select-none">
        
        {/* Row 1 (Scroll Left) */}
        <div className="w-full overflow-hidden flex whitespace-nowrap">
          <div 
            className="flex gap-6 animate-marquee-third-left w-max"
            style={{ animationDuration: `${durationLeft}s` }}
          >
            {Array(3).fill(reviews1).flat().map((rev, idx) => renderCard(rev, idx))}
          </div>
        </div>

        {/* Row 2 (Scroll Right) */}
        <div className="w-full overflow-hidden flex whitespace-nowrap">
          <div 
            className="flex gap-6 animate-marquee-third-right w-max"
            style={{ animationDuration: `${durationRight}s` }}
          >
            {Array(3).fill(reviews2).flat().map((rev, idx) => renderCard(rev, idx))}
          </div>
        </div>

      </div>
    </section>
  );
}
