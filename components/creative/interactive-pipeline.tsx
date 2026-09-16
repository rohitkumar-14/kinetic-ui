"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Milestone {
  id: string;
  title: string;
  description: string;
  yPosition: number; // percentage down the path (0 to 1)
}

const DEMO_MILESTONES: Milestone[] = [
  { id: "m1", title: "Project Kickoff", description: "Initial requirement gathering and team alignment.", yPosition: 0.1 },
  { id: "m2", title: "Design Phase", description: "Wireframing, prototyping, and user testing.", yPosition: 0.4 },
  { id: "m3", title: "Development", description: "Core engineering and sprint execution.", yPosition: 0.7 },
  { id: "m4", title: "Launch", description: "Final QA, deployment, and marketing rollout.", yPosition: 0.95 },
];

export function InteractivePipeline({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"] // start drawing when top hits center of screen, end when bottom hits center
  });

  return (
    <div ref={containerRef} className={cn("relative w-full max-w-2xl mx-auto py-24 min-h-[800px] font-sans", className)}>
      
      {/* Background track */}
      <div className="absolute left-[49px] top-24 bottom-24 w-1 bg-white/5 rounded-full" />
      
      {/* Animated glowing path */}
      <motion.div 
        className="absolute left-[49px] top-24 w-1 rounded-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.8)] origin-top"
        style={{ 
          scaleY: scrollYProgress,
          bottom: '6rem' // matches bottom-24 roughly, calculated via flex
        }}
      />

      {/* Nodes */}
      <div className="relative h-full w-full flex flex-col justify-between space-y-32">
        {DEMO_MILESTONES.map((milestone, idx) => {
          return (
            <MilestoneNode 
              key={milestone.id} 
              milestone={milestone} 
              progress={scrollYProgress} 
            />
          );
        })}
      </div>
    </div>
  );
}

function MilestoneNode({ milestone, progress }: { milestone: Milestone, progress: any }) {
  // We want the node to 'light up' when the scroll progress passes its yPosition
  // We add a tiny buffer so it lights up just as the line hits it
  const isComplete = useTransform(progress, (p: number) => p >= milestone.yPosition - 0.05);
  
  // Transform boolean to a color/opacity
  const scale = useTransform(isComplete, (c) => c ? 1 : 0.8);
  const opacity = useTransform(isComplete, (c) => c ? 1 : 0.4);
  const borderColor = useTransform(isComplete, (c) => c ? "rgba(99,102,241,1)" : "rgba(255,255,255,0.1)");
  const bgColor = useTransform(isComplete, (c) => c ? "rgba(99,102,241,0.2)" : "rgba(23,23,23,1)");

  return (
    <div className="relative flex items-start gap-8 w-full z-10">
      {/* Node Station */}
      <motion.div 
        className="relative flex items-center justify-center w-[100px] h-[40px] shrink-0 border-2 rounded-full backdrop-blur-sm z-10 transition-colors duration-300"
        style={{ scale, opacity, borderColor, backgroundColor: bgColor }}
      >
        <motion.div
          initial={{ scale: 0 }}
          style={{ scale: useTransform(isComplete, c => c ? 1 : 0) }}
          transition={{ type: "spring" }}
        >
          <Check size={18} className="text-indigo-400" />
        </motion.div>
        
        {/* Glow behind the node */}
        <motion.div 
          className="absolute inset-0 rounded-full bg-indigo-500 blur-md -z-10"
          style={{ opacity: useTransform(isComplete, c => c ? 0.4 : 0) }}
        />
      </motion.div>

      {/* Content */}
      <motion.div 
        className="pt-2"
        style={{ opacity }}
      >
        <h3 className="text-xl font-bold text-white mb-2">{milestone.title}</h3>
        <p className="text-neutral-400 leading-relaxed max-w-sm">{milestone.description}</p>
      </motion.div>
    </div>
  );
}
