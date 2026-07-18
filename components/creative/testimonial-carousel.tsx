"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Testimonial {
  id: string | number;
  author: string;
  role: string;
  company?: string;
  avatar: string;
  text: string;
  rating?: number;
}

export interface TestimonialCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  interval?: number;
  hideControls?: boolean;
}

export function TestimonialCarousel({
  testimonials,
  autoPlay = true,
  interval = 5000,
  hideControls = false,
  className,
  ...props
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      scale: 0.95,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = useCallback(
    (newDirection: number) => {
      setDirection(newDirection);
      setCurrentIndex((prevIndex) => {
        let nextIndex = prevIndex + newDirection;
        if (nextIndex < 0) nextIndex = testimonials.length - 1;
        if (nextIndex >= testimonials.length) nextIndex = 0;
        return nextIndex;
      });
    },
    [testimonials.length]
  );

  useEffect(() => {
    if (!autoPlay || isPaused) return;
    const timer = setInterval(() => {
      paginate(1);
    }, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, isPaused, paginate]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div
      className={cn("relative w-full max-w-4xl mx-auto px-4 py-8", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      {...props}
    >
      <div className="relative min-h-[300px] flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute w-full px-8 md:px-16 cursor-grab active:cursor-grabbing"
          >
            <div className="flex flex-col items-center text-center space-y-8">
              <Quote className="w-12 h-12 text-zinc-800" />
              
              <div className="flex gap-1 justify-center text-yellow-500">
                {Array.from({ length: currentTestimonial.rating || 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>

              <p className="text-xl md:text-3xl font-medium text-white leading-relaxed">
                "{currentTestimonial.text}"
              </p>

              <div className="flex flex-col items-center gap-3">
                <img
                  src={currentTestimonial.avatar}
                  alt={currentTestimonial.author}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white/10"
                />
                <div>
                  <h4 className="text-base font-semibold text-white">
                    {currentTestimonial.author}
                  </h4>
                  <p className="text-sm text-zinc-400">
                    {currentTestimonial.role}
                    {currentTestimonial.company && ` • ${currentTestimonial.company}`}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {!hideControls && (
        <>
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors z-10 hidden md:flex"
            onClick={() => paginate(-1)}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors z-10 hidden md:flex"
            onClick={() => paginate(1)}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-12">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all duration-300",
              i === currentIndex ? "bg-white w-8" : "bg-white/20 hover:bg-white/40"
            )}
            onClick={() => {
              setDirection(i > currentIndex ? 1 : -1);
              setCurrentIndex(i);
            }}
          />
        ))}
      </div>
    </div>
  );
}
