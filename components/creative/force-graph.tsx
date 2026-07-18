"use client";

import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { cn } from "@/lib/utils";

export interface ForceNode {
  id: string;
  label: string;
  /** Custom React node to render. If not provided, a default pill is used. */
  element?: React.ReactNode;
  width?: number;
  height?: number;
}

export interface ForceLink {
  source: string;
  target: string;
}

export interface ForceGraphProps extends React.HTMLAttributes<HTMLDivElement> {
  nodes: ForceNode[];
  links: ForceLink[];
  /** Strength of the repulsion between nodes. Default 5000 */
  repulsion?: number;
  /** Spring stiffness of the links. Default 0.02 */
  linkStiffness?: number;
  /** Spring resting length. Default 150 */
  linkLength?: number;
}

export function ForceGraph({
  nodes,
  links,
  repulsion = 5000,
  linkStiffness = 0.02,
  linkLength = 150,
  className,
  ...props
}: ForceGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<number | null>(null);
  
  // We store positions in state to update the SVG lines. 
  // For standard nodes, we sync directly to the DOM for maximum performance, 
  // but SVG lines need React renders (or direct DOM manipulation). We'll use direct DOM manipulation for lines too!
  const bodiesRef = useRef<{ [key: string]: Matter.Body }>({});
  const linesRef = useRef<{ [key: string]: SVGLineElement | null }>({});

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // 1. Setup Engine
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0, scale: 0 } // No gravity! It's a top-down force graph
    });
    engineRef.current = engine;

    // 2. Create Bodies
    const bodiesMap: { [key: string]: Matter.Body } = {};
    const worldBodies: Matter.Body[] = [];

    nodes.forEach((node, i) => {
      // Scatter nodes randomly near the center
      const x = width / 2 + (Math.random() - 0.5) * 200;
      const y = height / 2 + (Math.random() - 0.5) * 200;
      
      const w = node.width || 120;
      const h = node.height || 40;

      const body = Matter.Bodies.rectangle(x, y, w, h, {
        restitution: 0.8,
        frictionAir: 0.1, // High air friction to dampen movement
        label: node.id,
      });

      bodiesMap[node.id] = body;
      worldBodies.push(body);
    });

    Matter.World.add(engine.world, worldBodies);
    bodiesRef.current = bodiesMap;

    // 3. Create Constraints (Links)
    const worldConstraints: Matter.Constraint[] = [];
    links.forEach((link) => {
      const bodyA = bodiesMap[link.source];
      const bodyB = bodiesMap[link.target];

      if (bodyA && bodyB) {
        const constraint = Matter.Constraint.create({
          bodyA,
          bodyB,
          stiffness: linkStiffness,
          length: linkLength,
          render: { visible: false } // We render our own SVG lines
        });
        worldConstraints.push(constraint);
      }
    });

    Matter.World.add(engine.world, worldConstraints);

    // 4. Add Mouse Interaction
    const mouse = Matter.Mouse.create(containerRef.current);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });
    Matter.World.add(engine.world, mouseConstraint);

    // 5. Add Custom Repulsion Force (N-Body problem)
    Matter.Events.on(engine, 'beforeUpdate', () => {
      // Repel all bodies from each other
      for (let i = 0; i < worldBodies.length; i++) {
        for (let j = i + 1; j < worldBodies.length; j++) {
          const bodyA = worldBodies[i];
          const bodyB = worldBodies[j];

          const dx = bodyB.position.x - bodyA.position.x;
          const dy = bodyB.position.y - bodyA.position.y;
          const distSq = dx * dx + dy * dy;

          // Prevent division by zero and cap extreme forces
          if (distSq > 100 && distSq < 100000) {
            const force = repulsion / distSq;
            
            // Normalize direction and apply force
            const dist = Math.sqrt(distSq);
            const fx = (dx / dist) * force;
            const fy = (dy / dist) * force;

            Matter.Body.applyForce(bodyA, bodyA.position, { x: -fx, y: -fy });
            Matter.Body.applyForce(bodyB, bodyB.position, { x: fx, y: fy });
          }
        }

        // Add a gentle pull towards the center to keep them from flying off screen
        const body = worldBodies[i];
        const cx = width / 2;
        const cy = height / 2;
        const cdx = cx - body.position.x;
        const cdy = cy - body.position.y;
        Matter.Body.applyForce(body, body.position, { 
          x: cdx * 0.00005, 
          y: cdy * 0.00005 
        });
      }
    });

    // 6. DOM Sync Loop
    const syncDOM = () => {
      Matter.Engine.update(engine, 1000 / 60);

      // Sync Node DIVs
      nodes.forEach((node) => {
        const body = bodiesMap[node.id];
        const domElement = document.getElementById(`force-node-${node.id}`);
        if (body && domElement) {
          // Center the DOM element on the body coordinates
          const x = body.position.x - (node.width || 120) / 2;
          const y = body.position.y - (node.height || 40) / 2;
          domElement.style.transform = `translate(${x}px, ${y}px) rotate(${body.angle}rad)`;
        }
      });

      // Sync SVG Lines
      links.forEach((link) => {
        const bodyA = bodiesMap[link.source];
        const bodyB = bodiesMap[link.target];
        const lineElement = linesRef.current[`${link.source}-${link.target}`];
        
        if (bodyA && bodyB && lineElement) {
          lineElement.setAttribute("x1", bodyA.position.x.toString());
          lineElement.setAttribute("y1", bodyA.position.y.toString());
          lineElement.setAttribute("x2", bodyB.position.x.toString());
          lineElement.setAttribute("y2", bodyB.position.y.toString());
        }
      });

      renderRef.current = requestAnimationFrame(syncDOM);
    };

    renderRef.current = requestAnimationFrame(syncDOM);

    // Cleanup
    return () => {
      if (renderRef.current) cancelAnimationFrame(renderRef.current);
      Matter.Engine.clear(engine);
      Matter.World.clear(engine.world, false);
      mouse.element.removeEventListener("mousewheel", (mouse as any).mousewheel);
      mouse.element.removeEventListener("DOMMouseScroll", (mouse as any).mousewheel);
    };
  }, [nodes, links, repulsion, linkStiffness, linkLength]);

  return (
    <div 
      ref={containerRef} 
      className={cn("relative w-full h-full overflow-hidden bg-transparent", className)}
      {...props}
    >
      {/* SVG Layer for Links */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {links.map((link, i) => (
          <line
            key={`${link.source}-${link.target}-${i}`}
            ref={(el) => { linesRef.current[`${link.source}-${link.target}`] = el }}
            stroke="rgba(255,255,255,0.2)"
            strokeWidth={2}
          />
        ))}
      </svg>

      {/* DOM Layer for Nodes */}
      {nodes.map((node) => (
        <div
          key={node.id}
          id={`force-node-${node.id}`}
          className="absolute top-0 left-0 z-10 cursor-grab active:cursor-grabbing"
          style={{ 
            width: node.width || 120, 
            height: node.height || 40,
            willChange: "transform"
          }}
        >
          {node.element ? (
            node.element
          ) : (
            <div className="w-full h-full bg-zinc-900 border border-white/20 rounded-full flex items-center justify-center text-white shadow-xl hover:bg-zinc-800 transition-colors">
              <span className="text-sm font-bold truncate px-2">{node.label}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
