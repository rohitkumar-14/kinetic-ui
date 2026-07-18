"use client";

import React, { useId, useState, useRef, useEffect } from "react";
import { animate } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SVGLiquidDistortionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** How much the pixels are displaced. Higher = more warped. */
  intensity?: number;
  /** Base frequency of the noise. Lower = larger waves, Higher = tight ripples. */
  frequency?: number;
  /** Speed of the ripple animation on hover. */
  speed?: number;
  className?: string;
}

export function SVGLiquidDistortion({
  children,
  intensity = 20,
  frequency = 0.02,
  speed = 2,
  className,
  ...props
}: SVGLiquidDistortionProps) {
  const filterId = useId();
  const [isHovered, setIsHovered] = useState(false);
  
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null);
  
  // Keep track of active animations so we can cancel them
  const animRefs = useRef<any[]>([]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    
    // Clear existing animations
    animRefs.current.forEach(anim => anim.stop());
    animRefs.current = [];

    // Animate scale (displacement intensity)
    const scaleAnim = animate(0, intensity, {
      type: "spring",
      stiffness: 100,
      damping: 10,
      onUpdate: (latest) => {
        if (displacementRef.current) {
          displacementRef.current.setAttribute("scale", latest.toString());
        }
      }
    });

    // Animate baseFrequency (liquid flow)
    const freqAnim = animate(frequency, frequency * 1.5, {
      repeat: Infinity,
      repeatType: "mirror",
      duration: speed,
      ease: "linear",
      onUpdate: (latest) => {
        if (turbulenceRef.current) {
          turbulenceRef.current.setAttribute("baseFrequency", latest.toString());
        }
      }
    });

    animRefs.current.push(scaleAnim, freqAnim);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    
    // Clear existing animations
    animRefs.current.forEach(anim => anim.stop());
    animRefs.current = [];

    // Animate scale back to 0
    const scaleAnim = animate(intensity, 0, {
      type: "spring",
      stiffness: 100,
      damping: 15,
      onUpdate: (latest) => {
        if (displacementRef.current) {
          displacementRef.current.setAttribute("scale", latest.toString());
        }
      }
    });

    // Smoothly return frequency to base
    const freqAnim = animate(frequency * 1.5, frequency, {
      duration: 0.5,
      ease: "easeOut",
      onUpdate: (latest) => {
        if (turbulenceRef.current) {
          turbulenceRef.current.setAttribute("baseFrequency", latest.toString());
        }
      }
    });

    animRefs.current.push(scaleAnim, freqAnim);
  };

  // Cleanup animations on unmount
  useEffect(() => {
    return () => {
      animRefs.current.forEach(anim => anim.stop());
    };
  }, []);

  return (
    <div
      className={cn("relative inline-block", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      // Note: filter URL must be applied exactly like this for cross-browser support
      style={{ filter: `url(#${filterId.replace(/:/g, '')})` }}
      {...props}
    >
      <svg className="absolute w-0 h-0 pointer-events-none">
        {/* We strip colons from useId because some browsers dislike colons in SVG IDs */}
        <filter id={filterId.replace(/:/g, '')} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            ref={turbulenceRef}
            type="fractalNoise"
            baseFrequency={frequency}
            numOctaves={3}
            result="noise"
          />
          <feDisplacementMap
            ref={displacementRef}
            in="SourceGraphic"
            in2="noise"
            scale={0}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
      
      {/* 
        Slight padding prevents the SVG displacement from clipping at the absolute edges 
        of the bounding box when warped aggressively.
      */}
      <span className="inline-block p-2">
        {children}
      </span>
    </div>
  );
}
