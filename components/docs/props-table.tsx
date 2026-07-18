'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface PropDef {
  name: string;
  type: string;
  default?: string;
  description: string;
}

interface PropsTableProps {
  props?: PropDef[];
  data?: PropDef[];
  className?: string;
}

export function PropsTable(reactProps: any) {
  const { props, data, className } = reactProps;
  const finalProps = props || data || [];

  return (
    <div className={cn("my-8 overflow-x-auto rounded-xl border border-border bg-card shadow-sm", className)}>
      <table className="w-full text-left text-sm border-collapse">
        <thead>
          <tr className="border-b border-border bg-muted/40">
            <th className="px-4 py-3 font-semibold text-foreground">Prop</th>
            <th className="px-4 py-3 font-semibold text-foreground">Type</th>
            <th className="px-4 py-3 font-semibold text-foreground">Default</th>
            <th className="px-4 py-3 font-semibold text-foreground">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {finalProps.map((prop: PropDef, index: number) => (
            <tr key={index} className="hover:bg-muted/20 transition-colors">
              <td className="px-4 py-3 align-top">
                <code className="text-[13px] font-mono font-medium text-indigo-400">
                  {prop.name}
                </code>
              </td>
              <td className="px-4 py-3 align-top">
                <code className="text-[12px] font-mono text-zinc-400 bg-zinc-900 px-1.5 py-0.5 rounded border border-white/5">
                  {prop.type}
                </code>
              </td>
              <td className="px-4 py-3 align-top">
                {prop.default ? (
                  <code className="text-[13px] font-mono text-zinc-500">
                    {prop.default}
                  </code>
                ) : (
                  <span className="text-zinc-600 text-[13px] italic">-</span>
                )}
              </td>
              <td className="px-4 py-3 align-top text-muted-foreground leading-relaxed">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
