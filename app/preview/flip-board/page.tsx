"use client";

import React, { useState, useEffect } from "react";
import { FlipBoard } from "@/components/creative/flip-board";

export default function FlipBoardPreview() {
  const [text, setText] = useState("DEPARTURES");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const phrases = [
    "DEPARTURES",
    "HELLO WORLD",
    "NEXT JS UI",
    "FLIP BOARD",
    "TIME FLIES",
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % phrases.length;
      setText(phrases[index]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-zinc-950 text-white font-sans">
      <div className="max-w-4xl w-full flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">FlipBoard Component</h1>
          <p className="text-zinc-400 mb-8">
            A split-flap display component that animates characters with flip transitions.
          </p>

          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setTheme("dark")}
              className={`px-4 py-2 rounded-md ${
                theme === "dark" ? "bg-white text-black" : "bg-zinc-800"
              }`}
            >
              Dark Theme
            </button>
            <button
              onClick={() => setTheme("light")}
              className={`px-4 py-2 rounded-md ${
                theme === "light" ? "bg-white text-black" : "bg-zinc-800"
              }`}
            >
              Light Theme
            </button>
            <button
              onClick={() => {
                const next = phrases[(phrases.indexOf(text) + 1) % phrases.length];
                setText(next);
              }}
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-500"
            >
              Force Change
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-12">
          {/* Single Row Example */}
          <div className="space-y-4">
            <h2 className="text-xl font-medium text-zinc-300">Single Row (Dynamic text length)</h2>
            <div className="flex">
              <FlipBoard text={text} theme={theme} cols={12} />
            </div>
          </div>

          {/* Multi Row Example */}
          <div className="space-y-4">
            <h2 className="text-xl font-medium text-zinc-300">Multi-Row Board (3x12)</h2>
            <div className="flex">
              <FlipBoard
                text={`NOW BOARDING FLIGHT ${text} AT GATE 7`}
                rows={3}
                cols={12}
                theme={theme}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
