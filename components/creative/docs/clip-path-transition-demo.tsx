'use client';

import React, { useState } from 'react';
import { ClipPathTransition } from '@/components/creative/clip-path-transition';

export function ClipPathTransitionDemo({ variant = "circle", duration = 0.8 }: any) {
  const [pageIndex, setPageIndex] = useState(0);

  const pages = [
    { bg: "bg-zinc-900", title: "Home Page", text: "Click to navigate" },
    { bg: "bg-indigo-900", title: "About Us", text: "Creative agency" },
    { bg: "bg-emerald-900", title: "Contact", text: "Get in touch" }
  ];

  const currentPage = pages[pageIndex % pages.length];

  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden border border-white/10 bg-black relative">
      <ClipPathTransition 
        triggerKey={pageIndex} 
        variant={variant} 
        duration={duration}
      >
        <div className={`w-full h-full flex flex-col items-center justify-center ${currentPage.bg}`}>
          <h2 className="text-4xl font-bold text-white mb-2">{currentPage.title}</h2>
          <p className="text-white/70 mb-8">{currentPage.text}</p>
          <button 
            onClick={() => setPageIndex(p => p + 1)}
            className="px-6 py-3 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform"
          >
            Next Page
          </button>
        </div>
      </ClipPathTransition>
    </div>
  );
}
