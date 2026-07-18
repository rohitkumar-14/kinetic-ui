"use client";

import React, { useState } from "react";
import { GlassTabs } from "@/components/creative/glass-tabs";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Shield, Sparkles, Zap } from "lucide-react";

const TABS = [
  { id: "world", label: "World" },
  { id: "features", label: "Features" },
  { id: "security", label: "Security" },
  { id: "performance", label: "Performance" }
];

export function GlassTabsDemo({
  defaultTab = "world"
}: {
  defaultTab?: string;
}) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  React.useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  return (
    <div className="w-full relative h-[500px] rounded-3xl overflow-hidden bg-black flex flex-col items-center justify-center border border-white/10 shadow-2xl">
      
      {/* Vibrant Animated Background to showcase the refraction */}
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
        <motion.div 
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-600 rounded-full mix-blend-screen filter blur-[80px]"
        />
        <motion.div 
          animate={{ 
            rotate: -360,
            scale: [1, 1.5, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-pink-600 rounded-full mix-blend-screen filter blur-[100px]"
        />
      </div>

      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">
        
        {/* The Glass Tabs */}
        <div className="mb-12">
          <GlassTabs 
            tabs={TABS} 
            activeTab={activeTab} 
            onChange={setActiveTab} 
            // Scale it up slightly for the demo
            className="scale-110"
          />
        </div>

        {/* Tab Content Area */}
        <div className="w-full h-[200px] relative flex items-center justify-center">
          <AnimatePresence mode="wait">
            {activeTab === "world" && (
              <motion.div
                key="world"
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                className="flex flex-col items-center text-center px-4"
              >
                <Globe className="w-12 h-12 text-indigo-300 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Global Infrastructure</h3>
                <p className="text-white/60">Deployed across 35 regions worldwide for sub-50ms latency.</p>
              </motion.div>
            )}

            {activeTab === "features" && (
              <motion.div
                key="features"
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                className="flex flex-col items-center text-center px-4"
              >
                <Sparkles className="w-12 h-12 text-pink-300 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">AI-Powered Routing</h3>
                <p className="text-white/60">Automatically bypasses network congestion in real-time.</p>
              </motion.div>
            )}

            {activeTab === "security" && (
              <motion.div
                key="security"
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                className="flex flex-col items-center text-center px-4"
              >
                <Shield className="w-12 h-12 text-emerald-300 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Enterprise Security</h3>
                <p className="text-white/60">End-to-end encryption with zero-trust architecture.</p>
              </motion.div>
            )}

            {activeTab === "performance" && (
              <motion.div
                key="performance"
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                className="flex flex-col items-center text-center px-4"
              >
                <Zap className="w-12 h-12 text-amber-300 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Blazing Fast</h3>
                <p className="text-white/60">Powered by Rust and running entirely on the edge.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
