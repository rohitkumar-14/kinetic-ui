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
import { TrustedBy } from '@/components/creative/trusted-by';
import { DarkModeShowcase } from '@/components/creative/dark-mode-showcase';
import { FaqSection } from '@/components/creative/faq-section';

const faqs = [
  {
    question: "Can I use Kinetic UI in commercial projects?",
    answer: "Yes, Kinetic UI is fully open-source under the MIT license. You can use it freely in personal, commercial, and client projects without any attribution required."
  },
  {
    question: "Do I need to install Framer Motion or GSAP?",
    answer: "Kinetic UI components explicitly list their dependencies. Most standard motion relies on Framer Motion, while high-performance scroll or 3D animations may use GSAP. The CLI automatically installs whatever is needed for the specific component you add."
  },
  {
    question: "Is this compatible with Next.js App Router?",
    answer: "Absolutely. All components are built with Next.js App Router in mind. Interactive components include the 'use client' directive out of the box, meaning they slot perfectly into your Server Components."
  },
  {
    question: "How does it affect bundle size?",
    answer: "Unlike traditional UI libraries that bundle everything, Kinetic UI is a copy-paste library. You only add the exact code you need. This keeps your bundle incredibly lean."
  },
  {
    question: "Is there built-in Dark Mode support?",
    answer: "Yes! Every single component uses Tailwind CSS variables that seamlessly adapt to your site's light or dark mode. Use the Theme Studio to customize these variables in seconds."
  }
];

export default function Home() {
  return (
    <main className="flex-1 w-full overflow-x-clip bg-background text-foreground transition-colors duration-300 relative">
      {/* 1. Hero Section */}
      <GravityGridHero 
        variant="dots" 
        title="Kinetic UI" 
        description="Production-ready motion components inspired by award-winning experiences. Powered by React, Tailwind CSS, GSAP, and Canvas physics." 
        primaryCtaHref="/docs" 
        secondaryCtaText="CLI Setup"
        secondaryCtaHref="/docs/installation"
      />

      {/* 1.5 Trusted By Logos */}
      <TrustedBy />

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

      {/* 7. Dark Mode Showcase */}
      <DarkModeShowcase />

      {/* 8. Developer Experience Section */}
      <DeveloperExperience />

      {/* 9. Testimonials */}
      <Testimonials />

      {/* 10. FAQ Section */}
      <FaqSection items={faqs} />

      {/* 11. Pricing Section */}
      <PricingCards />
    </main>
  );
}
