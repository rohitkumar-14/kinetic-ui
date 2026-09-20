"use client";

import * as React from 'react';
import Link from 'next/link';
import { Sparkles, Github, Twitter } from 'lucide-react';
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
                  Handcrafted premium motion components for React developers who care about physics, craft, and 60fps performance.
               </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-16">
               <div className="space-y-4">
                  <h4 className="font-semibold text-white">Library</h4>
                  <ul className="space-y-3 text-sm text-white/50">
                     <li>
                       <Link href="/docs/components/magnetic-button" className="hover:text-white transition-colors">
                         Components
                       </Link>
                     </li>

                     <li>
                       <Link href="/docs/animations" className="hover:text-white transition-colors">
                         Animations & Physics
                       </Link>
                     </li>
                  </ul>
               </div>
               <div className="space-y-4">
                  <h4 className="font-semibold text-white">Resources</h4>
                  <ul className="space-y-3 text-sm text-white/50">
                     <li>
                       <Link href="/docs" className="hover:text-white transition-colors">
                         Documentation
                       </Link>
                     </li>
                     <li>
                       <Link href="/docs/installation" className="hover:text-white transition-colors">
                         CLI Installation
                       </Link>
                     </li>
                     <li>
                       <Link href="/docs/changelog" className="hover:text-white transition-colors">
                         Changelog
                       </Link>
                     </li>
                  </ul>
               </div>
               <div className="space-y-4 hidden sm:block">
                  <h4 className="font-semibold text-white">Playground</h4>
                  <ul className="space-y-3 text-sm text-white/50">
                     <li>
                       <Link href="/playground" className="hover:text-white transition-colors">
                         Canvas Playground
                       </Link>
                     </li>
                     <li>
                       <Link href="/pricing" className="hover:text-white transition-colors">
                         Pricing & Licensing
                       </Link>
                     </li>
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
            <p>© {new Date().getFullYear()} Kinetic UI. Open Source under MIT License.</p>
            <div className="flex gap-6 items-center">
               <Link href="https://github.com/kinetic/ui" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                 <Github className="h-5 w-5" />
               </Link>
            </div>
         </div>
      </div>
    </footer>
  );
}
