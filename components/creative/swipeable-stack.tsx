"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface StackCard {
  id: string;
  imageUrl: string;
  title: string;
  subtitle?: string;
}

export interface SwipeableStackProps {
  cards: StackCard[];
  className?: string;
  onSwipeRight?: (card: StackCard) => void;
  onSwipeLeft?: (card: StackCard) => void;
}

export function SwipeableStack({ cards: initialCards, className, onSwipeLeft, onSwipeRight }: SwipeableStackProps) {
  const [cards, setCards] = useState<StackCard[]>(initialCards);

  // When a card is thrown off screen, remove it from the array
  const handleRemove = (id: string, direction: "left" | "right") => {
    const card = cards.find((c) => c.id === id);
    if (!card) return;

    if (direction === "right" && onSwipeRight) onSwipeRight(card);
    if (direction === "left" && onSwipeLeft) onSwipeLeft(card);

    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className={cn("relative w-full h-[600px] flex items-center justify-center bg-zinc-950", className)}>
      <AnimatePresence>
        {cards.map((card, index) => {
          // The last item in the array is rendered on top.
          // So if index === cards.length - 1, it's the top card.
          const isTop = index === cards.length - 1;

          // How far from the top of the stack is this card visually?
          // (0 is top, 1 is the one right behind it, etc.)
          const stackDepth = cards.length - 1 - index;

          return (
            <Card
              key={card.id}
              card={card}
              isTop={isTop}
              stackDepth={stackDepth}
              onRemove={handleRemove}
            />
          );
        })}
      </AnimatePresence>
      
      {cards.length === 0 && (
        <div className="absolute flex flex-col items-center justify-center text-zinc-600 font-mono text-sm">
          <span>All cards reviewed</span>
          <button 
            onClick={() => setCards(initialCards)}
            className="mt-4 px-4 py-2 border border-zinc-700 rounded-md hover:bg-zinc-800 text-zinc-300"
          >
            Reset Stack
          </button>
        </div>
      )}
    </div>
  );
}

interface CardProps {
  card: StackCard;
  isTop: boolean;
  stackDepth: number;
  onRemove: (id: string, direction: "left" | "right") => void;
}

function Card({ card, isTop, stackDepth, onRemove }: CardProps) {
  const x = useMotionValue(0);
  
  // Rotate slightly as you drag horizontally
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  // Opacity fades as it gets dragged far out
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);
  
  // Swipe indicator opacities
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [0, -100], [0, 1]);

  const handleDragEnd = (event: any, info: any) => {
    // If dragged further than 100px, trigger remove
    if (info.offset.x > 100) {
      onRemove(card.id, "right");
    } else if (info.offset.x < -100) {
      onRemove(card.id, "left");
    }
  };

  // Stack styling logic:
  // - Top card (stackDepth=0) is full scale, y=0, highest z-index.
  // - Deeper cards scale down, move up (or down), and get darker.
  return (
    <motion.div
      className="absolute w-[300px] h-[400px] rounded-3xl overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing border border-white/10"
      style={{
        zIndex: 50 - stackDepth,
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
      }}
      initial={{ 
        scale: 1 - stackDepth * 0.05, 
        y: stackDepth * 20, 
        opacity: 0 
      }}
      animate={{ 
        scale: 1 - stackDepth * 0.05, 
        y: stackDepth * 20, 
        opacity: stackDepth > 2 ? 0 : 1 // Only show top 3 cards for performance/visuals
      }}
      exit={{
        // When it gets removed, throw it completely off screen in the direction it was dragged
        x: x.get() > 0 ? 300 : -300,
        opacity: 0,
        transition: { duration: 0.2 }
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={handleDragEnd}
    >
      <img 
        src={card.imageUrl} 
        alt={card.title} 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      
      {/* Dynamic shadow based on depth */}
      <div 
        className="absolute inset-0 bg-black transition-opacity duration-300 pointer-events-none"
        style={{ opacity: stackDepth * 0.2 }}
      />
      
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent pointer-events-none text-left">
        <h3 className="text-2xl font-black text-white">{card.title}</h3>
        {card.subtitle && (
          <p className="text-white/70 font-mono text-sm mt-1">{card.subtitle}</p>
        )}
      </div>

      {/* Swipe Indicators (LIKE / NOPE) */}
      {isTop && (
        <>
          <motion.div 
            className="absolute top-6 left-6 px-4 py-1 border-2 border-green-500 text-green-500 font-black rounded-lg rotate-[-15deg] pointer-events-none"
            style={{ opacity: likeOpacity }}
          >
            LIKE
          </motion.div>
          <motion.div 
            className="absolute top-6 right-6 px-4 py-1 border-2 border-red-500 text-red-500 font-black rounded-lg rotate-[15deg] pointer-events-none"
            style={{ opacity: nopeOpacity }}
          >
            NOPE
          </motion.div>
        </>
      )}
    </motion.div>
  );
}
