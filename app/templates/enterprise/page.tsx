"use client";

import React, { useState } from "react";
import { HologramDisplay } from "@/components/creative/hologram-display";
import { CyberTerminal } from "@/components/creative/cyber-terminal";
import { GlassTabs } from "@/components/creative/glass-tabs";
import { GlowButton } from "@/components/creative/glow-button";
import { Sparkles } from "lucide-react";

export default function EnterpriseTemplate() {
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <div className="min-h-screen bg-[#020202] text-slate-300 font-sans selection:bg-cyan-900 selection:text-cyan-50">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full h-20 flex items-center justify-between px-8 z-50 border-b border-white/5 bg-[#020202]/80 backdrop-blur-xl">
        <div className="text-xl font-bold font-mono text-white tracking-widest flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          KINETIC.CORE
        </div>
        <div className="hidden lg:flex gap-8 text-sm font-mono tracking-wider">
          <a href="#" className="hover:text-cyan-400 transition-colors">INFRASTRUCTURE</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">MODELS</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">DOCS</a>
        </div>
        <GlowButton>Access Terminal</GlowButton>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-8 flex flex-col lg:flex-row items-center max-w-7xl mx-auto min-h-[90vh]">
        <div className="lg:w-1/2 flex flex-col gap-6 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 font-mono text-sm self-start">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            V2.0 CLUSTER ONLINE
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
            Deploy cognitive models at <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">hyperscale.</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
            The first decentralized compute network designed explicitly for generalized artificial intelligence workloads. Secure, global, and blazingly fast.
          </p>
          <div className="flex gap-4 mt-4">
            <GlowButton>Start Deploying</GlowButton>
            <button className="px-6 py-2 border border-slate-700 hover:border-slate-500 rounded-lg text-white font-medium transition-colors">
              Read Whitepaper
            </button>
          </div>
        </div>

        {/* 3D Hologram Display */}
        <div className="lg:w-1/2 w-full mt-12 lg:mt-0 relative">
          <div className="absolute inset-0 bg-cyan-500/10 blur-[100px] rounded-full" />
          <HologramDisplay color="#06b6d4" className="bg-transparent h-[600px]">
            <div className="w-full h-full border border-cyan-500/30 bg-cyan-950/20 backdrop-blur-md rounded-xl p-6 flex flex-col font-mono text-cyan-400 text-sm shadow-[0_0_50px_rgba(6,182,212,0.15)]">
              <div className="border-b border-cyan-500/30 pb-4 mb-4 flex justify-between">
                <span>NODE_STATUS: ACTIVE</span>
                <span className="animate-pulse">●</span>
              </div>
              <div className="flex-1 space-y-4">
                <div className="w-full bg-cyan-950/40 p-3 rounded">
                  {">"} ALLOCATING COMPUTE... [OK]
                </div>
                <div className="w-full bg-cyan-950/40 p-3 rounded">
                  {">"} INGESTING DATASTREAM... [OK]
                </div>
                <div className="w-full bg-cyan-950/40 p-3 rounded">
                  {">"} NEURAL SYNC COMPLETE.
                </div>
              </div>
              <div className="mt-auto h-2 bg-cyan-950 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-400 w-2/3 animate-pulse" />
              </div>
            </div>
          </HologramDisplay>
        </div>
      </section>

      {/* Interactive Tabs & Terminal */}
      <section className="py-32 px-8 bg-black/50 border-t border-white/5 relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3">
            <h2 className="text-3xl font-bold text-white mb-6">Unprecedented Control</h2>
            <p className="text-slate-400 mb-12 leading-relaxed">
              Manage your global clusters directly from the command line, or use our beautiful interface. We give you the primitives to build anything.
            </p>
            
            <GlassTabs 
              tabs={[
                { id: "tab1", label: "CLI Interface" },
                { id: "tab2", label: "Dashboard" },
                { id: "tab3", label: "API Reference" },
              ]}
              activeTab={activeTab}
              onChange={setActiveTab}
            />
          </div>

          <div className="lg:w-2/3">
            <CyberTerminal className="w-full h-[400px]" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center font-mono text-sm text-slate-500">
        SYSTEM.CORE.V2 // KINETIC UI EXCLUSIVE
      </footer>

    </div>
  );
}
