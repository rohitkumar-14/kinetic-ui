"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  ChevronRight, 
  BrainCircuit, 
  Search, 
  Database, 
  Code2,
  CheckCircle2,
  Clock
} from "lucide-react";

interface ThoughtStep {
  id: string;
  title: string;
  description?: string;
  duration?: string;
  type: "reasoning" | "tool" | "final";
  icon?: React.ReactNode;
  children?: ThoughtStep[];
}

const DEMO_THOUGHTS: ThoughtStep[] = [
  {
    id: "t1",
    title: "Analyzing request intent",
    type: "reasoning",
    icon: <BrainCircuit size={14} />,
    duration: "45ms",
    children: [
      {
        id: "t1-1",
        title: "Extracting entities: 'San Francisco', 'Weather', 'Next 3 days'",
        type: "tool",
        icon: <Code2 size={14} />
      }
    ]
  },
  {
    id: "t2",
    title: "Retrieving real-time weather data",
    type: "reasoning",
    icon: <BrainCircuit size={14} />,
    duration: "850ms",
    children: [
      {
        id: "t2-1",
        title: "Call weatherAPI(location: 'San Francisco', days: 3)",
        type: "tool",
        icon: <Search size={14} />
      },
      {
        id: "t2-2",
        title: "Parsing JSON response",
        type: "tool",
        icon: <Database size={14} />
      }
    ]
  },
  {
    id: "t3",
    title: "Formatting final response",
    type: "final",
    icon: <CheckCircle2 size={14} className="text-emerald-400" />,
    duration: "12ms"
  }
];

interface ReasoningTreeProps {
  steps?: ThoughtStep[];
  className?: string;
}

function TreeNode({ step, isLast }: { step: ThoughtStep; isLast: boolean }) {
  const [isOpen, setIsOpen] = useState(step.type === "reasoning");
  const hasChildren = step.children && step.children.length > 0;

  return (
    <div className="relative">
      {/* Vertical line connecting nodes */}
      {!isLast && (
        <div className="absolute left-[15px] top-8 bottom-[-16px] w-[2px] bg-white/5" />
      )}
      
      <div 
        className={cn(
          "relative flex items-start gap-4 p-2 rounded-lg transition-colors",
          hasChildren ? "cursor-pointer hover:bg-white/[0.02]" : ""
        )}
        onClick={() => hasChildren && setIsOpen(!isOpen)}
      >
        <div className={cn(
          "relative z-10 flex items-center justify-center w-8 h-8 rounded-full border shadow-sm",
          step.type === "final" ? "bg-emerald-500/10 border-emerald-500/20" :
          step.type === "tool" ? "bg-indigo-500/10 border-indigo-500/20" :
          "bg-neutral-900 border-white/10"
        )}>
          {step.icon || <BrainCircuit size={14} />}
        </div>
        
        <div className="flex-1 pt-1.5 pb-2">
          <div className="flex items-center justify-between">
            <h4 className={cn(
              "text-sm font-medium flex items-center gap-2",
              step.type === "final" ? "text-emerald-400" : "text-neutral-200"
            )}>
              {step.title}
            </h4>
            
            <div className="flex items-center gap-3 text-xs text-neutral-500">
              {step.duration && (
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {step.duration}
                </span>
              )}
              {hasChildren && (
                <motion.div
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <ChevronRight size={14} />
                </motion.div>
              )}
            </div>
          </div>
          
          {step.description && (
            <p className="mt-1 text-xs text-neutral-400">
              {step.description}
            </p>
          )}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {hasChildren && isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pl-12 pb-2 space-y-2">
              {step.children!.map((child, idx) => (
                <TreeNode 
                  key={child.id} 
                  step={child} 
                  isLast={idx === step.children!.length - 1} 
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ReasoningTree({ steps = DEMO_THOUGHTS, className }: ReasoningTreeProps) {
  return (
    <div className={cn("w-full bg-neutral-950 p-6 rounded-xl border border-white/10 font-sans", className)}>
      <div className="flex items-center gap-2 mb-6 text-sm font-medium text-neutral-400">
        <BrainCircuit size={16} className="text-indigo-400" />
        <span>Chain of Thought</span>
      </div>
      
      <div className="space-y-4">
        {steps.map((step, idx) => (
          <TreeNode key={step.id} step={step} isLast={idx === steps.length - 1} />
        ))}
      </div>
    </div>
  );
}
