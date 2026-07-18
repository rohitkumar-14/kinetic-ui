'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticButton } from './magnetic-button';
import { Sparkles, Terminal, Copy, Check, FileCode, CheckCircle } from 'lucide-react';

export function DeveloperExperience() {
  const [copied, setCopied] = useState(false);
  const [activeFile, setActiveFile] = useState<'page.tsx' | 'style.css'>('page.tsx');

  const tsxCode = `import { MagneticButton } from '@/components/creative/magnetic-button';
import { Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-[300px]">
      <MagneticButton className="h-16 px-8 rounded-full bg-white text-black font-bold">
        <Sparkles className="w-5 h-5 mr-2" />
        Explore Component
      </MagneticButton>
    </div>
  );
}`;

  const cssCode = `@theme inline {
  --color-primary: var(--primary);
  --color-border: var(--border);
}

.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}`;

  const handleCopy = () => {
    const textToCopy = activeFile === 'page.tsx' ? tsxCode : cssCode;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-32 bg-black text-white relative">
      <div className="container mx-auto px-6 mb-20">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/30 border border-purple-500/20 text-xs text-purple-400 mb-6 backdrop-blur-md shadow-sm">
            <Terminal className="w-3.5 h-3.5" />
            <span>Developer Experience</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Designed for Creators, <br />Built for Developers
          </h2>
          <p className="text-zinc-400 text-sm md:text-base font-light">
            Integrating premium motions into your Next.js project is as simple as copying code. No complex physics formulas required.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Column 1: Terminal / Code Editor (col-span-7) */}
          <div className="lg:col-span-7 rounded-2xl bg-[#0b0b0c] border border-white/5 shadow-2xl flex flex-col justify-between overflow-hidden">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-zinc-950/80">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>

              {/* Tabs */}
              <div className="flex gap-4">
                <button 
                  onClick={() => setActiveFile('page.tsx')}
                  className={`flex items-center gap-1.5 text-xs font-semibold pb-1 border-b transition-colors ${
                    activeFile === 'page.tsx' 
                      ? 'border-indigo-500 text-indigo-400' 
                      : 'border-transparent text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5" />
                  page.tsx
                </button>
                <button 
                  onClick={() => setActiveFile('style.css')}
                  className={`flex items-center gap-1.5 text-xs font-semibold pb-1 border-b transition-colors ${
                    activeFile === 'style.css' 
                      ? 'border-indigo-500 text-indigo-400' 
                      : 'border-transparent text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5" />
                  globals.css
                </button>
              </div>

              {/* Copy Button */}
              <button 
                onClick={handleCopy}
                className="p-1.5 rounded-lg border border-white/5 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all flex items-center gap-1.5 text-xs font-medium"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Body */}
            <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto h-[320px] bg-zinc-950/30 flex items-start">
              {activeFile === 'page.tsx' ? (
                <pre className="text-zinc-300">
                  <code>
                    <span className="text-purple-400">import</span> {'{'} <span className="text-yellow-300">MagneticButton</span> {'}'} <span className="text-purple-400">from</span> <span className="text-emerald-400">&apos;@/components/creative/magnetic-button&apos;</span>;<br />
                    <span className="text-purple-400">import</span> {'{'} <span className="text-yellow-300">Sparkles</span> {'}'} <span className="text-purple-400">from</span> <span className="text-emerald-400">&apos;lucide-react&apos;</span>;<br />
                    <br />
                    <span className="text-purple-400">export default function</span> <span className="text-yellow-300">Home</span>() {'{'}<br />
                    &nbsp;&nbsp;<span className="text-purple-400">return</span> (<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">&lt;div</span> <span className="text-cyan-400">className</span>=<span className="text-emerald-400">&quot;flex items-center justify-center min-h-[300px]&quot;</span><span className="text-blue-400">&gt;</span><br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">&lt;MagneticButton</span> <span className="text-cyan-400">className</span>=<span className="text-emerald-400">&quot;h-16 px-8 rounded-full bg-white text-black font-bold&quot;</span><span className="text-blue-400">&gt;</span><br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">&lt;Sparkles</span> <span className="text-cyan-400">className</span>=<span className="text-emerald-400">&quot;w-5 h-5 mr-2&quot;</span> <span className="text-blue-400">/&gt;</span><br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Explore Component<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">&lt;/MagneticButton&gt;</span><br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">&lt;/div&gt;</span><br />
                    &nbsp;&nbsp;);<br />
                    {'}'}
                  </code>
                </pre>
              ) : (
                <pre className="text-zinc-300">
                  <code>
                    <span className="text-indigo-400">@theme</span> inline {'{'}<br />
                    &nbsp;&nbsp;--color-primary: <span className="text-cyan-400">var(--primary)</span>;<br />
                    &nbsp;&nbsp;--color-border: <span className="text-cyan-400">var(--border)</span>;<br />
                    {'}'}<br />
                    <br />
                    <span className="text-yellow-300">.glass</span> {'{'}<br />
                    &nbsp;&nbsp;background: <span className="text-emerald-400">rgba(255, 255, 255, 0.05)</span>;<br />
                    &nbsp;&nbsp;backdrop-filter: <span className="text-emerald-400">blur(16px)</span>;<br />
                    &nbsp;&nbsp;border: <span className="text-emerald-400">1px solid rgba(255, 255, 255, 0.1)</span>;<br />
                    {'}'}
                  </code>
                </pre>
              )}
            </div>
          </div>

          {/* Column 2: Live Preview Frame (col-span-5) */}
          <div className="lg:col-span-5 rounded-2xl border border-white/5 bg-[#0b0b0c] flex flex-col items-center justify-center p-8 relative overflow-hidden shadow-2xl min-h-[380px]">
            {/* Overlay simulation label */}
            <div className="absolute top-4 left-6 flex items-center gap-1.5 text-xs text-zinc-500 pointer-events-none select-none">
              <CheckCircle className="w-3.5 h-3.5 text-indigo-500" />
              <span>Live Rendering Output</span>
            </div>

            {/* Interactive Preview Canvas */}
            <div className="w-full h-full flex flex-col items-center justify-center gap-4">
              <MagneticButton className="h-16 px-8 rounded-full bg-white text-black font-bold text-base hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 mr-2 text-indigo-500" />
                Explore Component
              </MagneticButton>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest pointer-events-none select-none">
                Interactive Magnetics Enabled
              </span>
            </div>

            {/* Subtle glow background inside */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
}
