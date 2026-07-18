"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface MegaMenuChildItem {
  label: string;
  href: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface MegaMenuFeaturedItem {
  title: string;
  description: string;
  image: string;
  href: string;
}

export interface MegaMenuItem {
  id: string;
  label: string;
  href?: string;
  children?: MegaMenuChildItem[];
  featured?: MegaMenuFeaturedItem;
}

export interface MegaMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  items: MegaMenuItem[];
  animationDirection?: "top" | "bottom";
}

export function MegaMenu({
  items,
  animationDirection = "top",
  className,
  ...props
}: MegaMenuProps) {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  let timeoutId: NodeJS.Timeout;

  const handleMouseEnter = (id: string) => {
    clearTimeout(timeoutId);
    setActiveItem(id);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setActiveItem(null);
    }, 150);
  };

  return (
    <div className={cn("relative w-full max-w-7xl mx-auto flex items-center justify-center z-50", className)} {...props}>
      <nav 
        className="flex items-center gap-1 p-1 rounded-full bg-zinc-900/50 backdrop-blur-md border border-white/10"
        onMouseLeave={handleMouseLeave}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="relative"
            onMouseEnter={() => handleMouseEnter(item.id)}
          >
            <button className={cn(
              "px-4 py-2 text-sm font-medium transition-colors rounded-full flex items-center gap-1",
              activeItem === item.id ? "bg-white/10 text-white" : "text-zinc-400 hover:text-white"
            )}>
              {item.label}
              {(item.children || item.featured) && (
                <ChevronDown className={cn(
                  "w-3 h-3 transition-transform duration-300",
                  activeItem === item.id ? "rotate-180" : ""
                )} />
              )}
            </button>

            <AnimatePresence>
              {activeItem === item.id && (item.children || item.featured) && (
                <motion.div
                  initial={{ 
                    opacity: 0, 
                    y: animationDirection === "top" ? -10 : 10,
                    scale: 0.98
                  }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    scale: 1
                  }}
                  exit={{ 
                    opacity: 0, 
                    y: animationDirection === "top" ? -5 : 5,
                    scale: 0.98
                  }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className={cn(
                    "absolute left-1/2 -translate-x-1/2 w-[600px] p-4 bg-zinc-900 border border-white/10 shadow-2xl rounded-2xl overflow-hidden",
                    animationDirection === "top" ? "bottom-full mb-4" : "top-full mt-4"
                  )}
                >
                  <div className="grid grid-cols-12 gap-6 relative z-10">
                    {/* Standard Links Column */}
                    {item.children && (
                      <div className={cn(
                        "flex flex-col gap-2",
                        item.featured ? "col-span-7" : "col-span-12 grid grid-cols-2 gap-4"
                      )}>
                        {item.children.map((child, i) => (
                          <a
                            key={i}
                            href={child.href}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                          >
                            {child.icon && (
                              <div className="mt-0.5 text-zinc-400 group-hover:text-indigo-400 transition-colors">
                                {child.icon}
                              </div>
                            )}
                            <div>
                              <div className="text-sm font-semibold text-white mb-0.5 group-hover:text-indigo-400 transition-colors">
                                {child.label}
                              </div>
                              {child.description && (
                                <div className="text-xs text-zinc-500 line-clamp-2">
                                  {child.description}
                                </div>
                              )}
                            </div>
                          </a>
                        ))}
                      </div>
                    )}

                    {/* Featured Content Column */}
                    {item.featured && (
                      <div className={cn(
                        "relative rounded-xl overflow-hidden group",
                        item.children ? "col-span-5" : "col-span-12"
                      )}>
                        <a href={item.featured.href} className="block w-full h-full">
                          <img 
                            src={item.featured.image} 
                            alt={item.featured.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          <div className="absolute bottom-0 left-0 p-4">
                            <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-1">Featured</div>
                            <div className="text-lg font-bold text-white leading-tight mb-1">{item.featured.title}</div>
                            <div className="text-xs text-zinc-300 line-clamp-2">{item.featured.description}</div>
                          </div>
                        </a>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>
    </div>
  );
}
