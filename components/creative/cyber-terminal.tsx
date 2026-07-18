"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { Command } from "cmdk";
import { DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { TerminalSquare } from "lucide-react";

export interface CyberTerminalProps {
  /** Array of commands to display */
  commands: {
    heading: string;
    items: {
      id: string;
      title: string;
      icon?: React.ReactNode;
      onSelect: () => void;
    }[];
  }[];
  /** Whether the terminal is open */
  open: boolean;
  /** Function to change open state */
  onOpenChange: (open: boolean) => void;
  /** Whether typing sounds are enabled */
  soundEnabled?: boolean;
  /** Optional class name */
  className?: string;
}

export function CyberTerminal({
  commands,
  open,
  onOpenChange,
  soundEnabled = true,
  className,
}: CyberTerminalProps) {
  const [inputValue, setInputValue] = useState("");
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize Web Audio API on first interaction (required by browsers)
  const initAudio = useCallback(() => {
    if (!audioContextRef.current && soundEnabled) {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContext) {
        audioContextRef.current = new AudioContext();
      }
    }
  }, [soundEnabled]);

  // Play synthetic mechanical keystroke
  const playKeystroke = useCallback(() => {
    if (!soundEnabled || !audioContextRef.current) return;
    const ctx = audioContextRef.current;
    
    // Resume context if suspended
    if (ctx.state === "suspended") ctx.resume();

    // Create a very short, high-pitched mechanical "click"
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = "square";
    // Randomize frequency slightly for organic feel
    osc.frequency.setValueAtTime(150 + Math.random() * 50, ctx.currentTime);
    
    // Very sharp envelope
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.002);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.02);
  }, [soundEnabled]);

  // Handle keyboard shortcut (CMD+K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  // Matrix scramble effect for selected items
  const handleSelect = (onSelectAction: () => void) => {
    // Play slightly different sound for enter
    if (audioContextRef.current && soundEnabled) {
      const ctx = audioContextRef.current;
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    }
    
    setTimeout(() => {
      onSelectAction();
      onOpenChange(false);
      setInputValue("");
    }, 150);
  };

  return (
    <>
      {/* 
        Tailwind CSS for CRT effects. We inject these here to avoid bloating global CSS.
        Usually better in a stylesheet, but fine for a drop-in component.
      */}
      <style dangerouslySetInnerHTML={{__html: `
        .crt-overlay {
          background: linear-gradient(
            to bottom,
            rgba(255,255,255,0),
            rgba(255,255,255,0) 50%,
            rgba(0,0,0,0.2) 50%,
            rgba(0,0,0,0.2)
          );
          background-size: 100% 4px;
          pointer-events: none;
        }
        @keyframes crt-flicker {
          0% { opacity: 0.95; }
          5% { opacity: 0.85; }
          10% { opacity: 0.95; }
          100% { opacity: 0.98; }
        }
        .animate-crt {
          animation: crt-flicker 0.15s infinite;
        }
        .phosphor-glow {
          text-shadow: 0 0 5px rgba(52, 211, 153, 0.8), 0 0 10px rgba(52, 211, 153, 0.4);
        }
        
        /* cmdk specific styles to override default headless behavior */
        [cmdk-root] {
          width: 100%;
          background: transparent;
        }
        [cmdk-input] {
          font-family: monospace;
          border: none;
          width: 100%;
          font-size: 1.125rem;
          padding: 1rem 1.5rem;
          outline: none;
          background: transparent;
          color: #34d399; /* emerald-400 */
        }
        [cmdk-input]::placeholder {
          color: #065f46; /* emerald-800 */
        }
        [cmdk-list] {
          min-height: 300px;
          max-height: 400px;
          overflow: auto;
          overscroll-behavior: contain;
          padding: 0.5rem 1rem 1rem 1rem;
        }
        [cmdk-group-heading] {
          padding: 0.5rem 0.5rem;
          color: #059669; /* emerald-600 */
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: bold;
          font-family: monospace;
        }
        [cmdk-item] {
          content-visibility: auto;
          cursor: pointer;
          height: 40px;
          border-radius: 4px;
          font-size: 0.875rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0 0.75rem;
          color: #10b981; /* emerald-500 */
          font-family: monospace;
          user-select: none;
          transition: all 0.1s ease;
        }
        [cmdk-item][data-selected="true"] {
          background: #064e3b; /* emerald-900 */
          color: #6ee7b7; /* emerald-300 */
          box-shadow: inset 2px 0 0 #34d399;
        }
        [cmdk-empty] {
          font-size: 0.875rem;
          padding: 2rem;
          text-align: center;
          color: #059669;
          font-family: monospace;
        }
      `}} />

      <Command.Dialog 
        open={open} 
        onOpenChange={onOpenChange}
        className={cn(
          "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-[#022c22] border-2 border-emerald-500/30 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(4,120,87,0.5)] z-50 animate-crt",
          className
        )}
      >
        <DialogTitle className="sr-only">Cyber Terminal</DialogTitle>
        <DialogDescription className="sr-only">Cyberpunk styled command palette</DialogDescription>

        {/* CRT Overlay Effects */}
        <div className="absolute inset-0 crt-overlay z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)] z-10 pointer-events-none" />
        
        {/* Header decoration */}
        <div className="bg-emerald-950/80 border-b border-emerald-800/50 px-4 py-2 flex items-center justify-between font-mono text-[10px] text-emerald-600 select-none">
          <div className="flex items-center gap-2">
            <TerminalSquare className="w-3 h-3" />
            <span>CYBER_OS v9.4.1</span>
          </div>
          <div className="flex gap-2">
            <span className="animate-pulse">_REC</span>
            <span>MEM: 640K</span>
          </div>
        </div>

        <div className="relative z-20" onClickCapture={initAudio}>
          <div className="flex items-center px-2 border-b border-emerald-900/50">
            <span className="text-emerald-500 font-mono ml-4 mr-2 phosphor-glow">{">"}</span>
            <Command.Input 
              value={inputValue}
              onValueChange={(val) => {
                setInputValue(val);
                playKeystroke();
              }}
              placeholder="ENTER COMMAND..."
              className="phosphor-glow"
              autoFocus
            />
          </div>

          <Command.List>
            <Command.Empty>ERR: COMMAND NOT FOUND.</Command.Empty>
            
            {commands.map((group) => (
              <Command.Group key={group.heading} heading={group.heading}>
                {group.items.map((item) => (
                  <Command.Item 
                    key={item.id} 
                    onSelect={() => handleSelect(item.onSelect)}
                    className="group"
                  >
                    <span className="opacity-50 group-data-[selected=true]:opacity-100 transition-opacity">
                      {item.icon}
                    </span>
                    <span className="phosphor-glow uppercase tracking-wider">{item.title}</span>
                  </Command.Item>
                ))}
              </Command.Group>
            ))}
          </Command.List>
        </div>
      </Command.Dialog>
    </>
  );
}
