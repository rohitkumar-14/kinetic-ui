"use client";

import React, { useState, useEffect } from "react";
import { ForceGraph, ForceNode, ForceLink } from "@/components/creative/force-graph";
import { Database, Server, Globe, Cpu, Zap, Cloud, Code } from "lucide-react";

export function ForceGraphDemo() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const nodes: ForceNode[] = [
    {
      id: "app",
      label: "Next.js App",
      width: 160,
      height: 50,
      element: (
        <div className="w-full h-full bg-white text-black font-black rounded-full flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.4)]">
          <Globe className="w-5 h-5" /> Next.js App
        </div>
      )
    },
    {
      id: "api",
      label: "GraphQL API",
      width: 150,
      height: 40,
      element: (
        <div className="w-full h-full bg-pink-500 text-white font-bold rounded-full flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(236,72,153,0.4)]">
          <Server className="w-4 h-4" /> GraphQL API
        </div>
      )
    },
    {
      id: "db",
      label: "PostgreSQL",
      width: 140,
      height: 40,
      element: (
        <div className="w-full h-full bg-blue-500 text-white font-bold rounded-full flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(59,130,246,0.4)]">
          <Database className="w-4 h-4" /> PostgreSQL
        </div>
      )
    },
    {
      id: "redis",
      label: "Redis Cache",
      width: 140,
      height: 40,
      element: (
        <div className="w-full h-full bg-red-500 text-white font-bold rounded-full flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.4)]">
          <Zap className="w-4 h-4" /> Redis Cache
        </div>
      )
    },
    {
      id: "worker",
      label: "Worker Nodes",
      width: 150,
      height: 40,
      element: (
        <div className="w-full h-full bg-orange-500 text-white font-bold rounded-full flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(249,115,22,0.4)]">
          <Cpu className="w-4 h-4" /> Worker Nodes
        </div>
      )
    },
    {
      id: "s3",
      label: "AWS S3",
      width: 120,
      height: 40,
      element: (
        <div className="w-full h-full bg-yellow-500 text-black font-bold rounded-full flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(234,179,8,0.4)]">
          <Cloud className="w-4 h-4" /> AWS S3
        </div>
      )
    },
    {
      id: "auth",
      label: "Auth Service",
      width: 140,
      height: 40,
      element: (
        <div className="w-full h-full bg-indigo-500 text-white font-bold rounded-full flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(99,102,241,0.4)]">
          <Code className="w-4 h-4" /> Auth Service
        </div>
      )
    }
  ];

  const links: ForceLink[] = [
    { source: "app", target: "api" },
    { source: "app", target: "auth" },
    { source: "api", target: "db" },
    { source: "api", target: "redis" },
    { source: "api", target: "worker" },
    { source: "worker", target: "db" },
    { source: "worker", target: "s3" },
  ];

  if (!mounted) return <div className="h-[600px] w-full bg-zinc-950 rounded-3xl animate-pulse" />;

  return (
    <div className="w-full h-[600px] rounded-3xl overflow-hidden border border-zinc-800 relative bg-zinc-950 shadow-inner">
      <div className="absolute top-6 left-6 z-0 pointer-events-none">
        <h2 className="text-3xl font-black text-zinc-300 tracking-tighter uppercase">Architecture</h2>
        <p className="text-zinc-500 font-mono text-sm mt-1">Grab a node and pull it.</p>
      </div>

      <ForceGraph 
        nodes={nodes} 
        links={links} 
        repulsion={15000} // High repulsion so they spread out nicely
        linkLength={180}
        linkStiffness={0.01}
      />
    </div>
  );
}
