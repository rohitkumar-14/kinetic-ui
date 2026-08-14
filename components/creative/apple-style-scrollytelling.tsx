"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export interface AppleStyleScrollytellingProps {
  children?: React.ReactNode;
  className?: string;
  totalSections?: number;
}

export function AppleStyleScrollytelling({ 
  children, 
  className,
  totalSections = 4
}: AppleStyleScrollytellingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !triggerRef.current) return;

    ScrollTrigger.create({
      trigger: triggerRef.current,
      start: "top top",
      end: () => `+=${window.innerHeight * (totalSections - 1)}`,
      pin: containerRef.current,
      scrub: 1,
      anticipatePin: 1,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * (totalSections - 1)}`,
        scrub: 1,
      }
    });

    const sections = gsap.utils.toArray(".scrolly-section");
    const heroImage = containerRef.current.querySelector(".scrolly-hero");

    if (heroImage) {
      tl.to(heroImage, {
        scale: 0.8,
        yPercent: -15,
        opacity: 0.5,
        ease: "power2.inOut",
        duration: 1
      }, 0);
    }

    sections.forEach((section: any, i) => {
      const text = section.querySelector(".scrolly-text");
      if (!text) return;
      
      // If it's not the first section, it needs to fade IN
      if (i > 0) {
        tl.fromTo(text, 
          { opacity: 0, y: 100 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          i - 0.5
        );
      }
      
      // If it's not the last section, it needs to fade OUT
      if (i < sections.length - 1) {
        tl.to(text, {
          opacity: 0,
          y: -100,
          duration: 0.5,
          ease: "power2.in"
        }, i + 0.5);
      }
    });

  }, { scope: containerRef });

  return (
    <div ref={triggerRef} className={cn("relative w-full", className)} style={{ height: `${totalSections * 100}vh` }}>
      <div ref={containerRef} className="h-screen w-full overflow-hidden bg-black text-white sticky top-0 left-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
