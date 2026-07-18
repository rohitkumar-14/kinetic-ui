"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface GooeyFooterLink {
  label: string;
  href: string;
}

export interface GooeyFooterSocial {
  icon: React.ReactNode;
  href: string;
}

export interface GooeyFooterProps {
  links?: GooeyFooterLink[];
  socials?: GooeyFooterSocial[];
  className?: string;
  color?: string;
}

export function GooeyFooter({
  links = [],
  socials = [],
  className,
  color = "#a855f7", // Purple-500
}: GooeyFooterProps) {
  return (
    <footer className={cn("relative w-full overflow-hidden bg-slate-950 py-24", className)}>
      
      {/* Hidden SVG Filter for Gooey Effect */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id="gooey-footer-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix 
              in="blur" 
              mode="matrix" 
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" 
              result="goo" 
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Main Logo / Branding area with Gooey Blobs behind it */}
        <div className="relative w-full max-w-lg mx-auto flex items-center justify-center h-48">
          
          {/* Gooey container */}
          <div 
            className="absolute inset-0 flex flex-row items-center justify-center gap-2"
            style={{ filter: "url(#gooey-footer-filter)" }}
          >
            {/* Center main blob */}
            <motion.div 
              className="w-24 h-24 rounded-full absolute"
              style={{ backgroundColor: color }}
              animate={{
                scale: [1, 1.1, 0.9, 1],
              }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            />
            
            {/* Orbiting blobs */}
            {socials.map((social, i) => {
              // Calculate angles for orbiting blobs
              const angle = (i / socials.length) * Math.PI * 2;
              const radius = 60;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <motion.div
                  key={i}
                  className="w-16 h-16 rounded-full absolute flex items-center justify-center cursor-pointer"
                  style={{ backgroundColor: color }}
                  initial={{ x: 0, y: 0 }}
                  whileHover={{ x: x * 1.5, y: y * 1.5, scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <a 
                    href={social.href} 
                    className="relative z-10 text-white flex items-center justify-center w-full h-full"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {social.icon}
                  </a>
                </motion.div>
              );
            })}
          </div>

          <div className="relative z-20 pointer-events-none font-black text-3xl tracking-tighter text-white mix-blend-difference">
            STAY CONNECTED
          </div>
        </div>

        {/* Standard Links */}
        {links.length > 0 && (
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8">
            {links.map((link, i) => (
              <a 
                key={i} 
                href={link.href}
                className="text-zinc-400 hover:text-white transition-colors text-sm font-medium tracking-wide uppercase"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        <div className="mt-16 pt-8 border-t border-zinc-800/50 w-full text-center">
          <p className="text-zinc-600 text-xs">
            © {new Date().getFullYear()} Kinetic Systems. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
