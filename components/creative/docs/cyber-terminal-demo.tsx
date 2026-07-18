"use client";

import React, { useState } from "react";
import { CyberTerminal } from "@/components/creative/cyber-terminal";
import { Terminal, Database, Code, Cpu, Shield, Globe } from "lucide-react";
import { toast } from "sonner"; // Assuming sonner is available for toasts

export function CyberTerminalDemo({ soundEnabled = true }: { soundEnabled?: boolean }) {
  const [open, setOpen] = useState(false);

  const mockCommands = [
    {
      heading: "System",
      items: [
        {
          id: "sys-init",
          title: "Initialize Core",
          icon: <Cpu className="w-4 h-4" />,
          onSelect: () => toast.success("Core initialization sequence started."),
        },
        {
          id: "sys-network",
          title: "Scan Network",
          icon: <Globe className="w-4 h-4" />,
          onSelect: () => toast.success("Network scan complete. 3 nodes found."),
        },
      ],
    },
    {
      heading: "Development",
      items: [
        {
          id: "dev-deploy",
          title: "Deploy to Production",
          icon: <Code className="w-4 h-4" />,
          onSelect: () => toast.success("Deploying to production server..."),
        },
        {
          id: "dev-db",
          title: "Flush Database",
          icon: <Database className="w-4 h-4" />,
          onSelect: () => toast.error("ACCESS DENIED: Database flush prevented."),
        },
      ],
    },
    {
      heading: "Security",
      items: [
        {
          id: "sec-firewall",
          title: "Toggle Firewall",
          icon: <Shield className="w-4 h-4" />,
          onSelect: () => toast.info("Firewall status toggled."),
        },
      ],
    },
  ];

  return (
    <div className="flex w-full min-h-[400px] flex-col items-center justify-center bg-[#0a0a0a] rounded-xl overflow-hidden p-8 border border-white/5 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(52,211,153,0.05),transparent_70%)]" />

      <div className="text-center z-10 space-y-6">
        <Terminal className="w-12 h-12 text-emerald-500 mx-auto opacity-50" />
        <h2 className="text-2xl font-bold text-white tracking-tight">Cyber OS Terminal</h2>
        <p className="text-zinc-400 text-sm max-w-sm">
          Press <kbd className="px-2 py-1 bg-zinc-800 rounded text-emerald-400 font-mono text-xs mx-1">CMD+K</kbd> 
          or click the button below to access the mainframe.
        </p>

        <button
          onClick={() => setOpen(true)}
          className="px-6 py-3 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-lg hover:bg-emerald-900 transition-colors font-mono uppercase tracking-widest text-sm shadow-[0_0_15px_rgba(4,120,87,0.3)] hover:shadow-[0_0_25px_rgba(4,120,87,0.5)]"
        >
          Initialize
        </button>
      </div>

      <CyberTerminal 
        commands={mockCommands} 
        open={open} 
        onOpenChange={setOpen} 
        soundEnabled={soundEnabled}
      />
    </div>
  );
}
