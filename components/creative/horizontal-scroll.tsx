"use client";

import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { Maximize2 } from "lucide-react";

export interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
  containerRef?: React.RefObject<HTMLElement>;
}

export function HorizontalScroll({ children, className, containerRef }: HorizontalScrollProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    container: containerRef,
  });

  // Start slightly in view (1%) and scroll far left (-95%)
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className={cn("relative h-[300vh] bg-neutral-950", className)}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4 px-4">
          {children}
        </motion.div>
      </div>
    </section>
  );
}

export function ScrollCard({ card }: { card: { title: string; id: number; url: string; description?: string } }) {
  return (
    <div
      key={card.id}
      className="group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200 rounded-3xl"
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-500 group-hover:scale-110"
      ></div>
      <div className="absolute inset-0 z-10 grid place-content-center bg-gradient-to-t from-black/80 via-black/20 to-transparent">
        <div className="absolute bottom-8 left-8 right-8">
          <p className="bg-gradient-to-br from-white/90 to-white/50 bg-clip-text text-3xl font-black uppercase text-transparent mb-2">
            {card.title}
          </p>
          {card.description && (
            <p className="text-zinc-300 text-sm font-medium">
              {card.description}
            </p>
          )}
        </div>
        
        <a 
          href={card.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="absolute top-6 right-6 p-3 bg-black/40 backdrop-blur-md rounded-full text-white/70 hover:text-white hover:bg-black/60 hover:scale-110 transition-all z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
          title="Open fullscreen"
        >
          <Maximize2 className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}
