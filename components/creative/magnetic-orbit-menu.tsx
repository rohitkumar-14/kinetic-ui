"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  Figma,
  Code2,
  Cpu
} from "lucide-react";

interface Planet {
  id: string;
  icon: React.ReactNode;
  label: string;
  color: string;
  radius: number; // orbit distance
  speed: number;  // orbit speed multiplier
  angleOffset: number; // initial angle
}

const PLANETS: Planet[] = [
  { id: "p1", icon: <Github size={20} />, label: "GitHub", color: "#ffffff", radius: 100, speed: 1, angleOffset: 0 },
  { id: "p2", icon: <Twitter size={20} />, label: "Twitter", color: "#1da1f2", radius: 100, speed: 1, angleOffset: (Math.PI * 2) / 3 },
  { id: "p3", icon: <Linkedin size={20} />, label: "LinkedIn", color: "#0077b5", radius: 100, speed: 1, angleOffset: (Math.PI * 4) / 3 },
  { id: "p4", icon: <Figma size={18} />, label: "Design", color: "#f24e1e", radius: 160, speed: 0.6, angleOffset: Math.PI / 4 },
  { id: "p5", icon: <Code2 size={18} />, label: "Code", color: "#38bdf8", radius: 160, speed: 0.6, angleOffset: Math.PI + Math.PI / 4 },
];

interface MagneticOrbitMenuProps {
  className?: string;
}

export function MagneticOrbitMenu({ className }: MagneticOrbitMenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHoveringGlobal, setIsHoveringGlobal] = useState(false);
  const [time, setTime] = useState(0);

  // Global timer for orbit paths
  useEffect(() => {
    let animationFrame: number;
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const dt = (currentTime - lastTime) / 1000;
      lastTime = currentTime;
      
      // Pause orbit if hovering anything
      if (!isHoveringGlobal) {
        setTime((t) => t + dt);
      }
      animationFrame = requestAnimationFrame(loop);
    };
    
    animationFrame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrame);
  }, [isHoveringGlobal]);

  // Handle magnetic cursor pull for the center avatar
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  const springX = useSpring(cursorX, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(cursorY, { stiffness: 150, damping: 15, mass: 0.1 });

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate distance from center to cursor
    const x = e.clientX - rect.left - centerX;
    const y = e.clientY - rect.top - centerY;
    
    cursorX.set(x * 0.2); // dampen the pull
    cursorY.set(y * 0.2);
  };

  const handlePointerLeave = () => {
    cursorX.set(0);
    cursorY.set(0);
  };

  return (
    <div 
      ref={containerRef}
      className={cn("relative w-full h-[500px] bg-neutral-950 flex items-center justify-center overflow-hidden font-sans border border-white/10 rounded-xl", className)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Draw Orbit Rings */}
      <div className="absolute w-[200px] h-[200px] rounded-full border border-white/5" />
      <div className="absolute w-[320px] h-[320px] rounded-full border border-white/5 border-dashed" />

      {/* Center Avatar */}
      <motion.div 
        className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 p-1 shadow-[0_0_40px_rgba(79,70,229,0.3)] flex items-center justify-center"
        style={{ x: springX, y: springY }}
        onMouseEnter={() => setIsHoveringGlobal(true)}
        onMouseLeave={() => setIsHoveringGlobal(false)}
      >
        <div className="w-full h-full rounded-full bg-neutral-900 flex items-center justify-center text-white">
          <Cpu size={32} />
        </div>
      </motion.div>

      {/* Orbiting Planets */}
      {PLANETS.map((planet) => {
        // Calculate orbit position using trigonometry
        const currentAngle = planet.angleOffset + (time * planet.speed);
        
        // Convert polar to cartesian
        const x = Math.cos(currentAngle) * planet.radius;
        const y = Math.sin(currentAngle) * planet.radius;

        return (
          <PlanetNode 
            key={planet.id} 
            planet={planet} 
            x={x} 
            y={y} 
            onHoverStart={() => setIsHoveringGlobal(true)}
            onHoverEnd={() => setIsHoveringGlobal(false)}
          />
        );
      })}
    </div>
  );
}

function PlanetNode({ 
  planet, 
  x, 
  y, 
  onHoverStart, 
  onHoverEnd 
}: { 
  planet: Planet; 
  x: number; 
  y: number;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="absolute"
      animate={{ x, y }}
      transition={{ type: "tween", ease: "linear", duration: 0 }}
      onMouseEnter={() => {
        setIsHovered(true);
        onHoverStart();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onHoverEnd();
      }}
    >
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        className="relative flex items-center justify-center w-12 h-12 -ml-6 -mt-6 rounded-full bg-neutral-800 border border-white/10 shadow-lg text-white hover:border-white/30 transition-colors"
        style={{ color: isHovered ? planet.color : "#a3a3a3" }}
      >
        {planet.icon}
        
        {/* Tooltip */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.9 }}
              className="absolute top-full mt-3 px-3 py-1 text-xs font-semibold text-white bg-neutral-900 border border-white/10 rounded-md whitespace-nowrap shadow-xl"
            >
              {planet.label}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
}
