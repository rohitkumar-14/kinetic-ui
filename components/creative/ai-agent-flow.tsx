"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  Database, 
  BrainCircuit, 
  Globe, 
  MessageSquare, 
  Settings2,
  CheckCircle2,
  Loader2,
  Terminal
} from "lucide-react";

type NodeStatus = "idle" | "processing" | "success" | "error";

interface NodeData {
  id: string;
  type: string;
  label: string;
  icon: React.ReactNode;
  x: number;
  y: number;
  status: NodeStatus;
}

interface EdgeData {
  id: string;
  source: string;
  target: string;
  active: boolean;
}

interface AIAgentFlowProps {
  className?: string;
}

const INITIAL_NODES: NodeData[] = [
  { id: "input", type: "trigger", label: "User Request", icon: <MessageSquare size={16} />, x: 50, y: 150, status: "idle" },
  { id: "router", type: "logic", label: "Intent Router", icon: <BrainCircuit size={16} />, x: 250, y: 150, status: "idle" },
  { id: "search", type: "tool", label: "Web Search", icon: <Globe size={16} />, x: 450, y: 50, status: "idle" },
  { id: "db", type: "tool", label: "Vector DB", icon: <Database size={16} />, x: 450, y: 250, status: "idle" },
  { id: "llm", type: "process", label: "LLM Synthesizer", icon: <Terminal size={16} />, x: 650, y: 150, status: "idle" },
  { id: "output", type: "action", label: "Final Response", icon: <CheckCircle2 size={16} />, x: 850, y: 150, status: "idle" },
];

const INITIAL_EDGES: EdgeData[] = [
  { id: "e1", source: "input", target: "router", active: false },
  { id: "e2", source: "router", target: "search", active: false },
  { id: "e3", source: "router", target: "db", active: false },
  { id: "e4", source: "search", target: "llm", active: false },
  { id: "e5", source: "db", target: "llm", active: false },
  { id: "e6", source: "llm", target: "output", active: false },
];

export function AIAgentFlow({ className }: AIAgentFlowProps) {
  const [nodes, setNodes] = useState<NodeData[]>(INITIAL_NODES);
  const [edges, setEdges] = useState<EdgeData[]>(INITIAL_EDGES);
  const [isRunning, setIsRunning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const runSimulation = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setNodes(prev => prev.map(n => ({ ...n, status: "idle" })));
    setEdges(prev => prev.map(e => ({ ...e, active: false })));

    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
    const updateNode = (id: string, status: NodeStatus) => {
      setNodes(prev => prev.map(n => n.id === id ? { ...n, status } : n));
    };
    const updateEdge = (id: string, active: boolean) => {
      setEdges(prev => prev.map(e => e.id === id ? { ...e, active } : e));
    };

    updateNode("input", "processing");
    await delay(800);
    updateNode("input", "success");
    updateEdge("e1", true);
    updateNode("router", "processing");
    
    await delay(1000);
    updateEdge("e1", false);
    updateNode("router", "success");
    updateEdge("e2", true);
    updateEdge("e3", true);
    updateNode("search", "processing");
    updateNode("db", "processing");

    await delay(1500);
    updateEdge("e2", false);
    updateEdge("e3", false);
    updateNode("search", "success");
    updateNode("db", "success");
    updateEdge("e4", true);
    updateEdge("e5", true);
    updateNode("llm", "processing");

    await delay(2000);
    updateEdge("e4", false);
    updateEdge("e5", false);
    updateNode("llm", "success");
    updateEdge("e6", true);
    updateNode("output", "processing");

    await delay(1000);
    updateEdge("e6", false);
    updateNode("output", "success");

    setIsRunning(false);
  };

  useEffect(() => {
    runSimulation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative w-full h-[400px] bg-neutral-950 rounded-xl border border-white/10 overflow-hidden font-sans",
        className
      )}
    >
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "24px 24px"
        }}
      />

      {/* SVG Canvas for Edges */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="edge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {edges.map(edge => {
          const sourceNode = nodes.find(n => n.id === edge.source);
          const targetNode = nodes.find(n => n.id === edge.target);
          if (!sourceNode || !targetNode) return null;

          const startX = sourceNode.x + 160; 
          const startY = sourceNode.y + 24;
          const endX = targetNode.x;
          const endY = targetNode.y + 24;
          const cp1X = startX + (endX - startX) / 2;
          const cp1Y = startY;
          const cp2X = startX + (endX - startX) / 2;
          const cp2Y = endY;

          const pathD = `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;

          return (
            <g key={edge.id}>
              <path d={pathD} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={2} />
              {edge.active && (
                <g>
                  <motion.path
                    d={pathD}
                    fill="none"
                    stroke="url(#edge-gradient)"
                    strokeWidth={3}
                    filter="url(#glow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: "linear", repeat: Infinity }}
                  />
                  <circle r="4" fill="#fff" filter="url(#glow)">
                    <animateMotion dur="1s" repeatCount="indefinite" path={pathD} />
                  </circle>
                </g>
              )}
            </g>
          );
        })}
      </svg>

      {nodes.map(node => (
        <motion.div
          key={node.id}
          className={cn(
            "absolute flex flex-col p-3 rounded-lg border bg-neutral-900/80 backdrop-blur-md shadow-xl transition-colors duration-300 w-[160px]",
            node.status === "processing" ? "border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.3)]" : 
            node.status === "success" ? "border-emerald-500/50" : "border-white/10"
          )}
          style={{ left: node.x, top: node.y }}
          animate={node.status === "processing" ? { y: [node.y, node.y - 4, node.y] } : { y: node.y }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className={cn(
                "p-1.5 rounded-md text-white",
                node.status === "processing" ? "bg-indigo-500" :
                node.status === "success" ? "bg-emerald-500" : "bg-neutral-800"
              )}>
                {node.icon}
              </div>
              <span className="text-xs font-medium text-neutral-200">{node.type}</span>
            </div>
            {node.status === "processing" && <Loader2 size={14} className="text-indigo-400 animate-spin" />}
            {node.status === "success" && <CheckCircle2 size={14} className="text-emerald-400" />}
            {node.status === "idle" && <div className="w-2 h-2 rounded-full bg-neutral-700" />}
          </div>
          <div className="text-sm font-semibold text-white tracking-tight">{node.label}</div>
        </motion.div>
      ))}

      <button
        onClick={runSimulation}
        disabled={isRunning}
        className="absolute bottom-4 right-4 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
      >
        <Settings2 size={16} />
        {isRunning ? "Executing Flow..." : "Run Flow"}
      </button>
    </div>
  );
}
