'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Paperclip, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AiPromptInputProps {
  placeholder?: string;
  onSubmit?: (prompt: string) => void;
  className?: string;
}

export function AiPromptInput({
  placeholder = "Ask Kinetic AI anything or drop files here...",
  onSubmit,
  className,
}: AiPromptInputProps) {
  const [prompt, setPrompt] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    if (onSubmit) onSubmit(prompt);
    setPrompt('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('relative w-full max-w-2xl mx-auto group', className)}
    >
      {/* Animated Glowing Border Trace */}
      <div
        className={cn(
          'absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-20 blur transition-all duration-500 group-hover:opacity-60',
          isFocused && 'opacity-100 blur-md'
        )}
      />

      <div className="relative flex flex-col rounded-2xl bg-zinc-950/90 border border-zinc-800 p-3 shadow-2xl backdrop-blur-xl transition-colors">
        <div className="flex items-center gap-2 px-3 pt-2 text-zinc-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
          <span>Generative Assistant</span>
        </div>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          rows={2}
          className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none resize-none font-light"
        />

        <div className="flex items-center justify-between pt-2 border-t border-zinc-900/80 px-2">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
          >
            <Paperclip className="w-3.5 h-3.5" />
            <span>Attach File</span>
          </button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={!prompt.trim()}
            className={cn(
              'inline-flex items-center justify-center p-2 rounded-xl bg-indigo-600 text-white shadow-md transition-all disabled:opacity-30 disabled:pointer-events-none hover:bg-indigo-500',
              prompt.trim() && 'bg-gradient-to-r from-indigo-500 to-purple-600'
            )}
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </form>
  );
}
