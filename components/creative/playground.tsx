'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticButton } from './magnetic-button';
import { Sparkles, Sliders, Play, Settings } from 'lucide-react';

export function ComponentPlayground() {
  const [activeTab, setActiveTab] = useState<'button' | 'loader' | 'aurora'>('button');
  
  // Custom states for Playground parameters
  const [btnStiffness, setBtnStiffness] = useState(150);
  const [btnDamping, setBtnDamping] = useState(15);
  const [btnPull, setBtnPull] = useState(0.4);

  const [loaderText, setLoaderText] = useState('KINETIC');
  const [loaderSpeed, setLoaderSpeed] = useState(1.5);
  const [loaderScale, setLoaderScale] = useState(1.2);

  const [auroraBlur, setAuroraBlur] = useState(80);
  const [auroraSize, setAuroraSize] = useState(180);
  const [auroraPreset, setAuroraPreset] = useState<'indigo' | 'rose' | 'emerald'>('indigo');

  return (
    <section id="playground" className="py-32 bg-zinc-950 text-white relative">
      <div className="container mx-auto px-6 mb-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs text-indigo-300 mb-6 backdrop-blur-md shadow-sm">
            <Sliders className="w-3.5 h-3.5 text-indigo-400" />
            <span>Interactive Laboratory</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Interactive Playground
          </h2>
          <p className="text-zinc-400 text-sm md:text-base font-light">
            Twist the physics knobs, change properties, and feel the direct response in real time before importing them.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 glass rounded-3xl border border-white/5 overflow-hidden">
          
          {/* Left panel: Controls (col-span-5) */}
          <div className="lg:col-span-5 p-8 border-b lg:border-b-0 lg:border-r border-white/5 bg-zinc-950/50 flex flex-col justify-between">
            <div>
              {/* Tab Selector */}
              <div className="flex gap-2 p-1 bg-zinc-900/50 rounded-xl border border-white/5 mb-8">
                {(['button', 'loader', 'aurora'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                      activeTab === tab 
                        ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/10' 
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Dynamic Controls based on tab */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-sm text-zinc-300 font-semibold mb-4">
                  <Settings className="w-4 h-4 text-indigo-400" />
                  <span>Configure Settings</span>
                </div>

                {activeTab === 'button' && (
                  <>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-zinc-400">
                        <span>Spring Stiffness</span>
                        <span>{btnStiffness}</span>
                      </div>
                      <input 
                        type="range" min="50" max="300" step="10"
                        value={btnStiffness} onChange={(e) => setBtnStiffness(Number(e.target.value))}
                        className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-zinc-400">
                        <span>Spring Damping</span>
                        <span>{btnDamping}</span>
                      </div>
                      <input 
                        type="range" min="5" max="40" step="1"
                        value={btnDamping} onChange={(e) => setBtnDamping(Number(e.target.value))}
                        className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-zinc-400">
                        <span>Magnetic Pull Scale</span>
                        <span>{btnPull.toFixed(2)}</span>
                      </div>
                      <input 
                        type="range" min="0.1" max="0.9" step="0.05"
                        value={btnPull} onChange={(e) => setBtnPull(Number(e.target.value))}
                        className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                      />
                    </div>
                  </>
                )}

                {activeTab === 'loader' && (
                  <>
                    <div className="space-y-2">
                      <label className="text-xs text-zinc-400 block">Loader Text</label>
                      <input 
                        type="text" 
                        value={loaderText} 
                        onChange={(e) => setLoaderText(e.target.value.toUpperCase().slice(0, 16))}
                        className="w-full px-4 py-2 rounded-xl bg-zinc-900 border border-white/5 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-zinc-400">
                        <span>Pulse Speed</span>
                        <span>{loaderSpeed}s</span>
                      </div>
                      <input 
                        type="range" min="0.5" max="3" step="0.1"
                        value={loaderSpeed} onChange={(e) => setLoaderSpeed(Number(e.target.value))}
                        className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-zinc-400">
                        <span>Hover Scale</span>
                        <span>{loaderScale}x</span>
                      </div>
                      <input 
                        type="range" min="1" max="1.6" step="0.05"
                        value={loaderScale} onChange={(e) => setLoaderScale(Number(e.target.value))}
                        className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                      />
                    </div>
                  </>
                )}

                {activeTab === 'aurora' && (
                  <>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-zinc-400">
                        <span>Blur Amount</span>
                        <span>{auroraBlur}px</span>
                      </div>
                      <input 
                        type="range" min="40" max="160" step="5"
                        value={auroraBlur} onChange={(e) => setAuroraBlur(Number(e.target.value))}
                        className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-zinc-400">
                        <span>Orb Radius</span>
                        <span>{auroraSize}px</span>
                      </div>
                      <input 
                        type="range" min="100" max="300" step="10"
                        value={auroraSize} onChange={(e) => setAuroraSize(Number(e.target.value))}
                        className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-zinc-400 block mb-2">Color Preset</label>
                      <div className="flex gap-2">
                        {(['indigo', 'rose', 'emerald'] as const).map((preset) => (
                          <button
                            key={preset}
                            onClick={() => setAuroraPreset(preset)}
                            className={`flex-1 py-1.5 rounded-lg border text-xs capitalize transition-colors ${
                              auroraPreset === preset 
                                ? 'bg-indigo-500/10 border-indigo-500 text-indigo-300' 
                                : 'border-white/5 hover:border-white/10 text-zinc-400'
                            }`}
                          >
                            {preset}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center text-xs text-zinc-500">
              <span>Import package:</span>
              <code className="bg-zinc-900 px-2 py-1 rounded text-zinc-300">@/components/creative/...</code>
            </div>
          </div>

          {/* Right panel: Live Preview Canvas (col-span-7) */}
          <div className="lg:col-span-7 h-96 md:h-[450px] bg-black relative flex items-center justify-center overflow-hidden">
            {/* Ambient Background grid */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[length:16px_16px] pointer-events-none" />

            <AnimatePresence mode="wait">
              {activeTab === 'button' && (
                <motion.div
                  key="button"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full h-full flex flex-col items-center justify-center gap-6"
                >
                  <MagneticButton 
                    magneticPull={btnPull} 
                    className="h-16 px-10 rounded-full bg-white text-black font-semibold text-lg hover:scale-105"
                    style={{
                      transition: 'background-color 0.3s'
                    }}
                  >
                    Hover & Pull Me
                  </MagneticButton>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest pointer-events-none">
                    Responsive Spring Active
                  </span>
                </motion.div>
              )}

              {activeTab === 'loader' && (
                <motion.div
                  key="loader"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full h-full flex flex-col items-center justify-center gap-6"
                >
                  <motion.div 
                    whileHover={{ scale: loaderScale }}
                    transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                    className="text-4xl md:text-5xl font-black tracking-widest cursor-pointer select-none text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-pink-400 to-cyan-400"
                    style={{
                      animation: `pulse ${loaderSpeed}s infinite ease-in-out`
                    }}
                  >
                    {loaderText}
                  </motion.div>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest pointer-events-none">
                    Hover to trigger spring zoom
                  </span>
                </motion.div>
              )}

              {activeTab === 'aurora' && (
                <motion.div
                  key="aurora"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full flex items-center justify-center relative"
                >
                  {/* Dynamic Glowing Aurora Orb */}
                  <motion.div 
                    animate={{
                      x: [0, 40, -40, 0],
                      y: [0, -40, 40, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                    style={{
                      width: auroraSize,
                      height: auroraSize,
                      filter: `blur(${auroraBlur}px)`,
                    }}
                    className={`rounded-full opacity-65 ${
                      auroraPreset === 'indigo' ? 'bg-indigo-500' : 
                      auroraPreset === 'rose' ? 'bg-pink-500' : 'bg-emerald-500'
                    }`}
                  />

                  {/* Secondary orb */}
                  <motion.div 
                    animate={{
                      x: [0, -50, 50, 0],
                      y: [0, 50, -50, 0],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                    style={{
                      width: auroraSize * 0.8,
                      height: auroraSize * 0.8,
                      filter: `blur(${auroraBlur}px)`,
                    }}
                    className={`rounded-full opacity-45 absolute ${
                      auroraPreset === 'indigo' ? 'bg-cyan-500' : 
                      auroraPreset === 'rose' ? 'bg-purple-500' : 'bg-teal-500'
                    }`}
                  />

                  <div className="z-10 flex flex-col items-center gap-2">
                    <span className="text-sm font-semibold tracking-wider bg-zinc-950/80 px-4 py-2 border border-zinc-800 rounded-full backdrop-blur-md">
                      Atmosphere Ambient Card
                    </span>
                    <span className="text-[10px] text-zinc-400 uppercase tracking-widest">
                      Smooth dynamic gradients
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
