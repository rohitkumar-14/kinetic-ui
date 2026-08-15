'use client';

import React, { useState } from 'react';
import { Copy, Check, Palette, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function ThemeStudioPage() {
  const [colors, setColors] = useState({
    background: '#0a0a0a',
    foreground: '#ffffff',
    primary: '#6366f1',
    primaryForeground: '#ffffff',
    muted: '#27272a',
    mutedForeground: '#a1a1aa',
    border: '#27272a',
  });

  const [copied, setCopied] = useState(false);

  const cssTemplate = `:root {
  --background: ${colors.background};
  --foreground: ${colors.foreground};
  
  --primary: ${colors.primary};
  --primary-foreground: ${colors.primaryForeground};
  
  --muted: ${colors.muted};
  --muted-foreground: ${colors.mutedForeground};
  
  --border: ${colors.border};
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cssTemplate);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleColorChange = (key: keyof typeof colors, value: string) => {
    setColors(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full">
            Tooling
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">Theme Studio</h1>
        <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed font-light">
          Visually design your application's color palette. Export the CSS variables directly into your global stylesheet to theme all Kinetic UI components.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-6 bg-[#050505] border border-border p-6 rounded-2xl">
          <div className="flex items-center gap-2 mb-6 border-b border-border pb-4">
            <Palette className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-semibold text-white">Color Tokens</h2>
          </div>

          <div className="space-y-4">
            {Object.entries(colors).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <label className="text-sm font-medium text-zinc-300 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <div className="flex items-center gap-3">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20 shadow-sm shrink-0">
                    <input
                      type="color"
                      value={value}
                      onChange={(e) => handleColorChange(key as keyof typeof colors, e.target.value)}
                      className="absolute inset-[-10px] w-12 h-12 cursor-pointer"
                    />
                  </div>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleColorChange(key as keyof typeof colors, e.target.value)}
                    className="w-24 bg-zinc-900 border border-border rounded-lg px-2 py-1 text-xs font-mono text-white focus:outline-none focus:border-indigo-500 uppercase text-center"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-border mt-6">
            <Button onClick={handleCopy} className="w-full gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-500/20">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied CSS!" : "Export Global CSS"}
            </Button>
          </div>
        </div>

        {/* Live Preview */}
        <div className="lg:col-span-7 bg-[#050505] border border-border rounded-2xl overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(128,128,128,0.1)_1px,transparent_1px)] bg-[length:16px_16px] pointer-events-none" />
          
          <div className="p-4 border-b border-border bg-black/40 backdrop-blur flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2 text-sm text-zinc-400 font-medium">
              <Sparkles className="w-4 h-4" /> Live Preview
            </div>
          </div>

          <div 
            className="p-8 md:p-12 relative z-10 min-h-[500px]"
            style={{
              backgroundColor: colors.background,
              color: colors.foreground,
              '--primary': colors.primary,
              '--primary-foreground': colors.primaryForeground,
              '--muted': colors.muted,
              '--muted-foreground': colors.mutedForeground,
              '--border': colors.border,
            } as React.CSSProperties}
          >
            <div className="max-w-md mx-auto space-y-8">
              {/* Mock Dashboard Card */}
              <div 
                className="p-6 rounded-xl border shadow-xl"
                style={{ 
                  backgroundColor: colors.background, 
                  borderColor: colors.border 
                }}
              >
                <h3 className="text-xl font-bold mb-2">Welcome Back</h3>
                <p style={{ color: colors.mutedForeground }} className="text-sm mb-6 leading-relaxed">
                  Your components will automatically inherit these CSS variables when deployed.
                </p>

                <div className="space-y-4">
                  <div 
                    className="p-4 rounded-lg flex items-center justify-between"
                    style={{ backgroundColor: colors.muted }}
                  >
                    <span className="text-sm font-medium">Monthly Active Users</span>
                    <span className="text-lg font-bold" style={{ color: colors.primary }}>12,450</span>
                  </div>

                  <div className="flex gap-3">
                    <button 
                      className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-transform hover:scale-105 active:scale-95"
                      style={{ backgroundColor: colors.primary, color: colors.primaryForeground }}
                    >
                      Primary Action
                    </button>
                    <button 
                      className="flex-1 py-2.5 rounded-lg text-sm font-semibold border transition-colors"
                      style={{ 
                        backgroundColor: 'transparent', 
                        borderColor: colors.border,
                        color: colors.foreground
                      }}
                    >
                      Secondary
                    </button>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="flex justify-center gap-4">
                {[1, 2, 3].map(i => (
                  <div 
                    key={i}
                    className="w-12 h-12 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                    style={{ 
                      backgroundColor: colors.muted,
                      borderColor: colors.primary,
                      color: colors.foreground,
                      opacity: 1 - (i * 0.2)
                    }}
                  >
                    0{i}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
