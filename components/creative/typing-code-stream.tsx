'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Terminal, Check } from 'lucide-react';

export interface TypingCodeStreamProps {
  codeString?: string;
  className?: string;
  speed?: number;
}

export function TypingCodeStream({
  codeString = `import { HeroParticles } from "@/components/creative/hero-particles";\n\nexport default function App() {\n  return <HeroParticles themePreset="constellation" />;\n}`,
  className,
  speed = 30,
}: TypingCodeStreamProps) {
  const [displayed, setDisplayed] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setIsDone(false);
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < codeString.length) {
        setDisplayed((prev) => prev + codeString.charAt(idx));
        idx++;
      } else {
        setIsDone(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [codeString, speed]);

  return (
    <div className={cn('w-full max-w-2xl mx-auto rounded-2xl border border-zinc-800 bg-zinc-950 p-5 shadow-2xl font-mono text-xs text-white overflow-hidden', className)}>
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4 text-zinc-400">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-indigo-400" />
          <span className="text-[11px] font-semibold text-zinc-300">streaming-code.tsx</span>
        </div>
        <span className={cn('text-[10px] px-2 py-0.5 rounded font-bold uppercase', isDone ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 animate-pulse')}>
          {isDone ? 'Completed' : 'Streaming...'}
        </span>
      </div>

      <pre className="whitespace-pre-wrap leading-relaxed text-zinc-300">
        <code>{displayed}</code>
        {!isDone && <span className="inline-block w-2 h-4 ml-0.5 bg-indigo-400 animate-pulse align-middle" />}
      </pre>
    </div>
  );
}
