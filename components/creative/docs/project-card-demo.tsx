'use client';

import React from 'react';
import { ProjectCard } from '@/components/creative/project-card';

export function ProjectCardDemo() {
  return (
    <div className="w-full rounded-xl overflow-hidden border border-white/10 bg-zinc-950 p-8 min-h-[500px] flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <ProjectCard 
          title="VibeData Analytics"
          description="A complete overhaul of the dashboard experience, featuring real-time data visualization and generative AI insights."
          image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=3270&auto=format&fit=crop"
          tags={["Dashboard", "Web App", "AI"]}
        />
        
        <ProjectCard 
          title="Lumina Studio"
          description="E-commerce storefront for a high-end lighting brand. Includes 3D product viewers and physics-based interactions."
          image="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=3269&auto=format&fit=crop"
          tags={["E-Commerce", "Branding", "WebGL"]}
        />
      </div>
    </div>
  );
}
