"use client";

import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticImageProps {
  src: string;
  alt: string;
  mouseX: any;
  mouseY: any;
  className?: string;
}

function MagneticImage({ src, alt, mouseX, mouseY, className }: MagneticImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Local state for the center of this specific image
  const centerX = useMotionValue(0);
  const centerY = useMotionValue(0);

  useEffect(() => {
    const updateCenter = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        // Calculate center relative to the viewport
        centerX.set(rect.left + rect.width / 2);
        centerY.set(rect.top + rect.height / 2);
      }
    };

    updateCenter();
    window.addEventListener("resize", updateCenter);
    window.addEventListener("scroll", updateCenter);
    return () => {
      window.removeEventListener("resize", updateCenter);
      window.removeEventListener("scroll", updateCenter);
    };
  }, [centerX, centerY]);

  // Calculate distance from mouse to the center of this image
  // We use useTransform to create a derived value that updates every frame
  const distanceX = useTransform(() => mouseX.get() - centerX.get());
  const distanceY = useTransform(() => mouseY.get() - centerY.get());

  // Convert distance into a rotation angle.
  // The further away the mouse is, the less it rotates.
  // We clamp the rotation to a max of 20 degrees.
  const rotateX = useTransform(distanceY, [-500, 0, 500], [20, 0, -20]);
  const rotateY = useTransform(distanceX, [-500, 0, 500], [-20, 0, 20]);

  // Also scale slightly if the mouse is close
  const distance = useTransform(() => {
    const dx = distanceX.get();
    const dy = distanceY.get();
    return Math.sqrt(dx * dx + dy * dy);
  });
  
  const scale = useTransform(distance, [0, 500], [1.1, 1]);

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        rotateY,
        scale,
        transformPerspective: 1000,
      }}
      className={cn("relative overflow-hidden rounded-xl shadow-2xl bg-zinc-900", className)}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </motion.div>
  );
}

interface MagneticGalleryProps extends React.HTMLAttributes<HTMLDivElement> {
  images: { src: string; alt: string; className?: string }[];
}

export function MagneticGallery({ images, className, ...props }: MagneticGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(-1000); // Initialize off-screen
  const mouseY = useMotionValue(-1000);

  // Smooth out the global mouse movement
  const smoothMouseX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="@container w-full">
      <div
        ref={containerRef}
        className={cn("grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-3 gap-6 p-4 @md:p-8", className)}
        style={{ perspective: "1200px" }}
        {...props}
      >
        {images.map((image, i) => (
          <MagneticImage
            key={i}
            src={image.src}
            alt={image.alt}
            mouseX={smoothMouseX}
            mouseY={smoothMouseY}
            className={cn("h-48 @md:h-64", image.className)}
          />
        ))}
      </div>
    </div>
  );
}
