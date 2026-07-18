"use client";

import React, { useState } from "react";
import { AnimatedPromptInput } from "@/components/creative/animated-prompt-input";
import { StreamingMarkdownRenderer } from "@/components/creative/streaming-markdown-renderer";
import { ThinkingVisualizer } from "@/components/creative/thinking-visualizer";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User, Menu, Plus, Settings } from "lucide-react";
import { FilmGrain } from "@/components/creative/film-grain";
import { cn } from "@/lib/utils";

// Dummy conversation data
const INITIAL_CHAT = [
  {
    id: "1",
    role: "assistant",
    content: "Welcome to Kinetic AI. I am a highly advanced generative model wrapped in an Awwwards-tier user interface. How can I assist you with your digital architecture today?"
  }
];

export default function ChatbotTemplate() {
  const [messages, setMessages] = useState(INITIAL_CHAT);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSubmit = (value: string) => {
    // Add user message
    const newMessages = [...messages, { id: Date.now().toString(), role: "user", content: value }];
    setMessages(newMessages);
    setIsGenerating(true);

    // Simulate API delay (Thinking State)
    setTimeout(() => {
      // Add empty assistant message
      const botMsgId = (Date.now() + 1).toString();
      setMessages([...newMessages, { id: botMsgId, role: "assistant", content: "" }]);
      
      // We will slowly stream this text
      const fullResponse = "That's a fascinating request. To engineer such a system, we must consider both the aesthetic physics and the underlying state management.\n\nHere is what I recommend:\n\n1. Establish a solid Framer Motion core.\n2. Layer WebGL shaders over the background for depth.\n3. Synchronize user input to global animation variables.\n\nWould you like me to draft the boilerplate code for this architecture?";
      
      let currentIndex = 0;
      
      const streamInterval = setInterval(() => {
        currentIndex += 5; // stream chunks of 5 chars
        if (currentIndex >= fullResponse.length) {
          currentIndex = fullResponse.length;
          clearInterval(streamInterval);
          setIsGenerating(false);
        }
        
        setMessages(prev => 
          prev.map(msg => 
            msg.id === botMsgId 
              ? { ...msg, content: fullResponse.substring(0, currentIndex) }
              : msg
          )
        );
      }, 50);

    }, 2500); // 2.5s thinking time
  };

  return (
    <div className="flex h-screen w-full bg-zinc-950 text-white overflow-hidden selection:bg-indigo-500/30">
      <FilmGrain />
      
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ 
          width: isSidebarOpen ? 280 : 0,
          opacity: isSidebarOpen ? 1 : 0
        }}
        className="h-full bg-zinc-900/50 backdrop-blur-xl border-r border-white/5 flex flex-col overflow-hidden shrink-0 relative z-20"
      >
        <div className="p-4 w-full h-full flex flex-col">
          <button className="flex items-center gap-2 w-full px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/5 text-sm font-medium">
            <Plus className="w-4 h-4" /> New Chat
          </button>
          
          <div className="flex-1 overflow-y-auto mt-8 flex flex-col gap-2 no-scrollbar">
            <div className="px-2 text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2">Today</div>
            <button className="text-left px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg truncate transition-colors">
              Digital Architecture Plans
            </button>
            <button className="text-left px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg truncate transition-colors">
              Awwwards Site Analysis
            </button>
            
            <div className="px-2 text-xs font-semibold text-zinc-500 uppercase tracking-widest mt-6 mb-2">Previous 7 Days</div>
            <button className="text-left px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg truncate transition-colors">
              WebGL Shader Optimization
            </button>
            <button className="text-left px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg truncate transition-colors">
              Framer Motion Spring Physics
            </button>
          </div>
          
          <div className="mt-auto pt-4 border-t border-white/5">
            <button className="flex items-center gap-3 w-full px-4 py-3 hover:bg-white/5 rounded-xl transition-colors text-sm font-medium text-zinc-400 hover:text-white">
              <Settings className="w-4 h-4" /> Settings
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col relative h-full w-full bg-black/40">
        
        {/* Header */}
        <header className="absolute top-0 w-full p-4 flex items-center justify-between z-10 pointer-events-none">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg bg-zinc-900/80 backdrop-blur-md border border-white/10 text-white hover:bg-zinc-800 pointer-events-auto transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="px-4 py-1.5 rounded-full bg-zinc-900/80 backdrop-blur-md border border-white/10 text-xs font-medium text-zinc-300 pointer-events-auto flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Model: Kinetic-V1
          </div>
        </header>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto pt-24 pb-40 px-4 md:px-8 w-full max-w-4xl mx-auto flex flex-col gap-8 no-scrollbar scroll-smooth">
          {messages.map((msg, i) => {
            const isBot = msg.role === "assistant";
            return (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={cn("flex gap-4 w-full", isBot ? "" : "flex-row-reverse")}
              >
                <div className={cn(
                  "w-10 h-10 shrink-0 rounded-full flex items-center justify-center border",
                  isBot ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-400" : "bg-zinc-800 border-zinc-700 text-zinc-400"
                )}>
                  {isBot ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                </div>
                
                <div className={cn(
                  "flex flex-col gap-2 max-w-[85%]",
                  isBot ? "items-start" : "items-end"
                )}>
                  <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                    {isBot ? "Kinetic AI" : "You"}
                  </div>
                  <div className={cn(
                    "p-5 rounded-2xl",
                    isBot 
                      ? "bg-zinc-900/50 backdrop-blur-sm border border-white/5" 
                      : "bg-indigo-500/10 border border-indigo-500/20"
                  )}>
                    {isBot ? (
                      msg.content ? (
                        <StreamingMarkdownRenderer 
                          content={msg.content} 
                          isStreaming={isGenerating && i === messages.length - 1} 
                        />
                      ) : (
                        <div className="py-2 px-4">
                          <ThinkingVisualizer size={40} text="COMPUTING" />
                        </div>
                      )
                    ) : (
                      <div className="text-zinc-200 leading-relaxed font-sans">{msg.content}</div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 w-full p-4 md:p-8 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent pointer-events-none">
          <div className="w-full max-w-3xl mx-auto pointer-events-auto">
            <AnimatedPromptInput 
              onSubmit={handleSubmit}
              isGenerating={isGenerating}
              placeholder="Design a fluid simulation component..."
            />
            <p className="text-center text-xs text-zinc-600 mt-4">
              Kinetic AI can make mistakes. Consider verifying important architecture decisions.
            </p>
          </div>
        </div>

      </main>
    </div>
  );
}
