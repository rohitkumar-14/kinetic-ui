"use client";

import React, { createContext, useContext, useEffect, useRef, useState, useLayoutEffect } from "react";
import Matter from "matter-js";
import { cn } from "@/lib/utils";

// ─── CONTEXT ───

interface PhysicsContextType {
  engine: Matter.Engine | null;
  world: Matter.World | null;
}

const PhysicsContext = createContext<PhysicsContextType>({ engine: null, world: null });

// ─── PHYSICS CANVAS (WRAPPER) ───

export interface PhysicsCanvasProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Background color or Tailwind classes */
  className?: string;
  /** Friction of the air/environment (0 to 1) */
  frictionAir?: number;
  /** Gravity multiplier */
  gravity?: { x: number; y: number };
}

export function PhysicsCanvas({
  children,
  className,
  frictionAir = 0.02,
  gravity = { x: 0, y: 1 },
  ...props
}: PhysicsCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [engineState, setEngineState] = useState<PhysicsContextType>({ engine: null, world: null });
  const mouseConstraintRef = useRef<Matter.MouseConstraint | null>(null);
  const wallsRef = useRef<Matter.Body[]>([]);

  // Initialize Matter.js Engine
  useEffect(() => {
    if (!containerRef.current) return;

    // Create Engine
    const engine = Matter.Engine.create({
      gravity: {
        x: gravity.x,
        y: gravity.y,
        scale: 0.001,
      },
      positionIterations: 6,
      velocityIterations: 4,
    });
    const world = engine.world;

    // Create Mouse and MouseConstraint for dragging
    const mouse = Matter.Mouse.create(containerRef.current);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });
    mouseConstraintRef.current = mouseConstraint;

    // Keep the mouse in sync with scrolling
    Matter.Events.on(engine, "beforeUpdate", () => {
      Matter.Mouse.setScale(mouse, { x: 1, y: 1 });
    });

    Matter.World.add(world, mouseConstraint);

    // Initial Walls
    const wallOptions = { isStatic: true, friction: 0, restitution: 0.5 };
    const w = containerRef.current.clientWidth;
    const h = containerRef.current.clientHeight;
    const thickness = 500; // Thick walls prevent tunneling

    wallsRef.current = [
      Matter.Bodies.rectangle(w / 2, -thickness / 2, w + thickness * 2, thickness, wallOptions), // Top
      Matter.Bodies.rectangle(w / 2, h + thickness / 2, w + thickness * 2, thickness, wallOptions), // Bottom
      Matter.Bodies.rectangle(-thickness / 2, h / 2, thickness, h + thickness * 2, wallOptions), // Left
      Matter.Bodies.rectangle(w + thickness / 2, h / 2, thickness, h + thickness * 2, wallOptions), // Right
    ];
    Matter.World.add(world, wallsRef.current);

    // Start Runner
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    setEngineState({ engine, world });

    // Handle Resizing
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      // Update wall positions and sizes
      Matter.Body.setPosition(wallsRef.current[0], { x: width / 2, y: -thickness / 2 });
      Matter.Body.setPosition(wallsRef.current[1], { x: width / 2, y: height + thickness / 2 });
      Matter.Body.setPosition(wallsRef.current[2], { x: -thickness / 2, y: height / 2 });
      Matter.Body.setPosition(wallsRef.current[3], { x: width + thickness / 2, y: height / 2 });
      
      // Note: Changing dimensions of bodies dynamically in Matter.js requires recreating them or scaling.
      // Scaling static walls is perfectly fine for basic boundaries.
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(containerRef.current);

    // Cleanup
    return () => {
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      resizeObserver.disconnect();
    };
  }, [gravity.x, gravity.y]);

  return (
    <PhysicsContext.Provider value={engineState}>
      <div 
        ref={containerRef} 
        className={cn("relative overflow-hidden", className)} 
        {...props}
      >
        {children}
      </div>
    </PhysicsContext.Provider>
  );
}

// ─── PHYSICS ITEM (CHILD) ───

export interface PhysicsItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Initial X position */
  x: number;
  /** Initial Y position */
  y: number;
  /** Width in pixels */
  width: number;
  /** Height in pixels */
  height: number;
  /** Body shape (default rectangle) */
  shape?: "rectangle" | "circle";
  /** Bounciness (0 to 1) */
  restitution?: number;
  /** Friction (0 to 1) */
  friction?: number;
  /** Density (mass = density * area) */
  density?: number;
  className?: string;
}

export function PhysicsItem({
  children,
  x,
  y,
  width,
  height,
  shape = "rectangle",
  restitution = 0.5,
  friction = 0.1,
  density = 0.001,
  className,
  ...props
}: PhysicsItemProps) {
  const { engine, world } = useContext(PhysicsContext);
  const elementRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<Matter.Body | null>(null);

  useLayoutEffect(() => {
    if (!engine || !world || !elementRef.current) return;

    // Create the body
    let body: Matter.Body;
    const commonOptions = {
      restitution,
      friction,
      density,
      frictionAir: 0.02,
      render: { visible: false } // We use DOM
    };

    if (shape === "circle") {
      const radius = Math.min(width, height) / 2;
      body = Matter.Bodies.circle(x, y, radius, commonOptions);
    } else {
      body = Matter.Bodies.rectangle(x, y, width, height, Object.assign({}, commonOptions, { chamfer: { radius: 8 } }));
    }

    bodyRef.current = body;
    Matter.World.add(world, body);

    // Sync DOM on engine update
    const updateElement = () => {
      if (elementRef.current && bodyRef.current) {
        const { position, angle } = bodyRef.current;
        // We use absolute positioning and CSS transform for 60fps performance
        elementRef.current.style.transform = `translate(-50%, -50%) translate(${position.x}px, ${position.y}px) rotate(${angle}rad)`;
      }
    };

    Matter.Events.on(engine, "afterUpdate", updateElement);

    return () => {
      Matter.Events.off(engine, "afterUpdate", updateElement);
      if (bodyRef.current) {
        Matter.World.remove(world, bodyRef.current);
      }
    };
  }, [engine, world, x, y, width, height, shape, restitution, friction, density]);

  return (
    <div
      ref={elementRef}
      className={cn("absolute top-0 left-0 cursor-grab active:cursor-grabbing", className)}
      style={{
        width,
        height,
        // The transform origin must be center because Matter.js positions are center-based
        transformOrigin: "center center", 
        // Set an initial position so it doesn't flicker at 0,0 before the first frame
        transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(0rad)`,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
