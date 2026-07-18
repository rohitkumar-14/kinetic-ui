"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export type KineticVariant = "elastic" | "wave" | "jump" | "float" | "decode";

interface KineticTypographyProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The text string to animate */
  text: string;
  className?: string;
  /** Intensity of the elastic distortion. Default: 50 */
  intensity?: number;
  /** Animation variant. Default: "elastic" */
  variant?: KineticVariant;
}

// ── Elastic (3D Mouse Distortion) ───────────────────────────────────────────
function ElasticLetter({ char, index, total, mouseX, mouseY, intensity }: any) {
  const normalizedIndex = (index / total) * 2 - 1; 
  
  const x = useTransform(mouseX, [-500, 500], [-intensity * normalizedIndex, intensity * normalizedIndex]);
  const y = useTransform(mouseY, [-500, 500], [-intensity, intensity]);
  const rotateX = useTransform(mouseY, [-500, 500], [45, -45]);
  const rotateY = useTransform(mouseX, [-500, 500], [-45, 45]);
  
  const scale = useTransform(
    mouseX, 
    [-500, 0, 500], 
    [1, Math.abs(normalizedIndex) < 0.2 ? 1.5 : 1, 1]
  );

  return (
    <motion.span
      style={{
        display: "inline-block",
        whiteSpace: char === " " ? "pre" : "normal",
        x, y, rotateX, rotateY, scale,
      }}
    >
      {char}
    </motion.span>
  );
}

// ── Jump (Hover Interaction) ────────────────────────────────────────────────
function JumpLetter({ char }: { char: string }) {
  return (
    <motion.span
      style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
      whileHover={{
        y: -20,
        scale: 1.1,
        color: "#818cf8", // indigo-400
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }}
    >
      {char}
    </motion.span>
  );
}

// ── Wave (Continuous Sine Wave) ─────────────────────────────────────────────
function WaveLetter({ char, index }: { char: string; index: number }) {
  return (
    <motion.span
      style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
      animate={{
        y: ["0%", "-25%", "0%"],
        rotateZ: [0, 5, 0, -5, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.1,
      }}
    >
      {char}
    </motion.span>
  );
}

// ── Float (Random Floating) ─────────────────────────────────────────────────
function FloatLetter({ char, index }: { char: string; index: number }) {
  return (
    <motion.span
      style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
      animate={{
        y: [0, -10 + Math.random() * -10, 0],
        x: [0, -5 + Math.random() * 10, 0],
        rotate: [0, -3 + Math.random() * 6, 0],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.2,
      }}
    >
      {char}
    </motion.span>
  );
}

// ── Decode (Hacker Text on Mount/Hover) ─────────────────────────────────────
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
function DecodeLetter({ char, index }: { char: string; index: number }) {
  const [displayChar, setDisplayChar] = useState(char);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (char === " ") return;
    
    let iterations = 0;
    const maxIterations = 10 + index * 2;
    
    const interval = setInterval(() => {
      if (iterations >= maxIterations) {
        clearInterval(interval);
        setDisplayChar(char);
      } else {
        setDisplayChar(ALPHABET[Math.floor(Math.random() * ALPHABET.length)]);
        iterations++;
      }
    }, 40);

    return () => clearInterval(interval);
  }, [char, index, isHovered]);

  return (
    <motion.span
      onMouseEnter={() => setIsHovered(!isHovered)}
      style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
      className={displayChar !== char ? "text-cyan-400" : ""}
    >
      {displayChar}
    </motion.span>
  );
}


export function KineticTypography({
  text,
  className,
  intensity = 50,
  variant = "elastic",
  ...props
}: KineticTypographyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  useEffect(() => {
    if (variant !== "elastic") return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      mouseX.set(x);
      mouseY.set(y);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    const element = containerRef.current;
    if (element) {
      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (element) {
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [mouseX, mouseY, variant]);

  const renderLetter = (char: string, index: number) => {
    switch (variant) {
      case "wave":
        return <WaveLetter key={index} char={char} index={index} />;
      case "jump":
        return <JumpLetter key={index} char={char} />;
      case "float":
        return <FloatLetter key={index} char={char} index={index} />;
      case "decode":
        return <DecodeLetter key={index} char={char} index={index} />;
      case "elastic":
      default:
        return (
          <ElasticLetter 
            key={index} 
            char={char} 
            index={index} 
            total={text.length} 
            mouseX={smoothMouseX} 
            mouseY={smoothMouseY}
            intensity={intensity}
          />
        );
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative flex items-center justify-center p-8 perspective-1000", className)}
      {...props}
    >
      <div className="flex flex-wrap justify-center text-5xl md:text-7xl font-black uppercase tracking-tighter cursor-default">
        {text.split("").map((char, index) => renderLetter(char, index))}
      </div>
    </div>
  );
}
