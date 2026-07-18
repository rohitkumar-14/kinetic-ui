"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface StreamingMarkdownRendererProps {
  content: string;
  isStreaming?: boolean;
  className?: string;
  speed?: number; // ms per chunk
}

export function StreamingMarkdownRenderer({
  content,
  isStreaming = false,
  speed = 10,
  className,
}: StreamingMarkdownRendererProps) {
  const [displayedContent, setDisplayedContent] = useState("");
  
  // This simulates streaming if the content is provided all at once.
  // In a real app with true streaming, the `content` prop updates continuously,
  // and we just render it. We'll handle both by syncing displayedContent.
  useEffect(() => {
    if (!isStreaming) {
      setDisplayedContent(content);
      return;
    }

    if (content.length > displayedContent.length) {
      const timeout = setTimeout(() => {
        setDisplayedContent(content.slice(0, displayedContent.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [content, displayedContent, isStreaming, speed]);

  // For this component, since it's a "markdown renderer", we would ideally use a markdown parser.
  // To keep it simple and dependency-light, we'll split by newlines for paragraphs.
  const paragraphs = displayedContent.split('\n\n');

  return (
    <div className={cn("text-zinc-200 leading-relaxed font-sans", className)}>
      {paragraphs.map((p, pIdx) => {
        // Split paragraph into words for staggered animation
        const words = p.split(' ');
        return (
          <p key={pIdx} className="mb-4 last:mb-0">
            {words.map((word, wIdx) => {
              // Only animate words if we are actively streaming. Otherwise just render them.
              if (isStreaming && pIdx === paragraphs.length - 1 && wIdx >= words.length - 3) {
                // Animate the very last few words being added
                return (
                  <motion.span
                    key={`${pIdx}-${wIdx}`}
                    initial={{ opacity: 0, filter: "blur(4px)", y: 2 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="inline-block mr-1"
                  >
                    {word}
                  </motion.span>
                );
              }
              
              // Standard rendering for already streamed words
              return (
                <span key={`${pIdx}-${wIdx}`} className="mr-[0.25em]">
                  {word}
                </span>
              );
            })}
          </p>
        );
      })}
      
      {/* Blinking Cursor at the end if streaming */}
      {isStreaming && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-2 h-4 bg-indigo-500 ml-1 translate-y-0.5"
        />
      )}
    </div>
  );
}
