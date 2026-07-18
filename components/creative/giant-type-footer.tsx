"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export interface GiantTypeFooterProps {
  title?: string;
  links?: { label: string; href: string }[];
  className?: string;
}

export function GiantTypeFooter({
  title = "KINETIC",
  links = [
    { label: "Twitter", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "GitHub", href: "#" },
  ],
  className,
}: GiantTypeFooterProps) {
  return (
    // The wrapper ensures the footer sticks to the bottom of the viewport as the preceding content scrolls past it
    <div className={cn("sticky bottom-0 w-full h-screen min-h-[600px] flex flex-col justify-end bg-black text-white overflow-hidden z-0", className)}>
      
      <div className="w-full flex-1 flex flex-col justify-between p-8 md:p-12">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mt-12 md:mt-24">
          <div className="max-w-sm space-y-4">
            <h3 className="text-2xl font-bold tracking-tight">Ready to build?</h3>
            <p className="text-zinc-400">
              Drop us a line and let's create something that defies gravity.
            </p>
            <a 
              href="mailto:hello@example.com" 
              className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
            >
              hello@example.com <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="flex gap-12">
            <div className="flex flex-col gap-4">
              <span className="text-zinc-600 text-sm font-semibold tracking-widest uppercase">Socials</span>
              <ul className="space-y-2">
                {links.map((link, i) => (
                  <li key={i}>
                    <a href={link.href} className="text-zinc-400 hover:text-white transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex flex-col gap-4">
              <span className="text-zinc-600 text-sm font-semibold tracking-widest uppercase">Legal</span>
              <ul className="space-y-2">
                <li><a href="#" className="text-zinc-400 hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="text-zinc-400 hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Giant Type */}
        <div className="w-full mt-12 overflow-hidden flex items-end justify-center">
          <h1 className="text-[15vw] leading-[0.8] font-black tracking-tighter text-white whitespace-nowrap opacity-90 pb-4">
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
}
