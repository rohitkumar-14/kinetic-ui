"use client";

import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { cn } from "@/lib/utils";

export interface PhysicsAuthFormProps {
  className?: string;
  onLogin?: (email: string, pass: string) => void;
}

export function PhysicsAuthForm({ className, onLogin }: PhysicsAuthFormProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const lastPassLength = useRef(0);

  useEffect(() => {
    if (!sceneRef.current) return;

    // Setup Matter.js Engine
    const engine = Matter.Engine.create();
    const render = Matter.Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: sceneRef.current.clientWidth,
        height: 200,
        wireframes: false,
        background: "transparent",
        pixelRatio: typeof window !== "undefined" ? window.devicePixelRatio : 1,
      },
    });

    const ground = Matter.Bodies.rectangle(
      sceneRef.current.clientWidth / 2,
      200, // bottom
      sceneRef.current.clientWidth,
      20,
      { isStatic: true, render: { fillStyle: "#3f3f46" } }
    );
    
    const leftWall = Matter.Bodies.rectangle(0, 100, 20, 200, { isStatic: true, render: { fillStyle: "transparent" } });
    const rightWall = Matter.Bodies.rectangle(sceneRef.current.clientWidth, 100, 20, 200, { isStatic: true, render: { fillStyle: "transparent" } });

    Matter.World.add(engine.world, [ground, leftWall, rightWall]);
    Matter.Runner.run(Matter.Runner.create(), engine);
    Matter.Render.run(render);

    engineRef.current = engine;
    renderRef.current = render;

    return () => {
      Matter.Render.stop(render);
      Matter.Engine.clear(engine);
      if (render.canvas) render.canvas.remove();
    };
  }, []);

  useEffect(() => {
    // When password length increases, drop a block
    if (password.length > lastPassLength.current) {
      if (engineRef.current && sceneRef.current) {
        const x = Math.random() * (sceneRef.current.clientWidth - 40) + 20;
        
        // Determine block color based on strength (length)
        let color = "#ef4444"; // red (weak)
        if (password.length > 4) color = "#eab308"; // yellow
        if (password.length > 8) color = "#22c55e"; // green

        const block = Matter.Bodies.rectangle(x, -20, 30, 30, {
          restitution: 0.5,
          render: {
            fillStyle: color,
            strokeStyle: "#ffffff",
            lineWidth: 1
          }
        });
        Matter.World.add(engineRef.current.world, block);
      }
    }
    lastPassLength.current = password.length;
  }, [password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLogin) onLogin(email, password);
  };

  return (
    <div className={cn("w-full max-w-sm mx-auto overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-[0_0_80px_rgba(0,0,0,0.5)]", className)}>
      <div className="p-8">
        <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Login</h2>
        <p className="text-zinc-400 text-sm mb-6">Type your password to see physics in action.</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">Email</label>
            <input 
              type="email"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-inner" 
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-inner" 
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit"
            className="w-full mt-2 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-xl px-4 py-3 shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all active:scale-95"
          >
            Authenticate
          </button>
        </form>
      </div>

      {/* Physics Canvas Container */}
      <div 
        ref={sceneRef} 
        className="w-full h-[200px] bg-zinc-950/50 border-t border-zinc-800/50 pointer-events-none"
      />
    </div>
  );
}
