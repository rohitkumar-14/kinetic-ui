"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export interface VisionGlassDockItem {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

export interface VisionGlassDockProps {
  items: VisionGlassDockItem[];
  className?: string;
  magnification?: number;
  distance?: number;
}

export function VisionGlassDock({
  items,
  className,
  magnification = 80,
  distance = 150,
}: VisionGlassDockProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto flex h-16 items-end gap-4 rounded-2xl bg-white/10 px-4 pb-3 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-md border border-white/20",
        className
      )}
    >
      {items.map((item, idx) => (
        <DockItem
          key={idx}
          mouseX={mouseX}
          magnification={magnification}
          distance={distance}
          item={item}
        />
      ))}
    </div>
  );
}

function DockItem({
  mouseX,
  magnification,
  distance,
  item,
}: {
  mouseX: any;
  magnification: number;
  distance: number;
  item: VisionGlassDockItem;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distanceCalc = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distanceCalc, [-distance, 0, distance], [40, magnification, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <div className="relative group flex flex-col items-center">
      <motion.div
        ref={ref}
        style={{ width, height: width }}
        onClick={item.onClick}
        className="flex aspect-square items-center justify-center rounded-full bg-white/20 shadow-xl border border-white/20 text-white cursor-pointer transition-colors hover:bg-white/30 backdrop-blur-lg"
      >
        <span className="scale-125 transform transition-transform group-hover:scale-150">
          {item.icon}
        </span>
      </motion.div>
      <div className="absolute -top-10 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 origin-bottom px-3 py-1 rounded-md bg-black/80 text-white text-xs font-medium whitespace-nowrap border border-white/10 shadow-xl pointer-events-none">
        {item.label}
      </div>
    </div>
  );
}
