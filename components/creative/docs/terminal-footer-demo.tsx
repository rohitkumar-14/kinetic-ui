"use client";

import React from "react";
import { TerminalFooter } from "@/components/creative/terminal-footer";

export function TerminalFooterDemo() {
  const categories = [
    {
      title: "Core",
      links: [
        { label: "Documentation", href: "/docs", command: "man final-boss" },
        { label: "Components", href: "/docs/components", command: "ls -la /components" },
        { label: "Templates", href: "/templates", command: "git clone templates" },
      ]
    },
    {
      title: "Social",
      links: [
        { label: "Twitter", href: "#", command: "curl https://api.twitter.com/v1" },
        { label: "GitHub", href: "#", command: "gh repo view final-boss" },
        { label: "Discord", href: "#", command: "ssh discord.gg/finalboss" },
      ]
    }
  ];

  return (
    <div className="w-full bg-slate-950 rounded-xl overflow-hidden border border-white/10 flex flex-col custom-scrollbar">
      {/* Demo padding to simulate page content above the footer */}
      <div className="h-64 flex flex-col items-center justify-center border-b border-white/5 bg-zinc-950/50">
        <h2 className="text-xl font-bold text-white tracking-tight">Main Page Content</h2>
        <p className="text-zinc-500 text-sm mt-2">Scroll down to see the footer</p>
      </div>

      <TerminalFooter 
        categories={categories} 
        companyName="Final Boss" 
        className="border-t-0"
      />
    </div>
  );
}
