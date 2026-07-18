'use client';

import React, { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CliInstallCommandProps {
  componentName: string;
  className?: string;
}

export function CliInstallCommand({ componentName, className }: CliInstallCommandProps) {
  const [copied, setCopied] = useState(false);
  const command = `npx kinetic-ui add ${componentName}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("relative my-6", className)}>
      <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-4 py-3">
        <div className="flex items-center gap-3 overflow-x-auto text-sm">
          <Terminal className="w-4 h-4 text-muted-foreground shrink-0" />
          <code className="font-mono text-zinc-300 whitespace-nowrap">
            <span className="text-indigo-400">npx</span> kinetic-ui add {componentName}
          </code>
        </div>
        <button
          onClick={handleCopy}
          className="ml-4 shrink-0 flex items-center justify-center w-8 h-8 rounded-md bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white transition-colors"
          aria-label="Copy install command"
        >
          {copied ? (
            <Check className="w-4 h-4 text-emerald-400" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}
