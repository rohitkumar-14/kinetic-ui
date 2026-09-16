"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

interface ReelProps {
  targetChar: string;
  delay?: number;
  spinning?: boolean;
}

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?@#$%&";

function SingleReel({ targetChar, delay = 0, spinning = false }: ReelProps) {
  const controls = useAnimation();
  
  // We create a very tall strip of characters.
  // The first characters are random blurriness, the last character is our target.
  const [strip, setStrip] = useState<string[]>([]);

  useEffect(() => {
    // Generate a long strip of 30 random characters, ending with the target
    const newStrip = Array.from({ length: 30 }).map(() => 
      CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]
    );
    newStrip[newStrip.length - 1] = targetChar;
    setStrip(newStrip);
  }, [targetChar]);

  useEffect(() => {
    if (spinning) {
      // Loop the animation very fast
      controls.start({
        y: [0, -1000], // random big number to create blur
        transition: {
          duration: 0.2,
          ease: "linear",
          repeat: Infinity,
        }
      });
    } else if (!spinning && strip.length > 0) {
      // Spin to the very bottom character (our target)
      // Height of one character cell is ~1em depending on styling. 
      // We'll calculate it using flex col percentage or absolute translation.
      controls.start({
        y: `-${(strip.length - 1) * 100}%`,
        transition: {
          type: "spring",
          damping: 15,
          stiffness: 80,
          mass: 2,
          delay: delay,
        }
      });
    }
  }, [spinning, controls, strip.length, delay]);

  return (
    <div className="relative h-[1.2em] overflow-hidden inline-flex justify-center items-start w-[1em] text-center border-x border-white/5 bg-neutral-900/50">
      <motion.div 
        animate={controls}
        initial={{ y: 0 }}
        className="flex flex-col items-center"
      >
        {strip.map((char, i) => (
          <span 
            key={i} 
            className="h-[1.2em] flex items-center justify-center font-mono font-bold leading-none text-white/90"
          >
            {char}
          </span>
        ))}
      </motion.div>
      
      {/* Inner Shadow overlay to make it look like a physical barrel reel */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_8px_10px_-4px_rgba(0,0,0,0.8),inset_0_-8px_10px_-4px_rgba(0,0,0,0.8)]" />
    </div>
  );
}

interface SlotMachineReelProps {
  value: string;
  spinning?: boolean;
  className?: string;
}

export function SlotMachineReel({ value, spinning = false, className }: SlotMachineReelProps) {
  const chars = value.split("");

  return (
    <div className={cn("inline-flex items-center text-4xl p-2 rounded-xl bg-neutral-950 border border-white/10 shadow-2xl", className)}>
      {chars.map((char, i) => (
        <React.Fragment key={i}>
          {char === " " ? (
            <span className="w-[0.5em]" />
          ) : (
            <SingleReel 
              targetChar={char} 
              delay={i * 0.15} // Stagger the stopping time
              spinning={spinning} 
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
