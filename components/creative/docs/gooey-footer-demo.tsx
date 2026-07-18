"use client";

import React from "react";
import { GooeyFooter } from "@/components/creative/gooey-footer";
import { Twitter, Github, Linkedin, Mail } from "lucide-react";

export function GooeyFooterDemo({ color = "#a855f7" }: { color?: string }) {
  const links = [
    { label: "Home", href: "#" },
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ];

  const socials = [
    { icon: <Twitter className="w-5 h-5" />, href: "#" },
    { icon: <Github className="w-5 h-5" />, href: "#" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#" },
    { icon: <Mail className="w-5 h-5" />, href: "#" },
  ];

  return (
    <div className="w-full bg-slate-950 rounded-xl overflow-hidden border border-white/10 flex flex-col custom-scrollbar">
      {/* Demo padding to simulate page content above the footer */}
      <div className="h-64 flex flex-col items-center justify-center border-b border-white/5 bg-zinc-950/50">
        <h2 className="text-xl font-bold text-white tracking-tight">Main Page Content</h2>
        <p className="text-zinc-500 text-sm mt-2">Scroll down and hover the center blobs</p>
      </div>

      <GooeyFooter 
        links={links} 
        socials={socials} 
        color={color}
        className="border-t-0"
      />
    </div>
  );
}
