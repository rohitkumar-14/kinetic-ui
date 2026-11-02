'use client';

import * as React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Briefcase, 
  Target,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePlaygroundContext } from '@/components/creative/docs/playground-context';
import { MOCK_DATASETS, DatasetType, StylePresetType } from '@/lib/mock-datasets';

export interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  period?: string;
  icon?: React.ReactNode;
  sparklineData?: number[];
  stylePreset?: StylePresetType;
  className?: string;
}

export function MetricCard({
  title,
  value,
  change,
  trend,
  period = 'vs last month',
  icon,
  sparklineData = [24, 38, 30, 46, 52, 48, 65, 78],
  stylePreset: propStylePreset,
  className
}: MetricCardProps) {
  const context = usePlaygroundContext() || {};
  const activeStyle = propStylePreset || context.stylePreset || 'glass';
  const isUp = trend === 'up';

  // Generate SVG path for sparkline
  const min = Math.min(...sparklineData);
  const max = Math.max(...sparklineData);
  const range = max - min || 1;
  const width = 100;
  const height = 36;
  const points = sparklineData.map((val, i) => {
    const x = (i / (sparklineData.length - 1)) * width;
    const y = height - ((val - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  const styleClasses = 
    activeStyle === 'neon' ? 'bg-[#0a0a10] border border-indigo-500/40 shadow-[0_0_20px_rgba(99,102,241,0.25)]' :
    activeStyle === 'flat' ? 'bg-zinc-900 border border-zinc-800 shadow-sm' :
    activeStyle === 'borderless' ? 'bg-transparent border-0 shadow-none' :
    'bg-card/70 backdrop-blur-xl border border-border shadow-lg';

  return (
    <div className={cn(
      'relative p-5 rounded-2xl transition-all duration-300 group overflow-hidden',
      styleClasses,
      className
    )}>
      {/* Background glow accent */}
      <div className={cn(
        'absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none',
        isUp ? 'bg-emerald-500' : 'bg-rose-500'
      )} />

      <div className="flex items-center justify-between gap-4 mb-3">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</span>
        {icon && (
          <div className="w-8 h-8 rounded-xl bg-muted/60 border border-border flex items-center justify-center text-foreground group-hover:scale-110 transition-transform">
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-baseline justify-between gap-2">
        <div className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">{value}</div>
        
        {/* Sparkline mini chart */}
        <div className="w-20 h-7 opacity-70 group-hover:opacity-100 transition-opacity">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
            <polyline
              fill="none"
              stroke={isUp ? '#10b981' : '#f43f5e'}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
            />
          </svg>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border/50 text-xs">
        <span className={cn(
          'inline-flex items-center gap-1 font-semibold px-1.5 py-0.5 rounded-md text-[11px]',
          isUp ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'
        )}>
          {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {change}
        </span>
        <span className="text-muted-foreground text-[11px] font-light">{period}</span>
      </div>
    </div>
  );
}

export function MetricCardGrid({ 
  dataset: propDataset,
  stylePreset: propStylePreset,
  className 
}: { 
  dataset?: DatasetType;
  stylePreset?: StylePresetType;
  className?: string;
}) {
  const context = usePlaygroundContext() || {};
  const activeDataset = propDataset || context.dataset || 'saas';
  const activeStyle = propStylePreset || context.stylePreset || 'glass';
  const ds = MOCK_DATASETS[activeDataset] || MOCK_DATASETS.saas;

  const icons = [
    <DollarSign key="1" className="w-4 h-4 text-emerald-400" />,
    <Users key="2" className="w-4 h-4 text-indigo-400" />,
    <Briefcase key="3" className="w-4 h-4 text-sky-400" />,
    <Target key="4" className="w-4 h-4 text-amber-400" />
  ];

  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full', className)}>
      {ds.metrics.map((m, idx) => (
        <MetricCard
          key={m.title}
          title={m.title}
          value={m.value}
          change={m.change}
          trend={m.trend}
          period={m.period}
          icon={icons[idx % icons.length]}
          sparklineData={m.sparkline}
          stylePreset={activeStyle}
        />
      ))}
    </div>
  );
}
