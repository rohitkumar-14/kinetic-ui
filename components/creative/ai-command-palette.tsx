"use client";

import React, { useState } from "react";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, Command as CmdIcon, ArrowRight, CornerDownLeft, FileText, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AICommandPaletteProps {
  className?: string;
  placeholder?: string;
}

export function AICommandPalette({ className, placeholder = "Ask AI or search commands..." }: AICommandPaletteProps) {
  const [value, setValue] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  const handleAskAI = () => {
    if (!value.trim()) return;
    setIsGenerating(true);
    // Simulate AI response
    setTimeout(() => {
      setAiResponse(`I've analyzed your workspace. The easiest way to implement this is using the standard React lifecycle hooks combined with Framer Motion for the exit animations.`);
      setIsGenerating(false);
    }, 1500);
  };

  const handleClear = () => {
    setValue("");
    setAiResponse(null);
    setIsGenerating(false);
  };

  return (
    <div
      className={cn(
        "relative w-full max-w-xl mx-auto overflow-hidden rounded-2xl bg-zinc-950 border border-white/10 shadow-2xl cmdk-wrapper",
        className
      )}
      style={{
        boxShadow: "0 0 0 1px rgba(255,255,255,0.05), 0 30px 60px rgba(0,0,0,0.5), 0 0 40px rgba(99, 102, 241, 0.15)"
      }}
    >
      {/* Glowing top border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />

      <Command className="bg-transparent">
        <div className="flex items-center border-b border-white/5 px-4 h-14">
          <Search className="w-5 h-5 text-zinc-500 mr-3 shrink-0" />
          <Command.Input
            value={value}
            onValueChange={setValue}
            disabled={isGenerating || !!aiResponse}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-white placeholder:text-zinc-500 outline-none text-base disabled:opacity-50"
          />
          <div className="flex items-center gap-1 shrink-0">
            <kbd className="bg-zinc-800 border border-zinc-700 text-zinc-400 px-2 py-1 rounded text-[10px] font-sans font-medium uppercase tracking-wider">esc</kbd>
          </div>
        </div>

        <Command.List className="max-h-[350px] overflow-y-auto p-2 custom-scrollbar transition-all duration-300">
          {!aiResponse && !isGenerating && (
            <Command.Empty className="py-6 text-center text-sm text-zinc-500">
              No results found.
            </Command.Empty>
          )}

          {!aiResponse && !isGenerating && (
            <>
              {value.trim() && (
                <Command.Group heading="Generative AI" className="mb-2">
                  <Command.Item
                    onSelect={handleAskAI}
                    className="flex items-center px-3 py-3 rounded-xl cursor-pointer aria-selected:bg-indigo-500/10 aria-selected:text-indigo-400 text-zinc-300 transition-colors group"
                  >
                    <div className="p-1.5 rounded-md bg-indigo-500/20 mr-3">
                      <Sparkles className="w-4 h-4 text-indigo-400 group-aria-selected:text-indigo-300" />
                    </div>
                    <span>Ask AI about <strong className="text-white font-semibold">"{value}"</strong></span>
                    <CornerDownLeft className="w-3.5 h-3.5 ml-auto text-zinc-500 group-aria-selected:text-indigo-400" />
                  </Command.Item>
                </Command.Group>
              )}

              <Command.Group heading="Quick Actions" className="mb-2">
                <Command.Item className="flex items-center px-3 py-2.5 rounded-lg cursor-pointer aria-selected:bg-zinc-800/80 text-zinc-300 transition-colors">
                  <FileText className="w-4 h-4 mr-3 text-zinc-500" />
                  Create new document
                </Command.Item>
                <Command.Item className="flex items-center px-3 py-2.5 rounded-lg cursor-pointer aria-selected:bg-zinc-800/80 text-zinc-300 transition-colors">
                  <CmdIcon className="w-4 h-4 mr-3 text-zinc-500" />
                  Search repository
                </Command.Item>
              </Command.Group>

              <Command.Group heading="Settings">
                <Command.Item className="flex items-center px-3 py-2.5 rounded-lg cursor-pointer aria-selected:bg-zinc-800/80 text-zinc-300 transition-colors">
                  <User className="w-4 h-4 mr-3 text-zinc-500" />
                  Profile Preferences
                </Command.Item>
                <Command.Item className="flex items-center px-3 py-2.5 rounded-lg cursor-pointer aria-selected:bg-zinc-800/80 text-zinc-300 transition-colors">
                  <Settings className="w-4 h-4 mr-3 text-zinc-500" />
                  System Configuration
                </Command.Item>
              </Command.Group>
            </>
          )}

          {/* AI Generation State */}
          <AnimatePresence mode="wait">
            {isGenerating && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4"
              >
                <div className="flex flex-col items-center justify-center py-8 gap-4">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full border-2 border-indigo-500/30 border-t-indigo-500 animate-spin" />
                    <Sparkles className="w-4 h-4 text-indigo-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <span className="text-sm font-medium text-indigo-400 animate-pulse">Generating response...</span>
                </div>
              </motion.div>
            )}

            {aiResponse && !isGenerating && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: 10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                className="p-4"
              >
                <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-5 text-sm text-zinc-200 leading-relaxed shadow-inner relative overflow-hidden">
                  {/* Subtle background glow in bubble */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full" />
                  
                  <div className="relative z-10 flex gap-3">
                    <div className="shrink-0 mt-0.5">
                      <Sparkles className="w-5 h-5 text-indigo-400" />
                    </div>
                    <p>{aiResponse}</p>
                  </div>
                </div>
                <button 
                  onClick={handleClear}
                  className="mt-4 flex items-center text-xs font-medium text-zinc-500 hover:text-white transition-colors w-full justify-center py-2 rounded-lg hover:bg-white/5"
                >
                  <ArrowRight className="w-3 h-3 mr-1.5" />
                  Clear and return to search
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </Command.List>
      </Command>

      {/* Global Styles for CMDK specific to this component */}
      <style jsx global>{`
        .cmdk-wrapper [cmdk-group-heading] {
          padding-left: 0.75rem;
          padding-right: 0.75rem;
          padding-bottom: 0.5rem;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #52525b; /* zinc-600 */
        }
      `}</style>
    </div>
  );
}
