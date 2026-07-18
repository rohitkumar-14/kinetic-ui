"use client";

import React from "react";
import { PhysicsDock } from "@/components/creative/physics-dock";
import { Home, Settings, User, Bell, Mail, Compass, Star } from "lucide-react";

export function PhysicsDockDemo({
  stiffness = 0.03,
  damping = 0.1,
  bounciness = 0.5
}: {
  stiffness?: number;
  damping?: number;
  bounciness?: number;
}) {
  const icons = [
    { icon: <Home className="w-6 h-6 text-indigo-400" />, bg: "bg-indigo-500/10", border: "border-indigo-500/20" },
    { icon: <Compass className="w-6 h-6 text-emerald-400" />, bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
    { icon: <Bell className="w-6 h-6 text-amber-400" />, bg: "bg-amber-500/10", border: "border-amber-500/20" },
    { icon: <Mail className="w-6 h-6 text-sky-400" />, bg: "bg-sky-500/10", border: "border-sky-500/20" },
    { icon: <User className="w-6 h-6 text-rose-400" />, bg: "bg-rose-500/10", border: "border-rose-500/20" },
    { icon: <Settings className="w-6 h-6 text-zinc-400" />, bg: "bg-zinc-500/10", border: "border-zinc-500/20" },
    { icon: <Star className="w-6 h-6 text-yellow-400" />, bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
  ];

  return (
    <div className="flex w-full min-h-[400px] flex-col items-center justify-end bg-[#0a0a0a] rounded-xl overflow-hidden relative">
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(99,102,241,0.15),transparent_50%)]" />

      <h2 className="absolute top-1/3 text-3xl md:text-5xl font-bold tracking-tight text-white/20 select-none pointer-events-none">
        Grab & Drag Icons
      </h2>

      <div className="w-full max-w-2xl px-4 pb-8 z-10">
        <PhysicsDock 
          itemRadius={32}
          gap={16}
          stiffness={stiffness}
          damping={damping}
          bounciness={bounciness}
          className="h-[250px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl"
        >
          {icons.map((item, idx) => (
            <div 
              key={idx}
              className={`w-full h-full rounded-full flex items-center justify-center backdrop-blur-md border shadow-xl ${item.bg} ${item.border}`}
            >
              {item.icon}
            </div>
          ))}
        </PhysicsDock>
      </div>
    </div>
  );
}

export function PhysicsDockJellyDemo() {
  const icons = [
    { icon: <Home className="w-8 h-8 text-white" />, bg: "bg-fuchsia-500" },
    { icon: <Compass className="w-8 h-8 text-white" />, bg: "bg-blue-500" },
    { icon: <Bell className="w-8 h-8 text-white" />, bg: "bg-violet-500" },
    { icon: <Mail className="w-8 h-8 text-white" />, bg: "bg-pink-500" },
    { icon: <User className="w-8 h-8 text-white" />, bg: "bg-purple-500" },
  ];

  return (
    <div className="flex w-full min-h-[400px] flex-col items-center justify-end bg-neutral-100 rounded-xl overflow-hidden relative">
      <h2 className="absolute top-1/3 text-3xl font-bold tracking-tight text-neutral-300 select-none pointer-events-none">
        Jelly Physics
      </h2>
      <div className="w-full max-w-2xl px-4 pb-8 z-10">
        <PhysicsDock 
          itemRadius={40}
          gap={10}
          stiffness={0.01} // Very loose spring
          damping={0.02} // Very little friction
          bounciness={0.8} // Extremely bouncy
          className="h-[250px] bg-white border border-neutral-200 shadow-sm rounded-3xl"
        >
          {icons.map((item, idx) => (
            <div 
              key={idx}
              className={`w-full h-full rounded-full flex items-center justify-center shadow-lg ${item.bg}`}
            >
              {item.icon}
            </div>
          ))}
        </PhysicsDock>
      </div>
    </div>
  );
}

export function PhysicsDockBlocksDemo() {
  const icons = [
    { icon: <Home className="w-6 h-6 text-indigo-900" />, bg: "bg-indigo-100" },
    { icon: <Compass className="w-6 h-6 text-emerald-900" />, bg: "bg-emerald-100" },
    { icon: <Bell className="w-6 h-6 text-amber-900" />, bg: "bg-amber-100" },
    { icon: <Mail className="w-6 h-6 text-sky-900" />, bg: "bg-sky-100" },
  ];

  return (
    <div className="flex w-full min-h-[400px] flex-col items-center justify-end bg-zinc-950 rounded-xl overflow-hidden relative">
      <h2 className="absolute top-1/3 text-3xl font-bold tracking-tight text-zinc-800 select-none pointer-events-none">
        Square Collisions
      </h2>
      <div className="w-full max-w-lg px-4 pb-8 z-10">
        <PhysicsDock 
          itemRadius={40}
          gap={4}
          stiffness={0.08}
          damping={0.2}
          bounciness={0.2}
          bodyType="rectangle"
          className="h-[250px] bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-3xl"
        >
          {icons.map((item, idx) => (
            <div 
              key={idx}
              className={`w-full h-full rounded-2xl flex items-center justify-center shadow-2xl ${item.bg}`}
            >
              {item.icon}
            </div>
          ))}
        </PhysicsDock>
      </div>
    </div>
  );
}
