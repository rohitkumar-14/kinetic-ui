'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap } from 'lucide-react';

interface StatDialProps {
  score: number;
  label: string;
  color: string;
}

function StatDial({ score, label, color }: StatDialProps) {
  // SVG Ring values
  const radius = 50;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center">
        {/* Shadow/Glow effect */}
        <div 
          className="absolute inset-2 rounded-full blur-md opacity-25 pointer-events-none"
          style={{ backgroundColor: color }}
        />
        
        <svg viewBox="0 0 128 128" className="w-full h-full transform -rotate-90 overflow-visible">
          {/* Base track */}
          <circle
            className="text-zinc-900"
            strokeWidth={stroke}
            stroke="currentColor"
            fill="transparent"
            r={normalizedRadius}
            cx={64}
            cy={64}
          />
          {/* Active progress */}
          <motion.circle
            stroke={color}
            strokeWidth={stroke}
            fill="transparent"
            r={normalizedRadius}
            cx={64}
            cy={64}
            strokeDasharray={circumference + ' ' + circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </svg>
        <span className="absolute text-xl sm:text-2xl font-bold font-mono text-white">
          {score}
        </span>
      </div>
      <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-zinc-400 uppercase text-center w-24 sm:w-32 break-words leading-tight">
        {label}
      </span>
    </div>
  );
}

export interface LighthouseAuditsProps {
  auditCount?: number;
  performance?: number;
  accessibility?: number;
  bestPractices?: number;
  seo?: number;
  color?: string;
}

export function LighthouseAudits({
  auditCount = 4,
  performance = 99,
  accessibility = 100,
  bestPractices = 100,
  seo = 100,
  color = "#10b981"
}: LighthouseAuditsProps) {
  
  return (
    <div className="w-full max-w-3xl mx-auto glass p-6 sm:p-10 rounded-3xl border border-white/5 bg-zinc-950/40 relative overflow-hidden">
      <div className="absolute top-4 left-6 flex items-center gap-2 text-xs text-zinc-500 z-10">
        <ShieldCheck className="w-4 h-4" style={{ color }} />
        <span>Google Lighthouse Audits</span>
      </div>
      
      <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-8 sm:gap-10 relative z-10">
        {auditCount >= 1 && <StatDial score={performance} label="Performance" color={color} />}
        {auditCount >= 2 && <StatDial score={accessibility} label="Accessibility" color={color} />}
        {auditCount >= 3 && <StatDial score={bestPractices} label="Best Practices" color={color} />}
        {auditCount >= 4 && <StatDial score={seo} label="SEO" color={color} />}
      </div>
    </div>
  );
}
