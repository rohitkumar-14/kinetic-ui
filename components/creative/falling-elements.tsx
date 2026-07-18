"use client";

import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { cn } from "@/lib/utils";

export interface FallingElementsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  density?: number;
  restitution?: number;
  friction?: number;
  gravity?: number;
}

export function FallingElements({
  children,
  density = 0.001,
  restitution = 0.8, // Bounciness
  friction = 0.1,
  gravity = 1,
  className,
  ...props
}: FallingElementsProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  
  // We need to keep track of the body IDs mapped to their DOM element indices
  // to sync position and rotation.
  const [bodiesMap, setBodiesMap] = useState<Map<number, Matter.Body>>(new Map());

  useEffect(() => {
    if (!sceneRef.current) return;

    const engine = Matter.Engine.create({
      gravity: { x: 0, y: gravity, scale: 0.001 }
    });
    engineRef.current = engine;

    const width = sceneRef.current.clientWidth;
    const height = sceneRef.current.clientHeight;

    // Create boundaries
    const ground = Matter.Bodies.rectangle(width / 2, height + 50, width * 2, 100, { isStatic: true });
    const wallLeft = Matter.Bodies.rectangle(-50, height / 2, 100, height * 2, { isStatic: true });
    const wallRight = Matter.Bodies.rectangle(width + 50, height / 2, 100, height * 2, { isStatic: true });
    const ceiling = Matter.Bodies.rectangle(width / 2, -1000, width * 2, 100, { isStatic: true }); // High ceiling so they can fall from above

    Matter.World.add(engine.world, [ground, wallLeft, wallRight, ceiling]);

    // Add mouse control
    const mouse = Matter.Mouse.create(sceneRef.current);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });
    Matter.World.add(engine.world, mouseConstraint);

    // Runner
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    // Initial bodies creation will happen in a separate effect once the DOM nodes are measured.

    return () => {
      Matter.Runner.stop(runner);
      Matter.World.clear(engine.world, false);
      Matter.Engine.clear(engine);
    };
  }, [gravity]);

  // Handle syncing DOM children to Physics Bodies
  const childrenRef = useRef<HTMLDivElement[]>([]);
  
  useEffect(() => {
    if (!engineRef.current || !sceneRef.current || childrenRef.current.length === 0) return;

    const engine = engineRef.current;
    const width = sceneRef.current.clientWidth;
    
    // Clear old dynamic bodies
    const staticBodies = engine.world.bodies.filter(b => b.isStatic);
    Matter.World.clear(engine.world, false);
    Matter.World.add(engine.world, staticBodies); // Add walls back
    
    // Re-add mouse constraint
    const mouseConstraint = engine.world.constraints.find(c => c.label === "Mouse Constraint");
    if(mouseConstraint) Matter.World.add(engine.world, mouseConstraint);

    const newMap = new Map();

    childrenRef.current.forEach((el, index) => {
      if (!el) return;
      
      const rect = el.getBoundingClientRect();
      
      // Start them randomly at the top of the screen
      const startX = Math.random() * (width - 100) + 50;
      const startY = - (Math.random() * 500) - 100; // Above screen

      const body = Matter.Bodies.rectangle(
        startX, 
        startY, 
        rect.width, 
        rect.height, 
        {
          restitution,
          friction,
          density,
          angle: (Math.random() - 0.5) * 0.5 // Slight random rotation
        }
      );

      Matter.World.add(engine.world, body);
      newMap.set(index, body);
    });

    setBodiesMap(newMap);

  }, [children, density, friction, restitution]); // Re-run if children count/props change

  // Animation Loop for DOM Sync
  useEffect(() => {
    let animationFrameId: number;
    
    const syncDOM = () => {
      if (engineRef.current) {
        childrenRef.current.forEach((el, index) => {
          if (!el) return;
          const body = bodiesMap.get(index);
          if (body) {
            // Apply physics transform to DOM element
            // We translate from the body center to top-left of the DOM element
            el.style.transform = `translate(${body.position.x - el.offsetWidth / 2}px, ${body.position.y - el.offsetHeight / 2}px) rotate(${body.angle}rad)`;
          }
        });
      }
      animationFrameId = requestAnimationFrame(syncDOM);
    };
    
    syncDOM();
    
    return () => cancelAnimationFrame(animationFrameId);
  }, [bodiesMap]);

  return (
    <div 
      ref={sceneRef} 
      className={cn("relative w-full h-full overflow-hidden", className)} 
      {...props}
    >
      {React.Children.map(children, (child, index) => (
        <div
          // @ts-ignore
          ref={(el) => (childrenRef.current[index] = el)}
          className="absolute top-0 left-0 cursor-grab active:cursor-grabbing select-none touch-none"
          style={{ willChange: "transform" }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
