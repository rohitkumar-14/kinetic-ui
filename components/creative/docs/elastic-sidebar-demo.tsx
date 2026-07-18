"use client";

import { ElasticSidebar } from "@/components/creative/elastic-sidebar";

const navItems = [
  { title: "Home", href: "#" },
  { title: "Work", href: "#" },
  { title: "About", href: "#" },
  { title: "Contact", href: "#" },
];

export function ElasticSidebarDemo() {
  return (
    <div className="w-full relative h-[600px] rounded-2xl overflow-hidden border border-white/10 bg-zinc-950">
      
      {/* Fake Page Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-white/50">
        <h2 className="text-3xl font-bold mb-4">Elastic Navigation</h2>
        <p className="max-w-md">
          Click the menu button in the top right to see the elastic SVG morphing animation.
        </p>
      </div>

      {/* The Sidebar Component */}
      <ElasticSidebar items={navItems} />

    </div>
  );
}
