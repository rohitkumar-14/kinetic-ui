"use client";

import React from "react";
import { motion } from "framer-motion";
import { SvgGooeyFilter } from "@/components/creative/svg-gooey-filter";

export default function SvgGooeyFilterDemo() {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[500px] bg-zinc-950 border border-white/10 rounded-xl p-8 overflow-hidden">
      
      <div className="text-center z-10 mb-12">
        <h2 className="text-2xl font-bold text-white mb-2">SVG Gooey Filter</h2>
        <p className="text-zinc-400 max-w-sm mb-4">
          Hover over these elements. They use an invisible SVG filter to physically merge and bridge together like liquid slime.
        </p>
      </div>

      <SvgGooeyFilter className="h-64 flex items-center justify-center">
        {/* Central Core */}
        <motion.div 
          className="absolute w-32 h-32 bg-rose-500 rounded-full flex items-center justify-center font-bold text-white z-10"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          Hover Me
        </motion.div>

        {/* Orbiting Satellite 1 */}
        <motion.div 
          className="absolute w-20 h-20 bg-rose-500 rounded-full"
          animate={{ 
            x: [80, 120, -100, 80],
            y: [-50, 50, -20, -50] 
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />

        {/* Orbiting Satellite 2 */}
        <motion.div 
          className="absolute w-24 h-24 bg-rose-500 rounded-full"
          animate={{ 
            x: [-100, -50, 100, -100],
            y: [50, -80, 50, 50] 
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        />

        {/* Interactive Follower */}
        <InteractiveGooBubble />
      </SvgGooeyFilter>

    </div>
  );
}

function InteractiveGooBubble() {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  return (
    <motion.div 
      className="absolute w-28 h-28 bg-rose-500 rounded-full cursor-pointer hover:bg-rose-400 transition-colors z-20"
      drag
      dragConstraints={{ left: -150, right: 150, top: -100, bottom: 100 }}
      whileDrag={{ scale: 1.2 }}
    />
  );
}
