'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Terminal, 
  Copy, 
  Check, 
  ExternalLink, 
  Cpu, 
  ShieldAlert, 
  Sparkles,
  Zap,
  Accessibility
} from 'lucide-react';
import { FlipBoard } from '@/components/creative/flip-board';
import { FlipBoardDemo } from '@/components/creative/docs/flip-board-demo';

interface DocsPageClientProps {
  slug: string;
  title: string;
  category: string;
  children: React.ReactNode;
}

export function DocsPageClient({ slug, title, category, children }: DocsPageClientProps) {
  const [copiedCLI, setCopiedCLI] = useState(false);

  const cliCommand = `npx @kinetic-ui/cli add ${slug}`;

  const handleCopyCLI = () => {
    navigator.clipboard.writeText(cliCommand);
    setCopiedCLI(true);
    setTimeout(() => setCopiedCLI(false), 2000);
  };

  // StackBlitz & CodeSandbox URLs (pre-configured templates)
  const stackblitzUrl = `https://stackblitz.com/edit/nextjs-kinetic?file=components/creative/${slug}.tsx`;
  const codesandboxUrl = `https://codesandbox.io/s/nextjs-kinetic-demo?file=/components/creative/${slug}.tsx`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-12"
    >
      {/* 1-Click Install & Sandbox Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl border border-white/5 bg-zinc-950/50 backdrop-blur-md">
        
        {/* CLI Prompt */}
        <div className="space-y-2 flex-1">
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            CLI Installation
          </span>
          <div className="flex items-center justify-between bg-black px-4 py-2.5 rounded-xl border border-white/5 font-mono text-xs text-zinc-300">
            <code>{cliCommand}</code>
            <button 
              onClick={handleCopyCLI}
              className="text-zinc-500 hover:text-white transition-colors pl-4"
            >
              {copiedCLI ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main MDX Content */}
      <article className="prose prose-invert max-w-none">
        {children}
      </article>

      {/* Performance & Accessibility checklists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 border-t border-white/5">
        
        {/* Performance Box */}
        <div className="p-6 rounded-2xl border border-white/5 bg-zinc-950/30 space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-400">
            <Zap className="w-4.5 h-4.5" />
            <span>Performance Notes</span>
          </div>
          <ul className="text-xs text-zinc-400 space-y-2.5 font-light leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5" />
              <span>Uses CSS hardware acceleration via GPU transform-binds.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5" />
              <span>Damped interpolation minimizes paint-redraw flashes.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5" />
              <span>Tree-shakable import: only compiles elements requested.</span>
            </li>
          </ul>
        </div>

        {/* Accessibility Box */}
        <div className="p-6 rounded-2xl border border-white/5 bg-zinc-950/30 space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-indigo-400">
            <Accessibility className="w-4.5 h-4.5" />
            <span>Accessibility Notes</span>
          </div>
          <ul className="text-xs text-zinc-400 space-y-2.5 font-light leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5" />
              <span>Full keyboard focus-ring navigation support (`Tab`/`Shift+Tab`).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5" />
              <span>ARIA roles mapped correctly for assistive screen readers.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5" />
              <span>Respects `prefers-reduced-motion` system toggles.</span>
            </li>
          </ul>
        </div>

      </div>
      
    </motion.div>
  );
}
