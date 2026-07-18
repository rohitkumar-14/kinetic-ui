"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, motionValue } from "framer-motion";
import Matter from "matter-js";
import { cn } from "@/lib/utils";

interface PhysicsDockProps {
  children: React.ReactNode;
  className?: string;
  itemClassName?: string;
  /** Radius of the collision body for each icon */
  itemRadius?: number;
  /** Spacing between items */
  gap?: number;
  /** Spring stiffness holding items to their anchor */
  stiffness?: number;
  /** Spring damping */
  damping?: number;
  /** How much items repel each other (collision bounciness) */
  bounciness?: number;
  /** Shape of the physics body */
  bodyType?: "circle" | "rectangle";
}

export function PhysicsDock({
  children,
  className,
  itemClassName,
  itemRadius = 24,
  gap = 12,
  stiffness = 0.05,
  damping = 0.1,
  bounciness = 0.4,
  bodyType = "circle",
}: PhysicsDockProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  
  const items = React.Children.toArray(children);
  const numItems = items.length;

  // We need motion values for each item
  const motionValues = useMemo(() => {
    return items.map(() => ({
      x: motionValue(0),
      y: motionValue(0),
      rotate: motionValue(0),
    }));
  }, [items.length]);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    
    // Setup Matter.js Engine
    const engine = Matter.Engine.create();
    engineRef.current = engine;
    
    // We want a top-down view without gravity pulling them to the bottom of the screen.
    // The springs will hold them in place.
    engine.world.gravity.y = 0;
    engine.world.gravity.x = 0;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Optional: add visual debugger rendering (commented out for prod)
    /*
    const render = Matter.Render.create({
      element: container,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: 'transparent'
      }
    });
    renderRef.current = render;
    Matter.Render.run(render);
    */

    // Calculate anchor positions
    // We want them centered in the container.
    const totalWidth = (itemRadius * 2 * numItems) + (gap * (numItems - 1));
    const startX = (width - totalWidth) / 2 + itemRadius;
    const centerY = height / 2;

    const bodies: Matter.Body[] = [];
    const constraints: Matter.Constraint[] = [];

    // Create a bounding box so items don't fly off screen
    const wallOptions = { isStatic: true, render: { visible: false } };
    const wallThickness = 100;
    Matter.World.add(engine.world, [
      Matter.Bodies.rectangle(width / 2, -wallThickness / 2, width + wallThickness * 2, wallThickness, wallOptions), // Top
      Matter.Bodies.rectangle(width / 2, height + wallThickness / 2, width + wallThickness * 2, wallThickness, wallOptions), // Bottom
      Matter.Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height + wallThickness * 2, wallOptions), // Left
      Matter.Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height + wallThickness * 2, wallOptions), // Right
    ]);

    items.forEach((_, i) => {
      const x = startX + i * (itemRadius * 2 + gap);
      const y = centerY;

      const bodyOptions = {
        restitution: bounciness, // Bounciness
        frictionAir: 0.1, // Air resistance to calm them down
        friction: 0.1,
        density: 0.05,
      };

      const body = bodyType === "circle" 
        ? Matter.Bodies.circle(x, y, itemRadius, bodyOptions)
        : Matter.Bodies.rectangle(x, y, itemRadius * 2, itemRadius * 2, {
            ...bodyOptions,
            chamfer: { radius: 12 } // slightly rounded corners for the physics body to prevent sticking
          });

      // Anchor constraint (Spring)
      const constraint = Matter.Constraint.create({
        pointA: { x, y }, // The anchor point in the world
        bodyB: body,      // The body to attach
        pointB: { x: 0, y: 0 },
        stiffness: stiffness,
        damping: damping,
        render: { visible: false }
      });

      bodies.push(body);
      constraints.push(constraint);
      
      // Initialize motion values
      motionValues[i].x.set(x);
      motionValues[i].y.set(y);
    });

    Matter.World.add(engine.world, [...bodies, ...constraints]);

    // Add Mouse interaction
    const mouse = Matter.Mouse.create(container);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });

    // Fix mouse wheel scrolling issue on the container
    mouseConstraint.mouse.element.removeEventListener("mousewheel", (mouseConstraint.mouse as any).mousewheel);
    mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", (mouseConstraint.mouse as any).mousewheel);

    Matter.World.add(engine.world, mouseConstraint);

    // Sync physics to Framer Motion
    Matter.Events.on(engine, "afterUpdate", () => {
      bodies.forEach((body, i) => {
        motionValues[i].x.set(body.position.x);
        motionValues[i].y.set(body.position.y);
        motionValues[i].rotate.set(body.angle * (180 / Math.PI));
      });
    });

    // Start Runner
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    // Handle Resize (Re-center anchors)
    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      const newStartX = (newWidth - totalWidth) / 2 + itemRadius;
      const newCenterY = newHeight / 2;

      constraints.forEach((c, i) => {
        c.pointA = { x: newStartX + i * (itemRadius * 2 + gap), y: newCenterY };
      });
      
      // Update mouse scale if needed (usually handled by matter-js, but good to be aware)
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      Matter.Runner.stop(runner);
      if (renderRef.current) {
        Matter.Render.stop(renderRef.current);
        renderRef.current.canvas.remove();
      }
      Matter.Engine.clear(engine);
      Matter.World.clear(engine.world, false);
    };
  }, [items.length, itemRadius, gap, stiffness, damping, bounciness, bodyType, motionValues]);

  return (
    <div 
      ref={containerRef} 
      className={cn("relative w-full h-[200px] overflow-hidden rounded-2xl", className)}
    >
      {/* 
        Matter.js will handle pointer events via its MouseConstraint attached to this container. 
        We just render the elements at the motion values.
      */}
      {items.map((child, i) => (
        <motion.div
          key={i}
          className={cn("absolute top-0 left-0 flex items-center justify-center cursor-grab active:cursor-grabbing", itemClassName)}
          style={{
            width: itemRadius * 2,
            height: itemRadius * 2,
            x: motionValues[i].x,
            y: motionValues[i].y,
            rotate: motionValues[i].rotate,
            // We use -marginLeft/Top to center the DOM element on the physics body's center (which is its x,y)
            marginLeft: -itemRadius,
            marginTop: -itemRadius,
          }}
          // Prevent standard drag so Matter.js can take over
          onDragStart={(e) => e.preventDefault()}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
