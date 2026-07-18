'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, User, ThumbsUp, ThumbsDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/ui/copy-button';

export interface AIChatBubbleProps {
  content: string;
  role: 'user' | 'assistant';
  isTyping?: boolean;
}

export function AIChatBubble({ content, role, isTyping = false }: AIChatBubbleProps) {
  const isAssistant = role === 'assistant';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={cn(
        "flex w-full gap-4 p-4 md:p-6 mb-4 rounded-2xl",
        isAssistant 
          ? "bg-muted/30 border border-border/50 shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="flex-shrink-0">
        <Avatar className={cn("h-8 w-8 shadow-sm", isAssistant ? "bg-indigo-500/10 text-indigo-500 border border-indigo-500/20" : "")}>
          {isAssistant ? (
            <Sparkles className="h-4 w-4 m-auto" />
          ) : (
            <AvatarFallback className="bg-muted text-muted-foreground"><User className="h-4 w-4" /></AvatarFallback>
          )}
        </Avatar>
      </div>
      <div className="flex flex-col gap-2 w-full max-w-3xl">
        <div className="font-semibold text-sm">
          {isAssistant ? 'Nova AI' : 'You'}
        </div>
        <div className="text-foreground/90 leading-relaxed text-sm md:text-base whitespace-pre-wrap">
          {content}
          {isTyping && (
            <span className="ml-1 inline-block h-4 w-2 bg-indigo-500 animate-pulse rounded-sm" />
          )}
        </div>
        {isAssistant && !isTyping && (
           <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border/40">
              <CopyButton value={content} className="h-7 w-7 rounded-lg" />
              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg hover:bg-muted/50 text-muted-foreground"><ThumbsUp className="h-3.5 w-3.5" /></Button>
              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg hover:bg-muted/50 text-muted-foreground"><ThumbsDown className="h-3.5 w-3.5" /></Button>
           </div>
        )}
      </div>
    </motion.div>
  );
}
