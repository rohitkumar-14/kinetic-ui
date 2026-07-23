"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, CheckCircle2, Loader2, AlertCircle, ChevronRight, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ToolCallStep {
  id: string;
  name: string;
  args: Record<string, any>;
  status: "pending" | "running" | "success" | "error";
  output?: string;
  executionTime?: string;
}

export interface AgentToolInspectorProps {
  steps?: ToolCallStep[];
  className?: string;
  title?: string;
}

const defaultSteps: ToolCallStep[] = [
  {
    id: "step-1",
    name: "search_database",
    args: { query: "user_preferences", limit: 5 },
    status: "success",
    output: '{"found": 3, "records": ["dark_mode", "notifications_enabled", "compact_layout"]}',
    executionTime: "120ms",
  },
  {
    id: "step-2",
    name: "generate_theme_tokens",
    args: { style: "cyberpunk", accent: "#6366f1" },
    status: "running",
    executionTime: "450ms",
  },
  {
    id: "step-3",
    name: "deploy_to_cdn",
    args: { region: "us-east", cache: true },
    status: "pending",
  },
];

export function AgentToolInspector({
  steps = defaultSteps,
  className,
  title = "Agent Execution Trace",
}: AgentToolInspectorProps) {
  const [selectedId, setSelectedId] = useState<string>(steps[0]?.id || "");

  const activeStep = steps.find((s) => s.id === selectedId) || steps[0];

  return (
    <div className={cn("w-full bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl font-mono text-xs text-zinc-300", className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/80 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-indigo-400" />
          <span className="font-bold text-white tracking-wide">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-full font-semibold uppercase">
            Live Subagent
          </span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-white/10 min-h-[300px]">
        {/* Step List */}
        <div className="md:col-span-5 p-3 space-y-2 bg-zinc-950/50">
          <div className="text-[10px] text-zinc-500 uppercase tracking-widest px-2 py-1">Tool Calls</div>
          {steps.map((step) => {
            const isSelected = step.id === selectedId;
            return (
              <motion.button
                key={step.id}
                onClick={() => setSelectedId(step.id)}
                whileHover={{ x: 2 }}
                className={cn(
                  "w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all",
                  isSelected
                    ? "bg-indigo-500/10 border-indigo-500/40 text-white shadow-lg"
                    : "bg-zinc-900/40 border-white/5 hover:border-white/10 text-zinc-400 hover:text-zinc-200"
                )}
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  {step.status === "success" && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                  {step.status === "running" && <Loader2 className="w-4 h-4 text-amber-400 animate-spin shrink-0" />}
                  {step.status === "error" && <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
                  {step.status === "pending" && <Play className="w-3.5 h-3.5 text-zinc-600 shrink-0" />}
                  <span className="font-semibold truncate">{step.name}</span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {step.executionTime && <span className="text-[10px] text-zinc-500">{step.executionTime}</span>}
                  <ChevronRight className={cn("w-3.5 h-3.5 transition-transform", isSelected && "rotate-90 text-indigo-400")} />
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Step Details */}
        <div className="md:col-span-7 p-4 bg-zinc-900/30 flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {activeStep && (
              <motion.div
                key={activeStep.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="space-y-4"
              >
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Arguments</div>
                  <pre className="p-3 rounded-xl bg-black/60 border border-white/10 text-indigo-300 overflow-x-auto text-[11px]">
                    {JSON.stringify(activeStep.args, null, 2)}
                  </pre>
                </div>

                {activeStep.output && (
                  <div>
                    <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Output Payload</div>
                    <pre className="p-3 rounded-xl bg-black/60 border border-emerald-500/20 text-emerald-300 overflow-x-auto text-[11px]">
                      {activeStep.output}
                    </pre>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
