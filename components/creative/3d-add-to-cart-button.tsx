"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ThreeDAddToCartButtonProps {
  className?: string;
  onClick?: () => void;
  productColor?: string;
}

export function ThreeDAddToCartButton({ className, onClick, productColor = "#6366f1" }: ThreeDAddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (isAdding) return;
    setIsAdding(true);
    if (onClick) onClick();

    // After animation finishes, increment cart and reset
    setTimeout(() => {
      setCartCount(prev => prev + 1);
      setIsAdding(false);
    }, 1000);
  };

  return (
    <div className="relative inline-flex flex-col items-center gap-8">
      {/* Fake Navbar Cart Icon (For Demo purposes, usually this would be in your actual navbar) */}
      <div className="fixed top-6 right-6 md:top-12 md:right-12 z-50">
        <div className="relative p-3 bg-zinc-900 rounded-full border border-zinc-800 shadow-xl">
          <ShoppingCart className="w-6 h-6 text-white" />
          <AnimatePresence>
            {cartCount > 0 && (
              <motion.div
                key="badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-indigo-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center"
              >
                {cartCount}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <button
        ref={buttonRef}
        onClick={handleClick}
        disabled={isAdding}
        className={cn(
          "relative px-8 py-3 bg-white text-black font-semibold rounded-xl transition-transform hover:scale-105 active:scale-95 disabled:opacity-80 disabled:pointer-events-none",
          className
        )}
      >
        <span className={cn("transition-opacity", isAdding ? "opacity-0" : "opacity-100")}>
          Add to Cart
        </span>
        
        {isAdding && (
          <span className="absolute inset-0 flex items-center justify-center">
            Adding...
          </span>
        )}
      </button>

      {/* The flying 3D object */}
      <AnimatePresence>
        {isAdding && (
          <FlyingObject 
            buttonRef={buttonRef} 
            color={productColor} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

type FlyingObjectProps = {
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  color: string;
};

function FlyingObject({ buttonRef, color }: FlyingObjectProps) {
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setStartPos({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      });
    }
  }, [buttonRef]);

  if (!startPos.x) return null;

  // The target is the top right of the screen (where the cart is)
  const targetX = typeof window !== "undefined" ? window.innerWidth - 60 : 1000;
  const targetY = 60;

  return (
    <motion.div
      initial={{ 
        x: startPos.x - 20, 
        y: startPos.y - 20, 
        scale: 1, 
        rotateX: 0, 
        rotateY: 0,
        opacity: 1
      }}
      animate={{ 
        x: targetX, 
        y: targetY, 
        scale: 0.2, 
        rotateX: 720, 
        rotateY: 360,
        opacity: [1, 1, 0.8, 0]
      }}
      transition={{ 
        duration: 1, 
        ease: [0.175, 0.885, 0.32, 1.275] // nice bezier arc
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 99999,
        pointerEvents: 'none',
        perspective: 1000
      }}
    >
      <div 
        className="w-10 h-10 rounded-md shadow-2xl"
        style={{ 
          backgroundColor: color,
          boxShadow: `0 10px 30px ${color}80, inset 0 2px 10px rgba(255,255,255,0.5)`
        }} 
      />
    </motion.div>
  );
}
