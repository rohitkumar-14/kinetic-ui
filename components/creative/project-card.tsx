"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProjectCardProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  title: string;
  description: string;
  image: string;
  tags?: string[];
  href?: string;
}

export function ProjectCard({
  title,
  description,
  image,
  tags = [],
  href = "#",
  className,
  ...props
}: ProjectCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Parallax effect for the image
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const springConfig = { stiffness: 150, damping: 20 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  return (
    <a
      ref={ref}
      href={href}
      className={cn(
        "group relative block w-full overflow-hidden rounded-2xl bg-zinc-900 border border-white/10 aspect-[4/5] md:aspect-[3/4]",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0 origin-center"
        style={{ x, y }}
        animate={{ scale: isHovered ? 1.05 : 1.1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover block"
        />
        <div 
          className={cn(
            "absolute inset-0 bg-black/40 transition-opacity duration-500",
            isHovered ? "opacity-60" : "opacity-0"
          )}
        />
      </motion.div>

      {/* Content Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 md:p-8">
        
        {/* Top: Tags */}
        <div className="flex flex-wrap gap-2 overflow-hidden">
          {tags.map((tag, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -20 }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
              className="px-3 py-1 text-xs font-medium bg-black/50 backdrop-blur-md text-white rounded-full border border-white/10"
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Bottom: Title & Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex justify-between items-end gap-4"
        >
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{title}</h3>
            <p className="text-sm md:text-base text-zinc-300 font-medium line-clamp-2 max-w-sm">
              {description}
            </p>
          </div>
          <div className="shrink-0 w-12 h-12 rounded-full bg-white text-black flex items-center justify-center">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </motion.div>
      </div>
    </a>
  );
}
