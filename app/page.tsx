'use client';

import * as React from 'react';
import { GravityGridHero } from '@/components/creative/hero/gravity-grid-hero';
import { InteractiveShowcase } from '@/components/creative/interactive-showcase';

import { CategoriesGrid } from '@/components/creative/categories-grid';
import { ComponentPlayground } from '@/components/creative/playground';
import { PerformanceStats } from '@/components/creative/performance-stats';
import { DeveloperExperience } from '@/components/creative/developer-experience';
import { Testimonials } from '@/components/creative/testimonials';
import { PricingCards } from '@/components/creative/pricing-cards';
import { PremiumShowcase } from '@/components/creative/premium-showcase';

export default function Home() {
  return (
    <main className="flex-1 w-full overflow-x-clip bg-background text-foreground transition-colors duration-300 relative">
      {/* 1. Hero Section */}
      <GravityGridHero 
        variant="dots" 
        title="Kinetic UI" 
        description="Production-ready motion components inspired by award-winning experiences. Powered by React, Tailwind CSS, GSAP, and Canvas physics." 
        primaryCtaHref="/docs" 
      />

      {/* 2. Interactive Component Showcase */}
      <InteractiveShowcase />

      {/* 2.5 Premium Showcase */}
      <PremiumShowcase />



      {/* 4. Categories Grid (bento grid) */}
      <CategoriesGrid />

      {/* 5. Component Playground */}
      <ComponentPlayground />

      {/* 6. Performance stats */}
      <PerformanceStats />

      {/* 8. Developer Experience Section */}
      <DeveloperExperience />

      {/* 9. Testimonials */}
      <Testimonials />

      {/* 10. Pricing Section */}
      <PricingCards />
    </main>
  );
}
