'use client';

import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

export type BlurVariant = 'elevate' | 'fade' | 'scale' | 'drop';

interface BlurTextProps {
  /** Text to animate */
  text: string;
  className?: string;
  /** Delay before animation starts (seconds). Default: 0 */
  delay?: number;
  /** Whether to animate word-by-word or character-by-character. Default: 'word' */
  animateBy?: 'word' | 'character';
  /** Animation preset. Default: 'elevate' */
  variant?: BlurVariant;
}

const getVariants = (variant: BlurVariant): Variants => {
  switch (variant) {
    case 'drop':
      return {
        hidden: { filter: 'blur(10px)', opacity: 0, y: -20 },
        visible: { filter: 'blur(0px)', opacity: 1, y: 0 },
      };
    case 'scale':
      return {
        hidden: { filter: 'blur(10px)', opacity: 0, scale: 1.2 },
        visible: { filter: 'blur(0px)', opacity: 1, scale: 1 },
      };
    case 'fade':
      return {
        hidden: { filter: 'blur(10px)', opacity: 0 },
        visible: { filter: 'blur(0px)', opacity: 1 },
      };
    case 'elevate':
    default:
      return {
        hidden: { filter: 'blur(10px)', opacity: 0, y: 20 },
        visible: { filter: 'blur(0px)', opacity: 1, y: 0 },
      };
  }
};

export function BlurText({
  text,
  className,
  delay = 0,
  animateBy = 'word',
  variant = 'elevate',
}: BlurTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  const elements = animateBy === 'word' ? text.split(' ') : text.split('');
  const variants = getVariants(variant);

  return (
    <div ref={ref} className={cn("flex flex-wrap", className)}>
      {elements.map((element, index) => (
        <motion.span
          key={index}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={variants}
          transition={{
            duration: 0.8,
            ease: [0.4, 0.0, 0.2, 1],
            delay: delay + index * (animateBy === 'word' ? 0.05 : 0.02),
          }}
          className={cn(
            "inline-block",
            animateBy === 'word' && "mr-[0.25em]"
          )}
        >
          {element === ' ' ? '\u00A0' : element}
        </motion.span>
      ))}
    </div>
  );
}
