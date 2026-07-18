'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // 1 is normal, < 1 is slower, > 1 is faster
}

export function Parallax({ children, className, speed = 0.5 }: ParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !targetRef.current) return;

    const yMovement = (1 - speed) * 100; // Calculate movement percentage based on speed

    gsap.fromTo(
      targetRef.current,
      {
        yPercent: -yMovement,
      },
      {
        yPercent: yMovement,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom', // Start when top of container hits bottom of viewport
          end: 'bottom top',   // End when bottom of container hits top of viewport
          scrub: true,
        },
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={cn("overflow-hidden relative", className)}>
      <div ref={targetRef} className="h-[120%] w-full relative -top-[10%]">
        {children}
      </div>
    </div>
  );
}
