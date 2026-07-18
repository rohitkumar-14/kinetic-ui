"use client";

import React, { useState } from "react";
import { GenerativeChat, Message } from "@/components/creative/generative-ui-chat";
import { BarChart3, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";

function ArtifactChart() {
  return (
    <div className="mt-4 w-full bg-zinc-950 border border-zinc-800 rounded-xl p-5 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-white">Weekly Traffic</h4>
        <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full">+14%</span>
      </div>
      <div className="flex items-end gap-2 h-32 w-full">
        {[40, 65, 45, 80, 55, 90, 75].map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ duration: 0.8, delay: i * 0.1, type: "spring" }}
            className="flex-1 bg-gradient-to-t from-indigo-600/50 to-indigo-400 rounded-t-sm border border-indigo-400/20"
          />
        ))}
      </div>
      <div className="flex justify-between mt-2 text-[10px] text-zinc-500">
        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
      </div>
    </div>
  );
}

export function GenerativeUIChatDemo({ placeholder = "Ask AI to generate a component..." }: { placeholder?: string }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: <p>Hello! I'm the Final Boss AI. I can generate interactive React interfaces directly inside this chat. Ask me for a chart!</p>
    }
  ]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSend = (text: string) => {
    const newUserMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages((prev) => [...prev, newUserMsg]);
    setIsGenerating(true);

    // Simulate AI thinking and generating a component
    setTimeout(() => {
      let aiResponse: React.ReactNode = <p>I've analyzed the request. Here is a generic response.</p>;
      
      if (text.toLowerCase().includes("chart") || text.toLowerCase().includes("data") || text.toLowerCase().includes("traffic")) {
        aiResponse = (
          <div className="space-y-2">
            <p className="text-zinc-300">Absolutely. I've generated an interactive bar chart component showing your weekly traffic metrics.</p>
            <ArtifactChart />
          </div>
        );
      } else {
        aiResponse = (
          <div className="space-y-4">
            <p className="text-zinc-300">I can certainly help with that. Here are some quick stats:</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-zinc-950 border border-zinc-800 p-3 rounded-lg flex items-center gap-3">
                <Users className="w-5 h-5 text-blue-400" />
                <div>
                  <div className="text-lg font-bold text-white">4,021</div>
                  <div className="text-[10px] text-zinc-500 uppercase">Active Users</div>
                </div>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 p-3 rounded-lg flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="text-lg font-bold text-white">92.4%</div>
                  <div className="text-[10px] text-zinc-500 uppercase">Retention</div>
                </div>
              </div>
            </div>
            <p className="text-xs text-zinc-500 italic">Try asking me to "generate a chart" to see generative UI in action.</p>
          </div>
        );
      }

      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: "assistant", content: aiResponse }]);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-6">
      <GenerativeChat 
        messages={messages} 
        isGenerating={isGenerating}
        onSend={handleSend}
        placeholder={placeholder}
      />
    </div>
  );
}
