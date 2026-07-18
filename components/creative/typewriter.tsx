"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TypewriterProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string | string[];
  speed?: number;
  deleteSpeed?: number;
  delay?: number;
  cursorChar?: string;
  loop?: boolean;
  cursorClassName?: string;
  waitTime?: number;
}

export function Typewriter({
  text,
  speed = 50,
  deleteSpeed = 30,
  delay = 0,
  waitTime = 2000,
  cursorChar = "|",
  loop = true,
  cursorClassName,
  className,
  ...props
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

  useEffect(() => {
    // Initial delay
    let timeout: NodeJS.Timeout;
    if (!hasStarted) {
      timeout = setTimeout(() => {
        setHasStarted(true);
      }, delay);
      return () => clearTimeout(timeout);
    }

    const currentString = textArray[currentIndex];
    
    // Determine the next action
    if (!isDeleting && displayText === currentString) {
      // Done typing the current string
      if (textArray.length > 1 || loop) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, waitTime);
      }
    } else if (isDeleting && displayText === "") {
      // Done deleting
      setIsDeleting(false);
      setCurrentIndex((prev) => {
        const next = prev + 1;
        if (next >= textArray.length) {
          return loop ? 0 : prev; // If not looping, we stop at the last index (though isDeleting wouldn't trigger if textArray.length === 1 and !loop)
        }
        return next;
      });
    } else {
      // Actively typing or deleting
      const nextDelay = isDeleting ? deleteSpeed : speed;
      
      timeout = setTimeout(() => {
        setDisplayText((prev) => {
          if (isDeleting) {
            return prev.slice(0, -1);
          } else {
            return currentString.slice(0, prev.length + 1);
          }
        });
      }, nextDelay);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex, hasStarted, textArray, speed, deleteSpeed, waitTime, loop, delay]);

  return (
    <span className={cn("inline-block", className)} {...props}>
      <span>{displayText}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ 
          duration: 0.8, 
          repeat: Infinity, 
          repeatType: "reverse",
          ease: "linear"
        }}
        className={cn("inline-block ml-0.5 -translate-y-[2px]", cursorClassName)}
      >
        {cursorChar}
      </motion.span>
    </span>
  );
}
