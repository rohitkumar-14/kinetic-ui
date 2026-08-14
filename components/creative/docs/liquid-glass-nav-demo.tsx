"use client";

import React, { useState } from "react";
import { LiquidGlassNav } from "@/components/creative/liquid-glass-nav";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "features", label: "Features" },
  { id: "pricing", label: "Pricing" },
  { id: "about", label: "About Us" },
  { id: "contact", label: "Contact" },
];

export default function LiquidGlassNavDemo() {
  const [active, setActive] = useState("home");

  return (
    <div className="w-full flex items-center justify-center min-h-[400px] bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center border border-border rounded-xl relative overflow-hidden">
      
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      <div className="relative z-10 w-full max-w-2xl px-6 flex justify-center">
        <LiquidGlassNav 
          items={NAV_ITEMS}
          activeId={active}
          onChange={setActive}
        />
      </div>

    </div>
  );
}
