"use client";

import React, { useState, useEffect } from "react";
import { Terminal } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface TerminalFooterLink {
  label: string;
  href: string;
  command?: string; // e.g. "cd /about" or "cat contact.md"
}

export interface TerminalFooterCategory {
  title: string;
  links: TerminalFooterLink[];
}

export interface TerminalFooterProps {
  categories: TerminalFooterCategory[];
  companyName?: string;
  className?: string;
}

export function TerminalFooter({
  categories,
  companyName = "SYSTEM",
  className,
}: TerminalFooterProps) {
  const [activeCommand, setActiveCommand] = useState<string>("init --system");
  const [displayedCommand, setDisplayedCommand] = useState<string>("");
  const [isTyping, setIsTyping] = useState(false);

  // Typewriter effect for active command
  useEffect(() => {
    setIsTyping(true);
    setDisplayedCommand("");
    let i = 0;
    
    const interval = setInterval(() => {
      if (i < activeCommand.length) {
        setDisplayedCommand(activeCommand.substring(0, i + 1));
        i++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 40); // typing speed

    return () => clearInterval(interval);
  }, [activeCommand]);

  return (
    <footer className={cn("w-full bg-zinc-950 border-t border-zinc-800 text-zinc-400 font-mono py-12 px-6", className)}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        
        {/* Terminal Window (Left/Top) */}
        <div className="md:col-span-7 lg:col-span-8 flex flex-col">
          <div className="w-full bg-black border border-zinc-800 rounded-lg overflow-hidden flex flex-col h-full min-h-[200px]">
            {/* Terminal Header */}
            <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-2 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
              </div>
              <div className="flex-1 text-center text-xs text-zinc-500 font-sans tracking-wide">
                bash - {companyName.toLowerCase()}
              </div>
            </div>
            
            {/* Terminal Body */}
            <div className="p-4 flex-1 flex flex-col font-mono text-sm sm:text-base text-emerald-400">
              <div className="mb-2 text-zinc-500">
                Welcome to {companyName} OS v2.4.1<br/>
                Type 'help' to see a list of commands.
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <span className="text-emerald-500">guest@{companyName.toLowerCase()}</span>
                <span className="text-blue-400">~</span>
                <span>$</span>
                <span>
                  {displayedCommand}
                  <span className={cn("inline-block w-2 h-4 bg-emerald-400 ml-1 translate-y-0.5", isTyping ? "opacity-100" : "animate-pulse")} />
                </span>
              </div>
              {!isTyping && activeCommand !== "init --system" && (
                <div className="mt-2 text-zinc-400 opacity-50 animate-in fade-in duration-500">
                  Executing command...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Clusters (Right/Bottom) */}
        <div className="md:col-span-5 lg:col-span-4 grid grid-cols-2 gap-8">
          {categories.map((category, idx) => (
            <div key={idx} className="flex flex-col gap-4">
              <h3 className="text-zinc-100 font-semibold tracking-widest text-sm uppercase flex items-center gap-2">
                <Terminal className="w-4 h-4 text-zinc-500" /> {category.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {category.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link 
                      href={link.href}
                      className="text-zinc-400 hover:text-emerald-400 transition-colors text-sm"
                      onMouseEnter={() => {
                        const defaultCommand = `cd ${link.href}`;
                        if (activeCommand !== (link.command || defaultCommand)) {
                          setActiveCommand(link.command || defaultCommand);
                        }
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>

      <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
        <p>© {new Date().getFullYear()} {companyName}. All rights reserved.</p>
        <p>sys.status: <span className="text-emerald-500">online</span></p>
      </div>
    </footer>
  );
}
