"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { sidebarContent, SidebarItem } from "@/components/docs-sidebar";
import { Search, ArrowRight, Sparkles } from "lucide-react";

export default function ComponentsOverview() {
  const [search, setSearch] = useState("");

  // Flatten all items from sidebarContent
  const allComponents = useMemo(() => {
    const items: (SidebarItem & { category: string; group: string; searchableText: string })[] = [];
    sidebarContent.forEach((group) => {
      // Skip "Getting Started" or "Releases"
      if (group.label === "Getting Started" || group.label === "Releases") return;
      
      group.sections.forEach((section) => {
        section.items.forEach((item) => {
          items.push({
            ...item,
            category: section.title,
            group: group.label,
            searchableText: `${item.title} ${section.title} ${group.label} ${item.keywords || ""}`.toLowerCase(),
          });
        });
      });
    });
    return items;
  }, []);

  const filteredComponents = useMemo(() => {
    if (!search.trim()) return allComponents;
    
    const searchTerms = search.toLowerCase().split(/\s+/).filter(Boolean);
    const stopWords = ['a', 'an', 'the', 'i', 'want', 'need', 'looking', 'for', 'type', 'of', 'component', 'that', 'with', 'like', 'how', 'do', 'can', 'make', 'something'];
    const meaningfulTerms = searchTerms.filter(term => !stopWords.includes(term));
    
    if (meaningfulTerms.length === 0) return allComponents;

    return allComponents
      .map(item => {
        let score = 0;
        meaningfulTerms.forEach(term => {
          if (item.searchableText.includes(term)) {
            score += 1;
          } else {
            // Partial word matches (e.g., "glowing" matches "glow")
            const valWords = item.searchableText.split(/\s+/);
            if (valWords.some(w => (w.length > 3 && term.includes(w)) || (term.length > 3 && w.includes(term)))) {
              score += 0.8;
            }
          }
        });
        return { item, score };
      })
      .filter(x => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(x => x.item);
  }, [search, allComponents]);

  return (
    <div className="relative w-full min-h-screen py-10 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col gap-10">
      
      {/* Header & Search */}
      <div className="flex flex-col gap-6 items-center text-center max-w-2xl mx-auto pt-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          Component Library
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
          What are you building?
        </h1>
        <p className="text-neutral-400 text-lg">
          Describe the component you need or search our expansive library of interactive elements, 3D scenes, and UI components.
        </p>
        
        <div className="relative w-full mt-4 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400 group-focus-within:text-indigo-400 transition-colors">
            <Search className="h-6 w-6" />
          </div>
          <input
            type="text"
            className="w-full bg-neutral-900/50 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 shadow-xl transition-all"
            placeholder="e.g. glowing button, 3d carousel, sticky header..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Results Grid */}
      <div className="w-full">
        {filteredComponents.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center opacity-50">
            <Search className="w-12 h-12 mb-4" />
            <p className="text-xl font-medium text-white">No components found</p>
            <p className="text-neutral-400">Try adjusting your search terms or keywords.</p>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            <AnimatePresence>
              {filteredComponents.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  key={item.href}
                >
                  <Link 
                    href={item.href}
                    className="group block h-full bg-neutral-900/40 border border-white/5 hover:border-indigo-500/30 rounded-2xl p-5 hover:bg-neutral-800/50 transition-all duration-300"
                  >
                    <div className="flex flex-col h-full gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300 group-hover:text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20 transition-all duration-300 shadow-lg">
                        {item.icon}
                      </div>
                      
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-neutral-200 group-hover:text-white transition-colors">
                            {item.title}
                          </h3>
                          {item.soon && (
                            <span className="text-[10px] uppercase tracking-wider font-bold bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full">
                              Soon
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-medium text-neutral-500 group-hover:text-neutral-400 transition-colors">
                          {item.group} • {item.category}
                        </p>
                      </div>

                      <div className="flex items-center text-xs font-semibold text-indigo-400/0 group-hover:text-indigo-400 transition-colors translate-y-2 group-hover:translate-y-0 duration-300">
                        View Component <ArrowRight className="w-3 h-3 ml-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

    </div>
  );
}
