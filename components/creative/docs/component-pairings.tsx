'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { sidebarContent } from '@/components/docs-sidebar';

const PAIRINGS_MAP: Record<string, string[]> = {
  'magnetic-button': ['cursor-follower', 'glow-button', 'text-reveal'],
  'hero-particles': ['floating-navbar', 'text-mask-hero', 'particle-explosion-button'],
  'floating-navbar': ['hero-3d', 'bento-grid', 'parallax-footer'],
  'bento-grid': ['spotlight-card', 'tilt-card', 'floating-3d-card'],
  'spotlight-card': ['bento-grid', 'mesh-gradient', 'glow-button'],
  // Fallbacks are calculated dynamically
};

export function ComponentPairings({ currentSlug }: { currentSlug: string }) {
  // 1. Get explicit pairings if they exist
  let pairingSlugs = PAIRINGS_MAP[currentSlug];

  // 2. If no explicit pairings, find items in the same category
  if (!pairingSlugs) {
    const allItems = sidebarContent.flatMap(g => g.sections.flatMap(s => s.items));
    const currentItem = allItems.find(i => i.href.includes(currentSlug));
    
    if (currentItem) {
      const section = sidebarContent.flatMap(g => g.sections).find(s => s.items.includes(currentItem));
      if (section) {
        pairingSlugs = section.items
          .filter(i => i.href !== currentItem.href)
          .map(i => i.href.split('/').pop() || '')
          .slice(0, 3);
      }
    }
  }

  // 3. Absolute fallback
  if (!pairingSlugs || pairingSlugs.length === 0) {
    pairingSlugs = ['magnetic-button', 'spotlight-card', 'hero-particles'];
  }

  // 4. Map slugs to actual items to get titles
  const allItems = sidebarContent.flatMap(g => g.sections.flatMap(s => s.items));
  const pairingItems = pairingSlugs.map(slug => {
    return allItems.find(i => i.href.endsWith(slug)) || { title: slug.replace(/-/g, ' '), href: `/docs/components/${slug}` };
  }).filter(Boolean);

  if (pairingItems.length === 0) return null;

  return (
    <div className="mt-20 border-t border-border pt-10 pb-20">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        Frequently Used With
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {pairingItems.slice(0, 3).map((item: any, i) => (
          <Link 
            key={i} 
            href={item.href}
            className="group flex flex-col p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
          >
            <span className="text-sm font-semibold text-zinc-200 group-hover:text-indigo-400 transition-colors">
              {item.title}
            </span>
            <div className="mt-auto pt-4 flex items-center justify-between text-xs text-zinc-500 font-medium">
              <span>View Component</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
