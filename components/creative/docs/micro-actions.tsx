'use client';

import React, { useState } from 'react';
import { Terminal, Code, Package, Check, Play, ExternalLink } from 'lucide-react';

export function MicroActions({ 
  slug, 
  dependencies 
}: { 
  slug: string, 
  dependencies: string[] 
}) {
  const [copiedCLI, setCopiedCLI] = useState(false);
  const [copiedImport, setCopiedImport] = useState(false);
  const [copiedDeps, setCopiedDeps] = useState(false);

  const handleCopy = (text: string, setter: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  const cliCommand = `npx kinetic-ui-cli@latest add ${slug}`;
  const importCommand = `import { Component } from "@/components/creative/${slug}";`;
  const depsCommand = dependencies.length > 0 ? `npm i ${dependencies.join(' ')}` : '';

  return (
    <div className="flex flex-wrap items-center gap-3 mt-6 mb-8 border-y border-white/5 py-4">
      <div className="flex items-center gap-2 pr-4 border-r border-white/10">
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Quick Actions</span>
      </div>

      <button
        onClick={() => handleCopy(cliCommand, setCopiedCLI)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-colors group"
        title="Copy CLI Command"
      >
        {copiedCLI ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Terminal className="w-3.5 h-3.5 text-indigo-400 group-hover:text-indigo-300" />}
        <span>CLI</span>
      </button>

      <button
        onClick={() => handleCopy(importCommand, setCopiedImport)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-colors group"
        title="Copy Import Statement"
      >
        {copiedImport ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Code className="w-3.5 h-3.5 text-sky-400 group-hover:text-sky-300" />}
        <span>Import</span>
      </button>

      {depsCommand && (
        <button
          onClick={() => handleCopy(depsCommand, setCopiedDeps)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-colors group"
          title="Copy Dependencies"
        >
          {copiedDeps ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Package className="w-3.5 h-3.5 text-amber-400 group-hover:text-amber-300" />}
          <span>Deps</span>
        </button>
      )}

      {/* Cloud Sandboxes */}
      <div className="flex items-center gap-2 pl-2 ml-auto">
        <a
          href="https://stackblitz.com/github/rohitkumar-14/kinetic-ui"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-white/5"
        >
          <Play className="w-3 h-3" />
          StackBlitz
        </a>
        <a
          href="https://codesandbox.io/s/github/rohitkumar-14/kinetic-ui"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-white/5"
        >
          <ExternalLink className="w-3 h-3" />
          CodeSandbox
        </a>
      </div>
    </div>
  );
}
