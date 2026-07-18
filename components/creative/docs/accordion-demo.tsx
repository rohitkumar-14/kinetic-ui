"use client";

import React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { HelpCircle, Shield, Cpu, RefreshCw } from "lucide-react";

export interface AccordionDemoProps {
  variant?: "single" | "multiple" | "bordered" | "minimal";
}

export function AccordionDemo({ variant }: AccordionDemoProps) {
  // 1. Single Collapse Variant
  if (variant === "single") {
    return (
      <div className="w-full max-w-xl mx-auto p-4">
        <Accordion type="single" collapsible className="w-full space-y-2">
          <AccordionItem value="item-1" className="border border-white/5 bg-white/5 px-4 rounded-xl overflow-hidden transition-all duration-300 hover:border-white/10">
            <AccordionTrigger className="hover:no-underline py-4 text-sm font-semibold text-zinc-100 flex items-center gap-3">
              <span className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-indigo-400" />
                How performant is the system?
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-xs text-zinc-400 leading-relaxed font-light pb-4">
              Our codebase is hand-crafted and highly optimized. By utilizing CSS GPU acceleration and pruning unnecessary layout calculations, components maintain an extremely fast frame rate and minimal rendering overhead, even on lower-end devices.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border border-white/5 bg-white/5 px-4 rounded-xl overflow-hidden transition-all duration-300 hover:border-white/10">
            <AccordionTrigger className="hover:no-underline py-4 text-sm font-semibold text-zinc-100 flex items-center gap-3">
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                Is security built-in?
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-xs text-zinc-400 leading-relaxed font-light pb-4">
              Security is structured directly into the foundation. All inputs and assets are strictly sanitized, and no direct database accesses are executed client-side. Standard authentication rules apply directly.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  }

  // 2. Multiple Collapse Variant
  if (variant === "multiple") {
    return (
      <div className="w-full max-w-xl mx-auto p-4">
        <Accordion type="multiple" className="w-full space-y-2">
          <AccordionItem value="item-1" className="border border-white/5 bg-white/5 px-4 rounded-xl overflow-hidden transition-all duration-300 hover:border-white/10">
            <AccordionTrigger className="hover:no-underline py-4 text-sm font-semibold text-zinc-100 flex items-center gap-3">
              <span className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-indigo-400" />
                Open item 1 (Multi-Expandable)
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-xs text-zinc-400 leading-relaxed font-light pb-4">
              You can expand multiple items at the same time by setting the Accordion type attribute to "multiple".
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border border-white/5 bg-white/5 px-4 rounded-xl overflow-hidden transition-all duration-300 hover:border-white/10">
            <AccordionTrigger className="hover:no-underline py-4 text-sm font-semibold text-zinc-100 flex items-center gap-3">
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                Open item 2 (Multi-Expandable)
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-xs text-zinc-400 leading-relaxed font-light pb-4">
              Both items can stay open together, allowing users to compare details side-by-side.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  }

  // 3. Bordered Cards Variant
  if (variant === "bordered") {
    return (
      <div className="w-full max-w-xl mx-auto p-4">
        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="item-1" className="border border-indigo-500/25 bg-zinc-950/50 px-5 rounded-2xl overflow-hidden shadow-[0_4px_12px_rgba(99,102,241,0.05)] transition-all duration-300 hover:border-indigo-500/40">
            <AccordionTrigger className="hover:no-underline py-5 text-sm font-bold text-zinc-100 flex items-center gap-3">
              <span className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-indigo-400" />
                Individually Isolated Cards
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-xs text-zinc-400 leading-relaxed font-light pb-5">
              By nesting items inside separated card wrappers with spacing gaps, you get a premium modular deck aesthetic that focuses attention on the currently selected card.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border border-white/5 bg-zinc-950/20 px-5 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/10">
            <AccordionTrigger className="hover:no-underline py-5 text-sm font-bold text-zinc-100 flex items-center gap-3">
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-zinc-500" />
                Secondary Card Style
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-xs text-zinc-400 leading-relaxed font-light pb-5">
              Easily customize border states, active shadow levels, and opacity factors of individual items independently.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  }

  // 4. Minimal Flat Lines Variant
  if (variant === "minimal") {
    return (
      <div className="w-full max-w-xl mx-auto p-4">
        <Accordion type="single" collapsible className="w-full divide-y divide-white/5">
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger className="hover:no-underline py-4 text-sm font-semibold text-zinc-300 flex items-center gap-3 hover:text-white transition-colors">
              <span className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-indigo-400" />
                Minimalist Flat Structure
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-xs text-zinc-400 leading-relaxed font-light pb-4 pl-6">
              Clean and seamless outline. Perfect for pages where you want a lightweight layout signature without card boxes or backgrounds.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-none">
            <AccordionTrigger className="hover:no-underline py-4 text-sm font-semibold text-zinc-300 flex items-center gap-3 hover:text-white transition-colors">
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                Flat Borderless Item
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-xs text-zinc-400 leading-relaxed font-light pb-4 pl-6">
              Separated by lightweight divider lines instead of enclosing box templates.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  }

  // Fallback default full render
  return (
    <div className="w-full max-w-2xl mx-auto p-6 rounded-2xl border border-white/5 bg-zinc-950/40 backdrop-blur-md">
      <Accordion type="single" collapsible className="w-full space-y-2">
        <AccordionItem value="item-1" className="border border-white/5 bg-white/5 px-4 rounded-xl overflow-hidden transition-all duration-300 hover:border-white/10">
          <AccordionTrigger className="hover:no-underline py-4 text-sm font-semibold text-zinc-100 flex items-center gap-3">
            <span className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-400" />
              How performant is the system?
            </span>
          </AccordionTrigger>
          <AccordionContent className="text-xs text-zinc-400 leading-relaxed font-light pb-4">
            Our codebase is hand-crafted and highly optimized. By utilizing CSS GPU acceleration and pruning unnecessary layout calculations, components maintain an extremely fast frame rate and minimal rendering overhead, even on lower-end devices.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
