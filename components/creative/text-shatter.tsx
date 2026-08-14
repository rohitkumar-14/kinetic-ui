"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Matter from "matter-js";
import { cn } from "@/lib/utils";

export interface TextShatterProps {
  text: string;
  className?: string;
}

export function TextShatter({ text, className }: TextShatterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  
  const [isShattered, setIsShattered] = useState(false);
  const [bodies, setBodies] = useState<{ id: string; body: Matter.Body; char: string; originalX: number; originalY: number }[]>([]);

  // Split text into characters
  const chars = text.split("");
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const handleShatter = () => {
    if (isShattered || !containerRef.current) return;
    setIsShattered(true);

    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();

    // Create physics engine
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 1, scale: 0.001 }
    });
    engineRef.current = engine;

    // Create boundaries
    const ground = Matter.Bodies.rectangle(width / 2, height + 50, width * 2, 100, { isStatic: true });
    const leftWall = Matter.Bodies.rectangle(-50, height / 2, 100, height * 2, { isStatic: true });
    const rightWall = Matter.Bodies.rectangle(width + 50, height / 2, 100, height * 2, { isStatic: true });
    
    Matter.World.add(engine.world, [ground, leftWall, rightWall]);

    // Create bodies for each character
    const newBodies = chars.map((char, i) => {
      const el = charRefs.current[i];
      if (!el) return null;
      
      const rect = el.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      const x = rect.left - containerRect.left + rect.width / 2;
      const y = rect.top - containerRect.top + rect.height / 2;
      
      const body = Matter.Bodies.rectangle(x, y, rect.width, rect.height, {
        restitution: 0.6,
        friction: 0.1,
        render: { visible: false }
      });
      
      // Apply explosive force
      const forceX = (Math.random() - 0.5) * 0.05;
      const forceY = -Math.random() * 0.05 - 0.02;
      Matter.Body.applyForce(body, body.position, { x: forceX, y: forceY });
      
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.5);

      return {
        id: `char-${i}`,
        body,
        char,
        originalX: x,
        originalY: y
      };
    }).filter(Boolean) as any[];

    setBodies(newBodies);
    Matter.World.add(engine.world, newBodies.map(b => b.body));

    // Run engine
    const runner = Matter.Runner.create();
    runnerRef.current = runner;
    Matter.Runner.run(runner, engine);

    // Sync DOM elements with physics bodies
    Matter.Events.on(engine, 'afterUpdate', () => {
      newBodies.forEach((b, i) => {
        const el = charRefs.current[i];
        if (el) {
          el.style.transform = `translate(${b.body.position.x - b.originalX}px, ${b.body.position.y - b.originalY}px) rotate(${b.body.angle}rad)`;
        }
      });
    });
  };

  const handleReset = () => {
    if (!isShattered) return;
    
    // Stop physics
    if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
    if (engineRef.current) {
      Matter.Engine.clear(engineRef.current);
      // We don't completely destroy yet, just clear
    }
    
    // Animate DOM elements back to origin using Framer Motion logic manually or just CSS transitions
    chars.forEach((_, i) => {
      const el = charRefs.current[i];
      if (el) {
        el.style.transition = "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)";
        el.style.transform = "translate(0px, 0px) rotate(0rad)";
      }
    });

    setTimeout(() => {
      chars.forEach((_, i) => {
        const el = charRefs.current[i];
        if (el) {
          el.style.transition = "none";
        }
      });
      setIsShattered(false);
      setBodies([]);
    }, 800);
  };

  useEffect(() => {
    return () => {
      if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
      if (engineRef.current) Matter.Engine.clear(engineRef.current);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={cn("relative w-full h-full flex items-center justify-center overflow-hidden cursor-pointer", className)}
      onClick={isShattered ? handleReset : handleShatter}
    >
      <div className="flex flex-wrap justify-center relative z-10 pointer-events-none">
        {chars.map((char, i) => (
          <span
            key={i}
            ref={(el) => { charRefs.current[i] = el; }}
            className="inline-block relative text-6xl md:text-8xl font-black text-white"
            style={{ 
              whiteSpace: char === " " ? "pre" : "normal",
              willChange: "transform"
            }}
          >
            {char}
          </span>
        ))}
      </div>
      
      <div className="absolute bottom-10 left-0 w-full text-center text-sm text-zinc-500 font-mono pointer-events-none">
        {isShattered ? "Click anywhere to rebuild" : "Click the text to shatter"}
      </div>
    </div>
  );
}
