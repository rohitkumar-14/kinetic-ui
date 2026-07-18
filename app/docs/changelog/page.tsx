'use client';

import React from 'react';
import { GitBranch, Star } from 'lucide-react';

export default function ChangelogPage() {
  const versions = [
    {
      version: "v1.0.0",
      date: "June 2026",
      desc: "Kinetic UI official release. Incorporates 7 primary high-end components (Bento Grid, Tilt Cards, Text Reveal, Kinetic Loaders) with complete CLI automation.",
      changes: [
        "Interactive right Table of Contents scroll-observer tracking",
        "Command Palette dialog triggered via keyboard shortcuts",
        "Smooth sliding highlights inside left navigation sidebar"
      ]
    },
    {
      version: "v0.9.0",
      date: "May 2026",
      desc: "Initial public beta release of motion systems.",
      changes: [
        "Framer Motion spring calculations for Cursor interactions",
        "GSAP ScrollTrigger binding wrappers"
      ]
    }
  ];

  return (
    <div className="space-y-12">
      <div>
        <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full uppercase tracking-wider">
          Release History
        </span>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mt-4 mb-4 text-white">
          Changelog
        </h1>
        <p className="text-base text-zinc-400 font-light max-w-2xl leading-relaxed">
          Follow the progress and feature releases of the Kinetic design system framework.
        </p>
      </div>

      {/* Timeline of versions */}
      <div className="relative border-l border-white/5 pl-6 space-y-12 ml-4">
        {versions.map((ver, i) => (
          <div key={i} className="relative">
            {/* Timeline dot */}
            <span className="absolute -left-[31px] top-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-indigo-500 text-white border-4 border-black">
              <GitBranch className="w-2.5 h-2.5" />
            </span>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">{ver.version}</h2>
                <span className="text-xs text-zinc-500 font-light">{ver.date}</span>
              </div>
              <p className="text-xs text-zinc-400 font-light max-w-xl leading-relaxed">
                {ver.desc}
              </p>
              <ul className="list-disc list-inside text-xs text-zinc-500 space-y-1.5 pt-2 pl-2 font-light">
                {ver.changes.map((change, cIdx) => (
                  <li key={cIdx}>{change}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
