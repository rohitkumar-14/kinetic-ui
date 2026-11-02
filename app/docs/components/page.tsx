"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { sidebarContent, SidebarItem } from "@/components/docs-sidebar";
import { Search, ArrowRight, Sparkles, LayoutDashboard, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ComponentsOverview() {
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);
  const [environment, setEnvironment] = useState<'crm' | 'creative' | 'all'>('crm');

  // Sync environment with localStorage & custom events
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('kinetic_ui_env');
      if (saved === 'crm' || saved === 'creative' || saved === 'all') {
        setEnvironment(saved);
      }
    }

    const handleEnvChange = (e: any) => {
      if (e.detail && (e.detail === 'crm' || e.detail === 'creative' || e.detail === 'all')) {
        setEnvironment(e.detail);
      }
    };

    window.addEventListener('kinetic_ui_env_change', handleEnvChange);
    return () => window.removeEventListener('kinetic_ui_env_change', handleEnvChange);
  }, []);

  const handleSelectEnv = (mode: 'crm' | 'creative' | 'all') => {
    setEnvironment(mode);
    setVisibleCount(12);
    if (typeof window !== 'undefined') {
      localStorage.setItem('kinetic_ui_env', mode);
      window.dispatchEvent(new CustomEvent('kinetic_ui_env_change', { detail: mode }));
    }
  };

  // Flatten all items from sidebarContent
  const allComponents = useMemo(() => {
    const items: (SidebarItem & { category: string; group: string; searchableText: string })[] = [];
    const seenHrefs = new Set<string>();
    
    sidebarContent.forEach((group) => {
      // Skip "Getting Started" or "Releases"
      if (group.label === "Getting Started" || group.label === "Releases" || group.label === "System") return;
      
      group.sections.forEach((section) => {
        section.items.forEach((item) => {
          if (!seenHrefs.has(item.href)) {
            seenHrefs.add(item.href);
            items.push({
              ...item,
              category: section.title,
              group: group.label,
              searchableText: `${item.title} ${section.title} ${group.label} ${item.keywords || ""}`.toLowerCase(),
            });
          }
        });
      });
    });
    return items;
  }, []);

  // Filter components by active environment
  const environmentFilteredComponents = useMemo(() => {
    if (environment === 'all') return allComponents;
    if (environment === 'crm') {
      return allComponents.filter(c => c.group === "Dashboard & CRM UI");
    }
    if (environment === 'creative') {
      return allComponents.filter(c => c.group === "Creative & 3D UI");
    }
    return allComponents;
  }, [environment, allComponents]);

  const filteredComponents = useMemo(() => {
    if (!search.trim()) return environmentFilteredComponents;
    
    const searchTerms = search.toLowerCase().split(/\s+/).filter(Boolean);
    const stopWords = ['a', 'an', 'the', 'i', 'want', 'need', 'looking', 'for', 'type', 'of', 'component', 'that', 'with', 'like', 'how', 'do', 'can', 'make', 'something'];
    const meaningfulTerms = searchTerms.filter(term => !stopWords.includes(term));
    
    // If user searches, search across current environment first; if empty, search all
    const targetPool = environmentFilteredComponents;
    
    if (meaningfulTerms.length === 0) return targetPool;

    return targetPool
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
  }, [search, environmentFilteredComponents]);

  const showPreviews = search.trim().length > 0;

  const crmCount = useMemo(() => allComponents.filter(c => c.group === "Dashboard & CRM UI").length, [allComponents]);
  const creativeCount = useMemo(() => allComponents.filter(c => c.group === "Creative & 3D UI").length, [allComponents]);

  return (
    <div className="relative w-full min-h-screen py-10 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col gap-10">
      
      {/* Header & Search */}
      <div className="flex flex-col gap-6 items-center text-center max-w-2xl mx-auto pt-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Component Ecosystem
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
          What are you building?
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg">
          Switch between enterprise-grade <strong className="text-emerald-400 font-semibold">CRM & Dashboards</strong> or cutting-edge <strong className="text-violet-400 font-semibold">Creative & 3D WebGL</strong> experiences.
        </p>

        {/* Environment Filter Pills */}
        <div className="flex items-center justify-center gap-1.5 p-1 rounded-2xl bg-muted/60 border border-border/80 w-full max-w-md shadow-sm">
          <button
            type="button"
            onClick={() => handleSelectEnv('crm')}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer",
              environment === 'crm'
                ? "bg-background text-emerald-400 shadow-sm border border-emerald-500/30 font-extrabold"
                : "text-muted-foreground hover:text-foreground hover:bg-background/40"
            )}
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-emerald-400" />
            <span>CRM & SaaS ({crmCount})</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectEnv('creative')}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer",
              environment === 'creative'
                ? "bg-background text-violet-400 shadow-sm border border-violet-500/30 font-extrabold"
                : "text-muted-foreground hover:text-foreground hover:bg-background/40"
            )}
          >
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span>Creative 3D ({creativeCount})</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectEnv('all')}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer",
              environment === 'all'
                ? "bg-background text-sky-400 shadow-sm border border-sky-500/30 font-extrabold"
                : "text-muted-foreground hover:text-foreground hover:bg-background/40"
            )}
          >
            <Layers className="w-3.5 h-3.5 text-sky-400" />
            <span>All ({allComponents.length})</span>
          </button>
        </div>
        
        <div className="relative w-full mt-2 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
            <Search className="h-5 w-5" />
          </div>
          <input
            type="text"
            className="w-full bg-muted/40 border border-border/80 rounded-2xl py-3.5 pl-11 pr-6 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 shadow-sm transition-all"
            placeholder={
              environment === 'crm' 
                ? "Search CRM leads table, metrics, buttons, select, multiselect..." 
                : environment === 'creative' 
                  ? "Search 3D models, liquid shaders, particles, hero, tilt..." 
                  : "Search all 205+ components across CRM & Creative..."
            }
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setVisibleCount(12);
            }}
          />
        </div>
      </div>

      {/* Results Grid */}
      <div className="w-full">
        {filteredComponents.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center opacity-60">
            <Search className="w-12 h-12 mb-4 text-muted-foreground" />
            <p className="text-xl font-medium text-foreground">No components found in {environment.toUpperCase()}</p>
            <p className="text-muted-foreground text-sm mt-1">Try searching across All Components or adjust your keywords.</p>
            <button
              onClick={() => handleSelectEnv('all')}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-bold bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              Switch to All Components ({allComponents.length})
            </button>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredComponents.slice(0, visibleCount).map((item) => (
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
                    className="group flex flex-col h-full bg-card/60 border border-border/60 hover:border-primary/40 rounded-2xl p-5 hover:bg-card/90 transition-all duration-300 relative shadow-sm"
                  >
                    <div className="flex flex-col h-full gap-4">
                      
                      {showPreviews ? (
                        <div className="w-full h-40 rounded-xl overflow-hidden bg-background relative border border-border/80 shadow-inner group-hover:border-primary/40 transition-colors duration-300">
                          {/* Invisible overlay intercepts clicks so navigation works */}
                          <div className="absolute inset-0 z-10 bg-transparent group-hover:hidden" />
                          <iframe 
                            src={`/preview/${item.href.split('/').pop()}`}
                            className="w-[150%] h-[150%] origin-top-left scale-[0.666] border-0 pointer-events-none group-hover:pointer-events-auto"
                            tabIndex={-1}
                            title={`${item.title} Preview`}
                            loading="lazy"
                            scrolling="no"
                          />
                        </div>
                      ) : (
                        <div className={cn(
                          "w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-300 shadow-sm group-hover:scale-105",
                          item.group === "Dashboard & CRM UI"
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/20"
                            : "bg-violet-500/10 border-violet-500/20 text-violet-400 group-hover:bg-violet-500/20"
                        )}>
                          {item.icon}
                        </div>
                      )}
                      
                      {/* Text info block */}
                      <div className="flex-1 space-y-1 relative z-20">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-base">
                            {item.title}
                          </h3>
                          {item.group === "Dashboard & CRM UI" ? (
                            <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full whitespace-nowrap">
                              CRM / SaaS
                            </span>
                          ) : (
                            <span className="text-[10px] uppercase font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded-full whitespace-nowrap">
                              Creative 3D
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-medium text-muted-foreground group-hover:text-foreground/80 transition-colors">
                          {item.category}
                        </p>
                      </div>

                      <div className="flex items-center text-xs font-semibold text-primary/70 group-hover:text-primary transition-colors duration-300 relative z-20">
                        Explore Component <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {filteredComponents.length > visibleCount && (
          <div className="flex justify-center mt-10 w-full pb-10">
            <button
              onClick={() => setVisibleCount((v) => v + 12)}
              className="px-6 py-3 rounded-xl bg-card border border-border/80 text-foreground font-medium hover:bg-accent transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
            >
              Load More Components <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
