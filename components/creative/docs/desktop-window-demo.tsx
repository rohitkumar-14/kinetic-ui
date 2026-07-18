"use client";

import React, { useState } from "react";
import { DesktopEnvironment, DraggableWindow } from "@/components/creative/desktop-window";
import { Terminal, Folder, Image as ImageIcon, Music } from "lucide-react";
import { AnimatePresence } from "framer-motion";

export function DesktopWindowDemo() {
  const [windows, setWindows] = useState([
    { id: "term", title: "Terminal - zsh", type: "terminal", x: 50, y: 50 },
    { id: "files", title: "Finder", type: "files", x: 100, y: 150 },
  ]);

  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState([
    "KineticOS v1.0.0",
    `Last login: ${new Date().toDateString()} on ttys001`,
    "user@macbook ~/Projects $ npm run dev",
    "ready - started server on 0.0.0.0:3000, url: http://localhost:3000",
    "event - compiled client and server successfully in 1250 ms (149 modules)"
  ]);

  const closeWindow = (id: string) => {
    setWindows(windows.filter(w => w.id !== id));
  };

  const openWindow = (id: string, type: "terminal" | "files", title: string) => {
    if (windows.some(w => w.id === id)) return;
    setWindows([...windows, { id, title, type, x: Math.random() * 100 + 50, y: Math.random() * 100 + 50 }]);
  };

  const handleTerminalSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (terminalInput.trim() === 'clear') {
        setTerminalHistory([]);
      } else if (terminalInput.trim() !== '') {
        setTerminalHistory([
          ...terminalHistory, 
          `user@macbook ~/Projects $ ${terminalInput}`, 
          `zsh: command not found: ${terminalInput}`
        ]);
      }
      setTerminalInput("");
    }
  };

  return (
    <div className="w-full h-[600px] rounded-xl overflow-hidden border border-white/10 relative">
      <DesktopEnvironment backgroundUrl="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop">
        
        {/* Desktop Icons */}
        <div className="absolute top-4 right-4 flex flex-col gap-6 items-center">
          <div 
            className="flex flex-col items-center gap-1 cursor-pointer hover:bg-white/10 p-2 rounded-lg"
            onDoubleClick={() => openWindow("projects", "files", "Projects")}
          >
            <Folder className="w-12 h-12 text-blue-400 fill-blue-400/20" />
            <span className="text-white text-xs drop-shadow-md font-medium">Projects</span>
          </div>
          <div 
            className="flex flex-col items-center gap-1 cursor-pointer hover:bg-white/10 p-2 rounded-lg"
            onDoubleClick={() => openWindow("assets", "files", "Assets")}
          >
            <ImageIcon className="w-12 h-12 text-emerald-400" />
            <span className="text-white text-xs drop-shadow-md font-medium">Assets</span>
          </div>
          <div 
            className="flex flex-col items-center gap-1 cursor-pointer hover:bg-white/10 p-2 rounded-lg"
            onDoubleClick={() => openWindow("term2", "terminal", "Terminal - zsh")}
          >
            <Terminal className="w-12 h-12 text-zinc-300 fill-zinc-900" />
            <span className="text-white text-xs drop-shadow-md font-medium">Terminal</span>
          </div>
        </div>

        {/* Windows */}
        <AnimatePresence>
          {windows.map(w => (
            <DraggableWindow 
              key={w.id} 
              id={w.id} 
              title={w.title}
              defaultPosition={{ x: w.x, y: w.y }}
              defaultSize={{ width: 450, height: 300 }}
              onClose={() => closeWindow(w.id)}
            >
              {w.type === "terminal" ? (
                <div 
                  className="p-4 font-mono text-sm h-full overflow-y-auto cursor-text"
                  onClick={(e) => {
                    const input = e.currentTarget.querySelector('input');
                    if (input) input.focus();
                  }}
                >
                  {terminalHistory.map((line, i) => (
                    <p key={i} className={line.startsWith("user@") ? "mt-2" : "text-zinc-300"}>
                      {line.startsWith("user@") ? (
                        <>
                          <span className="text-fuchsia-400">user@macbook</span> <span className="text-blue-400">~/Projects</span> $ {line.split('$')[1]}
                        </>
                      ) : (
                        <span className={line.includes("command not found") ? "text-red-400" : "text-green-400"}>{line}</span>
                      )}
                    </p>
                  ))}
                  
                  <div className="mt-2 flex items-center gap-2 text-green-400">
                    <span className="text-fuchsia-400 whitespace-nowrap">user@macbook</span> 
                    <span className="text-blue-400 whitespace-nowrap">~/Projects</span> 
                    <span>$</span>
                    <input 
                      type="text"
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      onKeyDown={handleTerminalSubmit}
                      className="bg-transparent border-none outline-none flex-1 text-green-400 w-full"
                      autoFocus
                    />
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-slate-900/50 h-full flex flex-col">
                  <div className="flex gap-4 border-b border-white/5 pb-4 mb-4">
                    <div className="flex flex-col items-center gap-1 p-2 rounded hover:bg-white/5 cursor-pointer">
                      <Folder className="w-8 h-8 text-blue-400 fill-blue-400/20" />
                      <span className="text-zinc-300 text-xs">src</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 p-2 rounded hover:bg-white/5 cursor-pointer">
                      <Folder className="w-8 h-8 text-blue-400 fill-blue-400/20" />
                      <span className="text-zinc-300 text-xs">components</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 p-2 rounded hover:bg-white/5 cursor-pointer">
                      <Terminal className="w-8 h-8 text-zinc-400" />
                      <span className="text-zinc-300 text-xs">page.tsx</span>
                    </div>
                  </div>
                  <div className="flex-1 overflow-auto bg-black/40 rounded-lg p-4 font-mono text-xs text-zinc-400">
                    {`export default function Page() {\n  return (\n    <DesktopEnvironment>\n      <DraggableWindow />\n    </DesktopEnvironment>\n  );\n}`}
                  </div>
                </div>
              )}
            </DraggableWindow>
          ))}
        </AnimatePresence>

      </DesktopEnvironment>
    </div>
  );
}
