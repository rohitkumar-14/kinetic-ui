"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useSpring } from "framer-motion";
import { MousePointer2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CursorData {
  id: string;
  x: number;
  y: number;
  color: string;
  name: string;
}

export interface MultiplayerCursorEcosystemProps {
  children: React.ReactNode;
  className?: string;
  /** Live cursor data. If empty, the component will spawn AI Ghost cursors. */
  cursors?: CursorData[];
  /** Whether to simulate AI ghosts when no cursors are provided. */
  ghostMode?: boolean;
}

// Separate component for a single cursor to manage its own spring state
function RemoteCursor({ cursor }: { cursor: CursorData }) {
  // Use springs for ultra-smooth interpolation (like Figma)
  const springX = useSpring(cursor.x, { stiffness: 300, damping: 30, mass: 0.8 });
  const springY = useSpring(cursor.y, { stiffness: 300, damping: 30, mass: 0.8 });

  useEffect(() => {
    springX.set(cursor.x);
    springY.set(cursor.y);
  }, [cursor.x, cursor.y, springX, springY]);

  return (
    <motion.div
      className="absolute top-0 left-0 pointer-events-none z-50 flex flex-col items-start"
      style={{
        x: springX,
        y: springY,
      }}
    >
      <MousePointer2 
        className="w-5 h-5 drop-shadow-md" 
        style={{ color: cursor.color, fill: cursor.color }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="ml-4 mt-1 px-2 py-1 rounded-md text-[10px] font-bold text-white shadow-lg whitespace-nowrap"
        style={{ backgroundColor: cursor.color }}
      >
        {cursor.name}
      </motion.div>
    </motion.div>
  );
}

export function MultiplayerCursorEcosystem({ 
  children, 
  className,
  cursors = [],
  ghostMode = true
}: MultiplayerCursorEcosystemProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ghostCursors, setGhostCursors] = useState<CursorData[]>([]);
  const mousePositionRef = useRef({ 
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, 
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mousePositionRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  // Simulation logic for Ghost Mode if no real cursors are provided
  useEffect(() => {
    if (cursors.length > 0 || !ghostMode) {
      setGhostCursors([]);
      return;
    }

    // We are in ghost mode. Spawn 3 fake users.
    const fakeUsers = [
      { id: "ghost-1", color: "#f43f5e", name: "Alice (AI)" },
      { id: "ghost-2", color: "#3b82f6", name: "Bob (AI)" },
      { id: "ghost-3", color: "#10b981", name: "Charlie (AI)" },
    ];

    // Initialize random positions
    let currentGhosts = fakeUsers.map(u => ({
      ...u,
      x: Math.random() * (window.innerWidth - 100),
      y: Math.random() * (window.innerHeight - 100)
    }));

    setGhostCursors(currentGhosts);

    const interval = setInterval(() => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      
      currentGhosts = currentGhosts.map(ghost => {
        // Move towards the user's mouse position to create a 'following' effect
        const dx = mousePositionRef.current.x - ghost.x;
        const dy = mousePositionRef.current.y - ghost.y;
        
        // Move 30% towards the mouse + random jitter to make it feel natural
        const targetX = ghost.x + (dx * 0.3) + (Math.random() - 0.5) * 150;
        const targetY = ghost.y + (dy * 0.3) + (Math.random() - 0.5) * 150;
        
        return {
          ...ghost,
          x: Math.max(0, Math.min(rect.width - 50, targetX)),
          y: Math.max(0, Math.min(rect.height - 50, targetY))
        };
      });
      
      setGhostCursors(currentGhosts);
    }, 1000); // Faster updates for better tracking

    return () => clearInterval(interval);
  }, [cursors.length]);

  const activeCursors = cursors.length > 0 ? cursors : ghostCursors;

  return (
    <div 
      ref={containerRef} 
      className={cn("relative w-full h-full overflow-hidden", className)}
      onMouseMove={handleMouseMove}
    >
      {/* Cursors Layer */}
      {activeCursors.map((cursor) => (
        <RemoteCursor key={cursor.id} cursor={cursor} />
      ))}
      
      {/* Content */}
      <div className="w-full h-full">
        {children}
      </div>

      {/* Ghost Mode Indicator */}
      {cursors.length === 0 && ghostMode && (
        <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 z-40 pointer-events-none">
          <p className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase">
            Ghost Mode Active
          </p>
        </div>
      )}
    </div>
  );
}
