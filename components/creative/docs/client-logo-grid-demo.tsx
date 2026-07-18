'use client';

import React from 'react';
import { ClientLogoGrid } from '@/components/creative/client-logo-grid';

export function ClientLogoGridDemo() {
  const logos = [
    { id: 1, name: "Vercel", src: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Vercel_logo_black.svg" },
    { id: 2, name: "Figma", src: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" },
    { id: 3, name: "Stripe", src: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" },
    { id: 4, name: "Notion", src: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" },
    { id: 5, name: "GitHub", src: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" },
  ];

  return (
    <div className="w-full rounded-xl overflow-hidden border border-white/10 bg-zinc-950 p-8 min-h-[400px] flex flex-col justify-center gap-12">
      <div className="text-center">
        <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-8">
          Trusted by innovative teams worldwide
        </p>
        
        {/* We use a white background container in the demo since the logos are dark */}
        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
          <ClientLogoGrid logos={logos} />
        </div>
      </div>
    </div>
  );
}
