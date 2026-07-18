'use client';

import React from 'react';
import { StatsSection } from '@/components/creative/stats-section';
import { Users, Globe, Zap, Heart } from 'lucide-react';

export function StatsSectionDemo({ layout = "row" }: any) {
  const stats = [
    { 
      value: 2.5, 
      label: "Million Users", 
      suffix: "M+", 
      decimals: 1,
      icon: <Users className="w-6 h-6" />
    },
    { 
      value: 99.9, 
      label: "Uptime", 
      suffix: "%", 
      decimals: 1,
      icon: <Zap className="w-6 h-6" />
    },
    { 
      value: 120, 
      label: "Countries", 
      prefix: "",
      icon: <Globe className="w-6 h-6" />
    },
    { 
      value: 10, 
      label: "5-Star Ratings",
      suffix: "K+",
      icon: <Heart className="w-6 h-6" />
    }
  ];

  return (
    <div className="w-full rounded-xl overflow-hidden border border-white/10 bg-zinc-950 p-8 min-h-[400px] flex items-center justify-center">
      <div className="w-full max-w-5xl">
        <StatsSection stats={stats} layout={layout} />
      </div>
    </div>
  );
}
