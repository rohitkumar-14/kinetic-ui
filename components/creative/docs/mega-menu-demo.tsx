'use client';

import React from 'react';
import { MegaMenu } from '@/components/creative/mega-menu';
import { Layout, Palette, Code, Cpu, Globe, Lock } from 'lucide-react';

export function MegaMenuDemo({ animationDirection = "bottom" }: any) {
  const items = [
    {
      id: "products",
      label: "Products",
      children: [
        {
          label: "Design System",
          description: "Build consistent UI faster with our comprehensive design tokens and components.",
          href: "#",
          icon: <Palette className="w-5 h-5" />
        },
        {
          label: "UI Kit",
          description: "A complete set of pre-built, responsive React components.",
          href: "#",
          icon: <Layout className="w-5 h-5" />
        },
        {
          label: "API Services",
          description: "Powerful backend services for your next-generation applications.",
          href: "#",
          icon: <Cpu className="w-5 h-5" />
        },
        {
          label: "Global CDN",
          description: "Deliver content anywhere in the world with sub-millisecond latency.",
          href: "#",
          icon: <Globe className="w-5 h-5" />
        }
      ],
      featured: {
        title: "Introducing Studio v2.0",
        description: "The ultimate visual builder for modern web teams. Now with AI-assisted layout generation.",
        image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=3270&auto=format&fit=crop",
        href: "#"
      }
    },
    {
      id: "solutions",
      label: "Solutions",
      children: [
        {
          label: "For Developers",
          description: "APIs, SDKs, and tools built for modern engineering teams.",
          href: "#",
          icon: <Code className="w-5 h-5" />
        },
        {
          label: "Enterprise Security",
          description: "Bank-grade security and compliance for your most sensitive data.",
          href: "#",
          icon: <Lock className="w-5 h-5" />
        }
      ]
    },
    {
      id: "pricing",
      label: "Pricing",
      href: "#"
    },
    {
      id: "docs",
      label: "Documentation",
      href: "#"
    }
  ];

  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden border border-white/10 bg-zinc-950 p-8 flex flex-col justify-start pt-20">
      <MegaMenu items={items} animationDirection={animationDirection} />
    </div>
  );
}
