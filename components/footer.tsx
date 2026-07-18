"use client";

import * as React from 'react';
import { Sparkles, Github } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function Footer() {
  const pathname = usePathname();

  // Hide the global footer on docs pages and inside specific templates (which have their own footers)
  if (pathname?.startsWith('/docs') || pathname?.startsWith('/templates/')) {
    return null;
  }

  return (
    <footer className="border-t border-white/10 mt-auto bg-black overflow-hidden relative text-white">
      <div className="container mx-auto px-6 py-20 relative z-10">
         <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
            <div className="space-y-6">
               <div className="flex items-center gap-3">
                 <div className="flex h-10 w-10 items-center justify-center rounded-full overflow-hidden border border-white/20">
                   <img src="/logo.png" alt="Kinetic Logo" className="w-full h-full object-cover" />
                 </div>
                 <span className="text-2xl font-bold tracking-tighter text-white">KINETIC</span>
               </div>
               <p className="text-white/50 max-w-sm leading-relaxed font-light">
                  Handcrafted premium components for React developers who care about design, motion, and high-end performance.
               </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-16">
               <div className="space-y-4">
                  <h4 className="font-semibold text-white">Library</h4>
                  <ul className="space-y-3 text-sm text-white/50">
                     <li className="hover:text-white transition-colors cursor-pointer">Components</li>
                     <li className="hover:text-white transition-colors cursor-pointer">Theming</li>
                     <li className="hover:text-white transition-colors cursor-pointer">Animations</li>
                  </ul>
               </div>
               <div className="space-y-4">
                  <h4 className="font-semibold text-white">Support</h4>
                  <ul className="space-y-3 text-sm text-white/50">
                     <li className="hover:text-white transition-colors cursor-pointer">Docs</li>
                     <li className="hover:text-white transition-colors cursor-pointer">Changelog</li>
                     <li className="hover:text-white transition-colors cursor-pointer">GitHub</li>
                  </ul>
               </div>
               <div className="space-y-4 hidden sm:block">
                  <h4 className="font-semibold text-white">Legal</h4>
                  <ul className="space-y-3 text-sm text-white/50">
                     <li className="hover:text-white transition-colors cursor-pointer">MIT License</li>
                     <li className="hover:text-white transition-colors cursor-pointer">Privacy</li>
                  </ul>
               </div>
            </div>
         </div>

         {/* Massive Watermark */}
         <div className="w-full pt-12 flex items-center justify-center border-t border-white/10 pb-12">
           <h1 className="text-[12vw] font-bold tracking-tighter leading-tight text-white/5 select-none text-center w-full">
             KINETIC
           </h1>
         </div>
         
         <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-white/40">
            <p>© {new Date().getFullYear()} Kinetic UI. Crafted with Next.js & GSAP.</p>
            <div className="flex gap-6">
               <a href="#" className="hover:text-white transition-colors"><Github className="h-5 w-5" /></a>
            </div>
         </div>
      </div>
    </footer>
  );
}
