"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { cn } from "@/lib/utils";

export type CardStackVariant = "bottom" | "top" | "left" | "fan";

export interface Card {
  id: string | number;
  content: React.ReactNode;
}

interface CardStackProps {
  items: Card[];
  /** Distance between cards. Default: 10 */
  offset?: number;
  /** How much each successive card scales down. Default: 0.05 */
  scaleFactor?: number;
  className?: string;
  /** Layout and interaction style. Default: "bottom" */
  variant?: CardStackVariant;
}

export function CardStack({
  items,
  offset = 12,
  scaleFactor = 0.06,
  className,
  variant = "bottom",
}: CardStackProps) {
  const [cards, setCards] = useState<Card[]>(items);
  const [draggedCard, setDraggedCard] = useState<string | number | null>(null);

  const moveToEnd = (id: string | number) => {
    setCards((prev) => {
      const idx = prev.findIndex((c) => c.id === id);
      if (idx === -1) return prev;
      const newCards = [...prev];
      const [card] = newCards.splice(idx, 1);
      newCards.push(card);
      return newCards;
    });
  };

  const handleDragEnd = (event: any, info: PanInfo, id: string | number) => {
    const threshold = 100;
    if (Math.abs(info.offset.x) > threshold || Math.abs(info.offset.y) > threshold) {
      moveToEnd(id);
    }
    setDraggedCard(null);
  };

  const getCardStyles = (index: number, isDragged: boolean) => {
    if (isDragged) {
      return {
        top: 0,
        left: 0,
        scale: 1,
        rotate: 0,
      };
    }

    const scale = 1 - index * scaleFactor;
    
    switch (variant) {
      case "top":
        return { top: -index * offset, left: 0, scale, rotate: 0 };
      case "left":
        return { top: 0, left: -index * offset, scale, rotate: 0 };
      case "fan":
        return { 
          top: index * (offset / 2), 
          left: 0, 
          scale, 
          rotate: index % 2 === 0 ? index * 4 : -index * 4 
        };
      case "bottom":
      default:
        return { top: index * offset, left: 0, scale, rotate: 0 };
    }
  };

  return (
    <div className={cn("relative flex items-center justify-center h-full w-full", className)}>
      <AnimatePresence>
        {cards.map((card, index) => {
          const isTop = index === 0;
          const isDragged = draggedCard === card.id;
          
          // Only show top 3 cards for performance and visual clarity
          if (index > 3) return null;

          const activeStyle = getCardStyles(index, isDragged);

          return (
            <motion.div
              key={card.id}
              layout
              role={isTop ? "button" : "presentation"}
              tabIndex={isTop ? 0 : -1}
              aria-label={isTop ? "Swipeable card. Press Enter or Space to send to back." : undefined}
              onKeyDown={(e) => {
                if (isTop && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  moveToEnd(card.id);
                }
              }}
              className={cn(
                "absolute origin-center flex items-center justify-center",
                isTop ? "cursor-grab active:cursor-grabbing z-50" : "cursor-default",
              )}
              style={{
                zIndex: cards.length - index,
              }}
              drag={isTop}
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.5}
              onDragStart={() => setDraggedCard(card.id)}
              onDragEnd={(e, info) => handleDragEnd(e, info, card.id)}
              initial={{
                ...activeStyle,
                opacity: 0,
              }}
              animate={{
                ...activeStyle,
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.5,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              {card.content}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
