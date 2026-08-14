"use client";

import React from "react";
import { AIGenerativeInput } from "@/components/creative/ai-generative-input";

export default function AIGenerativeInputDemo() {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[400px] bg-zinc-950 border border-white/10 rounded-xl p-8">
      
      <div className="w-full max-w-2xl flex flex-col gap-6">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-white mb-2">Generative AI Input</h2>
          <p className="text-zinc-400">
            A highly polished prompt interface with expanding states, animated gradient borders, and particle explosions on submit.
          </p>
        </div>

        <AIGenerativeInput 
          onSubmit={(val) => console.log("Submitted:", val)}
          placeholder="Design a database schema for a SaaS billing system..."
        />
      </div>

    </div>
  );
}
