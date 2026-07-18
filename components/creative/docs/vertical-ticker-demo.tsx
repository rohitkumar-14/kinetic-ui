"use client";

import React from "react";
import { VerticalTickerWall, VerticalTickerColumn } from "@/components/creative/vertical-ticker";

export function VerticalTickerDemo() {
  const users = [
    { name: "Alice", handle: "@alice", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d" },
    { name: "Bob", handle: "@bob", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
    { name: "Charlie", handle: "@charlie", avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d" },
    { name: "Diana", handle: "@diana", avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d" },
    { name: "Ethan", handle: "@ethan", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704b" },
    { name: "Fiona", handle: "@fiona", avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d" },
    { name: "George", handle: "@george", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704c" },
  ];

  const renderCard = (user: any, idx: number) => (
    <div key={idx} className="w-64 p-4 bg-zinc-900 border border-white/10 rounded-2xl flex items-center gap-4 mb-4 shrink-0 shadow-lg">
      <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
      <div>
        <h4 className="text-white font-medium text-sm">{user.name}</h4>
        <p className="text-zinc-500 text-xs">{user.handle}</p>
      </div>
    </div>
  );

  return (
    <div className="w-full h-[600px] bg-slate-950 rounded-xl border border-white/10 flex items-center justify-center overflow-hidden relative p-4">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/30 to-black pointer-events-none" />

      {/* The Wall */}
      <VerticalTickerWall className="justify-center rotate-[-5deg] scale-110 opacity-80 mix-blend-screen">
        <VerticalTickerColumn speed={2} direction={-1}>
          {users.map((u, i) => renderCard(u, i))}
          {users.map((u, i) => renderCard(u, i))}
        </VerticalTickerColumn>
        
        <VerticalTickerColumn speed={1.5} direction={1} className="mt-12 hidden sm:flex">
          {[...users].reverse().map((u, i) => renderCard(u, i))}
          {[...users].reverse().map((u, i) => renderCard(u, i))}
        </VerticalTickerColumn>
        
        <VerticalTickerColumn speed={2.5} direction={-1} className="mt-24 hidden md:flex">
          {users.map((u, i) => renderCard(u, i))}
          {users.map((u, i) => renderCard(u, i))}
        </VerticalTickerColumn>

        <VerticalTickerColumn speed={1} direction={1} className="hidden lg:flex">
          {[...users].reverse().map((u, i) => renderCard(u, i))}
          {[...users].reverse().map((u, i) => renderCard(u, i))}
        </VerticalTickerColumn>
      </VerticalTickerWall>
      
      {/* Overlay Fade */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-950 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
      
      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl text-center shadow-2xl">
          <h2 className="text-4xl font-bold text-white tracking-tight">Community Driven</h2>
          <p className="text-zinc-400 mt-2">Join thousands of developers worldwide.</p>
        </div>
      </div>
    </div>
  );
}
